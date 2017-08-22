import {toast} from 'react-toastify';
import React from 'react'
import _ from 'lodash'

export default class Notifications {
    static initPromiseHandling() {
        const debounceNotification = _.debounce(() => {
            Notifications.ToastDefaultError()
        }, 300, {
            'leading': true,
            'trailing': false
        })
        window.addEventListener("unhandledrejection", function (reason, p) {
            debounceNotification()
           // console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
            //throw reason; // optional, in case you want to treat these as errors
        });
    }

    /**
     *
     * @param type {string}
     * @param message {string} or {Array <string>}
     */
    static Toast(type, messages) {
        //TODO:  Abstract to helper/utils
        messages = _.isArray(messages) ? messages : [messages]
        const Messages = (props) => {
            return (
                <div>
                    {_.map(props.messages, ((message) => {
                        return (<div key={_.uniqueId('notification')}><span>{message}</span></div>)
                    }))}
                </div>
            )
        }
        toast(<Messages messages={messages}/>, {type: type, autoClose: true})
    }

    /**
     * Toast Info
     * @param message {string} or {Array <string>}
     */
    static ToastInfo(messages) {
        Notifications.Toast(toast.TYPE.INFO, messages)
    }

    /**
     * Toast Success
     * @param message {string} or {Array <string>}
     */
    static ToastSuccess(messages) {
        Notifications.Toast(toast.TYPE.SUCCESS, messages)
    }

    /**
     * Toast Error
     * @param message {string} or {Array <string>}
     */
    static ToastError(messages) {
        Notifications.Toast(toast.TYPE.ERROR, messages)
    }

    /**
     * Toast Error
     * @param message {string} or {Array <string>}
     */
    static ToastDefaultError() {
        Notifications.Toast(toast.TYPE.ERROR, 'Oops! Something went wrong.')
    }
}
