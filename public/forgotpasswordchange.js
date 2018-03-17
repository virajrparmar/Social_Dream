function ValidateForm()
{
	var x=document.getElementById("password").value;
	if(x.length<7)
	{
		alert("Characters not sufficient in Password!");
		return false;
	}
	y=document.getElementById("confirmpassword").value;
	if(x.localeCompare(y)!=0)
	{
		alert("Password fields do not match!");
		return false;
	}
	alert("Password changed successfully!");

    var user = firebase.auth().currentUser;

    var email = user.email;

    var password;
    
    var db = firebase.firestore();

    var docRef = db.collection("Users").doc(user.email);

    docRef.get().then(function(doc) {

                if (doc.exists) {

                    password = doc.data().Password;

                }

    }).then(function() {

        firebase.auth().signOut();

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.catch(e => console.log(e.message));

        user.updatePassword(x).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });

        var z;
        if(doc.data().OTP_Verified == true)
            z = 2;
        else
            z = 0;
        docRef.update({
        Password: x,
        Status: z
        })
        .then(function() {
            firebase.auth().signOut();
            console.log("Document successfully updated!");
            window.location.href="forgotpasswordlogin.html";
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

    })
    .catch(function(error) {
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
function move(score) {
	var elem = document.getElementById("myBar");
	if (score > 80)
        elem.style.backgroundColor="green";
    else if (score > 30)
        elem.style.backgroundColor="yellow";
    else
        elem.style.backgroundColor="red";
  	frame();
  	function frame() {
    elem.style.width = score + '%'; 
  }
}
function scorePassword() {
	var pass=document.getElementById("password").value;
    var score = 0;
    if (!pass)
        document.getElementById("p").innerHTML="Password NULL!";

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    score=parseInt(score);
    move(score);
    if (score > 80)
        document.getElementById("p").innerHTML="Password Strong!";
    else if (score > 30)
        document.getElementById("p").innerHTML="Password Medium!";
    else
        document.getElementById("p").innerHTML="Password Weak!";
}
