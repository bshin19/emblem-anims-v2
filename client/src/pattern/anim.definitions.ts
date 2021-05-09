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
