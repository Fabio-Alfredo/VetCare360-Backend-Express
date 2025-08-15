import { DataTypes, Model } from "sequelize";
import sequelize from "../configurations/db.configuration/sequelize.config.js";

class Invoice extends Model { }

Invoice.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  total_mount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  detail: {
    type: DataTypes.STRING
  }
},
  {
    sequelize,
    modelName: "Invoice",
    tableName: "invoices",
    timestamps: true,
    paranoid: true
  }
)

export default Invoice;
