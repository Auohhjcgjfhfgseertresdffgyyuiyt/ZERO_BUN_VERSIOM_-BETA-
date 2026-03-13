/*
📌 Plugin: Kucing Scraper
📦 Support Bun + fetch
*/

class Kucing {
    constructor() {
        this.base = 'https://api.explorethefrontierforlimitlessimaginationanddiscov.com/330cceade91a6a9cd30fb8042222ed56/71b8acf33b508c7543592acd9d9eb70d';
        this.headers = {
            token: 'XbGSFkQsJYbFC6pcUMCFL4oNHULvHU7WdDAXYgpmqYlh7p5ZCQ4QZ13GDgowiOGvAejz9X5H6DYvEQBMrc3A17SO3qwLwVkbn6YY',
            accept: 'application/json',
            appbuildcode: '25301',
            appsignature: 'pOplm8IDEDGXN55IaYohQ8CzJFvWsfXyhGvwPRD9kWgzYSRuuvAOPfsE0AJbHVbAJyWGsGCNUIuQLJ7HbMbuFLMWwDgHNwxOrYMH',
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/4.10.0',
            'if-modified-since': 'Fri, 20 Jun 2025 07:10:42 GMT'
        };
    }

    async req(path) {
        const url = this.base + path;
        const res = await fetch(url, { headers: this.headers }).catch(e => { throw new Error(e.message) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    }

    latest() {
        return this.req('/recent');
    }

    search(q, page = "1") {
        if (!q) throw new Error('Query is required');
        return this.req(`/search?q=${encodeURIComponent(q)}&page=${page}`);
    }

    detail(id) {
        if (!id || isNaN(id)) throw new Error('ID invalid');
        return this.req(`/post?id=${id}`);
    }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const k = new Kucing();

    if (!args[0]) {
        return m.reply(
`*Kucing Scraper*
Format:
${usedPrefix + command} latest
${usedPrefix + command} search <query>
${usedPrefix + command} detail <id>`
        );
    }

    let sub = args[0].toLowerCase();
    try {
        let result;

        if (sub === 'latest') {
            result = await k.latest();
            const items = result.carousel?.slice(0, 5) || [];
            if (items.length === 0) return m.reply("❌ Tidak ada hasil!");

            for (const item of items) {
                let txt = `📛 Judul: ${item.title}
⏰ Waktu: ${item.date}
🆔 ID: ${item.id}
🔗 Slug: ${item.slug || '-'}
📝 Deskripsi: ${item.description ? item.description.replace(/<[^>]+>/g,'') : '-'}`;

                if (item.image) {
                    await conn.sendMessage(m.chat, {
                        image: { url: item.image },
                        caption: txt
                    });
                } else {
                    await m.reply(txt);
                }
            }

        } else if (sub === 'search') {
            const q = args.slice(1).join(" ");
            result = await k.search(q);
            const items = result.result?.slice(0, 5) || [];
            if (items.length === 0) return m.reply("❌ Tidak ada hasil!");

            for (const item of items) {
                let txt = `📛 Judul: ${item.title}
⏰ Waktu: ${item.date}
🆔 ID: ${item.id}
🔗 Slug: ${item.slug || '-'}
📝 Deskripsi: ${item.description ? item.description.replace(/<[^>]+>/g,'') : '-'}`;

                if (item.image) {
                    await conn.sendMessage(m.chat, {
                        image: { url: item.image },
                        caption: txt
                    });
                } else {
                    await m.reply(txt);
                }
            }

        } else if (sub === 'detail') {
            const id = args[1];
            result = await k.detail(id);
            let txt = `📛 Judul: ${result.title}
⏰ Waktu: ${result.date}
🆔 ID: ${result.id}
🔗 Slug: ${result.slug || '-'}
📝 Deskripsi: ${result.content ? result.content.replace(/<[^>]+>/g,'') : '-'}`;

            if (result.image) {
                await conn.sendMessage(m.chat, {
                    image: { url: result.image },
                    caption: txt
                });
            } else {
                await m.reply(txt);
            }

        } else return m.reply("Sub-command tidak dikenal.");

    } catch (e) {
        console.error(e);
        m.reply(`❌ Error: ${e.message}`);
    }
};

handler.help = ['kucing'];
handler.tags = ['nsfw'];
handler.command = /^kucing$/i;

export default handler;