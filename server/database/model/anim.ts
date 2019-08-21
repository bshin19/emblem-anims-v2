import { BuildOptions, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Model, Sequelize } from "sequelize";
import { Weapon } from "./weapon";

export class Anim extends Model {
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

interface AnimProps extends Model {
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
type AnimModel = typeof Model & {
	new (values?: object, options?: BuildOptions): AnimProps
}

export const AnimFactory = (sequelInstance: Sequelize): AnimModel => {
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
