const { app, globalShortcut } = require('electron')
const robot = require("robotjs");

robot.setMouseDelay(20);

app.whenReady().then(() => {
  globalShortcut.register('R', () => {
    console.log('Electron loves global shortcuts!');

    robot.typeString('r');

    // Open inventary
    robot.typeString('b');

    switchGears();

    // Close inventary
    robot.typeString('b');
  })
})

const switchGears = () => {
    getPos();

    // Gloves
    switchGear({x: 634, y: 637}, {x: 621, y: 727});
}

const getPos = () => {
    const mouse = robot.getMousePos();
    console.log('mouse', mouse);
}

const switchGear = (posOrigin, posDestination) => {
    robot.moveMouse(posOrigin.x, posOrigin.y);
    robot.mouseToggle("down");
    robot.dragMouse(posDestination.x, posDestination.y);
    robot.mouseToggle("up");
    robot.moveMouse(posOrigin.x, posOrigin.y);
    robot.mouseClick();
}