module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('categories', {
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

    Category.associate = (models) => {
        Category.hasMany(models.items, {
            foreignKey: 'categoryId',
            as: 'items',
        });
    }

    return Category;
};
