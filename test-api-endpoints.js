#!/usr/bin/env node

const https = require('https');
const http = require('http');

// API key from environment
const API_KEY = 'XolH2RFsOlbIgF2kEJzlcjzHphnArD4X';

console.log('🔍 Comprehensive API Testing for 307 Error Investigation\n');

// Test 1: Direct MLIT API call
async function testDirectMLITAPI() {
  console.log('📡 Test 1: Direct MLIT API Call');
  console.log('URL: https://www.mlit-data.jp/api/v1/');
  
  const postData = JSON.stringify({
    query: '{ prefecture { code name hiragana } }'
  });

  const options = {
    hostname: 'www.mlit-data.jp',
    port: 443,
    path: '/api/v1/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'apikey': API_KEY,
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; Tomorie/1.0)',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`✅ Success: Retrieved ${parsed.data?.prefecture?.length || 0} prefectures\n`);
          resolve(parsed);
        } catch (error) {
          console.log(`❌ JSON Parse Error: ${error.message}`);
          console.log(`Raw data: ${data}\n`);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Request Error: ${error.message}\n`);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Test 2: Local proxy API
async function testLocalProxyAPI() {
  console.log('🔧 Test 2: Local Proxy API');
  console.log('URL: http://localhost:3000/api/geo/prefectures');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/geo/prefectures',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`✅ Success: Retrieved ${parsed.prefectures?.length || 0} prefectures\n`);
          resolve(parsed);
        } catch (error) {
          console.log(`❌ JSON Parse Error: ${error.message}`);
          console.log(`Raw data: ${data}\n`);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Request Error: ${error.message}\n`);
      reject(error);
    });

    req.end();
  });
}

// Test 3: Local GraphQL API
async function testLocalGraphQL() {
  console.log('🗄️ Test 3: Local GraphQL API');
  console.log('URL: http://localhost:3000/api/graphql');

  const postData = JSON.stringify({
    query: '{ prefecture { code name hiragana } }'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`✅ Success: Retrieved ${parsed.data?.prefecture?.length || 0} prefectures\n`);
          resolve(parsed);
        } catch (error) {
          console.log(`❌ JSON Parse Error: ${error.message}`);
          console.log(`Raw data: ${data}\n`);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Request Error: ${error.message}\n`);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Test 4: Test with different HTTP methods and headers
async function testWithDifferentConfigurations() {
  console.log('⚙️ Test 4: Different Configuration Tests');
  
  const configurations = [
    {
      name: 'Standard HTTPS with redirect follow',
      options: {
        hostname: 'www.mlit-data.jp',
        port: 443,
        path: '/api/v1/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY,
          'Accept': 'application/json',
          'User-Agent': 'Node.js/Test',
          'Connection': 'keep-alive',
        },
      }
    },
    {
      name: 'HTTP (non-secure) attempt',
      options: {
        hostname: 'www.mlit-data.jp',
        port: 80,
        path: '/api/v1/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY,
          'Accept': 'application/json',
        },
      }
    }
  ];

  for (const config of configurations) {
    console.log(`\n📋 Testing: ${config.name}`);
    
    const postData = JSON.stringify({
      query: '{ prefecture { code name hiragana } }'
    });

    config.options.headers['Content-Length'] = Buffer.byteLength(postData);

    try {
      const result = await new Promise((resolve, reject) => {
        const protocol = config.options.port === 443 ? https : http;
        
        const req = protocol.request(config.options, (res) => {
          console.log(`Status: ${res.statusCode}`);
          
          if (res.statusCode === 307) {
            console.log(`🔴 307 Temporary Redirect detected!`);
            console.log(`Location header: ${res.headers.location}`);
          }
          
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, data, headers: res.headers });
          });
        });

        req.on('error', (error) => {
          console.log(`❌ Error: ${error.message}`);
          reject(error);
        });

        req.write(postData);
        req.end();
      });

      if (result.statusCode === 200) {
        console.log(`✅ Success`);
      } else {
        console.log(`⚠️ Status: ${result.statusCode}`);
        console.log(`Response: ${result.data.substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }
}

// Main test runner
async function runAllTests() {
  try {
    await testDirectMLITAPI();
    await testLocalProxyAPI();
    await testLocalGraphQL();
    await testWithDifferentConfigurations();
    
    console.log('\n🎯 Test Summary:');
    console.log('- Direct MLIT API: Check output above');
    console.log('- Local Proxy API: Check output above');
    console.log('- Local GraphQL: Check output above');
    console.log('- Configuration Tests: Check output above');
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
  }
}

// Run tests
runAllTests();