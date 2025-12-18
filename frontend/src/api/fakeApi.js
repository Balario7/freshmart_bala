const BASE_URL = "https://freshmart-bala.onrender.com";

// API for login authentication
export const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    // If it's a network error or the backend is not available
    if (error.message.includes('fetch') || error.message.includes('HTTP error')) {
      // Fallback to localStorage if backend is not available
      const users = JSON.parse(localStorage.getItem('users')) || {};

      if (!users[email]) {
        throw new Error('Email not registered. Please sign up first.');
      }

      if (users[email].password !== password) {
        throw new Error('Password is incorrect. Please type the correct password.');
      }

      return { success: true, user: { email: email, name: 'User' } };
    }
    throw error;
  }
};

// API for fetching products
export const getProductsApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    return await response.json();
  } catch (error) {
    // Fallback data if backend is not available
    const products = [
      { id: '5', name: 'Fresh Bananas', price: 40, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=250&h=180&fit=crop', category: 'Fruits' },
      { id: '6', name: 'Fresh Milk', price: 65, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=250&h=180&fit=crop', category: 'Dairy' },
      { id: '7', name: 'Tomatoes', price: 30, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=250&h=180&fit=crop', category: 'Vegetables' },
      { id: '8', name: 'Potatoes', price: 25, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=250&h=180&fit=crop', category: 'Vegetables' },
      { id: '9', name: 'Onions', price: 35, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=250&h=180&fit=crop', category: 'Vegetables' },
      { id: '10', name: 'Carrots', price: 45, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=250&h=180&fit=crop', category: 'Vegetables' },
      { id: '11', name: 'Apples', price: 120, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=250&h=180&fit=crop', category: 'Fruits' },
      { id: '12', name: 'Oranges', price: 80, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=250&h=180&fit=crop', category: 'Fruits' },
    ];
    return { success: true, data: products };
  }
};

// API for user signup
export const signupApi = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    // If it's a network error or the backend is not available
    if (error.message.includes('fetch') || error.message.includes('HTTP error')) {
      // Fallback to localStorage if backend is not available
      const users = JSON.parse(localStorage.getItem('users')) || {};

      if (users[email]) {
        throw new Error('Email already registered');
      }

      users[email] = { email, password };
      localStorage.setItem('users', JSON.stringify(users));

      return { success: true, message: 'Account created successfully!' };
    }
    throw error;
  }
};

// API for submitting order
export const submitOrderApi = async (orderData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    return await response.json();
  } catch (error) {
    // Fallback if backend is not available
    const orderId = 'FM' + Date.now();
    return {
      success: true,
      orderId,
      message: 'Order placed successfully!',
      orderData
    };
  }
};

// Call and display all products
const displayAllProducts = async () => {
  try {
    const result = await getProductsApi();
    if (result.success) {
      console.log('All Products:');
      result.data.forEach(product => {
        console.log(`ID: ${product.id}, Name: ${product.name}, Price: ₹${product.price}, Category: ${product.category}`);
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Auto-call to display products
displayAllProducts();
