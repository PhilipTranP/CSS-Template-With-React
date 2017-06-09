import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import Loader from 'react-loader';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdClose from 'react-icons/lib/md/close';

class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftActive: false,
            rightActive: false,
            closeActive: false,
            show: false,
            imageToShow: undefined,
            images: [],
            showCaption: false,
            containerPosition: new Animated.Value(50),
            imageVerticalScale: new Animated.Value(0),
            captionOpacity: new Animated.Value(0),
            captionScale: new Animated.Value(0),
            leftOpacity: new Animated.Value(.5),
            rightOpacity: new Animated.Value(.5),
            closeOpacity: new Animated.Value(.5),
        }
    }

    clickHandler(name) {
        switch (name) {
            case 'left':
                this.setState({ imageToShow: (this.state.imageToShow - 1) % this.state.images.length });
                break;
            case 'right':
                this.setState({ imageToShow: (this.state.imageToShow + 1) % this.state.images.length });
                break;
            case 'close':
                this.close();
                break;
        };
        console.log('change image to: ' + this.state.imageToShow);
    }

    handleMouseEnter(name) {
        switch (name) {
            case 'left':
                this.setState({ leftActive: true });
                break;
            case 'right':
                this.setState({ rightActive: true });
                break;
            case 'close':
                this.setState({ closeActive: true });
                break;
        }
    }
    handleMouseLeave(name) {
        switch (name) {
            case 'left':
                this.setState({ leftActive: false });
                break;
            case 'right':
                this.setState({ rightActive: false });
                break;
            case 'close':
                this.setState({ closeActive: false });
                break;
        }
    }

    handleBackgroundClick(proxy, event) {
        /*if (event.target.getAttribute("id") === 'imageModal') {
            this.close();
        }*/
    }

    close() {
        this.setState({ show: false });
        this.props.closeCallback();
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        this.setState({
            images: nextProps.images,
            imageToShow: nextProps.imageToShow,
            show: nextProps.show
        });
        if (nextProps.show) {
            this.showContainerAnimation();
        }
        if(!nextProps.show){
            //this.hideContainerAnimation();
        }
    }
    showContainerAnimation() {
      /*  this.state.containerPosition.setValue(0);
    this.state.imageVerticalScale.setValue(1);*/
        Animated.spring(this.state.containerPosition, { toValue: 0 }).start();
        Animated.spring(this.state.imageVerticalScale, { toValue: 1 }).start();
    }
    hideContainerAnimation(){
        Animated.spring(this.state.containerPosition, {toValue: 50 }).start();
        Animated.spring(this.state.imageVerticalScale, {toValue: 0 }).start();
    }

    render() {
        console.log("image #: " + this.state.imageToShow);
                    console.log(this.state.containerPosition);

        return (

            <Animated.div id='imageModal'
                style={{
                    zIndex: 100,
                    position: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: this.state.containerPosition._value + '%',
                    right: this.state.containerPosition._value + '%',
                    bottom: this.state.containerPosition._value + '%',
                    left: this.state.containerPosition._value + '%',
                }}
                onClick={this.handleBackgroundClick.bind(this)}>
                <div id='pictureContainer'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `scaleY(${this.state.imageVerticalScale})`,
                        maxWidth: '75%',
                        maxHeight: '75%',
                        minWidth: '20%',
                        minHeight: '20%',
                        boxShadow: `0px 0px 5px 1px rgba(0,0,0,0.75)`,
                        backgroundImage: `url(${this.state.imageToShow != undefined ?
                            this.state.images[this.state.imageToShow].url[0] :
                            `images/fulls/01.jpg`})`,
                    }}>

                </div>

            </Animated.div>

        )
    }
}

export default ImageModal;

