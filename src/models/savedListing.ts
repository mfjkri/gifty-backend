import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import getDB from "../database/database";
import User from "./user";

export default class SavedListing extends Model<
  InferAttributes<SavedListing>,
  InferCreationAttributes<SavedListing>
> {
  declare id: CreationOptional<number>;

  declare listingId: number;
  declare userId: number;

  declare isSaved: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init() {
  SavedListing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      listingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: SavedListing,
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },

      isSaved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: getDB() }
  );

  SavedListing.beforeCreate(async (listing) => {
    listing.createdAt = new Date();
    listing.updatedAt = new Date();
  });
}
