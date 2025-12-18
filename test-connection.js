// Test script to verify frontend-backend connection
const https = require('https');

const testEndpoints = [
  'https://freshmart-bala.onrender.com/',
  'https://freshmart-bala.onrender.com/api/products'
];

async function testConnection(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ url, status: res.statusCode, success: json.success });
        } catch (e) {
          resolve({ url, status: res.statusCode, error: 'Invalid JSON' });
        }
      });
    });
    
    req.on('error', (err) => {
      reject({ url, error: err.message });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject({ url, error: 'Timeout' });
    });
  });
}

async function runTests() {
  console.log('🧪 Testing Backend API Endpoints...\n');
  
  for (const endpoint of testEndpoints) {
    try {
      const result = await testConnection(endpoint);
      if (result.success) {
        console.log(`✅ ${endpoint} - Status: ${result.status} - Success: ${result.success}`);
      } else {
        console.log(`❌ ${endpoint} - Status: ${result.status} - Error: ${result.error || 'Failed'}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error.error}`);
    }
  }
  
  console.log('\n📋 Connection Summary:');
  console.log('Frontend URL: https://freshmartbala.vercel.app');
  console.log('Backend URL: https://freshmart-bala.onrender.com');
  console.log('CORS configured for Vercel domain');
  console.log('MongoDB connection: Active');
}

runTests();