#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const https = require('https');

console.log('\n🚀 MongoDB Auto-Setup Starting...\n');

// Check if MongoDB is already installed
const mongoPath = 'C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe';
const mongoExists = fs.existsSync(mongoPath);

if (mongoExists) {
  console.log('✓ MongoDB found at:', mongoPath);
  startMongoDB();
} else {
  console.log('📥 Downloading MongoDB...');
  downloadMongoDB();
}

function downloadMongoDB() {
  const url = 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.3-signed.msi';
  const output = path.join(process.env.USERPROFILE, 'Downloads', 'mongodb-installer.msi');
  
  const file = fs.createWriteStream(output);
  
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('✓ Downloaded to:', output);
      console.log('📦 Running installer...\n');
      
      spawn('msiexec', ['/i', output, '/quiet', '/norestart', 'ADDLOCAL=all'], {
        stdio: 'inherit',
        shell: true
      }).on('close', (code) => {
        if (code === 0) {
          console.log('\n✓ MongoDB installed successfully!\n');
          setTimeout(() => startMongoDB(), 2000);
        } else {
          console.log('❌ Installation failed');
          process.exit(1);
        }
      });
    });
  }).on('error', (err) => {
    console.error('Download failed:', err.message);
    process.exit(1);
  });
}

function startMongoDB() {
  console.log('🔄 Starting MongoDB service...\n');
  
  const dataDir = 'C:\\data\\db';
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const mongod = spawn('"C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe"', 
    ['--dbpath', dataDir, '--logpath', 'C:\\mongodb.log'],
    { shell: true, stdio: 'inherit' }
  );
  
  mongod.on('error', (err) => {
    console.error('Failed to start MongoDB:', err.message);
    console.log('\n💡 Try running manually:');
    console.log('"C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe" --dbpath "C:\\data\\db"\n');
    process.exit(1);
  });
  
  console.log('✓ MongoDB is running on port 27017');
  console.log('✓ Connection string: mongodb://localhost:27017/freshmart\n');
  console.log('Now restart your backend:\n');
  console.log('cd "C:\\Users\\GUGAN\\OneDrive\\Documents\\Project 3\\backend"');
  console.log('npm start\n');
}
