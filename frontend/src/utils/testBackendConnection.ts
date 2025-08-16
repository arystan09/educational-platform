import apiService from '../services/api';

export const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...');
  console.log('API Base URL:', process.env.REACT_APP_API_URL || 'http://localhost:3000');
  
  try {
    // Test basic connectivity to different ports
    console.log('Testing connectivity to different ports...');
    const ports = [3000, 3001, 3002];
    
    for (const port of ports) {
      try {
        const response = await fetch(`http://localhost:${port}`);
        console.log(`✅ Port ${port} is reachable`);
      } catch (error) {
        console.log(`❌ Port ${port} is not reachable`);
      }
    }
    
    // Test registration
    console.log('Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      role: 'STUDENT' as const
    };
    
    const registerResponse = await apiService.register(testUser);
    console.log('✅ Registration successful:', registerResponse.user.email);
    
    // Test login
    console.log('Testing user login...');
    const loginResponse = await apiService.login({
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful:', loginResponse.user.email);
    
    // Test current user
    console.log('Testing get current user...');
    const currentUser = await apiService.getCurrentUser();
    console.log('✅ Get current user successful:', currentUser.email);
    
    console.log('🎉 All backend tests passed!');
    return true;
    
  } catch (error: any) {
    console.error('❌ Backend test failed:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend is not running. Please start the backend server first.');
      console.error('Run: cd backend && npm run start:dev');
    } else if (error.response?.status === 401) {
      console.error('Authentication failed. Check your JWT configuration.');
    } else if (error.response?.status === 500) {
      console.error('Server error. Check your database connection and logs.');
    } else if (error.message.includes('3002')) {
      console.error('Port 3002 issue detected. Check if backend is running on correct port.');
    }
    
    return false;
  }
};

// Make the function available globally for testing
declare global {
  interface Window {
    testBackendConnection: typeof testBackendConnection;
  }
}

if (typeof window !== 'undefined') {
  // Only run in browser environment
  (window as any).testBackendConnection = testBackendConnection;
} 