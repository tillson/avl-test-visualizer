import React from 'react';

class AVLWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    render() {
        if (this.state.visible) {
            return (<div className={"alert alert-" + this.props.type } role="alert">
                { this.props.text }
            </div>
            )
        }
    }

  }

  export default AVLWidget;