import React from 'react';

const ImageItem = (props) => {
    return(
        <article className="thumb">
            <a 
            className="image"
            style={{
                backgroundImage: `url(${props.src})`,
                cursor: 'pointer',
                outline: '0px'
            }}><img src={props.src} alt="" /></a>
            <h2>{props.source_url}</h2>
            <p></p>
        </article>
    )
}

export default ImageItem;