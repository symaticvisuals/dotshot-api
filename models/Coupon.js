module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define('coupons', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        minPurchase: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        validFrom: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        validTo: {
            type: DataTypes.DATE,
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

    Coupon.associate = (models) => {
        Coupon.hasMany(models.redeemedCoupons, {
            foreignKey: 'couponId',
            as: 'redeemedCoupons',
        });
    }
    return Coupon;
};
