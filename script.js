// Utility Functions
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(tabName).classList.add("active")
  event.target.classList.add("active")
}

function log(outputId, message, type = "info") {
  const output = document.getElementById(outputId)
  const logItem = document.createElement("div")
  logItem.className = `log-item ${type}`
  const timestamp = new Date().toLocaleTimeString("vi-VN")
  logItem.textContent = `[${timestamp}] ${message}`
  output.appendChild(logItem)
  output.scrollTop = output.scrollHeight
}

function clearOutput(outputId) {
  document.getElementById(outputId).innerHTML = ""
}

// Callbacks Demo
async function runCallbackDemo() {
  clearOutput("callbackOutput")
  const startTime = performance.now()
  let taskCount = 0

  log("callbackOutput", "Bắt đầu demo Callbacks...", "info")

  function fetchData(id, delay, callback) {
    setTimeout(() => {
      taskCount++
      log("callbackOutput", `✓ Task ${id} hoàn thành (${delay}ms)`, "success")
      callback()
    }, delay)
  }

  // Nested callbacks (Callback Hell)
  fetchData(1, 500, () => {
    fetchData(2, 600, () => {
      fetchData(3, 400, () => {
        const endTime = performance.now()
        const duration = Math.round(endTime - startTime)
        document.getElementById("callbackTime").textContent = duration + "ms"
        document.getElementById("callbackTasks").textContent = taskCount
        log("callbackOutput", `Hoàn thành! Tổng thời gian: ${duration}ms`, "success")
      })
    })
  })
}

// Promises Demo
async function runPromiseDemo() {
  clearOutput("promiseOutput")
  const startTime = performance.now()
  let taskCount = 0

  log("promiseOutput", "Bắt đầu demo Promises...", "info")

  function fetchData(id, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        taskCount++
        log("promiseOutput", `✓ Task ${id} hoàn thành (${delay}ms)`, "success")
        resolve()
      }, delay)
    })
  }

  try {
    await fetchData(1, 500)
    await fetchData(2, 600)
    await fetchData(3, 400)

    const endTime = performance.now()
    const duration = Math.round(endTime - startTime)
    document.getElementById("promiseTime").textContent = duration + "ms"
    document.getElementById("promiseTasks").textContent = taskCount
    log("promiseOutput", `Hoàn thành! Tổng thời gian: ${duration}ms`, "success")
  } catch (error) {
    log("promiseOutput", `Lỗi: ${error.message}`, "error")
  }
}

// Async/Await Demo
async function runAsyncAwaitDemo() {
  clearOutput("asyncAwaitOutput")
  const startTime = performance.now()
  let taskCount = 0

  log("asyncAwaitOutput", "Bắt đầu demo Async/Await...", "info")

  async function fetchData(id, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        taskCount++
        log("asyncAwaitOutput", `✓ Task ${id} hoàn thành (${delay}ms)`, "success")
        resolve()
      }, delay)
    })
  }

  try {
    await fetchData(1, 500)
    await fetchData(2, 600)
    await fetchData(3, 400)

    const endTime = performance.now()
    const duration = Math.round(endTime - startTime)
    document.getElementById("asyncAwaitTime").textContent = duration + "ms"
    document.getElementById("asyncAwaitTasks").textContent = taskCount
    log("asyncAwaitOutput", `Hoàn thành! Tổng thời gian: ${duration}ms`, "success")
  } catch (error) {
    log("asyncAwaitOutput", `Lỗi: ${error.message}`, "error")
  }
}

// Parallel Demo
async function runParallelDemo() {
  clearOutput("parallelOutput")
  document.getElementById("parallelTasks").innerHTML = ""
  const startTime = performance.now()

  log("parallelOutput", "Bắt đầu demo Promise.all() - Thực thi song song...", "info")

  const tasks = [
    { id: 1, delay: 1000 },
    { id: 2, delay: 1500 },
    { id: 3, delay: 800 },
  ]

  // Display tasks
  tasks.forEach((task) => {
    const taskEl = document.createElement("div")
    taskEl.className = "task running"
    taskEl.id = `task-${task.id}`
    taskEl.innerHTML = `<div class="task-name">Task ${task.id}</div><div class="task-time">${task.delay}ms</div>`
    document.getElementById("parallelTasks").appendChild(taskEl)
  })

  const promises = tasks.map(
    (task) =>
      new Promise((resolve) => {
        setTimeout(() => {
          log("parallelOutput", `✓ Task ${task.id} hoàn thành (${task.delay}ms)`, "success")
          const taskEl = document.getElementById(`task-${task.id}`)
          taskEl.classList.remove("running")
          taskEl.classList.add("completed")
          resolve()
        }, task.delay)
      }),
  )

  try {
    await Promise.all(promises)

    const endTime = performance.now()
    const duration = Math.round(endTime - startTime)
    const sequentialTime = 1000 + 1500 + 800 // Nếu chạy tuần tự
    const speedup = Math.round((sequentialTime / duration - 1) * 100)

    document.getElementById("parallelTime").textContent = duration + "ms"
    document.getElementById("parallelTasks").textContent = tasks.length
    document.getElementById("parallelSpeedup").textContent = speedup + "%"

    log("parallelOutput", `Hoàn thành! Tổng thời gian: ${duration}ms (Tăng tốc: ${speedup}%)`, "success")
  } catch (error) {
    log("parallelOutput", `Lỗi: ${error.message}`, "error")
  }
}

// Race Demo
async function runRaceDemo() {
  clearOutput("raceOutput")
  document.getElementById("raceTasks").innerHTML = ""
  const startTime = performance.now()

  log("raceOutput", "Bắt đầu demo Promise.race() - Chạy đua...", "info")

  const tasks = [
    { id: 1, delay: 500, name: "Nhanh" },
    { id: 2, delay: 1200, name: "Trung Bình" },
    { id: 3, delay: 2000, name: "Chậm" },
  ]

  // Display tasks
  tasks.forEach((task) => {
    const taskEl = document.createElement("div")
    taskEl.className = "task running"
    taskEl.id = `race-task-${task.id}`
    taskEl.innerHTML = `<div class="task-name">${task.name}</div><div class="task-time">${task.delay}ms</div>`
    document.getElementById("raceTasks").appendChild(taskEl)
  })

  const promises = tasks.map(
    (task) =>
      new Promise((resolve) => {
        setTimeout(() => {
          log("raceOutput", `✓ ${task.name} hoàn thành (${task.delay}ms)`, "success")
          const taskEl = document.getElementById(`race-task-${task.id}`)
          taskEl.classList.remove("running")
          taskEl.classList.add("completed")
          resolve(task.name)
        }, task.delay)
      }),
  )

  try {
    const winner = await Promise.race(promises)

    const endTime = performance.now()
    const duration = Math.round(endTime - startTime)

    document.getElementById("raceTime").textContent = duration + "ms"
    document.getElementById("raceWinner").textContent = winner

    log("raceOutput", `🏆 Người thắng: ${winner} (${duration}ms)`, "success")
  } catch (error) {
    log("raceOutput", `Lỗi: ${error.message}`, "error")
  }
}

// Task Queue Demo
class TaskQueue {
  constructor(concurrency = 2) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  async add(task) {
    while (this.running >= this.concurrency) {
      await new Promise((r) => setTimeout(r, 50))
    }
    this.running++
    try {
      await task()
    } finally {
      this.running--
    }
  }

  getRunning() {
    return this.running
  }
}

async function runQueueDemo() {
  clearOutput("queueOutput")
  document.getElementById("queueTasks").innerHTML = ""
  const startTime = performance.now()
  const concurrency = Number.parseInt(document.getElementById("concurrency").value) || 2

  log("queueOutput", `Bắt đầu demo Task Queue (Độ đồng thời: ${concurrency})...`, "info")

  const queue = new TaskQueue(concurrency)
  const tasks = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    delay: 800 + Math.random() * 400,
  }))

  // Display tasks
  tasks.forEach((task) => {
    const taskEl = document.createElement("div")
    taskEl.className = "task"
    taskEl.id = `queue-task-${task.id}`
    taskEl.innerHTML = `<div class="task-name">Task ${task.id}</div><div class="task-time">${Math.round(task.delay)}ms</div>`
    document.getElementById("queueTasks").appendChild(taskEl)
  })

  const promises = tasks.map((task) =>
    queue.add(async () => {
      const taskEl = document.getElementById(`queue-task-${task.id}`)
      taskEl.classList.add("running")

      await new Promise((resolve) => setTimeout(resolve, task.delay))

      log("queueOutput", `✓ Task ${task.id} hoàn thành (${Math.round(task.delay)}ms)`, "success")
      taskEl.classList.remove("running")
      taskEl.classList.add("completed")
      document.getElementById("queueRunning").textContent = queue.getRunning()
    }),
  )

  try {
    await Promise.all(promises)

    const endTime = performance.now()
    const duration = Math.round(endTime - startTime)

    document.getElementById("queueTime").textContent = duration + "ms"
    document.getElementById("queueTasks").textContent = tasks.length
    document.getElementById("queueRunning").textContent = "0"

    log("queueOutput", `Hoàn thành! Tổng thời gian: ${duration}ms`, "success")
  } catch (error) {
    log("queueOutput", `Lỗi: ${error.message}`, "error")
  }
}
