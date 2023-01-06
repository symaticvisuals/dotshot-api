module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['USER']
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
  }, {
    paranoid: true,
    timestamps: true
  }
  );

  User.associate = (models) => {
    User.hasMany(models.addresses, {
      foreignKey: 'userId',
      as: 'addresses',
    });
    User.hasMany(models.orders, {
      foreignKey: 'userId',
      as: 'orders',
    });
    User.hasMany(models.carts, {
      foreignKey: 'userId',
      as: 'carts',
    });
    User.hasMany(models.items, {
      foreignKey: 'sellerId',
      as: 'items',
    });
  }

  return User;
};
