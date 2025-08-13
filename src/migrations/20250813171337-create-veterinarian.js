'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createDatabase('veterinarians', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      specialty: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "General"
      },
      tuition_number:{
        type: Sequelize.STRING,
        allowNull: false
      },
      available_schedule:{
        type: Sequelize.JSONB,
        allowNull: false,
      },
      userId:{
        type:Sequelize.UUID,
        allowNull: false,
        references:{
          model:'users',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
