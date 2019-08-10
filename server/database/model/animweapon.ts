import sequelize, { DataTypes } from "sequelize";

export class AnimWeapon extends sequelize.Model {
	public name!: string;
	public weapon!: string;

	// timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

interface AnimWeaponProps extends sequelize.Model {
	readonly name: string,
	readonly weapon: string
}

// Need to declare the static model so `findOne` etc. use correct types
type AnimWeaponModel = typeof sequelize.Model & {
	new (values?: object, options?: sequelize.BuildOptions): AnimWeaponProps
}

export const AnimWeaponFactory = (sequelInstance: sequelize.Sequelize): AnimWeaponModel => {
	const newAnimWeapon = sequelInstance.define("AnimWepIm", {
		name: DataTypes.STRING,
		weapon: DataTypes.STRING
	}) as AnimWeaponModel;

	return newAnimWeapon;
};
