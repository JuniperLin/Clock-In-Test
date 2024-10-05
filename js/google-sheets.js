const { google } = require('googleapis');
const path = require('path');
const sheets = google.sheets('v4');

// 認證配置
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, ''), // 使用你的憑證檔案
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function updateSheet(data) {
  const client = await auth.getClient();
  const spreadsheetId = '1bDsGmpGnwImgxH8xXdgc1MohBO8ifCgjbHLBim_SFx4'; // 替換為你的試算表ID

  await sheets.spreadsheets.values.append({
    auth: client,
    spreadsheetId,
    range: 'A2:C2', // 自動追加到試算表的 A2 到 C2 列
    valueInputOption: 'RAW',
    resource: {
      values: [data], // 確保 data 是一個包含三個欄位的陣列 ['姓名', '上班時間', '下班時間']
    },
  });
}

module.exports = updateSheet;
