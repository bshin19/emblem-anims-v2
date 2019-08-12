"use strict";

import { DataTypes, Sequelize } from "sequelize";
import { Anim } from "./anim";
import { AnimWeapon } from "./animweapon";
import { Weapon } from "./weapon";
import config from "../../../config.json";
import fs from "fs";
import path from "path";

let sequelize: Sequelize;
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const db: Record<string, any> = {};

// @ts-ignore
const newConfig = config[env];

if (newConfig.use_env_variable) {
	sequelize = new Sequelize(process.env[newConfig.use_env_variable] || "");
} else {
	sequelize = new Sequelize(newConfig.database, newConfig.username, newConfig.password, newConfig);
}

fs
	.readdirSync(__dirname)
	.filter(((file): boolean => {
		return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".ts");
	}))
	.forEach(((file): void => {
		const model = sequelize["import"](path.join(__dirname, file));
		db[model.name] = model;
	}));

Object.keys(db).forEach((modelName): void => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Anim.init({
	tier: DataTypes.STRING,
	category: DataTypes.STRING,
	feClass: DataTypes.STRING,
	gender: DataTypes.STRING,
	name: DataTypes.STRING,
	URL: { type: DataTypes.STRING, unique: true },
	dlName: DataTypes.STRING,
	credit: DataTypes.STRING
}, {
	sequelize: db.sequelize,
	tableName: "anims"
});

Weapon.init({
	still: { type: DataTypes.STRING, unique: true },
	gif: DataTypes.STRING
}, {
	sequelize: db.sequelize,
	tableName: "weapons"
});

AnimWeapon.init({
	name: DataTypes.STRING,
	weapon: DataTypes.STRING
}, {
	sequelize: db.sequelize,
	tableName: "animwepims"
});

Anim.belongsToMany(Weapon, {
	through: "AnimWepIm"
	// foreignKey: 'animId'
});
export default db;
