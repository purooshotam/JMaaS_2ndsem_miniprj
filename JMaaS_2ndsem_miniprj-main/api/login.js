const Storage = require('../storage');

// Initialize storage
Storage.init();

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.json({
      success: false,
      message: 'Username and password required'
    });
  }

  const user = Storage.getUser(username);
  if (user && user.password === password) {
    Storage.updateLastLogin(username);
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        fullName: user.profile.fullName,
        email: user.email
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};
