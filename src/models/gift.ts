import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import getDB from "../database/database";
import Person from "./person";
import User from "./user";
import Listing from "./listing";

export default class Gift extends Model<
  InferAttributes<Gift>,
  InferCreationAttributes<Gift>
> {
  declare id: CreationOptional<number>;

  declare listingId: number;
  declare userId: number;
  declare personId: number;

  declare isGifted: CreationOptional<boolean>;
  declare isInWishlist: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function init() {
  Gift.init(
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
      personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Person,
          key: "id",
        },
      },

      isGifted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isInWishlist: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: getDB() }
  );

  Gift.beforeCreate(async (gift) => {
    gift.createdAt = new Date();
    gift.updatedAt = new Date();
    gift.isGifted = false;
    gift.isInWishlist = false;
  });

  Gift.beforeUpdate(async (gift) => {
    gift.updatedAt = new Date();
  });
}
