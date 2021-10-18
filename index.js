// const { app, globalShortcut } = require('electron')
// var robot = require("robotjs");

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




// Game creator

robot.setMouseDelay(40);
robot.typeStringDelayed(1);

app.whenReady().then(() => {
  globalShortcut.register('F4', () => {
    const name = (Math.random() + 1).toString(36).substring(4, 9);
    console.log('name: ', name)

    robot.keyTap('escape');
    robot.moveMouse(1263,635);
    robot.mouseClick('left');

    robot.moveMouse(1697,100);
    robot.mouseClick('left');
    // name party
    robot.moveMouse(1777,230);
    robot.mouseClick();
    robot.typeString(name);

    robot.moveMouse(1777,322);
    robot.mouseClick();
    robot.typeString('r');

    robot.keyTap('enter');
    });
})


