import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import Listing from "./listing";
import User from "./user";
import getDB from "../database/database";

export default class GiftedListing extends Model<
  InferAttributes<GiftedListing>,
  InferCreationAttributes<GiftedListing>
> {
  declare id: CreationOptional<number>;

  declare listingId: number;
  declare userId: number;

  declare isGifted: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getListing: BelongsToGetAssociationMixin<Listing>;
  declare setListing: BelongsToSetAssociationMixin<Listing, number>;

  declare readonly listing?: NonAttribute<Listing>;

  declare static associations: {
    listing: Association<GiftedListing, Listing>;
  };
}

export function init(db?: Sequelize) {
  GiftedListing.init(
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
          model: Listing,
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

      isGifted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );

  GiftedListing.belongsTo(Listing, {
    as: "listing",
    foreignKey: "listingId",
    onDelete: "CASCADE",
  });
  GiftedListing.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
