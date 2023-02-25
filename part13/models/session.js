const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ActiveSessions extends Model {}

ActiveSessions.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "active_sessions",
  }
);

module.exports = ActiveSessions;
