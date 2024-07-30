import React, { createContext, useEffect, useState } from "react";
import { setNotification } from "../jsx/helpers/Auth";

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
    const [notification, setNotifications] = useState([])

    const setNotificationInfo = (times, names) => {
        const infoArray = { time: times, name: names }
        setNotifications(current => [...current, infoArray])
    }

    useEffect(() => {
      setNotification( 'notification', notification )
    }, [notification])
    

    return (
        <NotificationContext.Provider
          value={{notification, setNotificationInfo}}
        >
          {props.children}
        </NotificationContext.Provider>
      );
}

export default NotificationContextProvider;