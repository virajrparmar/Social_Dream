(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyAG-7U-o1hUOhYbJ2Xox8oEYR-RlsHcMFI",
    authDomain: "hiccapp-official.firebaseapp.com",
    databaseURL: "https://hiccapp-official.firebaseio.com",
    projectId: "hiccapp-official",
    storageBucket: "hiccapp-official.appspot.com",
    messagingSenderId: "447455220269"
    };
    firebase.initializeApp(config);

  const email2_obj = document.getElementById('email2');
  const password2_obj = document.getElementById('password2');
  const signin_obj = document.getElementById('signin');

  signin_obj.addEventListener('click', e => {
  		const email2 = email2_obj.value;
  		const password2 = password2_obj.value;
  		const auth = firebase.auth();
  		const promise = auth.createUserWithEmailAndPassword(email2,password2);
  		promise.catch(e => alert(e.message));
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
  		if(firebaseUser) {
  			console.log(firebaseUser);
  		} else {
  			alert('You are not logged in');
  		}
  });
}());