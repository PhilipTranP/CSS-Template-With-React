import React from 'react';

const ImageItem = (props) => {
    return(
        <article className="thumb">
            <a href={props.src} className="image"><img src={props.src} alt="" /></a>
            <h2>{props.source_url}</h2>
            <p></p>
        </article>
    )
}

export default ImageItem;