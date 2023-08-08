import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";
import User from "./user";

export default class Person extends Model<
  InferAttributes<Person>,
  InferCreationAttributes<Person>
> {
  declare id: CreationOptional<number>;
  declare userId: number;

  declare name: string;

  declare createdAt: Date;
  declare updatedAt: Date;
}

export function init(db?: Sequelize) {
  Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
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
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
