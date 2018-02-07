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
	if(isNaN(x)) {
		alert("Invalid OTP!");
		return false;
	}

			var db = firebase.firestore();

			var docRef = db.collection("Users").doc("virajparmar98@gmail.com");

			docRef.get().then(function(doc) {
			    if (doc.exists) {
			    	if(doc.data().OTP != x) {
			    		alert("Wrong OTP entered!");
			    		document.getElementById("otp").value = "";
			    		return false;
			    	} else {
			    		alert("OTP verified successfully!");
			    		return true;
			    	}
			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});

	return false;
}

function ResendOTP() {
	alert("An OTP has been resent to your E-mail Address");
	return false;
}