let handler = (m) => m;

handler.before = async function (m, { conn, isPremium, isOwner, chatUpdate }) {
  //AUTO REACT
  let regex = [
    "bilek",
    "banh",
    "cum",
    "kntl",
    "anjing",
    "mmk",
    "bang",
    "wibu",
    "pantek",
    "pepek",
    "hentai",
  ];
  for (let i of regex) {
    if (m.isGroup && m.body.toLowerCase().includes(i)) {
      await sleep(5000);
      let emot = [
        "🗿",
        "👍",
        "🙄",
        "😝",
        "😏",
        "💩",
        "👻",
        "🔥",
        "🤣",
        "🤬",
        "😎",
        "😂",
        "😘",
        "😑",
        "😱",
        "❤️",
        "🔥",
        "😳",
        "😍",
        "🤩",
        "🥳",
        "🤔",
        "🤗",
        "🤤",
        "👎",
        "👊",
        "🙈",
        "🤡",
      ].getRandom();
      conn.sendMessage(m.chat, { react: { text: emot, key: m.key } });
    }
  }
};
export default handler;
