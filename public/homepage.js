function ValidateForm()
{

	var x=document.getElementById("firstname").value;
	for(var i=0;i!=x.length;i++) {
		var y = x.charAt(i);
		if(y == ' ') {
			alert("Spaces not allowed in First Name");
			return false;
		}
		else if(!(y >= 'a' && y <= 'z') && !(y >= 'A' && y <= 'Z')) {
			alert("Invalid characters in First Name");
			return false;
		}
	}
	x=document.getElementById("lastname").value;
	for(var i=0;i!=x.length;i++) {
		var y = x.charAt(i);
		if(y == ' ') {
			alert("Spaces not allowed in Last Name");
			return false;
		}
		else if(!(y >= 'a' && y <= 'z') && !(y >= 'A' && y <= 'Z')) {
			alert("Invalid characters in Last Name");
			return false;
		}
	}
	y=document.getElementById("mobno").value;
	if(y.length!=10)
	{
		alert("Mobile Number not valid!");
		return false;
	}
	if(isNaN(y)) {
		alert("Invalid Mobile Number!");
		return false;
	}
	x=document.getElementById("password2").value;
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
	x = new Date();
	y = document.getElementById("bday").value;
	var year = parseInt(y.slice(0,4));
	var month = parseInt(y.slice(5,7)) - 1;
	var date = parseInt(y.slice(8,10));
	var z = new Date(year,month,date);
	if(z>x) {
		alert("WOW! YOU ARE NOT BORN YET");
		return false;
	}
	if(year == x.getFullYear() && month == x.getMonth() && date == x.getDate()) {
		alert("HAPPY BIRTHDAY, SEE YA MAYBE 5 YEARS LATER!!!");
		return false;
	}
	x.setFullYear(x.getFullYear()-5,x.getMonth(),x.getDate());
	if(z>x) {
		alert("FIRST GROW UP, KIDDO!!!");
		return false;
	}
	x.setFullYear(x.getFullYear()-115,x.getMonth(),x.getDate());
	if(z<x) {
		alert("WHY ARE YOU STILL ALIVE? RIP!!!");
		return false;
	}
	x=document.getElementById("t&c");
	if(x.checked==false)
	{
		alert("You need to agree to the terms and conditions in order to register!");
		return false;
	}

	  var email2_obj = document.getElementById('email2');
  	  const password2_obj = document.getElementById('password2');
      const signin_obj = document.getElementById('signin');

  	  var email2 = email2_obj.value;
  	  const password2 = password2_obj.value;
      var fn = document.getElementById('firstname').value;
      var ln = document.getElementById('lastname').value;
      var mn = document.getElementById('mobno').value;
      var bd = document.getElementById("bday").value;
      var mg = document.getElementById('gender1');
      var fg = document.getElementById('gender2');
      var og = document.getElementById('gender3');
      if(mg.checked) {
        var gender = "Male";
      }else if(fg.checked) {
        var gender = "Female";
      }else{
        var gender = "Other"; 
      }

      var otp = Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000;

      var db = firebase.firestore();

      db.collection("Users").doc(email2).set({
          First_Name: fn,
          Last_Name: ln,
          Mobile: mn,
          Password: password2,
          Date_Of_Birth: bd,
          Gender: gender,
          OTP: otp,
          OTP_Verified: false
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

	  		const auth = firebase.auth();
	  		const promise = auth.createUserWithEmailAndPassword(email2,password2);
	  		promise.then(function(){

	  			var user = firebase.auth().currentUser;

				user.sendEmailVerification().then(function() {
		
				firebase.auth().signOut();
				}).catch(function(error) {
				alert("Error1!");
				});
	  		});
	  		promise.catch(function(){

	            alert("Error2!");
	        });

			firebase.auth().onAuthStateChanged(firebaseUser => {
  			if(firebaseUser) {
  			console.log(firebaseUser);
  			} else {
  			console.log('You are not logged in');
  			}
  			});
  
	document.getElementById('message').innerHTML="You have registered successfully!";

	document.getElementById('firstname').disabled=true;
	document.getElementById('lastname').disabled=true;
	document.getElementById('email2').disabled=true;
	document.getElementById('password2').disabled=true;
	document.getElementById('mobno').disabled=true;
	document.getElementById('confirmpassword').disabled=true;
	document.getElementById('bday').disabled=true;
	document.getElementById('gender1').disabled=true;
	document.getElementById('gender2').disabled=true;
	document.getElementById('gender3').disabled=true;
	document.getElementById('t&c').disabled=true;

	document.getElementById('message').style.display='block';

	document.getElementById('signin').style.display='none';

	document.getElementById('pts2').style.display='block';

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
	var pass=document.getElementById("password2").value;
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

function emailVerification() {

	var db = firebase.firestore();

	const UsersRef = db.collection('Users').doc(document.getElementById('email2').value)

	UsersRef.get()
	  .then((docSnapshot) => {
	    if (docSnapshot.exists) {
	      alert("Email-ID Already Exists");
	      document.getElementById('email2').value = "";
	    }
	});

	document.getElementById("signin").disabled = false;
}

function signInDisable() {
	document.getElementById("signin").disabled = true;
}
