// import robot from 'robotjs';
const robot = require('robotjs');
// import Jimp from 'jimp';

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
