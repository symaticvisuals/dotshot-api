module.exports = (sequelize, DataTypes) => {
    const Cartitem = sequelize.define('cartItems', {
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
    }, {
        paranoid: true,
        timestamps: true
    }
    );

    Cartitem.associate = (models) => {
        Cartitem.belongsTo(models.carts, {
            foreignKey: 'cartId',
            as: 'cart',
        });
        Cartitem.belongsTo(models.items, {
            foreignKey: 'itemId',
            as: 'item',
        });
        Cartitem.belongsTo(models.orders, {
            foreignKey: 'orderId',
            as: 'order',
        });

    }


    return Cartitem;
};
