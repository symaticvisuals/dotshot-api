module.exports = (sequelize, DataTypes) => {
    const RedeemedCoupon = sequelize.define('redeemedCoupons', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        redeemedCouponId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
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

    RedeemedCoupon.associate = (models) => {
        RedeemedCoupon.belongsTo(models.coupons, {
            foreignKey: 'redeemedCouponId',
            as: 'coupon',
        });
        RedeemedCoupon.belongsTo(models.users, {
            foreignKey: 'userId',
            as: 'user',
        });
        RedeemedCoupon.belongsTo(models.orders, {
            foreignKey: 'orderId',
            as: 'order',
        });
    }
    return RedeemedCoupon;
};
