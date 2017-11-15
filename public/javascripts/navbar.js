function onAccountButtonClicked() {
	if (isLoggedIn == true) {
		//log user out
		isLoggedIn = false;
		document.getElementById("login-button").innerHTML = `<i class="fa fa-sign-in" aria-hidden="true"></i> Login`;
	} else {
		//open log in modal
		$('#login-modal').modal('show')
	}
}