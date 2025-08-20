import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";
import bcrypt from "bcryptjs";

class User extends Model {
    static association(models) {
    User.hasMany(models.Pet,
      {
        foreignKey: 'userId'
      }
    ),
    User.hasOne(models.Veterinarian, {
      foreignKey: "userId"
    }),
    User.belongsToMany(models.Role, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId"
    })
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
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
        is: {
          args: /^[0-9]{8}$/,
          msg: "El número de teléfono debe contener exactamente 8 dígitos",
        }
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
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, parseInt(10));
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, parseInt(10));
        }
      }
    }
  }
);

export default User;
