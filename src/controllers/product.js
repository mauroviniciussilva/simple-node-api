const express = require('express');
const { Product } = require('../models')

const router = express.Router();

router.get('/', async (req, res) => {
    const { accountId } = req;
    const products = await Product.findAll({ where: { accountId } });
    return res.jsonOK(products);
});

router.get('/:id', async (req, res) => {
    const { accountId } = req;
    const { id } = req.params;
    const product = await Product.findOne({ where : { id, accountId }});
    if (!product) return res.jsonNotFound();
    return res.jsonOK(product);
})

router.post('/', async (req, res) => {
    const { accountId } = req;
    const { name, purchasePrice, salePrice, quantity } = req.body;

    const product = await Product.create({ name, purchasePrice, salePrice, quantity, accountId });
    return res.jsonOK(product);
});

router.put('/:id', async (req, res) => {
    const { accountId, body } = req;
    const { id } = req.params;
    const fields = ['name', 'purchasePrice', 'salePrice'];
    const product = await Product.findOne({ where : { id, accountId }});
    if (!product) return res.jsonNotFound();

    fields.map(fieldName => {
        const newValue = body[fieldName];
        if (newValue !== undefined) product[fieldName] = newValue
    });

    await product.save();

    return res.jsonOK(product);
});

router.delete('/:id', async (req, res) => {
    const { accountId } = req;
    const { id } = req.params;
    const product = await Product.findOne({ where : { id, accountId }});
    if (!product) return res.jsonNotFound();
    await product.destroy();
    return res.jsonOK();
});

module.exports = router;