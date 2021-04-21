import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Index from './pages/index';
import Beautify from './pages/beautify';
import Splice from './pages/splice';
import Spliceedit from './pages/spliceedit';
import Video from './pages/video';
import Mine from './pages/mine';


import './App.scss';

export const imageContext = createContext();

function App() {

  useEffect(() => {
    let height = window?.innerHeight;
   
    let body = document.getElementsByTagName('body')[0];
    body.style.height = `${height}px`;

  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/index" component={Index} />
        <Route path="/beautify" component={Beautify} />
        <Route path="/splice" component={Splice} >
          <Route path="/edit" component={Spliceedit} />
        </Route>
        <Route path="/video" component={Video} />
        <Route path="/mine" component={Mine} />
       
        <Redirect from="*" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;



// import OSS from 'ali-oss';

// import { Upload, Icon, Spin } from 'antd';

// const cdnPath = '你的cdn地址';

// const VideoUploader = props => {

//   // 上一个组件传来的修改资源URL的函数，可用于展示远程的资源
//   const changeSrc = props.changeSrc;
//   const [show, changeShow] = useState(false);

//   const fileList = [];
//   const client = self => {
//     return new OSS({
//       region: 'oss-cn-hangzhou',
//       accessKeyId: 'accessKeyId',
//       accessKeySecret: 'accessKeySecret',
//       bucket: 'bucket',
//     });
//   };

//   const uploadPath = (path, file) => {
//     return `${path}/${file.name.split('.')[0]}-${file.uid}.${file.type.split('/')[1]}`;
//   };

//   const UploadToOss = (self, path, file) => {
//     const url = uploadPath(path, file);
//     return new Promise((resolve, reject) => {
//       client(self)
//         .multipartUpload(url, file)
//         .then(data => {
//           resolve(data);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   };

//   const beforeUpload = file => {
//     changeShow(true);
//     const floder = 'kyc';
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       UploadToOss(this, floder, file)
//         .then(data => {
//           changeShow(false);
//           return data;
//         })
//         .then(data => {
//           changeSrc(`${cdnPath}${data.name}?uploadId=video`);
//         });
//     };

//     return false;
//   };

//   const uploadProps = {
//     beforeUpload: beforeUpload,
//     fileList: fileList,
//     accept: 'video/*',
//     listType: 'picture-card',
//   };

//   const uploadButton = (
//     <div>
//       <Icon type="plus" />
//       <div className="ant-upload-text">Upload</div>
//     </div>
//   );

//   return (
//     <div>
//       {show === true ? (
//         <Spin style={{ position: 'relative', left: '40px' }} />
//       ) : (
//         <Upload {...uploadProps}>{uploadButton}</Upload>
//       )}
//       <br />
//     </div>
//   );
// };

// export default VideoUploader;