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
	return true;
}