import {
	Anims,
	Weapon,
	makeAnim,
	makeSkillAnim,
	makeSpellAnim
} from "./anim.definitions"
import { assetsToDB } from "../database/assets-to-db"
import { authorize } from "./authorize-drive"
import { drive_v3 as driveV3, google } from "googleapis"
import Bottleneck from "bottleneck"

// Setup a default limiter that, when repeated, prevents requests from overloading google's permitted amount per 100 seconds
const limiter = new Bottleneck({
	minTime: 200,
	maxConcurrent: 6
})

/**
 * Starts from a weapon folder root (e.g. '1. Sword') and matches against a static png (e.g. 'Sword_000.png') and a gif (e.g. 'Sword.gif')
 */
const searchWeaponIds = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File,
	weaponName: string
): Promise<Weapon> =>
	new Promise<Weapon>((resolve, reject) => {
		// const sainAxe = '1uimihp12VkH9YRE1QdEsz_PC0ck-aoTO'
		limiter
			.schedule((): any => {
				drive.files.list(
					{
						q: `parents in '${passedFile.id}'`,
						// supportsAllDrives: true,
						fields: "files(id, name)"
						// includeItemsFromAllDrives: true
					},
					(err: Error | null, res) => {
						if (err) reject(err)

						const files = res && res.data && res.data.files

						if (files && files.length) {
							const weapon: Partial<Weapon> = { type: weaponName }

							files.map(file => {
								if (file.name === `${weaponName}_000.png`) {
									weapon.static = file.id || ""
								} else if (file.name === `${weaponName}.gif`) {
									weapon.active = file.id || ""
								}
							})
							resolve(weapon as Weapon)
						} else {
							console.log(`No files found for: ${passedFile.name}`)
							reject(`No files found for: ${passedFile.name}`)
						}
					}
				)
			})
			.catch(error => console.log(error))
	})

/**
 * Starts from an Anim folder root (e.g. '[T1][SWD][Mercenary][M]{IS}') and searches for weapon entries (e.g. '1. Sword', '2. Lance')
 */
const searchWeapons = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File
): Promise<Array<Weapon>> =>
	new Promise<Array<Weapon>>((resolve, reject) => {
		// const sain = '1m0JtTpJ-aRUhrlR54l5-pB19yfFmBK-Z'
		limiter
			.schedule((): any =>
				drive.files.list(
					{
						q: `mimeType = 'application/vnd.google-apps.folder' and parents in '${passedFile.id}'`
						// supportsAllDrives: true,
						// includeItemsFromAllDrives: true
					},
					(err, res) => {
						if (err) reject(err)

						const files = res && res.data && res.data.files

						if (files && files.length) {
							Promise.all(
								files
									.filter(
										file =>
											file && file.name && file.name.match(/[1-9]. (?:.*)/)
									)
									.map(file => {
										let weaponName: string | Array<string> | undefined | null =
											file &&
											file.name &&
											file.name.replace(/\d*?\.\s/, "").split(" ")
										weaponName =
											weaponName && weaponName[0] && weaponName[0].toString()

										return searchWeaponIds(drive, file, String(weaponName))
									})
							).then(weapons => {
								// console.log(weapons)
								resolve(weapons)
							})
						} else {
							console.log(`No files found for: ${passedFile.name}`)
							reject(`No files found for: ${passedFile.name}`)
						}
					}
				)
			)
			.catch(error => console.log(error))
	})

/**
 * Starts from a SkillAnim folder (e.g. '(Lethality){Credit}') and matches on a static png and gif
 */
const searchSkills = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File
): Promise<Array<Weapon>> =>
	new Promise<Array<Weapon>>((resolve, reject) => {
		limiter
			.schedule((): any =>
				// const sain = '1m0JtTpJ-aRUhrlR54l5-pB19yfFmBK-Z'
				drive.files.list(
					{
						q: `parents in '${passedFile.id}'`,
						fields: "files(id, name)"
						// supportsAllDrives: true,
						// includeItemsFromAllDrives: true
					},
					(err, res) => {
						if (err) reject(err)

						const files = res && res.data && res.data.files

						const weaponName = "Skill"

						if (files && files.length) {
							const weapon: Partial<Weapon> = { type: weaponName }
							files.map(file => {
								if (file.name === `${weaponName}_g000.png`) {
									weapon.static = file.id || ""
								} else if (file.name === `${weaponName}.gif`) {
									weapon.active = file.id || ""
								}
							})
							resolve([weapon as Weapon])
						} else {
							console.log(`No files found for: ${passedFile.name}`)
							reject(`No files found for: ${passedFile.name}`)
						}
					}
				)
			)
			.catch(error => console.log(error))
	})

/**
 * Starts from a SpellAnim folder (e.g. '[Anima][Fire](Forblaze){Credit}') and matches on a static png and gif
 */
const searchSpells = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File
): Promise<Array<Weapon>> =>
	new Promise<Array<Weapon>>((resolve, reject) => {
		// const sain = '1m0JtTpJ-aRUhrlR54l5-pB19yfFmBK-Z'
		limiter
			.schedule((): any =>
				drive.files.list(
					{
						q: `parents in '${passedFile.id}'`,
						fields: "files(id, name)"
						// supportsAllDrives: true,
						// includeItemsFromAllDrives: true
					},
					(err, res) => {
						if (err) reject(err)

						const files = res && res.data && res.data.files

						const weaponName = "Spell"

						if (files && files.length) {
							const weapon: Partial<Weapon> = { type: weaponName }
							files.map(file => {
								if (file.name === `${weaponName}_b_001.png`) {
									weapon.static = file.id || ""
								} else if (file.name === `${weaponName}.gif`) {
									weapon.active = file.id || ""
								}
							})
							resolve([weapon as Weapon])
						} else {
							console.log(`No files found for: ${passedFile.name}`)
							reject(`No files found for: ${passedFile.name}`)
						}
					}
				)
			)
			.catch(error => console.log(error))
	})

/**
 * Starts from a category folder root (e.g. '1. Infantry') and searches for entries (e.g. '[T1][SWD][Mercenary][M]{IS}')
 */
const searchAnims = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File
): Promise<Anims | {}> => {
	// const infantry = '1nuNpweE_RaQuzh_QBkidhyV8AHxNzNkm'
	// const lords = '1IKyqRW1Ch6XLIcyyvb0KI6kGkWAr4A_a'
	// const skills = '1uarxrCu6uTgYxQ3vVoPvbCxvZ6Ka0LfY'
	// const magi = '1BfUK3SrMcZgiTlsCrZ8e39X8NDkKkGg0'
	// const spells = '1FFwveUuHZTzVrsRusH7pqa6JBDOxyot0'
	// const cav = '1JSmqv89W0tvlRUHNaaqJep3GZm1oxj9q'
	// const mon = '1RsyQYHh1M6OvmV2S8OPPWM9ztHKuNeuI'
	// const fliers = '1yM2WUIYXNe_meTBqBT8S7Lu_5_dV9WmN'
	return new Promise((resolve, reject) => {
		limiter.schedule((): any =>
			drive.files.list(
				{
					// q: `mimeType = 'application/vnd.google-apps.folder' and name = '[T3][CAV][Master Knight][F]{St jack}' and parents in '1JSmqv89W0tvlRUHNaaqJep3GZm1oxj9q'`,
					q: `mimeType = 'application/vnd.google-apps.folder' and parents in '${passedFile.id}'`,
					fields: "files(id, name, webViewLink)"
					// supportsAllDrives: true,
					// includeItemsFromAllDrives: true
				},
				(err, res) => {
					if (err) reject(err)

					const files = res && res.data && res.data.files

					if (files && files.length) {
						Promise.all(
							files.map((file: driveV3.Schema$File) => {
								if (passedFile.name === "7. Spells") {
									return searchSpells(drive, file).then(
										(weapons: void | Array<Weapon>) => {
											const anim = makeSpellAnim(file)
											if (weapons) {
												anim.weapons = weapons
											}
											return anim
										}
									)
								} else if (passedFile.name === "8. Skills") {
									return searchSkills(drive, file).then(weapons => {
										const anim = makeSkillAnim(file)
										if (weapons) {
											anim.weapons = weapons
										}
										return anim
									})
								}
								return searchWeapons(drive, file).then(weapons => {
									const anim = makeAnim(file)
									if (weapons) {
										anim.weapons = weapons
									}
									return anim
								})
							})
						)
							.then(anims => resolve(anims))
							.catch(error => console.log(error))
					} else {
						console.log(`No files found for: ${passedFile.name}`)
						resolve({})
					}
				}
			)
		)
	})
}

/**
 * Starts from 'Battle Animations' folder and searches for entries (e.g. '1. Infantry')
 * Then waits for all sub-processes to resolve as an object with all Anims and sends it to the database
 */
const searchBattleAnimations = (drive: driveV3.Drive): void => {
	// const battleAnimation = '1UOuAig00S1s280J6A8bkVDIFX8RIcIWx'
	drive.files.list(
		{
			q:
				"mimeType = 'application/vnd.google-apps.folder' and parents in '1UOuAig00S1s280J6A8bkVDIFX8RIcIWx'"
			// supportsAllDrives: true,
			// includeItemsFromAllDrives: true
		},
		(err, res) => {
			if (err) throw err
			const files = res && res.data && res.data.files
			if (files && files.length) {
				Promise.all(files.map(file => searchAnims(drive, file))).then(
					(animsArrays: Array<Anims> | any): void | PromiseLike<void> => {
						const animations = [].concat(...animsArrays)
						assetsToDB(animations, "animations")
					}
				)
				// assetsToDB({files})
				// Preserved for testing individual methods
				// searchAnims(drive)
				// searchWeapons(drive)
				// searchWeaponIds(drive, '', 'Axe')
			} else {
				console.log(`No files found for: ${JSON.stringify(files)}`)
			}
		}
	)
}

/**
 * Takes the auth and generates an authorized instance of drive
 */
export const driveSearchAnims = async (): Promise<void> => {
	const auth = await authorize()
	if (auth) {
		const drive = google.drive({
			version: "v3",
			auth
		})
		searchBattleAnimations(drive)
	}
}
