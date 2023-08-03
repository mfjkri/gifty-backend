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

import getDB from "../database/database";
import { hashPassword } from "../utilities/auth";
import Avatar from "./avatar";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;

  declare birthday: Date;
  declare avatarId: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public getAvatar!: BelongsToGetAssociationMixin<Avatar>;
  public setAvatar!: BelongsToSetAssociationMixin<Avatar, number>;

  public readonly avatar?: Avatar;

  public static associations: {
    avatar: Association<User, Avatar>;
  };
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
      avatarId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Avatar,
          key: "id",
        },
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
    const avatar = await Avatar.create({
      bgColor: "blue",
      faceColor: "beige",
      hairStyle: "normal",
      hairColor: "black",
      hatStyle: "none",
      hatColor: "black",
      shirtStyle: "short",
      shirtColor: "red",
      earSize: "small",
      eyeStyle: "circle",
      glassesStyle: "none",
      noseStyle: "long",
      mouthStyle: "smile",
      sex: "male",
    });
    user.avatarId = avatar.id;
    user.password = hashedPassword;
  });

  User.beforeUpdate(async (user, options) => {
    user.updatedAt = new Date();

    if (options?.fields?.includes("password")) {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    }
  });

  User.belongsTo(Avatar, { as: "avatar", foreignKey: "avatarId" });
}
