const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      default: false,
    });
    await queryInterface.createTable("active_sessions", {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCreate: function (session, options, fn) {
          session.createdAt = new Date();
          session.updatedAt = new Date();
          fn(null, session);
        },
        beforeUpdate: function (session, options, fn) {
          session.updatedAt = new Date();
          fn(null, session);
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled");
    await queryInterface.dropTable("active_sessions");
  },
};
