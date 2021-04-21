import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './toast'

// 注入
function createNotification() {

    const toastRef = React.createRef();

    const div = document.createElement('div');
    document.body.appendChild(div);

    ReactDOM.render(<Toast ref={toastRef} />, div);

    return {
        addNotice(notice) {
        return toastRef.current.addNotice(notice);
        },
        destroy() {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        }
    }
}

let notification;

const notice = ({type, title, content, duration = 2000, onClose, onSubmit}) => {
  if (!notification) notification = createNotification();
  return notification.addNotice({ type, title, content, duration, onClose, onSubmit })
}

const ToastLists = {
    info(content, duration, onClose) {
        return notice({
            type: 'info', 
            content, 
            duration, 
            onClose
        })
    },
    success(content, duration, onClose) {
        return notice({
            type: 'success', 
            content, 
            duration, 
            onClose
        })
    },
    error(content, duration , onClose) {
        return notice({
            type: 'error', 
            content, 
            duration, 
            onClose
        })
    },
    loading(content, duration = 0, onClose) {
        return notice({
            type: 'loading', 
            content, 
            duration, 
            onClose
        })
    },
    dialog({title, content, duration = 0, onClose, onSubmit}) {
        return notice({
            type: 'dialog', 
            title, 
            content, 
            duration, 
            onClose,
            onSubmit
        })
    }
}

export default ToastLists;