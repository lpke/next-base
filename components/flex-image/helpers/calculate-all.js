import calcImgPos from "components/flex-image/helpers/calc-img-pos";
import calcImgSize from "components/flex-image/helpers/calc-img-size";

export default function calculate(
  mode,
  [cWidth, cHeight],
  [iWidth, iHeight],
  [xPercent, yPercent]
) {

  const targetSize = calcImgSize(...arguments);
  const targetPos = calcImgPos(
    mode,
    [cWidth, cHeight],
    [xPercent, yPercent],
    targetSize
  );

  return {
    width: targetSize[mode].width,
    height: targetSize[mode].height,
    left: targetPos.left,
    top: targetPos.top,
  };
}
