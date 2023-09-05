import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import User from "./user";

export default class Person extends Model<
  InferAttributes<Person>,
  InferCreationAttributes<Person>
> {
  declare id: CreationOptional<number>;
  declare ownerId: number;

  declare userId: CreationOptional<number>;
  declare readonly user?: NonAttribute<User>;
  declare selfOwned: boolean;

  declare name: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init(db?: Sequelize) {
  Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: User,
          key: "id",
        },
      },
      selfOwned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );

  Person.belongsTo(User, {
    as: "owner",
    foreignKey: "ownerId",
    onDelete: "CASCADE",
  });
  Person.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
