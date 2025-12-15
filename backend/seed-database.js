const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});

        // Seed products
        const products = [
            { id: '1', name: 'Fresh Bananas', price: 40, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=250&h=180&fit=crop', category: 'Fruits' },
            { id: '2', name: 'Fresh Milk', price: 65, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=250&h=180&fit=crop', category: 'Dairy' },
            { id: '3', name: 'Tomatoes', price: 30, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=250&h=180&fit=crop', category: 'Vegetables' },
            { id: '4', name: 'Potatoes', price: 25, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=250&h=180&fit=crop', category: 'Vegetables' },
            { id: '5', name: 'Onions', price: 35, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=250&h=180&fit=crop', category: 'Vegetables' },
            { id: '6', name: 'Carrots', price: 45, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=250&h=180&fit=crop', category: 'Vegetables' },
            { id: '7', name: 'Apples', price: 120, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=250&h=180&fit=crop', category: 'Fruits' },
            { id: '8', name: 'Oranges', price: 80, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=250&h=180&fit=crop', category: 'Fruits' }
        ];

        await Product.insertMany(products);
        console.log('✓ Products seeded');

        // Seed test user
        const testUser = new User({
            email: 'test@freshmart.com',
            password: 'test123',
            name: 'Test User'
        });
        await testUser.save();
        console.log('✓ Test user created');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();