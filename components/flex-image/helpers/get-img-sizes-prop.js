export default function getImgSizesProp(iWidth, screenWidths) {
  let target;

  const secondLargestWidth = screenWidths[screenWidths.length - 2];
  // if img width is larger than second largest width, use largest width
  if (iWidth > secondLargestWidth) {
    target = screenWidths.pop();
  } else {
    for (let i = 0; i < screenWidths.length; i++) {
      // if img width is in between current number and next, use next number
      if (iWidth > screenWidths[i] && iWidth <= screenWidths[i + 1]) {
        target = screenWidths[i + 1];
        break;
      }
    }
  }

  return target || screenWidths[0];
}