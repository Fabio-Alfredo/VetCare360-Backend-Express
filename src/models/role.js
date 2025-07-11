import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class Role extends Model {
  static association(models) {
    Role.belongsToMany(models.User, {
      through: "user_roles"
    })
  }
}

Role.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$", 'i']
    }
  }
},
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    underscored: true,
    timestamps: true,
    paranoid: true
  }
)

export default Role;
