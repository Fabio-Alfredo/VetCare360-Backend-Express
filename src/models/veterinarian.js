import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class Veterinarian extends Model {
  static association(models) {
    Veterinarian.hasMany(models.Appointment, {
      foreignKey: "veterinarianId"
    })
    Veterinarian.hasMany(models.Vaccine, {
      foreignKey: "veterinariandId"
    }),
      Veterinarian.hasMany(models.MedicalHistory, {
        foreignKey: "veterinarianId"
      }),
      Veterinarian.belongsTo(models.User, {
        foreignKey: "userId"
      })

  }
}

Veterinarian.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  specialty: {
    type: DataTypes.STRING,
    defaultValue: "General",
    allowNull: false
  },
  tuition_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available_schedule: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isValidScheduleArray(value) {
        const regex = /^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)\s([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!Array.isArray(value)) {
          throw new Error("Debe ser un arreglo");
        }
        for (const schedule of value) {
          if (!regex.test(schedule)) {
            throw new Error(`Horario inválido: ${schedule}`);
          }
        }
      }
    }
  }
},
  {
    sequelize,
    modelName: "Veterinarian",
    tableName: "veterinarians",
    underscored: true,
    timestamps: true,
    paranoid: true
  }
)

export default Veterinarian;
