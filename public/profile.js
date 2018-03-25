var browse = document.getElementById('browse');
browse.addEventListener('change', function(e) {

	var file = e.target.files[0];
	var x = file.name;
	if(x.split('.').pop()=='jpg' || x.split('.').pop()=='png' || x.split('.').pop()=='bmp' || x.split('.').pop()=='jpeg') {

	document.getElementById('myImg').src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif";
	var storageRef = firebase.storage().ref('virajparmar98@gmail.com/' + 'profile');
	var task = storageRef.put(file).then(function() {
			// Create a reference to the file we want to download
			var storageRef = firebase.storage().ref();
			var starsRef = storageRef.child('virajparmar98@gmail.com/profile');
			// Get the download URL
			starsRef.getDownloadURL().then(function(url) {
			  // Insert url into an <img> tag to "download"
			  document.getElementById('myImg').src=url;
			}).catch(function(error) {

			  // A full list of error codes is available at
			  // https://firebase.google.com/docs/storage/web/handle-errors
			  switch (error.code) {
			    case 'storage/object_not_found':
			      // File doesn't exist
			      break;

			    case 'storage/unauthorized':
			      // User doesn't have permission to access the object
			      break;

			    case 'storage/canceled':
			      // User canceled the upload
			      break;

			    case 'storage/unknown':
			      // Unknown error occurred, inspect the server response
			      break;
			  }
			});


	});

	} else {

			alert("Error! Valid image extensions are .jpeg,.jpg,.png and .bmp");

	}

});
