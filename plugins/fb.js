const { cmd } = require('../team');
const axios = require('axios');

cmd({
  pattern: "fb",
  react: "☺️",
  alias: ["facebook", "fbdl"],
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("*اگر می‌خواهید ویدیوی فیسبوک را دانلود کنید 🤔 لینک همان ویدیوی فیسبوک را کاپی کنید 🤗*\n*سپس این‌گونه بنویسید ☺️*\n\n*FB ❮FACEBOOK VIDEO LINK❯*\n\n*JAB AP این‌گونه بنویسید GE 😇 TO APKI FACEBOOK VIDEO DOWNLOAD KAR KE 😃 YAHA PER BHEJ DE JAYE GE 😍♥️*");

    const apiUrl = `https://movanest.xyz/v2/fbdown?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    // 🔎 API status check
    if (data.status !== true) {
      return reply("API ERROR 😢");
    }

    // 🔎 Results check
    if (!Array.isArray(data.results) || data.results.length === 0) {
      return reply("*ویدیوی فیسبوک پیدا نشد 🥺*");
    }

    const result = data.results[0];

    // 🎥 Quality selection (API ke mutabiq)
    const videoUrl = result.hdQualityLink
      ? result.hdQualityLink
      : result.normalQualityLink;

    if (!videoUrl) {
      return reply("*SIRF FACEBOOK VIDEO KA LINK DO ☺️*");
    }

    // 📝 Caption API data se
    const caption = `*👑 FB VIDEO 👑*
*👑 TIME :❯ ${result.duration}*
*👑 CREATER :❯ ${data.creator}*
*👑 BY :❯ TEAM 810 👑*`;

    await conn.sendMessage(
      from,
      {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: caption
      },
      { quoted: mek }
    );

  } catch (err) {
    console.log(err);
    reply("❌ خطا رخ داد");
  }
});
