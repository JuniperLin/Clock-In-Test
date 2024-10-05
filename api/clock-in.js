const updateSheet = require('../js/google-sheets');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // 接收 POST 請求中的 name, clockInTime, 和 clockOutTime
    const { name, clockInTime, clockOutTime } = req.body;
    
    // 檢查請求是否包含所有必需的數據
    if (!name || !clockInTime || !clockOutTime) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
      // 將資料傳入 Google Sheets
      await updateSheet([name, clockInTime, clockOutTime]);
      return res.status(200).json({ message: 'Clock-in/out successful!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to clock-in/out' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
