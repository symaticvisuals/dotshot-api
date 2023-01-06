const Constants = require('../classes/Order/Constants');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        addressId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        couponId: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        cartId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },

        deliveryCharge: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        tax: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        orderStatus: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'pending',
            values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'partially delivered', 'partially cancelled', 'partially shipped', 'partially processed', 'partially pending']
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
    }, {
        paranoid: true,
        timestamps: true
    }
    );
    Order.associate = (models) => {
        Order.belongsTo(models.addresses, {
            foreignKey: 'addressId',
            as: 'address',
        });
        Order.belongsTo(models.users, {
            foreignKey: 'userId',
            as: 'user',
        });
        Order.belongsTo(models.coupons, {
            foreignKey: 'couponId',
            as: 'coupon',
        });
        Order.belongsTo(models.carts, {
            foreignKey: 'cartId',
            as: 'cart',
        });
        Order.hasMany(models.cartItems, {
            foreignKey: 'orderId',
            as: 'cartItems',
        });

    }
    return Order;
};
