import React, { Component } from 'react';
import { fadeIn } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';


class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            styles: StyleSheet.create({
                fadeIn: {
                    animationName: fadeIn,
                    animationDuration: props.duration + 's'
                }
            })
        }
    }

    render() {
        let imgSrc = this.props.src;
        if (this.props.test) {
            imgSrc = "images/fulls/01.jpg"
        }
        return (
            <article className="thumb"
                ref={(component) => this.myComponent = component}
                onClick={this.props.onClick}>
                <a className={"image " + css(this.state.styles.fadeIn)}
                    style={{
                        backgroundImage: `url(${imgSrc})`,
                        cursor: 'pointer',
                        outline: `0px`,
                        filter: this.props.showImageModal? 'blur(.5)' : ''
                    }}>
                </a>
                <h2>{this.props.source_url}</h2>
                <p></p>
            </article>
        )
    }
}

export default ImageItem;