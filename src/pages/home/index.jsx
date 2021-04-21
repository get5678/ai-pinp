import React from 'react';
import { IMAGE_TITLE, IMAGE_PHONE, IMAGE_USER, IMAGE_LOVE } from '../../const';

import Icon from '../../components/Icon/index';
import './index.scss'

function Home(props) {
    return (
        <div className="aipin-index">
        <div className="index-image">
          <img src={IMAGE_TITLE} alt="aipin" className="index-image-signal"/>
        </div>

        <div className="index-nav">
          
          <Icon imgURL={IMAGE_PHONE} iconText="注册" iconLink="/register" />
          <Icon imgURL={IMAGE_USER} iconText="登录" iconLink="/login" />
          <Icon imgURL={IMAGE_LOVE} iconText="游客" iconLink="/index" />
        </div>
    </div>
    );
}

export default Home;