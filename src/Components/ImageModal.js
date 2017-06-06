import React, { Component } from 'react';
import { fadeIn, fadeOut } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import { Motion, spring } from 'react-motion';

const styles = {
    background: {
        position: 'fixed',

        backgroundColor: 'blue',
        zIndex: 2000,
    },
    fadeIn: {
        animationName: fadeIn,
        animationDuration: '2s'
    },
    fadeOut: {
        animationName: fadeOut,
        animationDuration: '1s'
    }
};



class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: Object.assign({}, styles.background)
        }
    }

    /*componentWillReceiveProps(nextProps){
        debugger
        if(nextProps.show){
            this.setState({style: Object.assign({}, styles.background, styles.fadeIn)})
        }
        else{
            this.setState({style: Object.assign({}, styles.background, styles.fadeOut)})
        }
    }*/
    render() {
        return (
            <Motion
                style={{
                    opacity: spring(this.props.show ? .35 : 0),
                    // width: spring(this.props.show ? 1 : .25),
                    top: spring(this.props.show ? 0 : 50),
                    left: spring(this.props.show ? 0 : 50),
                    bottom: spring(this.props.show ? 0 : 50),
                    right: spring(this.props.show ? 0 : 50),
                }}>
                {({ opacity, top, left, bottom, right }) =>
                    <div id='ImageModal'
                        style={
                            Object.assign({}, this.state.style,
                                {
                                    opacity: opacity,
                                    top: top + '%',
                                    right: right + '%',
                                    bottom: bottom + '%',
                                    left: left + '%',
                                })
                        }
                        onClick={this.props.close}>
                        <div
                            className='closer'
                        ></div>
                    </div>
                }
            </Motion>
        )
    }
}

export default ImageModal;

