module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('carts', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
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


    Cart.associate = (models) => {
        Cart.belongsTo(models.users, {
            foreignKey: 'userId',
            as: 'user',
        });
        Cart.hasMany(models.cartItems, {
            foreignKey: 'cartId',
            as: 'cartItems',
        });
    }

    return Cart;
};
