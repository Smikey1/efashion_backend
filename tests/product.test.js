const Product = require('../models/Product');
const mongoose = require('mongoose');

// Establish a connection before test start
beforeAll(async () => {
    await mongoose.connect("mongodb+srv://efashion_user:efashion_user@sandbox.eewjy.mongodb.net/testing", {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

// Close connection after test end
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Schema test for Product', () => {

    // Test for insert product
    it('Test for insert product', () => {
        const product = {
            'productName': 'Mask',
            'productPrice': '400'
        };
        return Product.create(product)
            .then((product) => {
                expect(product.productName).toEqual('Mask');
            });
    });

    // Test for update product
    it('Test for update product', async () => {
        return Product.findOneAndUpdate({ _id: Object('614fffd9cf75cf4068512b10') },
            { $set: { productName: 'Skirt' } })
            .then((product) => {
                expect(product.productName).toEqual('Cap') 
            })
    });

    // Test for delete product
    it('Test for delete product', async () => {
        const status = await Product.deleteOne({ _id: Object('614fffd8cf75cf4068512b0e') });
        expect(status.ok).toBe(1);
    });

})