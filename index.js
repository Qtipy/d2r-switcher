const { app, globalShortcut } = require('electron')
var robot = require("robotjs");

app.whenReady().then(() => {
  globalShortcut.register('R', () => {
    console.log('Electron loves global shortcuts!');

    switchGears();

    // Type "Hello World".
    // robot.typeString("Hello World");
  })
})

const switchGears = () => {
    getPos();
}

const getPos = () => {
    const mouse = robot.getMousePos();
    console.log('mouse', mouse);
}