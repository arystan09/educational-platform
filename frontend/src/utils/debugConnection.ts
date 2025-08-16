export const debugConnection = () => {
  console.log('🔍 Debugging connection issues...');
  
  // Check environment variables
  console.log('Environment variables:');
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  // Check localStorage
  console.log('localStorage token:', localStorage.getItem('token'));
  console.log('localStorage user:', localStorage.getItem('user'));
  
  // Test different ports
  console.log('Testing ports...');
  [3000, 3001, 3002].forEach(port => {
    fetch(`http://localhost:${port}`)
      .then(() => console.log(`✅ Port ${port} is reachable`))
      .catch(() => console.log(`❌ Port ${port} is not reachable`));
  });
  
  // Check API service configuration
  console.log('API service baseURL should be:', process.env.REACT_APP_API_URL || 'http://localhost:3000');
};

// Make it globally available
declare global {
  interface Window {
    debugConnection: typeof debugConnection;
  }
}

if (typeof window !== 'undefined') {
  (window as any).debugConnection = debugConnection;
} 