function Wrapper(props) {
  return (
    <>
      <div className="layout-wrapper">
        {props.children}
      </div>
      
      <style jsx>{`
        .layout-wrapper {
          //...
        }
      `}</style>
    </>
  );
}

export default Wrapper;