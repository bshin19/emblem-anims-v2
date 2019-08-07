import { BuildOptions, Model, Sequelize, DataTypes, HasManyCreateAssociationMixin, HasManyCountAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyGetAssociationsMixin } from "sequelize";

export class Weapon extends Model {
	public still!: string;
	public gif!: string;

	// timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getAnim!: HasManyGetAssociationsMixin<Weapon>
	public setAnim!: HasManySetAssociationsMixin<Weapon, number>
	public addAnims!: HasManyAddAssociationsMixin<Weapon, number>
	public addAnim!: HasManyAddAssociationMixin<Weapon, number>
	public countAnim!: HasManyCountAssociationsMixin
	public createAnim!: HasManyCreateAssociationMixin<Weapon>
}

interface WeaponProps extends Model {
	readonly still: string,
	readonly gif: string
}

type WeaponModel = typeof Model & {
	new (values?: object, options?: BuildOptions): WeaponProps
}

export const WeaponFactory = (sequelInstance: Sequelize): WeaponModel => {
	const newWeapon = sequelInstance.define("Weapon", {
		still: { type: DataTypes.STRING, unique: true },
		gif: DataTypes.STRING
	}) as WeaponModel;

	return newWeapon;
};
