let { performance } = require('perf_hooks')
let os = require('os')
let { exec } = require('child_process')

let handler = async (m, { conn, command, usedPrefix, DevMode }) => {
    try {
        let NotDetect = 'Not Detect'
        let old = performance.now()

        let OS = os.platform()
        let cpuModel = os.cpus()[0].model
        let cpuCore = os.cpus().length

        // CPU usage
        function getCPUUsage() {
            let cpus = os.cpus()
            let idle = 0
            let total = 0

            cpus.forEach(core => {
                for (let type in core.times) {
                    total += core.times[type]
                }
                idle += core.times.idle
            })

            return 100 - Math.round(100 * idle / total)
        }

        let cpuPer = getCPUUsage()

        // RAM
        let ramTotal = Math.round(os.totalmem() / 1024 / 1024)
        let ramUsed = Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)

        // Drive
        let driveTotal = NotDetect
        let driveUsed = NotDetect
        let drivePer = NotDetect

        await new Promise(resolve => {
            exec('df -k /', (err, stdout) => {
                if (!err) {
                    let lines = stdout.split('\n')[1].split(/\s+/)
                    driveTotal = Math.round(lines[1] / 1024 / 1024) + ' GB'
                    driveUsed = Math.round(lines[2] / 1024 / 1024)
                    drivePer = lines[4]
                }
                resolve()
            })
        })

        // Network (simple)
        let netsIn = NotDetect
        let netsOut = NotDetect

        await conn.reply(m.chat, `_Testing ${command}..._`, m)

        let neww = performance.now()
        let _ramTotal = ramTotal + ' MB'

        var txt = `
*「 Status 」*
OS : *${OS}*
CPU Model : *${cpuModel}*
CPU Core : *${cpuCore} Core*
CPU : *${cpuPer}%*
Ram : *${ramUsed} / ${_ramTotal} (${Math.round(100 * (ramUsed / ramTotal))}%)*
Drive : *${driveUsed} / ${driveTotal} (${drivePer})*
Ping : *${Math.round(neww - old)} ms*
Internet IN : *${netsIn}*
Internet OUT : *${netsOut}*
`

        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: txt,
                contextInfo: {
                    externalAdReply: {
                        title: `${ramUsed} / ${_ramTotal} (${Math.round(100 * (ramUsed / ramTotal))}%)`,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg',
                        sourceUrl: ''
                    }
                },
                mentions: [m.sender]
            }
        }, {})

    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error', m)
    }
}

handler.help = ['', 'bot'].map(v => 'status' + v)
handler.tags = ['info']
handler.command = /^(bot)?stat(us)?(bot)?$/i

module.exports = handler