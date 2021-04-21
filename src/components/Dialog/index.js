import React from 'react';

import './index.scss';

function Dialog(props) {

    const { imgUrl, title, text, onSubmit, onCancel } = props;

    return (
        <div className="aipin-dialog">
            <img src={imgUrl} alt={title} className="dialog-img" />
            {title && <p className="dialog-title">{title}</p>}
            {text && <p className="dialog-text">{text}</p>}

            <div className="dialog-buttons">
                {onSubmit && <button onClick={onSubmit}>确认</button>}
                {onCancel && <button onClick={onCancel}>取消</button>}
            </div>

        </div>
    );
}

export default Dialog;