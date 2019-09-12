window.addEventListener("load", function(){

	function populateLocalStorage(){
	
		var da = new DataAccess();

		// clear out local storage...
		for (var key in localStorage){
			  	localStorage.setItem(key, null);
				localStorage.removeItem(key);
		}

		// insert 3 contact objects...
		da.insert({firstName:"Bob",	lastName: "Smith", email: "bob@smith.com", phone: "555-1212"});
		da.insert({firstName:"Betty", lastName: "Jones", email: "betty@jones.com", phone: "555-1234"});
		da.insert({firstName:"Sara", lastName: "Jackson", email: "sara@jackson.com", phone: "555-5555"});
	}


	

	var contactList = document.getElementById("contact-list");
	var btnAdd = document.getElementById("btnAdd");

	var contactDetails = document.getElementById("contact-details");
	var lblContactName = document.getElementById("lblContactName");
	var lblContactEmail = document.getElementById("lblContactEmail");
	var lblContactPhone = document.getElementById("lblContactPhone");
	var lblContactId = document.getElementById("lblContactId");
	var btnEdit = document.getElementById("btnEdit");

	var contactForm = document.getElementById("contact-form");
	var txtId = document.getElementById("txtId");
	var txtFirstName = document.getElementById("txtFirstName");
	var txtLastName = document.getElementById("txtLastName");
	var txtEmail = document.getElementById("txtEmail");
	var txtPhone = document.getElementById("txtPhone");
	var btnSave = document.getElementById("btnSave");
	var btnDelete = document.getElementById("btnDelete");

	var vFirstName = document.getElementById("vFirstName");
	var vLastName = document.getElementById("vLastName");
	var vEmail = document.getElementById("vEmail");
	var vPhone = document.getElementById("vPhone");


	


});