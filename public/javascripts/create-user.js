function checkLoginState() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            FB.api('/me?fields=id,name,email,permissions, picture', function (response) {

                var form = document.createElement("form");
                form.setAttribute("method", 'POST');
                form.setAttribute("action", window.location.origin + "/user/create-user");

                // Prepare data for form
                var data = {
                    name: response.name,
                    email: response.email,
                    fid: response.id,
                    picture: response.picture.data.url
                };

                // Add data to form
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var hiddenField = document.createElement("input");
                        hiddenField.setAttribute("type", "hidden");
                        hiddenField.setAttribute("name", key);
                        hiddenField.setAttribute("value", data[key]);

                        form.appendChild(hiddenField);
                    }
                }

                document.body.appendChild(form);
                form.submit();

            });
        } else {
            window.alert("Cannot login facebook");
        }
    }, {scope: 'email, public_profile'});
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1983487948335597',
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "/javascripts/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));