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

  const email1_obj = document.getElementById('email1');
  const password1_obj = document.getElementById('password1');
  const login_obj = document.getElementById('login');

  login_obj.addEventListener('click', e => {
      const email1 = email1_obj.value;
      const password1 = password1_obj.value;
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email1,password1);
      promise.catch(e => console.log(e.message));
  });

  var email2_obj = document.getElementById('email2');
  const password2_obj = document.getElementById('password2');
  const signin_obj = document.getElementById('signin');

  signin_obj.addEventListener('click', e => {
  		var email2 = email2_obj.value;
  		const password2 = password2_obj.value;
  		const auth = firebase.auth();
  		const promise = auth.createUserWithEmailAndPassword(email2,password2);
  		promise.catch(e => {
            alert(e.message);
            document.getElementById('email2').value = "";
      });
  });

  const logout_obj = document.getElementById('logout');

  logout_obj.addEventListener('click', e => {
      firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
  		if(firebaseUser) {
  			console.log(firebaseUser);
  		} else {
  			console.log('You are not logged in');
  		}
  });
}());