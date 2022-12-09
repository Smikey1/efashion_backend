const Category = require('../models/Category');
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


describe('Category Schema test anything', () => {
    // for category insert testing
    it('For category insert testing', () => {
        const category = {
            'categoryName': 'Fashion',
            'categoryImageUrl': 'Fashion',

        };
        return Category.create(category)
            .then((category) => {
                expect(category.categoryName).toEqual('Fashion');
            });
    });

    //for category update testing
    it('for category update testing', async () => {
        return Category.findOneAndUpdate({ _id: Object('6150082bdc29f83bd08c8e8a') },
            { $set: { categoryName: 'Clothes' } })
            .then((category) => {
                expect(category.categoryName).toEqual('Anything')
            })

    });

    // for category delete testing
    it('for category delete testing', async () => {
        const status = await Category.deleteOne({ _id: Object('6150082bdc29f83bd08c8e88') });
        expect(status.ok).toBe(1);
    })

})