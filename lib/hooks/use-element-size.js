import { useEffect, useState } from "react";
import { debounce } from "underscore";

// returns debounced state for an element's size
function useElementSize(elementNode, debounceDelay = 80) {
  const [width, setWidth] = useState(-1);
  const [height, setHeight] = useState(-1);

  function update() {
    const newWidth = Math.round(elementNode.getBoundingClientRect().width);
    const newHeight = Math.round(elementNode.getBoundingClientRect().height);

    setWidth(newWidth);
    setHeight(newHeight);
  }

  const debouncedUpdate = debounce(update, debounceDelay);

  useEffect(() => {
    if (elementNode) {
      update();

      const resizeObserver = new ResizeObserver((entries) => {
        debouncedUpdate();
      });

      resizeObserver.observe(elementNode);

      return function cleanUp() {
        resizeObserver.unobserve(elementNode);
      };
    }
  }, [elementNode]);

  return { width, height };
}

export default useElementSize;