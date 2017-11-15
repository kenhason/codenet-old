function loginClick() {
    if (fid == "") {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me?fields=id,name,email', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    console.log(response.id);
                    updateLoginInfo(response.id, response.name, response.email);
                    checkIfUserExists(response.id, response.name)
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    } else {
        checkIfUserExists(fid, username)
    }
}

function checkIfUserExists(fid, username) {
    console.log(fid + ", " + username + ", " + email)
    $.get('/api/user/fid/'+fid, function(res) {
        if (res.confirmation == 'success') {
            //ok
            console.log(true)
            updateLoginState(username);
        } else {
            //inexistent
            console.log(false)
            notifyLoginFail(username);
        }
    });
}

function updateLoginInfo(id, name, mail) {
    fid = id;
    username = name;
    email = mail;
}

function updateLoginState(username) {
    isLoggedIn = true;
    hideElement("inexited-user-alert");
    hideElement("exited-user-alert");
    $('#login-modal').modal('hide')
    document.getElementById("login-button").innerHTML = username;
}

function notifyLoginFail(username) {
    // alert(username + " does not exist")
    showElement("inexited-user-alert")
    hideElement("exited-user-alert")
}