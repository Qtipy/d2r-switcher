const { app, globalShortcut } = require('electron')

var robot = require("robotjs");

app.whenReady().then(() => {
  globalShortcut.register('R', () => {
    console.log('Electron loves global shortcuts!', process.versions)

    // Type "Hello World".
    robot.typeString("Hello World");
  })
}).then()