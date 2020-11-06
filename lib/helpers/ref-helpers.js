import { createRef } from "react";

// the setRef and getRef helpers are based on the npm package "use-dynamic-refs"
// it works by creating a setter and getter function to be able to dynamically create refs
// and store their names as keys in an "Map" object
const mapOfRefs = new Map();

// create a react ref which will be stored in the mapOfRefs with key being the ref name
function setRef(key) {
  if (typeof key === "string") {
    const ref = createRef();
    mapOfRefs.set(key, ref);
    return ref;
  } else {
    console.warn("useDynamicRefs: Cannot set ref without providing a key.");
    return null;
  }
}

// returns a ref from mapOfRefs by it's key (as created when using setRef)
function getRef(key) {
  if (typeof key === "string") {
    return mapOfRefs.get(key);
  } else {
    console.warn("useDynamicRefs: Cannot get ref without providing a key.");
    return null;
  }
}

export { setRef, getRef };