// grows image dimensions while maintaining aspect ratio

export default function scaleDimensions([width, height], change, axis = "y") {
  const oppAxis = axis === "x" ? "y" : "x";

  const newSize = {};
  const oldSize = {
    x: width,
    y: height,
  };

  newSize[axis] = oldSize[axis] + change;
  const scaleFactor = newSize[axis] / oldSize[axis];
  newSize[oppAxis] = scaleFactor * oldSize[oppAxis];

  return newSize;
}