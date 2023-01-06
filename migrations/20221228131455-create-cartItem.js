'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cartItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      cartId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sellerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: 'pending',
        values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cartItems');
  }
};