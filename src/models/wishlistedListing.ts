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
import Person from "./person";

export default class WishlistedListing extends Model<
  InferAttributes<WishlistedListing>,
  InferCreationAttributes<WishlistedListing>
> {
  declare id: CreationOptional<number>;

  declare listingId: number;
  declare personId: number;
  declare userId: number;

  declare isWishlisted: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getListing: BelongsToGetAssociationMixin<Listing>;
  declare setListing: BelongsToSetAssociationMixin<Listing, number>;

  declare readonly listing?: NonAttribute<Listing>;
  declare readonly person?: NonAttribute<User>;

  declare static associations: {
    listing: Association<WishlistedListing, Listing>;
    person: Association<WishlistedListing, Person>;
  };
}

export function init(db?: Sequelize) {
  WishlistedListing.init(
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
      personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Person,
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

      isWishlisted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize: db || getDB() }
  );

  WishlistedListing.belongsTo(Listing, {
    as: "listing",
    foreignKey: "listingId",
    onDelete: "CASCADE",
  });
  WishlistedListing.belongsTo(Person, {
    as: "person",
    foreignKey: "personId",
    onDelete: "CASCADE",
  });
  WishlistedListing.belongsTo(Listing, {
    as: "user",
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
