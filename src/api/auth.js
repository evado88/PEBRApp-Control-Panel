
//import appInfo from '../app-info';
//import axios from "axios";

export async function signIn(useremail, userpassword) {

  // Send request
  console.log("Logging", useremail, userpassword);

  if (useremail === 'nkoleevans@hotmail.com' ||
    useremail === 'karen.hampanda@cuanschutz.edu' ||
    useremail === 'alain.amstutz@unibas.ch' ||
    useremail === 'madeleine.sehrt@cuanschutz.edu') {

    if (userpassword === '1234') {

      window.sessionStorage.setItem('ruser', useremail);
      
      return {
        isOk: true,
        data: useremail
      };

    } else {
      return {
        isOk: false,
        message: "Invalid username or passowrd!"
      };
    }

  } else {
    return {
      isOk: false,
      message: "Invalid username or passowrd!"
    };
  }
/*
  console.log(new Date().toISOString(), "Starting to load data from server",
    `${appInfo.apiUrl}`);

  // invalid url will trigger an 404 error
  try {
    // Send request

    axios({
      method: 'post',
      url: `${appInfo.apiUrl}${useremail}/${userpassword}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {

      console.log(new Date().toISOString(), "Login response has completed from server", response);

      if (typeof response.data == 'string') {

        console.log("Unable to process server response from server");

        return {
          isOk: false,
          message: "Unknown problem occured on server!"
        };

      } else {

        if (response.data.succeeded) {

          console.log('Success', response.data[0].user_username);

          window.sessionStorage.setItem('ruser', useremail);

          return {
            isOk: true,
            data: useremail
          };

        } else {

          console.log('Failure', response.data.message);

          return {
            isOk: false,
            message: response.data.message
          };

        }
      }
    }).catch(error => {

      console.log(new Date().toISOString(), "An error occured from server", error, appInfo.apiUrl);

      console.log('Error', error);

      return {
        isOk: false,
        message: "Unknown error occured on server!"
      };

    });
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
*/

}

export async function getUser() {

  try {

    // Send request
    const currentUser = sessionStorage.getItem('ruser');

    if (currentUser == null) {

      return {
        isOk: false
      };

    } else {

      return {
        isOk: true,
        data: currentUser
      };
    }
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
