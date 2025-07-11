import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class Appointment extends Model {
  static association(models) {
    Appointment.belongsTo(models.Pet, {
      foreignKey: "petId"
    })
  }
}

Appointment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString().split('T')[0]
    }
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Pendiente", "Confimada", "Completa", "Cancelada"]]
    }
  },
  notes: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: "Appointment",
  tableName: "appointments",
  underscored: true,
  timestamps: true,
  paranoid: true
}
)

export default Appointment;
