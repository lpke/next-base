class Wrapper extends React.Component {
  
  render() {
    return (
      <div className="layout-wrapper">

        {this.props.children}

      </div>
    );
  }
}

export default Wrapper;