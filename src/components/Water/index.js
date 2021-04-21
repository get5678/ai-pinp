import React, { useEffect } from 'react';

function Water(props) {
    

    const {
        children,
        containerWidth,
        itemWidth,
        itemGap,
        itemCol
    } = props;

    console.log(children[0], 'props');
    let itemClass = children[0]?.props?.className;
   

    

    useEffect(() => {
        const lis = document.getElementsByClassName(itemClass);
        console.log('class', lis)
    }, [])

    return (
        <div>
            11
            {children}
        </div>
    );
}

export default Water;