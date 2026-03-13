 import crypto from 'crypto';

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
    info: "/v2/info",
    download: "/download"
  },
  headers: {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://yt.savetube.me',
    'referer': 'https://yt.savetube.me/',
    'user-agent': 'Postify/1.0.0'
  },
  formats: ['144', '240', '360', '480', '720', '1080', 'mp3'],

  crypto: {
    hexToBuffer: (hexString) => {
      const matches = hexString.match(/.{1,2}/g);
      return Buffer.from(matches.join(''), 'hex');
    },
    decrypt: async (enc) => {
      try {
        const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
        const data = Buffer.from(enc, 'base64');
        const iv = data.slice(0, 16);
        const content = data.slice(16);
        const key = savetube.crypto.hexToBuffer(secretKey);

        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        let decrypted = decipher.update(content);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  youtube: (url) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  },


  request: async (endpoint, data = {}, method = 'post') => {
    try {
      const isFull = endpoint.startsWith("http");
      const url = isFull ? endpoint : `${savetube.api.base}${endpoint}`;

      let fetchUrl = url;
      let body = undefined;

      if (method === "get") {
        const qs = new URLSearchParams(data).toString();
        fetchUrl = qs ? `${url}?${qs}` : url;
      } else {
        body = JSON.stringify(data);
      }

      const res = await fetch(fetchUrl, {
        method,
        headers: savetube.headers,
        body
      });

      const json = await res.json();

      return {
        status: true,
        code: res.status,
        data: json
      };

    } catch (error) {
      throw new Error(error);
    }
  },

  getCDN: async () => {
    const response = await savetube.request(savetube.api.cdn, {}, 'get');
    if (!response.status) throw new Error(response);
    return {
      status: true,
      code: 200,
      data: response.data.cdn
    };
  },

  download: async (link, format) => {
    if (!link) {
      return {
        status: false,
        code: 400,
        error: "Linknya mana? 🗿"
      };
    }

    if (!format || !savetube.formats.includes(format)) {
      return {
        status: false,
        code: 400,
        error: "Formatnya kagak ada bree 🗿",
        available_fmt: savetube.formats
      };
    }

    const id = savetube.youtube(link);
    if (!id) throw new Error('invalid link');

    try {
      const cdnx = await savetube.getCDN();
      if (!cdnx.status) return cdnx;
      const cdn = cdnx.data;

      const result = await savetube.request(
        `https://${cdn}${savetube.api.info}`,
        { url: `https://www.youtube.com/watch?v=${id}` }
      );

      if (!result.status) return result;

      const decrypted = await savetube.crypto.decrypt(result.data.data);

      const dl = await savetube.request(
        `https://${cdn}${savetube.api.download}`,
        {
          id,
          downloadType: format === 'mp3' ? 'audio' : 'video',
          quality: format === 'mp3' ? '128' : format,
          key: decrypted.key
        }
      );

      return {
        status: true,
        code: 200,
        result: {
          title: decrypted.title || "Gak tau 🤷🏻",
          type: format === 'mp3' ? 'audio' : 'video',
          format,
          thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/0.jpg`,
          download: dl.data.data.downloadUrl,
          id,
          key: decrypted.key,
          duration: decrypted.duration,
          quality: format === 'mp3' ? '128' : format,
          downloaded: dl.data.data.downloaded
        }
      };

    } catch (error) {
      throw new Error(error);
    }
  }
};

export default savetube;
