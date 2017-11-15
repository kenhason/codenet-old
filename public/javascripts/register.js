function registerClick() {
	if (fid == "")
		FB.login(function(response) {
	        if (response.authResponse) {
	            // console.log('Welcome!  Fetching your information.... ');
	            FB.api('/me?fields=id,name,email', function(response) {
	                // console.log('Good to see you, ' + response.name + '.');
	                // console.log(response.id);
	                updateLoginInfo(response.id, response.name, response.email);
	                registerNewUser(response.id, response.name, defaulNewAccountBalance)
	            });
	        } else {
	            console.log('User cancelled login or did not fully authorize.');
	        }
	    });
	else {
		console.log("already have essential information, start resgistration now");
		registerNewUser(fid, username, defaulNewAccountBalance);
	}
}

function registerNewUser(fid, username, balance) {

	// console.log("registering: ... " + fid + ", " + username + ", " + email)
	$.get('/api/user/fid/'+fid, function(res) {
        if (res.confirmation == 'success') {
        	console.log('user existed, canceling registration...');
            hideElement("inexited-user-alert")
            showElement("exited-user-alert")
        } else {
        	console.log('user is not in DB, creating new account...');
            var req = {
				"fid": fid,
				"username": username,
				"balance": balance
			};
			console.log('request body for POST', req);
			// $.post('/api/user', req)
			//  .done(function(res) {

			//  })
			$.post('/api/user', req, function(res, status) {
		        if (res.confirmation == 'created') {
		        	console.log('user created, logging in...')
		        	isLoggedIn = true;
		            $('#login-modal').modal('hide')
    				document.getElementById("login-button").innerHTML = username;
		        } 
		        if (res.confirmation == 'fail') {
		        	console.log(username);
		            alert("Something went wrong, can not register an account")
		        }
		    });
        }
    });
}