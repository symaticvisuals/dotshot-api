'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sellerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isOutOfStock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isLowStock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isSoldOut: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    await queryInterface.dropTable('items');
  }
};