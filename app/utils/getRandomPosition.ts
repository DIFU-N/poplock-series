export const getRandomPosition = () => {
  const BUTTON_SIZE = 60;
  const PADDING = 16;

  const maxX = window.innerWidth - BUTTON_SIZE - PADDING * 2;
  const maxY = window.innerHeight - BUTTON_SIZE - PADDING * 2;

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  return { x, y };
};

// export const getRandomPosition = () => {
//   const range =
//     window.innerWidth < 500
//       ? 120
//       : window.innerWidth < 850
//       ? 160
//       : 220;

//   const angle = Math.random() * Math.PI * 2;
//   const radius = 80 + Math.random() * (range / 2);

//   return {
//     x: Math.cos(angle) * radius,
//     y: Math.sin(angle) * radius,
//   };
// };

// let lastPosition = { x: 0, y: 0 };
// export const getRandomPosition = () => {
//   const widths = [0, 500, 850];
//   let range = 100;

//   function resizeFn() {
//     if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
//       range = 100;
//     } else if (
//       window.innerWidth >= widths[1] &&
//       window.innerWidth < widths[2]
//     ) {
//       range = 120;
//     } else {
//       range = 200;
//     }
//   }
//   window.onresize = resizeFn;
//   resizeFn();
//   const minDistance = 80;

//   let x = 0;
//   let y = 0;
//   let dx = 0;
//   let dy = 0;

//   do {
//     x = Math.random() * range - range / 2;
//     y = Math.random() * range - range / 2;

//     dx = x - lastPosition.x;
//     dy = y - lastPosition.y;
//   } while (Math.sqrt(dx * dx + dy * dy) < minDistance);

//   lastPosition = { x, y };

//   return { x, y };
// };
