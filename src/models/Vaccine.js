import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class Vaccine extends Model {
  static association(models) {
    Vaccine.belongsTo(models.Pet, {
      foreignKey: "petId"
    })
  }
}

Vaccine.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  application_date: {
    type: DataTypes.DATEONLY,
    defaultValue: new Date().toISOString().split('T')[0],
    allowNull: false
  },
  next_date: {
    type: DataTypes.DATEONLY,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString().split('T')[0]
    },
    allowNull: false
  },
  observations: {
    type: DataTypes.STRING,
  }
},
  {
    sequelize,
    modelName: "Vaccine",
    tableName: "vaccines",
    underscored: true,
    timestamps: true,
    paranoid: true
  }
)

export default Vaccine
