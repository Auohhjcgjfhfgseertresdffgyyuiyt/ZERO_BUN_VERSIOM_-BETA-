import { readdirSync, statSync, readFileSync } from "fs";
import { join, parse } from "path";

let handler = async (m, { q, conn, usedPrefix, command, args, text }) => {
    let pluginFiles = getPluginFiles("./plugins");

    if (!text)
        throw `Uhm.. teksnya mana?\n\nContoh:\n${usedPrefix + command} <tag/no> <nama_plugin>`;

    let who;
    if (m.isGroup) {
        who =
            m.mentionedJid?.[0] ||
            m.quoted?.sender ||
            (args[0] ? args[0] + "@s.whatsapp.net" : null);
    } else {
        who = args[0] ? args[0] + "@s.whatsapp.net" : null;
    }

    if (!who) return m.reply("Silakan tag/628xxxxxx");

    const pluginName = args[1];
    const pluginPath = pluginFiles[pluginName];

    if (!pluginPath)
        return m.reply(`Plugin *${pluginName}* tidak ditemukan`);

    const file = readFileSync(pluginPath);
    const jpegThumbnail = readFileSync("./media/thumbnaildokumen.jpg");

    await conn.sendMessage(
        who,
        {
            document: file,
            fileName: `${pluginName}.js`,
            mimetype: "text/javascript",
            jpegThumbnail
        }
    );

    await conn.reply(
        m.chat,
        "Berhasil mengirim file ke @" + who.split("@")[0],
        m
    );
};

handler.help = ["sendplugin <tag/no> <nama_plugin>"];
handler.tags = ["owner"];
handler.command = /^(sendplug)$/i;
handler.owner = true;

export default handler;

// ===============================
// GET PLUGIN FILES (RECURSIVE)
// ===============================
function getPluginFiles(folderPath) {
    let files = {};

    function scan(dir) {
        const items = readdirSync(dir);

        for (const item of items) {
            const fullPath = join(dir, item);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                scan(fullPath);
            } else if (item.endsWith(".js")) {
                const { name } = parse(item);
                files[name] = fullPath;
            }
        }
    }

    scan(folderPath);
    return files;
}