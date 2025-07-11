import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class User extends Model {
  static association(models) {
    User.hasMany(models.Pet,
      {
        foreignKey: 'userId'
      }
    ),
      User.hasOne(models.Veterinarian, {
        foreignKey: "userId"
      })
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100], // Minimum length of 6 characters
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]+$/, // Only digits allowed
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    underscored: true,
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    paranoid: true, // Enables soft deletes
  }
);

export default User;
