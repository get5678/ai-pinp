import React from 'react';

import './formall.scss';


function Formall(props) {


    const { children, style } = props;
   

    return (
        <div className="form-all" style={style}>
            {/* {
                React.Children.map(children, child => {
                   
                    if (!React.isValidElement(child)) return null;
                   
                    if (child?.props?.type === BU && typeof(child.props.onClick) === 'function') {

                        const prefun = child.props.onClick;

                        const childProps = {
                            ...child.props,
                            onClick: () => {
                                const res = handleToSubmit();
                                if (res) prefun();
                            },
                        }
                        return React.cloneElement(child, childProps);
                    }
                    return child;
                })
            } */}
            {children}
        </div>
    );
}

export default Formall;