const { cmd } = require('../team');
const axios = require('axios');

cmd({
  pattern: "apk",
  alias: ["app", "playstore", "application"],
  react: "☺️",
  desc: "Download APK via Aptoide",
  category: "download",
  use: ".apk <name>",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("*اگر می‌خواهید یک فایل APK دانلود کنید 🤔*\n*پس این‌گونه بنویسید ☺️*\n\n*APK ❮APK NAME❯*\n\n*JAB AP این‌گونه بنویسید GE 🤗 TO APKI APK DOWNLOAD KAR KE 😃 YAHA PER BHEJNDE JAYE GE 😍🌹*");

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("*فایل APK پیدا نشد 😔*");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);

    let caption = `*╭━━━〔 👑 APK INFO 👑 〕━━━┈⊷*
*┃ 👑 NAME: ${app.name.toUpperCase()}*
*┃ 👑 SIZE :❯ ${appSize} MB*
*┃ 👑 PACK :❯ ${app.package.toUpperCase()}*
*┃ 👑 VER :❯ ${app.file.vername}*
*╰━━━━━━━━━━━━━━━┈⊷*

*👑 BY :❯ TEAM 810 👑*`;

    await conn.sendMessage(from, { image: { url: app.icon }, caption }, { quoted: mek });

    await conn.sendMessage(from, {
      document: { url: app.file.path || app.file.path_alt },
      mimetype: "application/vnd.android.package-archive",
      fileName: `${app.name.toUpperCase()}.apk`
    }, { quoted: mek });

    await m.react("😍");
  } catch (err) {
    reply("*👑 ERROR :❯* TRY AGAIN!");
  }
});
                   
