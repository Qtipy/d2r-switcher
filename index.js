const { app, globalShortcut } = require('electron');
const robot = require('robotjs');
// import { app, globalShortcut } from 'electron';
// import robot from 'robotjs';
// import { wait, waitFor, searchPixel } from './utils';

// robot.setMouseDelay(40);
// robot.setKeyboardDelay(10);
// robot.typeStringDelayed(1);

// app.whenReady().then(() => {
//   globalShortcut.register('F6', () => {
//       // Switch weapons
//       robot.keyTap('r');

//       // Open inventary
//       robot.keyTap('b');

//       switchGears();

//       // Close inventary
//       robot.keyTap('b');
//     });
// })

// const switchGears = () => {
//     getPos();

//     // Amu
//     switchGear({ x: 1980, y: 960 }, { x: 2137, y: 408 });
//     // Ring 1
//     switchGear({ x: 2050, y: 960 }, { x: 1890, y: 680 });
//     // Ring 2
//     switchGear({ x: 2115, y: 960 }, { x: 2130, y: 680 });
// }

// const getPos = () => {
//     const mouse = robot.getMousePos();
//     console.log('mouse', mouse);
// }

// const switchGear = (posOrigin, posDestination) => {
//     robot.moveMouse(posOrigin.x, posOrigin.y);
//     robot.mouseClick();
//     robot.moveMouse(posDestination.x, posDestination.y);
//     robot.mouseClick();
//     robot.moveMouse(posOrigin.x, posOrigin.y);
//     robot.mouseClick();
// }

// let i = 1;
// robot.moveMouse(1,1);

// function myLoop() {
//   setTimeout(function() {
//       if(i === 1500) {
//           i = 1;
//       }
//     console.log('cursor moved', i);
//     robot.moveMouse(i,1)
//     i++;
//     myLoop();
//   }, 30000)
// }

// myLoop();

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const waitFor = async (func, name = 'name not defined', timeout = 10000) => {
  const start = Date.now();
  while (true) {
    if (Date.now() - start > timeout) {
      throw new Error('timeout exceed for ' + name);
    }
    await wait(25);
    if (func()) {
      break;
    }
  }
  return true;
};

const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const searchPixel = (color, x, y, x2 = null, y2 = null, tolerance = 0.01, shouldSaveDebugScreenshot = false) => {
  if (!x2) {
    x2 = x;
  }

  if (!y2) {
    y2 = y;
  }

  const rgb = hexToRgb(color);
  const image = robot.screen.capture(x, y, x2 - x + 1, y2 - y + 1);
  const bitmapBuffer = image.image;
  const maxDifference = 255 * 3;
  const allowedDifference = tolerance * maxDifference;
  let coords;

  for (let i = 0; i < bitmapBuffer.length; i += 4) {
    // BGR format (bug in robotjs lib which output bgr instead of rgb format)
    const diff =
      Math.abs(bitmapBuffer[i] - rgb.b) + Math.abs(bitmapBuffer[i + 1] - rgb.g) + Math.abs(bitmapBuffer[i + 2] - rgb.r);

    if (diff <= allowedDifference) {
      const pixelIndex = i / 4;
      coords = {
        x: pixelIndex % image.width,
        y: Math.floor(pixelIndex / image.width),
      };
      break;
    }
  }

  // if (shouldSaveDebugScreenshot) {
  //   const jimpImage = new Jimp({ data: bitmapBuffer, width: image.width, height: image.height });
  //   jimpImage.writeAsync('./debug.jpg');
  // }

  if (!coords) {
    return null;
  }

  return {
    x: coords.x + x,
    y: coords.y + y,
  };
};

// Game creator
robot.setMouseDelay(30);
robot.setKeyboardDelay(5);

app.whenReady().then(() => {
  globalShortcut.register('F4', async () => {
    const name = (Math.random() + 1).toString(36).substring(7);
    console.log('name: ', name);

    robot.keyTap('escape');
    robot.moveMouse(1263, 635);
    robot.mouseClick();

    // Search for blue pixel on the right side
    await waitFor(() => searchPixel('345C7A', 1960, 128), 'game not quit');

    // Select create game tab
    robot.moveMouse(1697, 100);
    robot.mouseClick();

    // Party name
    robot.moveMouse(1777, 230);
    robot.mouseClick();
    robot.typeString(name);

    // Password
    robot.moveMouse(1777, 322);
    robot.mouseClick();
    robot.typeString('r');

    robot.keyTap('enter');
  });
});
