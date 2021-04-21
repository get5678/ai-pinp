import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_ARROW } from '../../const';
import { throttle } from '../../utils';
import './index.scss';

function ArrowBack(props) {

    const { toPlace, style, color = '#fff' } = props;

    const handleToBack = throttle(() => {
        window.history.back();
    }, 200)

    return (
        <>
        {
            toPlace ? 
            <Link to={toPlace} style={style} className="backicon-container">
                <img src={IMAGE_ARROW} alt="back" className="backicon"
                    style={{filter: `drop-shadow(0 4rem 0 ${color})`}}
                />
            </Link>
            :
            <div onClick={handleToBack} style={style} className="backicon-container">
                <img src={IMAGE_ARROW} alt="back" className="backicon"
                    style={{filter: `drop-shadow(0 4rem 0 ${color})`}}
                />
            </div>
        }
        </>
    );
}

export default ArrowBack;