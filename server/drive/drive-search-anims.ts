import {
	Anims,
	Weapon,
	makeAnim,
	makeSkillAnim,
	makeSpellAnim,
} from "./anim.definitions"
import { assetsToDB } from "../database/assets-to-db"
import { authorize } from "./authorize-drive"
import { drive_v3 as driveV3, google } from "googleapis"
import Bottleneck from "bottleneck"

// Setup a default limiter that, when repeated, prevents requests from overloading google's permitted amount per 100 seconds
const limiter = new Bottleneck({
	minTime: 200,
	maxConcurrent: 6,
})

/**
 * Starts from a weapon folder root (e.g. '1. Sword') and matches against a static png (e.g. 'Sword_000.png') and a gif (e.g. 'Sword.gif')
 */
const searchWeaponIds = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File,
	weaponName: string,
	animName?: string
): Promise<Weapon> =>
	new Promise<Weapon>((resolve, reject) => {
		// const sainAxe = '1uimihp12VkH9YRE1QdEsz_PC0ck-aoTO'
		limiter.schedule((): any => {
			drive.files.list(
				{
					q: `'${passedFile.id}' in parents`,
					// supportsAllDrives: true,
					fields: "files(id, name)",
					pageSize: 1000,
					// includeItemsFromAllDrives: true
				},
				(err: Error | null, res) => {
					if (err) reject(err)

					const files = res && res.data && res.data.files

					if (files) {
						const weapon: Partial<Weapon> = { type: weaponName }

						files.map((file) => {
							if (file.name == `${weaponName}_000.png`) {
								weapon.static = file.id || ""
							} else if (file.name === `${weaponName}.gif`) {
								weapon.active = file.id || ""
							}
						})
						if (!weapon.static || !weapon.active)
							console.log(
								`bad anim weapon value ${passedFile.name} for ${animName}. static file=${weapon.static}, gif=${weapon.active}`
							)
						resolve(weapon as Weapon)
					} else {
						reject(
							`Anim weapon file name formatted improperly or doesn't exist for: ${passedFile.name} for ${animName}`
						)
					}
				}
			)
		})
	}).catch((error) => {
		console.log(error)
		const weapon: Partial<Weapon> = { type: weaponName }
		return weapon as Weapon
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
		limiter.schedule((): any =>
			drive.files.list(
				{
					q: `mimeType = 'application/vnd.google-apps.folder' and '${passedFile.id}' in parents`,
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
									(file) =>
										file && file.name && file.name.match(/[1-9]. (?:.*)/)
								)
								.map((file) => {
									let weaponName: string | Array<string> | undefined | null =
										file &&
										file.name &&
										file.name.replace(/\d*?\.\s/, "").split(" ")
									weaponName =
										weaponName && weaponName[0] && weaponName[0].toString()

									return searchWeaponIds(
										drive,
										file,
										String(weaponName),
										passedFile.name || ""
									)
								})
						)
							.then((weapons) => {
								// console.log(weapons)
								resolve(weapons)
							})
							.catch((error) => {
								console.log(error)
							})
					} else {
						reject(`No weapon files found for: ${passedFile.name}`)
					}
				}
			)
		)
	}).catch((error) => {
		console.log(error)
		return [] as Array<Weapon>
	})

/**
 * Starts from a SkillAnim folder (e.g. '(Lethality){Credit}') and matches on a static png and gif
 */
const searchSkills = (
	drive: driveV3.Drive,
	passedFile: driveV3.Schema$File
): Promise<Array<Weapon>> =>
	new Promise<Array<Weapon>>((resolve, reject) => {
		limiter.schedule((): any =>
			// const sain = '1m0JtTpJ-aRUhrlR54l5-pB19yfFmBK-Z'
			drive.files.list(
				{
					q: `'${passedFile.id}' in parents`,
					fields: "files(id, name)",
					// supportsAllDrives: true,
					// includeItemsFromAllDrives: true
				},
				(err, res) => {
					if (err) reject(err)

					const files = res && res.data && res.data.files

					const weaponName = "Skill"

					if (files && files.length) {
						const weapon: Partial<Weapon> = { type: weaponName }
						files.map((file) => {
							if (file.name === `${weaponName}_g000.png`) {
								weapon.static = file.id || ""
							} else if (file.name === `${weaponName}.gif`) {
								weapon.active = file.id || ""
							}
						})
						if (!weapon.static && !weapon.active)
							console.log(
								`bad anim weapon value ${weapon.type} for ${passedFile.name}`
							)
						resolve([weapon as Weapon])
					} else {
						reject(`No files found for: ${passedFile.name}`)
					}
				}
			)
		)
	}).catch((error) => {
		console.log(error)
		return [] as Array<Weapon>
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
		limiter.schedule((): any =>
			drive.files.list(
				{
					q: `'${passedFile.id}' in parents`,
					fields: "files(id, name)",
					pageSize: 500,
					// supportsAllDrives: true,
					// includeItemsFromAllDrives: true
				},
				(err, res) => {
					if (err) reject(`${err} in ${passedFile.name}`)

					const files = res && res.data && res.data.files

					const weaponName = "Spell"

					if (files && files.length) {
						const weapon: Partial<Weapon> = { type: weaponName }
						files.map((file) => {
							if (file.name === `${weaponName}_b_001.png`) {
								weapon.static = file.id || ""
							} else if (file.name === `${weaponName}.gif`) {
								weapon.active = file.id || ""
							}
						})
						if (!weapon.static && !weapon.active)
							console.log(`bad formatted weapon data for ${passedFile.name}`)
						resolve([weapon as Weapon])
					} else {
						console.log(`No files found for: ${passedFile.name}`)
						reject(`No files found for: ${passedFile.name}`)
					}
				}
			)
		)
	}).catch((error) => {
		console.log(error)
		return [] as Array<Weapon>
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
					// q: `mimeType = 'application/vnd.google-apps.folder' and name = '[T3][CAV][Master Knight][F]{St jack}' and '1JSmqv89W0tvlRUHNaaqJep3GZm1oxj9q' in parents`,
					q: `mimeType = 'application/vnd.google-apps.folder' and '${passedFile.id}' in parents`,
					fields: "files(id, name, webViewLink)",
					pageSize: 1000,
					// supportsAllDrives: true,
					// includeItemsFromAllDrives: true
				},
				(err, res) => {
					if (err) reject(`${err} in ${passedFile.name}`)

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
									return searchSkills(drive, file).then((weapons) => {
										const anim = makeSkillAnim(file)
										if (weapons) {
											anim.weapons = weapons
										}
										return anim
									})
								}
								return searchWeapons(drive, file).then((weapons) => {
									const anim = makeAnim(file)
									if (weapons) {
										anim.weapons = weapons
									}
									return anim
								})
							})
						)
							.then((anims) => resolve(anims))
							.catch((error) => console.log(error))
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
			q: "'1UOuAig00S1s280J6A8bkVDIFX8RIcIWx' in parents",
			supportsAllDrives: true,
			includeItemsFromAllDrives: true,
		},
		(err, res) => {
			if (err) throw err
			const files = res && res.data && res.data.files
			// toggle to verify that all folders are getting brought in correctly
			// console.log(files)
			if (files && files.length) {
				Promise.all(files.map((file) => searchAnims(drive, file)))
					.then((animsArrays: Array<Anims> | any): void | PromiseLike<void> => {
						const animations = [].concat(...animsArrays)
						console.log("Drive data all collected")
						// console.log(animations)
						assetsToDB(animations, "animations")
					})
					.catch(() => console.log("searchBattleAnimations failed"))
				// assetsToDB({files})
				// Preserved for testing individual methods
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
			auth,
		})
		console.log("Searching Google Drive...")
		searchBattleAnimations(drive)
	}
}
