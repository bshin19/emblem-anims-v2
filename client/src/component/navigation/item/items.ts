import PropTypes from "prop-types";

export interface NavigationItemProps {
	classArray: Array<string>,
	gif: string,
	htmlRef: string,
	text: string,
	dropdownDirection?: string | undefined
}

export interface NavigationItemType {
	item: NavigationItemProps,
	key?: string
}

export const NavigationItemPropTypes = {
	classArray: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	gif: PropTypes.string.isRequired,
	htmlRef: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	dropdownDirection: PropTypes.string
};

export const NavigationItemsPropTypes = {
	item: PropTypes.shape(NavigationItemPropTypes).isRequired,
	key: PropTypes.string
};

export const navigationItems: Array<NavigationItemProps> = [
	{
		"text": "Swords",
		"gif": "_img/navigation-icon/myrmidon.gif",
		"htmlRef": "SWD",
		"classArray": [
			"Squire", "Mercenary", "Hero", "Myrmidon", "Swordmaster",
			"Thief", "Assassin", "Rogue", "Custom Sword"
		]
	},
	{
		"text": "Lances",
		"gif": "_img/navigation-icon/soldier.gif",
		"htmlRef": "LNC",
		"classArray": [
			"Recruit", "Soldier", "Halberdier"
		]
	},
	{
		"text": "Axes",
		"gif": "_img/navigation-icon/fighter.gif",
		"htmlRef": "AXE",
		"classArray": [
			"Journeyman", "Brigand", "Pirate",
			"Berserker", "Fighter", "Warrior", "Custom Axe"
		]
	},
	{
		"text": "Bows",
		"gif": "_img/navigation-icon/archer.gif",
		"htmlRef": "BOW",
		"classArray": [
			"Archer", "Sniper", "Ballista", "Nomad", "Ranger"
		]
	},
	{
		"text": "Armor",
		"gif": "_img/navigation-icon/knight.gif",
		"htmlRef": "ARM",
		"classArray": [
			"Knight", "General", "Marshall"
		]
	},
	{
		"text": "Cavalry",
		"gif": "_img/navigation-icon/cavalier.gif",
		"htmlRef": "CAV",
		"classArray": [
			"Cavalier", "Paladin", "Great Knight",
			"Master Knight", "Custom Cavalry"
		]
	},
	{
		"text": "Fliers",
		"gif": "_img/navigation-icon/pegasus_knight.gif",
		"htmlRef": "FLY",
		"classArray": [
			"Pegasus Knight", "Falcoknight", "Griffon Knight",
			"Wyvern Rider", "Wyvern Lord", "Wyvern Knight"
		]
	},
	{
		"text": "Unique",
		"gif": "_img/navigation-icon/lord.gif",
		"htmlRef": "LRD",
		"classArray": [
			"Lord", "Great Lord", "Refresh", "Miscellaneous", "Crossover"
		],
		"dropdownDirection": "right"
	},
	{
		"text": "Magi",
		"gif": "_img/navigation-icon/mage.gif",
		"htmlRef": "MAG",
		"classArray": [
			"Pupil", "Mage", "Sage", "Archsage",
			"Clergy", "Monk", "Bishop", "Saint",
			"Shaman", "Druid", "Summoner", "Necromancer",
			"Troubadour", "Mage Knight", "Valkyrie",
			"Dark Knight", "Custom Magi"
		],
		"dropdownDirection": "right"
	},
	{
		"text": "Monsters",
		"gif": "_img/navigation-icon/revenant.gif",
		"htmlRef": "MON",
		"classArray": [
			"Undead", "Demon", "Mauthe Doog",
			"Manakete", "Dragon", "Shapeshifter", "Custom Monster"
		],
		"dropdownDirection": "right"
	},
	{
		"text": "Spells",
		"gif": "_img/navigation-icon/tome.gif",
		"htmlRef": "SPL",
		"classArray": [
			"Anima", "Dark", "Light", "Other"
		],
		"dropdownDirection": "right"
	}
];
