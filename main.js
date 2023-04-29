const { app, BrowserWindow, globalShortcut, clipboard } = require("electron");
const robot = require("robotjs");

let clipboards = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  0: "",
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  for (let i = 0; i <= 9; i++) {
    globalShortcut.register(`Control+Alt+${i}`, () => {
      if (process.platform === "darwin") {
        robot.keyTap("c", "command");
      } else {
        robot.keyTap("c", "control");
      }
      setTimeout(() => {
        clipboards[i] = clipboard.readText();
        console.log(clipboards);
      }, 100);
    });
    globalShortcut.register(`Shift+Alt+${i}`, () => {
      let text = clipboards[i];
      robot.typeString(text);
    });
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  globalShortcut.unregisterAll();
});
