const { app, globalShortcut } = require('electron')
var robot = require("robotjs");

app.whenReady().then(() => {
  globalShortcut.register('R', () => {
    console.log('Electron loves global shortcuts!');

    robot.typeString('r');

    //Open inventary
    robot.typeString('b');

    switchGears();

    robot.typeString('b');

  })
})

const switchGears = () => {
    getPos();

    // Gloves
    switchGear({x: 630, y: 880}, {x: 633, y: 815});
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