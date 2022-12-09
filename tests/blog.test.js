const Blog = require('../models/Blog');
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


describe('Blog Schema test anything', () => {
    // for blog insert testing
    it('For blog insert testing', () => {
        const blog = {
            'blogName': 'myBlog',
            'blogImageUrl': 'myBlog',
        };
        return Blog.create(blog)
            .then((blog) => {
                expect(blog.blogName).toEqual('myBlog');
            });
    });

    //for blog update testing
    it('for blog update testing', async () => {
        return Blog.findOneAndUpdate({ _id: Object('61500b6c78d09631d4ed7b3c') },
            { $set: { blogName: 'Dress' } })
            .then((blog) => {
                expect(blog.blogName).toEqual('blog2')
            })

    });

    // for blog delete testing
    it('for blog delete testing', async () => {
        const status = await Blog.deleteOne({ _id: Object('61500b6c78d09631d4ed7b3e') });
        expect(status.ok).toBe(1);
    })

})