import React, { Component } from "react";
import mirador from "mirador";

class Mirador extends Component {
  useEffect() {
    const { config } = this.props;

    const thisOne = {
      id: 'arg',
      windows: {
        manifestId: config.value
      },
      window: {
        allowClose: false,
        allowWindowSideBar: false,
      }
    }
    mirador.viewer(thisOne);
  }
  render() {
    return <div id={thisOne.id} />;
  }
}

export default Mirador;
