import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class MedicalHistory extends Model {
  static association(models) {
    MedicalHistory.belongsTo(models.Pet, {
      foreignKey: "petId"
    }),
      MedicalHistory.belongsTo(models.Veterinarian, {
        foreignKey: "veterinarianId"
      })
  }
}

MedicalHistory.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  treatment: {
    type: DataTypes.STRING
  },
  observations: {
    type: DataTypes.STRING
  }
},
  {
    sequelize,
    modelName: "MedicalHistory",
    tableName: "medical_histories",
    underscored: true,
    timestamps: true,
    paranoid: true
  }
)

export default MedicalHistory;
