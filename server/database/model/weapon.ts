import { Anim } from "./anim";
import { BuildOptions, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Model, Sequelize } from "sequelize";

export class Weapon extends Model {
	public still!: string;
	public gif!: string;

	// timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getAnim!: HasManyGetAssociationsMixin<Anim>
	public setAnim!: HasManySetAssociationsMixin<Anim, number>
	public addAnims!: HasManyAddAssociationsMixin<Anim, number>
	public addAnim!: HasManyAddAssociationMixin<Anim, number>
	public countAnim!: HasManyCountAssociationsMixin
	public createAnim!: HasManyCreateAssociationMixin<Anim>
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
