//Global variables
var defaulNewAccountBalance = 100;
var fid="", username = "", email = "";
var isLoggedIn = false;

window.fbAsyncInit = function () {
    FB.init({
        appId: '1983487948335597',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.11'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "facebook-login/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Events
//when login modal shows
$('#login-modal').on('shown.bs.modal', function (e) {
  hideElement("inexited-user-alert");
  hideElement("exited-user-alert");
})


//Utility functions
function hideElement(elementId) {
    document.getElementById(elementId).style.display = 'none'
}

function showElement(elementId) {
    document.getElementById(elementId).style.display = 'block'
}