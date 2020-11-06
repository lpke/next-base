import { useEffect, useState } from "react";
import useElementSize from "lib/hooks/use-element-size";
import calculate from "components/flex-image/helpers/calculate-all";
import getImgSizesProp from "components/flex-image/helpers/get-img-sizes-prop";
import Image from "next/image";

const imgSizes = [320, 420, 768, 1024, 1200, 1440, 1920, 2560, 3000, 3500, 4000];
const containerDefault = ["100%", "100%"];
const coverDefault = "fill";
const focusDefault = [50, 50];

function FlexImage({
  width,
  height,
  className, // disabled
  containerClassName,
  imgClassName,
  containerBackground,
  devMode, // an inspect tool for this component
  container = containerDefault,
  cover = coverDefault,
  focusPoint = focusDefault,
  debounceDelay = 8,
  ...props
}) {
  // image variants based on sizes
  const images = (() => {
    const variants = [];

    for (let i = 0; i < imgSizes.length; i++) {
      variants.push(
        <div
          className="img__image-holder"
          data-image-size={imgSizes[i]}
        >
          <Image
            className={imgClassName}
            width={width}
            height={height}
            sizes={`${imgSizes[i]}px`}
            {...props}
          />
        </div>
      );
    }

    return variants;
  })();

  // component state
  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [coverMode, setCoverMode] = useState(null);
  const [focus, setFocus] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeImgSize, setActiveImgSize] = useState(imgSizes[0]);
  const [activeImg, setActiveImg] = useState(images[0]);
  const [highestImgSize, setHighestImgSize] = useState(imgSizes[0]);
  const [previousImg, setPreviousImg] = useState(null);

  // dynamically getting img and container sizes
  const [containerRef, setContainerRef] = useState(null);
  const containerSize = useElementSize(containerRef, debounceDelay);
  const [imgRef, setImgRef] = useState(null);
  const imgSize = useElementSize(imgRef, debounceDelay);

  // prop interpretations to simplify code later
  const dimensionsValid =
    typeof container === "object" &&
    typeof container[0] === "string" &&
    typeof container[1] === "string" &&
    container.length === 2;
  const coverModeValid =
    dimensionsValid && (cover === "fill" || cover === "fit");
  const focusPointValid =
    typeof focusPoint === "object" &&
    typeof focusPoint[0] === "number" &&
    typeof focusPoint[1] === "number" &&
    focusPoint.length === 2;

  function getImgBySize(sizeNum) {
    const index = imgSizes.indexOf(sizeNum);
    return typeof index === "number" && index >= 0 ? images[index] : null;
  }

  // Helper functions to aid the sizing and positioning of the img-sizer element
  function setImgDimensions(w, h, ceil = true) {
    imgRef.style.width = `${ceil ? Math.ceil(w) : w}px`;
    imgRef.style.height = `${ceil ? Math.ceil(h) : h}px`;
  }
  function setImgPos(pos, num) {
    imgRef.style[pos] = `${num.toString()}px`;
  }

  function handleImgCover(mode) {
    if (containerSize.width !== -1 && imgSize.width !== -1) {
      // run calculations externally and store inside this variable
      const calculations = calculate(
        mode,
        [containerSize.width, containerSize.height],
        [width, height],
        focus
      );

      // sizing and positioning the img-sizer element before img loads
      setImgDimensions(calculations.width, calculations.height);
      setImgPos("top", calculations.top);
      setImgPos("left", calculations.left);

      // finally, load the <Img> component inside the image-sizer element
      if (!imgLoaded) setImgLoaded(true);
    }
  }

  function setSmartProps() {
    if (dimensionsValid) {
      setContainerWidth(container[0]);
      setContainerHeight(container[1]);
    } else {
      console.error(
        `FlexImage: Error detected in the 'container' prop. Must be in the format: ['width', 'height']. Using default value of ["${containerDefault[0]}", "${containerDefault[1]}"].`
      );
      setContainerWidth(containerDefault[0]);
      setContainerHeight(containerDefault[1]);
    }

    if (coverModeValid) setCoverMode(cover);
    else {
      console.error(`FlexImage: Error detected in the 'cover' prop. Must be either 'fit' or 'fill'. Using default value of '${coverDefault}'.`);
      setCoverMode(coverDefault);
    }

    if (focusPointValid) setFocus(focusPoint);
    else {
      console.error(`FlexImage: Error detecteed in the 'focusPoint' prop. Must be in the format: [verticalNum, horizontalNum]. Using default value of [${focusDefault[0]}, ${focusDefault[1]}]`);
      setFocus(focusDefault);
    }
  }

  useEffect(() => {
    setSmartProps();

    if (className) {
      console.warn(
        "FlexImage: className has been intentionally disabled. Use containerClassName or imgClassName instead."
      );
    }
  }, []);

  useEffect(() => {
    handleImgCover(coverMode);
  }, [coverMode]);

  /* Re-run cover calculations whenever the img container's size changes.
  The change is detected by the useElementSize hook (resize observer) */
  useEffect(() => {
    handleImgCover(coverMode);
  }, [containerSize.width, containerSize.height]);

  useEffect(() => {
    const nextImgSize = getImgSizesProp(imgSize.width, imgSizes);
    if (nextImgSize > highestImgSize) {
      setActiveImgSize(nextImgSize);
      setHighestImgSize(nextImgSize);
    }
  }, [imgSize.width]);

  useEffect(() => {
    if (activeImg) setPreviousImg(activeImg);
  }, [activeImgSize]);

  useEffect(() => {
    if (coverMode && previousImg !== false) {
      setActiveImg(getImgBySize(activeImgSize));
    }
  }, [previousImg]);

  return (
    <>
      <div
        className={`img__container${
          containerClassName ? ` ${containerClassName}` : ""
        }`}
        ref={setContainerRef}
      >
        <div className="img__image-sizer" ref={setImgRef}>
          {imgLoaded && previousImg}
          {imgLoaded && activeImg}
        </div>

        {devMode && (
          <div className="img__devmode-details">
            <div className="data">
              Container:
              <br />
              {containerSize.width} {containerWidth === "auto" && " (auto)"}x{" "}
              {containerSize.height} {containerHeight === "auto" && " (auto)"}
            </div>

            <div className="data">
              Image:
              <br />
              {imgSize.width} x {imgSize.height}
            </div>

            <div className="data">
              Cover:
              <br />
              {coverMode || "none"}
            </div>

            <div className="data">
              Sizes:
              <br />
              {activeImgSize}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import "styles/mixins.scss";

        .img {
          &__container {
            width: ${containerWidth};
            height: ${containerHeight};
            position: relative;
            overflow: hidden;
            ${containerBackground ? `background: ${containerBackground};` : ""}
          }

          &__image-sizer {
            ${coverMode ? "position: absolute;" : ""}
          }

          &__devmode-details {
            @include flex(row, flex-start);
            background: rgba(0, 0, 0, 0.8);
            padding: 2px;
            position: absolute;
            bottom: 0;
            left: 0;

            .data {
              font-size: 13px;
              margin: 0;

              &:not(:last-of-type) {
                margin-right: 10px;
              }
            }
          }
        }

        :global(.img__image-holder) {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  );
}

export default FlexImage;
