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

			var user = firebase.auth().currentUser;

			var docRef = db.collection("Users").doc(user.email);

			docRef.get().then(function(doc) {
			    if (doc.exists) {
			    	if(doc.data().OTP != x) {
			    		alert("Wrong OTP entered!");
			    		document.getElementById("otp").value = "";
			    	} else {
			    		alert("OTP verified successfully!");

					    docRef.update({
						    OTP_Verified: true
						})
						.then(function() {
						    console.log("Document successfully updated!");
						    firebase.auth().signOut();
			    			window.location.href="otplogin.html";
						})
						.catch(function(error) {
						    // The document probably doesn't exist.
						    console.error("Error updating document: ", error);
						});
			    	}
			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});

			firebase.auth().onAuthStateChanged(firebaseUser => {
  			if(firebaseUser) {
  			console.log(firebaseUser);
  			} else {
  			console.log('You are not logged in');
  			}
  			});

	return false;
}

function ResendOTP() {
	alert("An OTP has been resent to your E-mail Address");
	var otp = Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000;

	var db = firebase.firestore();

	document.getElementById("otp").value = "";
	var user = firebase.auth().currentUser;

	var docRef = db.collection("Users").doc(user.email);

			docRef.update({
			    OTP: otp
			})
			.then(function() {
			    console.log("Document successfully updated!");
			})
			.catch(function(error) {
			    // The document probably doesn't exist.
			    console.error("Error updating document: ", error);
			});

	user.sendEmailVerification().then(function() {
		
				}).catch(function(error) {
				alert("Error!");
				});

			firebase.auth().onAuthStateChanged(firebaseUser => {
  			if(firebaseUser) {
  			console.log(firebaseUser);
  			} else {
  			console.log('You are not logged in');
  			}
  			});

	return false;
}