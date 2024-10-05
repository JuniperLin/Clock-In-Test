const { google } = require("googleapis");
const sheets = google.sheets("v4");

// 認證配置
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // 替換換行符
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function updateSheet(data) {
  const client = await auth.getClient();
  const spreadsheetId = "1j_fradaMRDwE00hIHgNCJJRmtHiaVl7JaXvT1zBPr_s"; // 替換為你的試算表ID

  await sheets.spreadsheets.values.append({
    auth: client,
    spreadsheetId,
    range: "工作表1!A2:A", // 自動追加到試算表的 A2 到 A 列
    valueInputOption: "RAW",
    resource: {
      values: [[data]], // 確保 data 是一個包含三個欄位的陣列 ['姓名', '上班時間', '下班時間']
    },
  });
}

module.exports = updateSheet;
