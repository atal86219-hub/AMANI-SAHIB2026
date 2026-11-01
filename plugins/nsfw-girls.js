const { cmd } = require("../team");
const { fakevCard } = require('../lib/fakevCard');

cmd({
  pattern: "boobs",
  alias: ["xboobs", "bobs"],
  desc: "Random Anime Girl Image",
  category: "fun",
  react: "🌸",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const apiUrl = "https://arslan-apis-v2.vercel.app/api/boobs";

    await conn.sendMessage(from, {
      image: { url: apiUrl },
      caption: "🌸 *Random X Girl*\n\n© TEAM 810"
    }, {
      quoted: fakevCard
    });

  } catch (err) {
    console.log(err);
    reply("⚠️ ارسال تصویر ممکن نشد.");
  }
});

cmd({
  pattern: "xgirl",
  alias: ["xgirls", "ximg"],
  desc: "Random Anime Girl Image",
  category: "fun",
  react: "🌸",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const apiUrl = "https://arslan-apis-v2.vercel.app/api/girls-pack";

    await conn.sendMessage(from, {
      image: { url: apiUrl },
      caption: "🌸 *Random X Girl*\n\n© TEAM 810"
    }, {
      quoted: fakevCard
    });

  } catch (err) {
    console.log(err);
    reply("⚠️ ارسال تصویر ممکن نشد.");
  }
});
