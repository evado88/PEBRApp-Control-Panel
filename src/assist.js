import AppInfo from './app-info.js';
import notify from 'devextreme/ui/notify';
import axios from "axios";
import TaskResult from "./classes/taskresult.js";

class Assist {

   static firebaseConfig = {
        apiKey: "AIzaSyCbH2wyJmcqTQU3gIl_raQwr0AmVuG_bhA",
        authDomain: "myzambia-5c62c.firebaseapp.com",
        databaseURL: "https://myzambia-5c62c.firebaseio.com",
        projectId: "myzambia-5c62c",
        storageBucket: "myzambia-5c62c.appspot.com",
        messagingSenderId: "878075714362",
        appId: "1:878075714362:web:55575ac3647ff7d3cd0e03"
      };

    ///Logs a message to the console
    static log(message, type = 'log') {

        const current = new Date();

        const date = current.toDateString() +
            ' ' + current.toLocaleTimeString() + ' ';

        if (type === 'info') {

            console.info(date + AppInfo.appName + ": " + message);
        }
        else if (type === 'warn') {

            console.warn(date + AppInfo.appName + ": " + message);
        }
        else if (type === 'error') {

            console.error(date + AppInfo.appName + ": " + message);
        }
        else {
            console.log(date + AppInfo.appName + ": " + message);
        }
    }

    static showMessage(message, type = 'info') {

        notify({
            message: message,
            position: {
                my: 'center top',
                at: 'center top',
            },
        }, type, 4000);
    }

    ///Deletes data from the specified url
    static async loadData(title, url) {

        Assist.log(`Starting to load ${title} from server using url ${AppInfo.apiUrl + url}`, 'log');

        return new Promise(function (resolve, reject) {


            axios.get(AppInfo.apiUrl + url).then((response) => {

                Assist.log(`Response has completed for loading ${title} from server`);

                if (typeof response.data == 'string') {

                    Assist.log(`Unable to process response for loading ${title} from server: ${JSON.stringify(response)}`);

                    reject(new TaskResult(false, 'Unable to process server response from server', null));

                } else {

                    if (response.data.succeeded) {

                        resolve(new TaskResult(true, '', response.data.items));

                    } else {

                        Assist.log(`Unable to laod ${title} from server: ${response.data.message}`);
                        reject(new TaskResult(false, response.data.message, null));

                    }
                }
            }).catch(error => {

                Assist.log(`An error occured when loading ${title} from server: ${JSON.stringify(error)}`);
                reject(new TaskResult(false, `An error occured when loading ${title} from server`, null));

            });

        });



    }

    /**Deletes the specified item
     * @param {string} title The tile of the item being deleted
     * @param {string} key The id of the record to delete
     * @param {string} url The url used for the post method
     * @returns TaskResult
     */
    static async deleteItem(title, url, key) {

        Assist.log(`Starting to delete ${title} with id {key} from server using url ${AppInfo.apiUrl + url}`, 'log');

        return new Promise(function (myResolve, myReject) {

            axios({
                method: 'post',
                url: AppInfo.apiUrl + url,
                data: { uid: key },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              }).then((response) => {

                Assist.log(`Response has completed for deleting ${title} from server`);

                if (typeof response.data == 'string') {

                    Assist.log(`Unable to process response for deleting ${title} from server: ${JSON.stringify(response)}`);

                    myReject(new TaskResult(false, 'Unable to process server response from server', null));

                } else {

                    if (response.data.succeeded) {

                        myResolve(new TaskResult(true, '', response.data.items));

                    } else {

                        Assist.log(`Unable to delete ${title} from server: ${response.data.message}`);
                        myReject(new TaskResult(false, response.data.message, null));

                    }
                }
            }).catch(error => {

                Assist.log(`An error occured when deleting ${title} from server: ${JSON.stringify(error)}`);
                myReject(new TaskResult(false, `An error occured when deleting ${title} from server`, null));

            });

        });



    }

}

export default Assist