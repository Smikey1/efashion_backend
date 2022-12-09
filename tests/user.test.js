const User = require('../models/User');
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

describe('Schema test for User', () => {

    // Test for register user
    it('Test for register user', () => {
        const user = {
            'fullname': 'Hero',
            'email': 'hero@gmail.com',
            'phone': '984153'
        };
        return User.create(user)
            .then((user) => {
                expect(user.fullname).toEqual('Hero');
            });
    });

    // Test for update user
    it('Test for update user', async () => {
        return User.findOneAndUpdate({ _id: Object('61500416829c2035a8b41670') },
            { $set: { fullname: 'Niman Sir' } })
            .then((user) => {
                expect(user.fullname).toEqual('Name')
            })
    });

    // Test for delete user
    it('Test for delete user', async () => {
        const status = await User.deleteOne({ _id: Object('61500416829c2035a8b41674') });
        expect(status.ok).toBe(1);
    });

})