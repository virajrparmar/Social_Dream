function ValidateForm() {
	var x = document.getElementById("otp").value;
	if(x=="") {
		alert("No OTP entered!");
		return false;
	}
	if(x.length < 4) {
		alert("OTP is a 4-digit number!");
		return false;
	}
	var y = parseInt(x);
	if(isNaN(y)) {
		alert("Invalid OTP!");
		return false;
	}
	return true;
}