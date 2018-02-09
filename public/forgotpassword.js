function ValidateForm() {
	var x=document.getElementById("mobno").value;
	if(x.length!=10)
	{
		alert("Mobile Number not valid!");
		return false;
	}
	if(isNaN(x) == true) {
		alert("Invalid Mobile Number!");
		return false;
	}

	var email = document.getElementById('email').value;
	var mobno = document.getElementById('mobno').value;

	var db = firebase.firestore();

	var docRef = db.collection("Users").doc(email);

	var otp = Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000;

						docRef.update({
						    FP_OTP: otp,
						    FP_OTP_Verified: false
						})
						.then(function() {
						    console.log("Document successfully updated!");
						})
						.catch(function(error) {
						    // The document probably doesn't exist.
						    console.error("Error updating document: ", error);
						});

	docRef.get().then(function(doc) {

			    if (doc.exists) {

			    	if(doc.data().Mobile == mobno) {

						var auth = firebase.auth();

						auth.sendPasswordResetEmail(email).then(function() {
						  console.log("Email Sent");
						}).catch(function(error) {
						  console.log("An error happened");
						});

						alert('Account matched!');

			    		window.location.href = "forgotpasswordotp.html"

			    	} else {

			    		alert("Wrong E-mail ID or Mobile Number!");
			        	document.getElementById('email').value = "";
			        	document.getElementById('mobno').value = "";

			    	}

			    } else {

			        alert("E-mail ID does not exist!");
			        document.getElementById('email').value = "";
			        document.getElementById('mobno').value = "";
			        
			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});

	return false;
}