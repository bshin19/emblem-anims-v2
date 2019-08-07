import sequelize, { DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import { Weapon } from "./weapon";

export class Anim extends sequelize.Model {
	public tier!: string;
	public category!: string;
	public feClass!: string;
	public gender!: string;
	public name!: string;
	public URL!: string;
	public dlName!: string;
	public credit!: string;

	// timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getWeapons!: HasManyGetAssociationsMixin<Weapon>
	public setWeapons!: HasManySetAssociationsMixin<Weapon, number>
	public addWeapons!: HasManyAddAssociationsMixin<Weapon, number>
	public addWeapon!: HasManyAddAssociationMixin<Weapon, number>
	public countWeapons!: HasManyCountAssociationsMixin
	public createWeapons!: HasManyCreateAssociationMixin<Weapon>
}

Anim.belongsToMany(Weapon, {
	through: "AnimWepIm"
	// foreignKey: 'animId'
});

interface AnimProps extends sequelize.Model {
	readonly tier: string,
	readonly category: string,
	readonly feClass: string,
	readonly gender: string,
	readonly name: string,
	readonly URL: string,
	readonly dlName: string,
	readonly credit: string
}

// Need to declare the static model so `findOne` etc. use correct types
type AnimModel = typeof sequelize.Model & {
	new (values?: object, options?: sequelize.BuildOptions): AnimProps
}

export const AnimFactory = (sequelInstance: sequelize.Sequelize): AnimModel => {
	const newAnim = sequelInstance.define("Anim", {
		tier: DataTypes.STRING,
		category: DataTypes.STRING,
		feClass: DataTypes.STRING,
		gender: DataTypes.STRING,
		name: DataTypes.STRING,
		URL: { type: DataTypes.STRING, unique: true },
		dlName: DataTypes.STRING,
		credit: DataTypes.STRING
	}) as AnimModel;

	return newAnim;
};
