// Verify email alert
// alert("Thank you for signing up!  Please check your email to activate your account.");

// wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {
	// getElementByID Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

// create select field 
function makeCats() {
//	var formTag = document.getElementsByTagName("form"); // formTag is an array
	var selectLi = $('select');
	var makeSelect = document.createElement('select');
	makeSelect.setAttribute("id", "groups");
	for (var i = 0, j=use.length; j > i; i++) {
		var makeOption = document.createElement('option');
		var optText = use[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectLi.appendChild(makeSelect);
}
// find value of selected radio buttons
/*function getSelectedRadio() {
	var radios = document.forms[0].insert id here;
	for (var i = 0; i<radios.length; i++) {
		if (radios[i].checked) {
		idValue = radios[i].value;
		}
	}
}*/
// get checked value
/*function getCheckboxValue() {
	if () {
	
	} else {
		
	}
}*/
function toggleControls(n) {
	switch(n) {
		case "on":
			$('signup').style.display = "none";
			$('clear').style.display = "inline";
			$('displayLink').style.display = "none";
			$('add').style.display = "inline";
			$('items').style.display = "block";
			break;
		case "off":
			$('signup').style.display = "block";
			$('clear').style.display = "inline";
			$('displayLink').style.display = "inline";
			$('add').style.display = "none";
			$('items').style.display = "none ";
			break;
		default:
			return false;
	}
}

function storeData(key) {
	// if there is no key, this means this is a brand new item and we need a new key
	if (!key) {
		var id = Math.floor(Math.random()*10000001);
	} else {
		// set the id to the existing key we're editing so that it will over the data
		// the key is the same key that's been passed along from the editSubmit event handler
		// to the vlidate function, and then passed here, into the storeData function.
		id = key;
	}
	// gather up all our form field values and store in an object
	//Object properties contain array with the form label and the input value.
	var item = {};
	item.group = ["Group:", $('groups').value];
	item.flname = ["First and Last Name:", $('flname').value];
	item.addy = ["Email:", $('addy').value];
	item.user = ["Username:", $('username').value];
	item.pass = ["Password:", $('pword').value];
	item.cnfrmpass = ["Confirm Password:", $('cnfrmpass').value];
	item.itemName =["Item Name:", $('itemName').value];
	item.serialNums =["Serial Number:", $('serialNums').value];
	// data into local storage: use stringify to convert our object to a string
	localStorage.setItem(id, JSON.stringify(item));
	alert(localStorage.getItem(localStorage.key(0)));
}

function getData() {
	if (localStorage.length === 0) {
		alert("There is no saved data at this time!");
		autoFillData();
	}
	// write data from local storage to the browser
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$('items').style.display = "block";
	for (var i = 0, len=localStorage.length; i<len; i++) {
		var makeLi = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//convert string from local storage value back to an object by using Json.parse()
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeLi.appendChild(makeSubList);
		getImg(obj.group[1], makeSubList);
		for (var n in obj) {
			var makeSubLi = document.createElement('li');
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons/links in each item in local storage.
	}
	toggleControls("on");
}

// get the image for right category displayed
function getImg(catName, makeSubList) {
	var imgLi = document.createElement('li');
	makeSubList.appendChild(imgLi);
	var imgTag = document.createElement('img');
	var setSrc = imgTag.setAttribute("src", "img/" + catName + ".png")
	imgLi.appendChild(imgTag);
}

// JSON OBJECT which will auto populate local storage

function autoFillData() {
	var json = {
		"contact1": {
			"group": ["Group:", "Personal"],
			"flname": ["First and Last Name:", "Mitchell Pogue"],
			"addy": ["Email:", "mapjr1508@gmail.com"],
			"user": ["Username:", "mapjr1508"],
			"pass": ["Password:", "pass"],
			"cnfrmpass": ["Confirm Password:", "pass"],
			"itemName": ["Item Name:", "iMac"],
			"serialNums": ["Serial Number", "77777777777"]
		},
		"contact2": {
			"group": ["Group:", "Business"],
			"flname": ["First and Last Name:", "William Vese"],
			"addy": ["Email:", "wivese86@yahoo.com"],
			"user": ["Username:", "wivese86"],
			"pass": ["Password:", "pass"],
			"cnfrmpass": ["Confirm Password:", "pass"],
			"itemName": ["Item Name:", "iMac"],
			"serialNums": ["Serial Number", "77777777777"]

		}
	};
	// store JSON into local storage
	for (var n in json) {
		var id = Math.floor(Math.random()*10000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
}


// create the edit and delete links for each item when displayed.
function makeItemLinks (key, linksLi) {
	// add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit This";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	// add linebreak
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);
	
	// add delete single item link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete This";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

function checkpw() {
	console.log("password checked!");
	if (pw.value != "") {
		cpw.removeAttribute("disabled", "disabled");
	} else {
		cpw.setAttribute("disabled", "disabled");
	}
}

function comparePasswords(e) {
	if (pw.value !== "") {
		if (pw.value === cpw.value) {
			alert("The passwords match!");
		} else {
		alert("The passwords do not match, please try again.");
		}		
	} else {
		alert("Please enter a password!");
	}
}

function editItem () {
	// grab the data from our item from local storage
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	// show the form.
	toggleControls("off");
	
	// populate form fields with the current local storage values
	$('groups').value = item.group[1];
	$('flname').value = item.flname[1];
	$('addy').value = item.addy[1];
	$('username').value = item.user[1];
	/*
	// for radio items
	var radios = document.forms(0).sex;
	for (var i = 0; i < radios.length; i++) {
		if (radios.value == "Male" & item.sex[1] == "Male") {
			radios[i].setAttribute("checked", "checked");
		} else if (radios[i].value == "Female" && item.sex[1] == "Female") {
			radios[i].setAttribute("checked", "checked");
		}
	}	
	if (item.favorite[1] == "Yes") {
		$('fav').setAttribute("checked", "checked");
	}
	*/
	/*
	// for slider element
	$('iq').value = item.iq[1];
	*/
	$('pword').value = item.pass[1];
	$('cnfrmpass').value = item.cnfrmpass[1];
	$('itemName').value = item.itemName[1];
	$('serialNums').value = item.serialNums[1];
	
	// remove the initial listener from the save button
	save.removeEventListener("click", storeData);
	
	// change submit button value to edit button
	$('submit').value = "Edit";
	var editSubmit = $('submit');
	// save the key value established in this function as a property of the editSubmit event
	// so we can use that value when we save the data we edited
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
}



function deleteItem () {
	var ask = confirm("Are you sure you want to delete this information?");
	if (ask) {
		localStorage.removeItem(this.key);
		window.location.reload();
		alert("You have removed the information!");
	} else {
		alert("Information was not removed!");
	}
}

function clearLocal() {
	localStorage.clear();
}

function validate (e) {
	// define the elements we want to check
	var getGroup = $('groups');
	var getFlname = $('flname');
	var getAddy = $('addy');
	var getPass = $('pword');
	
	// resest error messages
	errMsg.innerHTML = "";
	getGroup.style.border = "1px solid";
	getFlname.style.border = "1px solid";
	getAddy.style.border = "1px solid";
	getPass.style.border = "1px solid";
	
	// get error messages
	var messageArr = [];
	
	// password validation
	if (getPass.value === "") {
		var passError = "Please enter a password and confirm it.";
		getPass.style.border = "1px solid red";
		messageArr.push(passError);
	}
	
	// group validation
	if (getGroup.value === "--Choose A Group--") {
		var groupError = "Please choose a group";
		getGroup.style.border = "1px solid red";
		messageArr.push(groupError);
	}
	
	// First name validation
	if (getFlname.value === "") {
		var fNameError = "Please enter a first name.";
		getFlname.style.border = "1px solid red";
		messageArr.push(fNameError);
	}
	
	// email validation
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	// [a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
	
	if (!(re.exec(getAddy.value))) {
		var emailError = "Please enter a valid email address.";
		getAddy.style.border = "1px solid red";
		messageArr.push(emailError);
	}
	
	// if there were error, display them on the screen.
	if (messageArr.length >= 1) {
		for (var i = 0, j = messageArr.length; i < j; i++) {
			var txt = document.createElement('li');
			txt.innerHTML = messageArr[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
		
	} else {
		// if all is ok, save our data! send the key value from the edit data function
		// remember this key value was passed through the editSubmit event listener as a property.
		storeData(this.key);
	}
	
}

// variable defaults	
var use = ["--Choose A Group--", "Personal", "Business", "Both"];
var errMsg = $('errors');
var pw = $('pword');
var cpw = $('cnfrmpass');
var check = $('submit');

makeCats();
// set link and submit click events
//var showData = $('add');
var displayLink = $('displayLink');
displayLink.addEventListener("click", getData);
var clearLink = $('clear');
clearLink.addEventListener("click", clearLocal);
var save = $('submit');
save.addEventListener("click", validate, storeData);
// save.addEventListener("click", storeData);
pw.addEventListener("blur", checkpw);
check.addEventListener("click", comparePasswords);
})