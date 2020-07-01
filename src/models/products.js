const { link } = require("@hapi/joi");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        purchasePrice : {
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        salePrice: {
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull:false,
            default: 0
        }
    });
    
    Product.associate = models => Product.belongsTo(models.Account, { foreignKey: 'accountId' })

    Product.prototype.toJSON = function() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }

    return Product;
};