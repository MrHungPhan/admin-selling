import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class AlertMess extends React.Component {

    createNotification = (type, message) => {
          switch (type) {
            case 'info':
                return NotificationManager.info(message);
              break;
            case 'success':
                return NotificationManager.success(message, 'Thông báo', 2000);
              break;
            case 'warning':
            return NotificationManager.warning(message);
              break;
            case 'error':
            return NotificationManager.error(message);
              break;
          }
        };

    componentDidMount(){
        setTimeout(() => {
            this.props.resetMessage()
        }, 2000);
    }

    render() { 
   
        const { type, message } = this.props
        return <div id="alert-message">
              {this.createNotification(type, message)}
        </div>

    }
}
 
export default AlertMess;