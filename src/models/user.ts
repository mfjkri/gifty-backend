import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import getDB from "../database/database";
import { hashPassword } from "../utilities/auth";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;

  declare birthday: Date;
  declare avatarURL: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init() {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      avatarURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: getDB() }
  );

  User.beforeCreate(async (user, options) => {
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  });

  User.beforeUpdate(async (user, options) => {
    user.updatedAt = new Date();

    if (options?.fields?.includes("password")) {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    }
  });
}
