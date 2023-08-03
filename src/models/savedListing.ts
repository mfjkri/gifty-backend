import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import Listing from "./listing";
import User from "./user";
import getDB from "../database/database";

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

  public getListing!: BelongsToGetAssociationMixin<Listing>;
  public setListing!: BelongsToSetAssociationMixin<Listing, number>;

  public readonly listing?: Listing;

  public static associations: {
    avatar: Association<SavedListing, Listing>;
  };
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

  SavedListing.belongsTo(Listing, { as: "listing", foreignKey: "listingId" });
}
