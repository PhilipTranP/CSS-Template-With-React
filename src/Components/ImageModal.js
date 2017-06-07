import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import Img from 'react-image'

const styles = {
    background: {
        position: 'absolute',
        filter: 'blur(5px)',
        cursor: 'pointer',
        //background: 'white',
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%)',
        //zIndex: 20003,
    },
    imageStyle: {
        //zIndex: 20004,
        maxWidth: '90%',
        maxHeight: '90%'
    }
};

class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: Object.assign({}, styles.background)
        }
    }


    render() {
        console.log("image #: " + this.props.imageToShow);
        debugger;
        return (
            <Motion
                style={{
                    opacity: spring(this.props.show ? .35 : 0),
                    top: spring(this.props.show ? 0 : 50),
                    left: spring(this.props.show ? 0 : 50),
                    bottom: spring(this.props.show ? 0 : 50),
                    right: spring(this.props.show ? 0 : 50),
                    imageVerticalScale: spring(this.props.show ? 1 : 0),
                }}>
                {({ opacity, top, left, bottom, right, imageVerticalScale }) =>
                    <div id='imageModal'
                        style={{
                            zIndex: 100,
                            position: 'fixed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: top + '%',
                            right: right + '%',
                            bottom: bottom + '%',
                            left: left + '%',
                        }}
                        onClick={this.props.close}>
                        <div id='modalBackground'
                            style={
                                Object.assign({}, this.state.style,
                                    {
                                        filter: 'blur(5px)',
                                        top: '0px',
                                        right: '0px',
                                        bottom: '0px',
                                        left: '0px',
                                    })
                            }
                            onClick={this.props.close}>

                            <div
                                className='closer'
                            ></div>
                        </div>
                        
                            <Img style={Object.assign({}, styles.imageStyle,
                                {
                                    transform: `scaleY(${imageVerticalScale})`
                                })}
                                src={
                                    this.props.imageToShow != undefined ?
                                        this.props.images[this.props.imageToShow].url[0] :
                                        null
                                } />
                        <div className='nav-previous' />
                    </div>
                }
            </Motion>
        )
    }
}

export default ImageModal;

