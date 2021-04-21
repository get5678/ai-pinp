import React from 'react';
import { debounce } from '../../utils';

const ButtonStyle = {
    width: '8.8rem',
    height: '4rem',
    lineHeight: "4rem",
    background: "#ffffff",
    border: "1px solid #797979",
    borderRadius: "2.1rem",
    fontSize: "1.8rem",
    textAlign: "center",
    color: "#333333"
};

function MyButton(props) {

    const { text = '保存', handleToSubmit } = props;

    const handleToClick = (e) => {
        console.log('e', e);

        if (typeof(handleToSubmit) === 'function') {
            handleToSubmit();
        }
    }

    return (
        <div style={ButtonStyle} onClick={debounce(e => handleToClick(e), 200)}>
            {text}
        </div>
    );
}

export default MyButton;