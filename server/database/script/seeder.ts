// File System for parsing Google Drive assets
import fs from "fs";

// Link sql database information
import db from "../model";

interface AnimProps {
	tier?: string,
	category?: string,
	credit?: string,
	feClass?: string,
	name?: string,
	gender?: string,
	download?: string,
	dlName?: string,
	weapons?: Array<object>
}

/*
 * Anim Factory method receives props and returns an object shaped for import to sql.
 */
const createAnim = ({ tier, category, feClass, name, gender, credit, download, dlName, weapons }: AnimProps): AnimProps => ({
	tier,
	category,
	feClass,
	name,
	gender,
	credit,
	download,
	dlName,
	weapons
});

// The animation asset root
const root = "./public/img/";

// Initialize empty array to store anim parsed data.
const animArray: Array<AnimProps> = [];

/*
 * Take a single anim from animArray and search the DB for it.
 * If the anim exists, search through weapons and add any that don't exist.
 * If the anim doesn't exist, add the anim to sql and all weapons attached to it.
 */
const animToDB = (anim: AnimProps): void => {
	// findorCreate allows existing anims to have weapons added while fully creating all sql data for new Anims.
	db.Anim.findOrCreate({
		where: {
			tier: anim.tier,
			category: anim.category,
			feClass: anim.feClass,
			gender: anim.gender,
			name: anim.name,
			URL: anim.download,
			dlName: anim.dlName,
			credit: anim.credit,
		}
	}).then((sqlAnim: any): void => {
		anim.weapons && anim.weapons.forEach((weapon: Record<string, any>): void => {
			// Create will fail intentionally for any pre-existing weapon in the db.
			db.Weapon.create({
				still: weapon.still,
				gif: weapon.gif,
				// for searching purposes, feclass is added. weapon type is also added.
			}).then((sqlWeapon: any): void => {
				sqlAnim[0].addWeapon(sqlWeapon, {
					through: {
						name: anim.feClass,
						weapon: weapon.type
					}
				}).then((): void => {
					// eslint-disable-next-line
					console.log(`Success: ${anim.feClass} ${anim.name} - ${weapon.fullName} has been inserted.`);
				}).catch((err: any): void => {
					// eslint-disable-next-line
					console.log(`Failed: Merge Table: ${anim.feClass} ${anim.name} - ${weapon.fullName}. Err Code: ${err}`);
				});
			}).catch((err: any): void => {
				// eslint-disable-next-line
				console.log(`Failed: Weapon Search: ${anim.feClass} ${anim.name} - ${weapon.fullName}. Err code: ${err}`);
			});
		});
	}).catch((err: any): void => {
		// eslint-disable-next-line
		console.log(`Failed: Animation: ${anim.name}. Err code: ${err}`);
	});
};

// Function to be called at the completion of findAnims. Handles completed array.
const arrayToDB = (): void => {
	animArray.forEach((anim): void => {
		// eslint-disable-next-line
		console.log(anim);
		animToDB(anim);
	});
};

/*
 * Search the filesystem for Anims.
 * Anims are added to animArray and counted.
 * Count is compared against the total and pushed to sql if count matches.
 */
const findAnims = (): void => {
	fs.readdir(root, (err, categories): void => {
		if (err) {
			// eslint-disable-next-line
			console.log(err);
		} else {
			let catCounter = 0;
			const catCeiling = categories.length - 2;
			categories.forEach((category): void => {

				// Special Spell Route
				if (category === "7. Spells") {
					fs.readdir(`${root}${category}/`, (err, spells): void => {
						// eslint-disable-next-line
						console.log(`Spells to count: ${spells.length}`);
						let spellCounter = 0;

						spells.forEach((spell): void => {

							spellCounter++;
							if (spell.toLowerCase().includes("png") || spell.toLowerCase().includes("gif") || spell.toLowerCase().includes("txt") || spell.toLowerCase().includes(".dat") || spell.toLowerCase().includes("desktop")) {
								// eslint-disable-next-line
								console.log(`${spell} is not a spell`);
							} else {
								const tempInfoArray: RegExpMatchArray | null = spell.match(/[^[[{(]}\)]+/g);
								let anim: AnimProps = createAnim({
									tier: "",
									category: "SPL",
									feClass: tempInfoArray && tempInfoArray[0] || undefined,
									gender: tempInfoArray && tempInfoArray[1] || undefined,
									name: "",
									download: tempInfoArray && tempInfoArray[2] || undefined,
									dlName: `img/${category}/${spell}`,
									credit: spell,
									weapons: []
								});
								anim.weapons && anim.weapons.push(
									{
										type: "Spell",
										fullName: spell,
										still: `img/${category}/${spell}/Spell_b_001.png`,
										gif: `img/${category}/${spell}/Spell.gif`
									});

								animArray.push(anim);
							}
							if (spellCounter === spells.length) {
								catCounter++;
								// eslint-disable-next-line
								console.log(`Category: ${category} spellCount = ${spellCounter}/${spells.length}. Categories = ${catCounter}/${catCeiling}`);
								if (catCounter === catCeiling) {
									arrayToDB();
								}
							}
						});
					});

					// temporary limiter. To be expanded / removed w/ further testing
				} else if (category !== "global") {
					fs.readdir(`${root}${category}/`, (err, units): void => {
						// eslint-disable-next-line
						console.log(`units to count: ${units.length} Category: ${category}`);
						let unitCounter = 0;
						units.forEach((unit): void => {
							if (unit.includes("desktop")) {
								// eslint-disable-next-line
								console.log(`${unit} is not a unit`);
								unitCounter++;
							} else {
								const tempInfoArray = unit.match(/[^[[{(]}\)]+/g);

								let anim = createAnim({
									tier: tempInfoArray && tempInfoArray[0] || undefined,
									category: tempInfoArray && tempInfoArray[1] || undefined,
									feClass: tempInfoArray && tempInfoArray[2] || undefined,
									name: tempInfoArray && tempInfoArray[3] || undefined,
									gender: tempInfoArray && tempInfoArray[4] || undefined,
									credit: tempInfoArray && tempInfoArray[5] || undefined,
									download: tempInfoArray && tempInfoArray[6] || undefined,
									dlName: `img/${category}/${unit}`,
									weapons: []
								});

								if (tempInfoArray && tempInfoArray.length === 5) {
									anim.name = "";
									anim.gender = tempInfoArray[3];
									anim.credit = tempInfoArray[4];
									anim.download = `img/${category}/${unit}`;
								}
								fs.readdir(`${root}${category}/${unit}/`, (err, weps): void => {
									if (err) {
										// eslint-disable-next-line
										console.log(err);
										unitCounter++;
									} else {
										let wepCeiling = weps.length;
										let wepCounter = 0;
										// if (wepCeiling === 0) {
										//     console.log(anim.name + " doesn't have any weapons!");
										// }
										weps.forEach((weapon): void => {
											let wep: Array<string> | string = weapon.replace(/\d*?\.\s/, "").split(" ");
											wep = wep[0].toString();
											wepCounter++;
											if (weapon.toLowerCase().includes("png") || weapon.toLowerCase().includes("gif") || weapon.toLowerCase().includes("txt") || weapon.toLowerCase().includes(".dat") || weapon.toLowerCase().includes("desktop")) {
												// eslint-disable-next-line
												console.log(`not a wep: unit count = ${unitCounter}/${units.length} ${categories} = ${catCounter}/${catCeiling}`);
											} else {
												anim.weapons && anim.weapons.push(
													{
														type: wep,
														fullName: weapon,
														still: `img/${category}/${unit}/${weapon}/${wep}_000.png`,
														gif: `img/${category}/${unit}/${weapon}/${wep}.gif`
													});
												// eslint-disable-next-line
												console.log(`${wepCounter}/${weps.length} ${anim.name} ${unitCounter}`);
												// Increments the unit count for the category when all weapon pushes have been incremented through

											}
											if (wepCounter === wepCeiling) {
												animArray.push(anim);
												unitCounter++;
												// console.log(unitCounter, units.length);
												if (unitCounter === units.length) {
													catCounter++;
													// eslint-disable-next-line
													console.log(`Category: ${category} unitCount = ${unitCounter}/${units.length}. Categories = ${catCounter}/${catCeiling}`);
													if (catCounter === catCeiling) {
														arrayToDB();
													}
												}
											}
										});
									}
								});
							}
						});
					});
				}
			});
		}
	});
};

// END FUNCTIONS //

// LIVE EXECUTION //

findAnims();

// END //
