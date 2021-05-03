import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_ARROW } from '../../const';
import { throttle } from '../../utils';
import './index.scss';

function ArrowBack(props) {

    const { toPlace, style, color = '#fff', imgSrc = IMAGE_ARROW, handleToClick } = props;

    const handleToBack = throttle(() => {
        if (typeof handleToClick === 'function') handleToClick();
        window.history.back();
    }, 200)

    return (
        <>
        {
            toPlace ? 
            <Link to={toPlace} style={style} className="backicon-container">
                <img src={imgSrc} alt="back" className="backicon"
                    style={{filter: `drop-shadow(0 4rem 0 ${color})`}}
                />
            </Link>
            :
            <div onClick={handleToBack} style={style} className="backicon-container">
                <img src={imgSrc} alt="back" className="backicon"
                    style={{filter: `drop-shadow(0 4rem 0 ${color})`}}
                />
            </div>
        }
        </>
    );
}

export default ArrowBack;