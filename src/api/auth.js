
export async function signIn(useremail, userpassword) {
  try {
    // Send request
    console.log("Logging", useremail, userpassword);

    if (userpassword === '123456' && useremail === 'support@r21app.online') {

      const ruser = {
        email: useremail,
        avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
      }

      window.sessionStorage.setItem('ruser', ruser);
      
      return {
        isOk: true,
        data: ruser
      };
    } else {
      return {
        isOk: false,
        message: "Wrong username or password!"
      };
    }
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
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
