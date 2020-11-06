import scaleDimensions from "components/flex-image/helpers/scale-dimensions";

// calculates an image's necessary size to fit in a given container

export default function calcImgSize(
  mode,
  [cWidth, cHeight],
  [iWidth, iHeight]
) {
  const cRatio = cWidth / cHeight;
  const iRatio = iWidth / iHeight;

  const vGap = cRatio < iRatio; // vertical gap (img wider aspect than the container)
  const hGap = cRatio > iRatio; // horizontal gap (img narrower aspect than the container)

  const fit = {};
  const fill = {};

  // calculating dimensions img must be to fit inside container
  if (vGap) {
    fit.width = cWidth;
    fit.height = (cWidth / iWidth) * iHeight;
  } else if (hGap) {
    fit.width = (cHeight / iHeight) * iWidth;
    fit.height = cHeight;
  } else {
    fit.width = cWidth;
    fit.height = cHeight;
  }

  // additional calculations for image to then fill container
  if (mode === "fill") {
    let difference;
    let scaled;

    if (vGap || hGap) {
      if (vGap) {
        difference = cHeight - fit.height;
        scaled = scaleDimensions([fit.width, fit.height], difference, "y");
      } else if (hGap) {
        difference = cWidth - fit.width;
        scaled = scaleDimensions([fit.width, fit.height], difference, "x");
      }
      fill.width = scaled.x;
      fill.height = scaled.y;
    } else {
      fill.width = cWidth;
      fill.height = cHeight;
    }
  }

  return { fit, fill };
}