 import moment from '../../modules/moment.js';

let handler = async (m, { conn, text }) => {
    if (!text) throw `Error!\nMasukan perintah dengan tambahan username!`;

    const Quer = text
        .replace("https://github.com/", "")
        .replace("@", "")
        .trim();

    // Fetch GitHub API
    const res = await fetch(`https://api.github.com/users/${Quer}`, {
        headers: {
            "User-Agent": "Bun-Fetch" // wajib untuk GitHub API agar tidak diblok
        }
    });

    if (!res.ok) {
        return m.reply(`❌ User tidak ditemukan / limit GitHub API (${res.status})`);
    }

    const data = await res.json();

    let {
        login,
        name,
        followers,
        following,
        public_gists,
        public_repos,
        twitter_username,
        email,
        location,
        blog,
        html_url,
        created_at,
        updated_at,
        bio,
        avatar_url
    } = data;

    const teks = `*User Name :* ${login}
*Nick Name :* ${name || '-'}
*Followers :* ${followers}
*Following :* ${following}
*Public Gists :* ${public_gists}
*Public Repos :* ${public_repos}
*Twitter :* ${twitter_username || '-'}
*Email :* ${email || '-'}
*Location :* ${location || '-'}
*Blog :* ${blog || '-'}
*Link :* ${html_url}

*Created Time :*
  - Date : ${moment(created_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}
  - Time : ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss')}

*Updated Time :*
  - Date : ${moment(updated_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}
  - Time : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss')}

*Bio :* ${bio || '-'}`;

    await conn.sendFile(m.chat, avatar_url, 'github-stalk.png', teks, m);
};

handler.help = ['githubstalk'];
handler.tags = ['internet'];
handler.command = ['githubstalk', 'ghstalk'];
handler.limit = true;

export default handler;
