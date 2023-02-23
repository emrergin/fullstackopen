const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      default: false,
      validate: {

        isFuture(value) {
          if (value>new Date().getFullYear()) {
            throw new Error('You are not a time traveller!');
          }
        },

        isAncient(value) {
          if (value<1991) {
            throw new Error('How did you even have a computer back then!');
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}