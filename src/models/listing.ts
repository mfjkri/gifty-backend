import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import getDB from "../database/database";

export default class Listing extends Model<
  InferAttributes<Listing>,
  InferCreationAttributes<Listing>
> {
  declare id: CreationOptional<number>;

  declare title: string;
  declare description: string;
  declare source: string;
  declare categories: Array<string>;

  declare price: number;
  declare platform: string;
  declare purchaseUrl: string;
  declare isAvailable: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init(db?: Sequelize) {
  Listing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purchaseUrl: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );
}
