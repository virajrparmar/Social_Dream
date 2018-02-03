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

      var db = firebase.firestore();

      db.collection("Users").doc(email2).set({
          First_Name: fn,
          Last_Name: ln,
          Mobile: mn,
          Password: password2,
          Date_Of_Birth: bd,
          Gender: gender,
          OTP_Verified: false
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  