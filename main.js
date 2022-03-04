// Import from the electron library
const { app, BrowserWindow, webContents, ipcMain } = require("electron");
// Import electron store library
const Store = require("electron-store");

const store = new Store();

// Function to create a window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the html file inside the window
  win.loadFile("index.html");

  // Send todos to index.html on the displayTodos channel
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("displayTodos", loadTodos());
  });
}

// Create the window when the app is initialized
app.whenReady().then(() => {
  createWindow();
});

// Quit the app when the window is closed
app.on("window-all-closed", () => {
  app.quit();
});

// Load todos from disk and if not todos exist then return a blank array
function loadTodos() {
  return store.get("todos", []);
}

// Save the following todos
function saveTodos(todos) {
  store.set("todos", todos);
}

// Save updated todos
ipcMain.on("updated-todos", (event, todos) => {
  saveTodos(todos);
});