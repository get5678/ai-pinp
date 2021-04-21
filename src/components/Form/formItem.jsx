/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { PS, PH, CA, BU } from './const';
import { IMAGE_PHONE, IMAGE_CAPTCHA, IMAGE_LOCK, IMAGE_EYECLOSED, IMAGE_EYEOPEND } from '../../const';

import './formItem.scss';
import getCaptcha from '../../captcha';
import { debounce } from '../../utils';

function Phone(props) {

    const { prefix, placeholder, value } = props;
    const phonePatt = /^1[3-9]\d{9}$/;

    const handleToChange = e => {

        let phone = e?.target?.value || undefined;
        if (phone && phonePatt.test(phone)) {
            value.phone = phone;
        } else {
            value.phone = false;
        }
    }

    return (
        <div className="item phone">
            <img src={IMAGE_PHONE} alt={PH} />
            { prefix ? <p>{prefix}</p> : null }
            <input
                className="item-input"
                type="text"
                maxLength={11}
                name={PH}
                placeholder={placeholder}
                pattern={`/^1[3-9]\d{9}$/`}
                onChange={debounce(e => handleToChange(e), 400)}
            />
        </div>
    )
}

function Password(props) {

    const { placeholder,  open, twice = false, value} = props;

    const [isopen, setIsOpen] = useState(open);

    const handleToOpen = () => {
        setIsOpen(pre => !pre);
    }

    const handleToChange = e => {

        let password = e?.target?.value || undefined;
        if (!twice) {
            value.password = password ? password : false;
        }else {
            console.log('value\n', value)
            if (value?.password && value.password === password) {
                value.repeatpassword = password;
            } else {
                value.repeatpassword = false;
            }
            
        }
    }

    return (
        <div className="item password">
            <img src={IMAGE_LOCK} alt={PS} className="item-img" />
           
            <input
                className="item-input"
                type={isopen ? 'text' : PS}
                name={PH}
                placeholder={placeholder}
                onChange={debounce(e => handleToChange(e), 400)}
            />
            <img 
                src={isopen ? IMAGE_EYEOPEND : IMAGE_EYECLOSED } 
                alt={PS}
                onClick={handleToOpen}
            />
        </div>
    )
}

function Captcha(props) {
    const { placeholder, value } = props;
   
    let itemCaptcha = useRef(null);

    const captchaRef = useRef(null);

    const handleToValidateCaptcha = (e) => {
        
        let captcha = e?.target?.value || undefined;

        if (captcha) {
            let validate = itemCaptcha.current.validate(captcha);
            value.captcha = validate;
        }
        
    };

    useEffect(() => {
        const captchaInit = Object.assign({}, captchaRef, {width: '74', height: '34'});
        itemCaptcha.current =  getCaptcha(captchaInit);
    }, []);

    


    return (
        <div className="item captcha">
            <img src={IMAGE_CAPTCHA} alt={CA} />
            <input
                className="item-input"
                style={{width: '14rem'}}
                type="text"
                maxLength={4}
                placeholder={placeholder}
                onChange={debounce((e) => handleToValidateCaptcha(e), 400)}
            />

            <hr className="item-hr" />

            <button ref={captchaRef} className="captcha-but" />
            
        </div>
    )
}

function Button(props) {
    const { children, ...ret } = props;

    return (
        <div {...ret} className="item item-button" >
            {children}
        </div>
    )
}

function FormItem(props) {

    const chooseItem = (props) => {

        const {
            type,
            ...ret
        } = props;

        switch(type) {
            case PH:
                return <Phone {...ret}/>;

            case PS:
                return <Password {...ret} />;
            
            case CA:
                return <Captcha {...ret} />;

            case BU:
                return <Button {...ret} />;
                
            default: 
                return null;
        }
    }

    return(
        <> 
        {chooseItem(props)}
        </>
    )
   
}

export default FormItem;