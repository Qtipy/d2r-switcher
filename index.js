const { app, globalShortcut } = require('electron')
var robot = require("robotjs");

robot.setMouseDelay(125);

app.whenReady().then(() => {
  globalShortcut.register('space', () => {
    // Switch weapons
    robot.keyTap('r');

    // Open inventary
    robot.keyTap('b');

    switchGears();

    // Close inventary
    robot.keyTap('b');
  })
})

const switchGears = () => {
    getPos();

    // Amu
    switchGear({ x: 2052, y: 963 }, { x: 2137, y: 408 });
    // Boots
    switchGear({ x: 1766, y: 807 }, { x: 2264, y: 650 });
}

const getPos = () => {
    const mouse = robot.getMousePos();
    console.log('mouse', mouse);
}

const switchGear = (posOrigin, posDestination) => {
    robot.moveMouse(posOrigin.x, posOrigin.y);
    robot.mouseClick();
    robot.moveMouse(posDestination.x, posDestination.y);
    robot.mouseClick();
    robot.moveMouse(posOrigin.x, posOrigin.y);
    robot.mouseClick();
}