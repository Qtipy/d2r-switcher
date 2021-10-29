const { app, globalShortcut } = require('electron');
var robot = require('robotjs');

robot.setMouseDelay(200);
robot.setKeyboardDelay(100);
const emptyColor = '171617';

const appli = app.whenReady().then(() => {
  globalShortcut.register('F6', () => {
    switchGears();
  });
});

const switchGears = () => {
  const isStored = robot.getPixelColor(835, 325) !== emptyColor;

  // Torch
  switchGear({ x: 2311, y: 802 }, { x: 443, y: 566 }, isStored);
  // Boot
  switchGear({ x: 2277, y: 660 }, { x: 668, y: 563 }, isStored);

  // Shield
  switchGear({ x: 2268, y: 420 }, { x: 803, y: 382 }, isStored);
  // Weapon
  switchGear({ x: 1776, y: 421 }, { x: 673, y: 393 }, isStored);
  // Armor
  switchGear({ x: 2025, y: 521 }, { x: 547, y: 401 }, isStored);
  // Gloves
  switchGear({ x: 1769, y: 648 }, { x: 799, y: 562 }, isStored);
  // Ring 1
  switchGear({ x: 1897, y: 682 }, { x: 446, y: 331 }, isStored);
  // Ring 2
  switchGear({ x: 2147, y: 689 }, { x: 447, y: 392 }, isStored);
  // Amu
  switchGear({ x: 2142, y: 407 }, { x: 442, y: 460 }, isStored);
  // Belt
  switchGear({ x: 2017, y: 688 }, { x: 541, y: 527 }, isStored);
  // Head
  switchGear({ x: 2017, y: 324 }, { x: 537, y: 622 }, isStored);

  robot.keyTap('r');

  // Shield switch
  switchGear({ x: 2273, y: 426 }, { x: 805, y: 716 }, isStored);
  // Weapon switch
  switchGear({ x: 1770, y: 436 }, { x: 675, y: 717 }, isStored);
};

const switchGear = (posOrigin, posDest, isStored) => {
  if (isStored) {
    robot.moveMouse(posDest.x, posDest.y);
    robot.mouseClick();
    robot.moveMouse(posOrigin.x, posOrigin.y);
    robot.mouseClick();
  } else {
    robot.moveMouse(posOrigin.x, posOrigin.y);
    robot.mouseClick();
    robot.moveMouse(posDest.x, posDest.y);
    robot.mouseClick();
  }
};

export default appli;
