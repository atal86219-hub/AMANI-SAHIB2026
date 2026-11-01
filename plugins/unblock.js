const { cmd } = require('../team');

cmd({
  pattern: "unblock",
  alias: ["unb", "unblk", "unblok"],
  react: "🥰",
  category: "owner",
  desc: "Unblock user (reply or inbox)",
  filename: __filename
}, async (conn, mek, m, { from, reply, isOwner }) => {
  try {

    // 🔒 Owner only
    if (!isOwner) {
      return reply("*این دستور فقط برای مالک ربات است 😎*");
    }

    let jid;

    // 📌 Reply case
    if (m.quoted) {
      jid = m.quoted.sender;
    }
    // 📌 Inbox case
    else if (from.endsWith("@s.whatsapp.net")) {
      jid = from;
    } 
    else {
      return reply("*برای رفع مسدودی، به یک پیام پاسخ دهید یا در گفت‌وگوی خصوصی بنویسید ☺️*");
    }

    await conn.updateBlockStatus(jid, "unblock");

    await conn.sendMessage(from, {
      react: { text: "🥰", key: mek.key }
    });

    reply(`*شما را از مسدودی خارج کردم ☺️*`, { mentions: [jid] });

  } catch (e) {
    console.log("UNBLOCK ERROR:", e);
    reply("*❌ UNBLOCK NAHI HO PAYA 😔*");
  }
});
