import axios from "axios"
import crypto from "crypto"

class Perplexity {

  constructor() {

    this.base = "https://www.perplexity.ai"

    this.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36",
      "Accept": "text/event-stream",
      "Content-Type": "application/json",
      "Origin": this.base,
      "Referer": this.base + "/"
    }

    this.cookies = {
      "pplx.visitor-id": crypto.randomUUID(),
      "pplx.session-id": crypto.randomUUID(),
      "pplx.edge-vid": crypto.randomUUID(),
      "pplx.edge-sid": crypto.randomUUID()
    }
  }

  uuid() {
    return crypto.randomUUID()
  }

  cookie() {
    return Object.entries(this.cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join("; ")
  }

  async ask(query) {

    const payload = {
      params: {
        last_backend_uuid: this.uuid(),
        read_write_token: this.uuid(),
        attachments: [],
        language: "id-ID",
        timezone: "Asia/Jakarta",
        search_focus: "internet",
        sources: ["web"],
        frontend_uuid: this.uuid(),
        mode: "copilot",
        model_preference: "turbo",
        prompt_source: "user",
        query_source: "followup",
        use_schematized_api: true,
        version: "2.18"
      },
      query_str: query
    }

    const { data } = await axios.post(
      this.base + "/rest/sse/perplexity_ask",
      payload,
      {
        headers: {
          ...this.headers,
          "Cookie": this.cookie(),
          "x-request-id": this.uuid(),
          "x-perplexity-request-reason": "perplexity-query-state-provider"
        },
        responseType: "text"
      }
    )

    const lines = data.split("\n")

    let final = null

    for (let i = lines.length - 1; i >= 0; i--) {

      if (lines[i].startsWith("data: ")) {

        try {

          const parsed = JSON.parse(lines[i].slice(5))

          if (parsed.text && parsed.final) {
            final = parsed
            break
          }

        } catch {}

      }

    }

    if (!final) {
      return null
    }

    try {

      const parsed = JSON.parse(final.text)

      for (const item of parsed) {

        if (item.step_type === "FINAL") {

          const ans = JSON.parse(item.content.answer)

          return ans.answer

        }

      }

    } catch {}

    return null
  }

}

/* ================= HANDLER ================= */

let handler = async (m, { text }) => {

  if (!text) {
    return m.reply(
`❌ Masukkan pertanyaan

Contoh:
.pplx siapa presiden indonesia`
    )
  }

  m.reply("🤖 Berpikir...")

  try {

    const ai = new Perplexity()

    const answer = await ai.ask(text)

    if (!answer) {
      return m.reply("❌ Tidak ada jawaban")
    }

    m.reply(answer)

  } catch (e) {

    console.log(e)

    m.reply("❌ Error mengambil jawaban")
  }

}

handler.command = ["pplx","perplexity","ai"]
handler.tags = ["ai"]
handler.limit = false

export default handler