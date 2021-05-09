import { drive_v3 as driveV3 } from "googleapis"
import { formatCredits } from "./drive-util"

export interface Weapon {
	type: string
	static: string
	active: string
}

/**
 * an "Anim" or single animated unit with an array of possible weapons
 */
export interface Anim {
	tier: string
	category: string
	feClass: string
	name: string
	gender: string
	credit: Array<string>
	download: string
	dlName: string
	weapons: Array<Weapon>
}

export type Anims = Array<Anim>

/**
 * A Skill Animation with a single entry in the weapons array
 */
export interface SkillAnim {
	category: string
	name: string
	credit: Array<string>
	download: string
	dlName: string
	weapons: Array<Weapon>
}

export type SkillAnims = Array<SkillAnim>

/**
 * A Spell Animation with a single entry in the "weapons" array
 * Only Anima "school" spells typically fulfill the optional "element" param
 */
export interface SpellAnim {
	category: string
	school: string
	element: string
	name: string
	credit: Array<string>
	download: string
	dlName: string
	weapons: Array<Weapon>
}

export type SpellAnims = Array<SpellAnim>

/**
 * Generates an object with all the Anim data other than the weapons array
 */
export const makeAnim = (file: driveV3.Schema$File): Partial<Anim> => {
	const values = file && file.name && file.name.match(/[^[[{(\]})]+/g)

	let tier = ""
	let category = ""
	let feClass = ""
	let name = ""
	let gender = ""
	let credit: Array<string> = []
	const download = file.webViewLink || ""
	const dlName = file.name || ""

	if (values && values.length === 6) {
		tier = values[0]
		category = values[1]
		feClass = values[2]
		name = values[3]
		gender = values[4]
		credit = formatCredits(values[5])
	}

	if (values && values.length === 5) {
		tier = values[0]
		category = values[1]
		feClass = values[2]
		gender = values[3]
		credit = formatCredits(values[4])
	}

	return {
		tier,
		category,
		feClass,
		name,
		gender,
		credit,
		download,
		dlName,
	}
}

/**
 * Generates an object with all the SkillAnim data other than the weapons array
 */
export const makeSkillAnim = (
	file: driveV3.Schema$File
): Partial<SkillAnim> => {
	const values = file && file.name && file.name.match(/[^[[{(\]})]+/g)

	const category = "SKL"
	const name = values ? values[0] : ""
	const credit = values ? formatCredits(values[1]) : []
	const download = file.webViewLink || ""
	const dlName = file.name || ""

	return { category, name, credit, download, dlName }
}

/**
 * Generates an object with all the SpellAnim data other than the weapons array
 */
export const makeSpellAnim = (
	file: driveV3.Schema$File
): Partial<SpellAnim> => {
	const values = file.name && file.name.match(/[^[[{(\]})]+/g)

	const category = "SPL"
	let school = ""
	let element = ""
	let name = ""
	let credit: Array<string> = []
	const download = file.webViewLink || ""
	const dlName = file.name || ""

	if (values && values.length === 3) {
		school = values[0]
		name = values[1]
		credit = formatCredits(values[2])
	}

	if (values && values.length === 4) {
		school = values[0]
		element = values[1]
		name = values[2]
		credit = formatCredits(values[3])
	}

	return {
		category,
		school,
		element,
		name,
		credit,
		download,
		dlName,
	}
}
