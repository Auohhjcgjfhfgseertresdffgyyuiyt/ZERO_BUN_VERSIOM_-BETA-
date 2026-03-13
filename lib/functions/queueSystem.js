const queues = new Map()

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function addToQueue(command, fn, options = {}) {
  const { skipQueue = false, onQueued } = options
  if (skipQueue) return await fn()

  if (!queues.has(command)) queues.set(command, [])

  const queue = queues.get(command)

  let resolveDone
  const task = async () => {
    try {
      await fn()
    } catch (e) {
      console.error(`❌ Queue Error [${command}]`, e)
    } finally {
      await delay(3000) // ✅ JEDA 3 DETIK sebelum lanjut ke antrian berikutnya
      resolveDone()
      queue.shift()
      if (queue.length > 0) queue[0]()
    }
  }

  const position = queue.length + 1
  if (typeof onQueued === 'function') onQueued(position)

  await new Promise(resolve => {
    resolveDone = resolve
    queue.push(task)
    if (queue.length === 1) task()
  })
}
