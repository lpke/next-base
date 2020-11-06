// calculates the image's 'top' and 'left' values so it can be absolutely positioned inside
// it's parent container around a focus point as specified by the component prop 'focusPoint'

const makeNegative = (num) => num - (num * 2);
const isNegative = (num) => num < 0;

export default function calcImgPos(
  mode,
  [cWidth, cHeight],
  [xPercent, yPercent],
  tSize
) {
  // getting image's target width/height (pre calculated by calcImgSize)
  // the [mode] dynamically pulls out the target size relevant for the cover mode in use
  const tWidth = tSize[mode].width;
  const tHeight = tSize[mode].height;

  // getting percentage focus point number as fraction, with fallback
  let fx = xPercent / 100;
  let fy = yPercent / 100;
  if (typeof xPercent !== "number" || typeof yPercent !== "number") {
    fx = 0.5;
    fy = 0.5;
  }

  // getting the center coordinates for container (focus point align target)
  // and focus coordinates for the image (to become center of container if possible)
  const containerCenter = [cWidth / 2, cHeight / 2];
  const imageFocusPoint = [tWidth * fx, tHeight * fy];

  const move = { X: {}, Y: {} };
  
  ["X", "Y"].forEach((pos, index) => {
    const target = pos === "X" ? tWidth : tHeight;
    const container = pos === "X" ? cWidth : cHeight;

    move[pos].ideal = containerCenter[index] - imageFocusPoint[index];
    const idealDiff = Math.abs(move[pos].ideal);
    const maxDiff =
      mode === "fill" && move[pos].ideal >= 0 ? 0 : Math.abs(target - container);

    move[pos].max = isNegative(move[pos].ideal)
      ? makeNegative(maxDiff)
      : maxDiff;
    move[pos].actual = maxDiff >= idealDiff
      ? move[pos].ideal
      : move[pos].max;
  });

  return {
    left: move.X.actual,
    top: move.Y.actual,
  };
}