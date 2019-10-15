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
	var btnBack = document.getElementById("btnBack");
	var btnBackForm = document.getElementById("btnBackForm");

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

	var listView = document.getElementById("contact-list-container");
	var detailsView = document.getElementById("contact-details-container");
	var formView = document.getElementById("contact-form-container");
	

	lblContactId.style.display = "none";
	txtId.style.display = "none";
	var da = new DataAccess();
	//populateLocalStorage();
	showAllContacts();

	function showAllContacts(){

		showView(listView);

		var contacts = da.getAll();
		contactList.innerHTML = "";

		if(contacts.length > 0){
			for(var x = 0; x < contacts.length; x++){
				var c = contacts[x];
				var li = document.createElement("li");
				li.innerHTML = c.firstName + " " + c.lastName;
				li.setAttribute("contactId", c.id);
				contactList.appendChild(li);
			}
		}else{
			var h3 = document.createElement("h3");
			h3.innerHTML = "No contatcts";
			contactList.appendChild(h3);
		}
	}

	contactList.addEventListener("click", function(evt){
		//alert(evt.target.getAttribute("contactId"));
		var selectedId = evt.target.getAttribute("contactId");
		var selectedContact = da.getById(selectedId);
		showContactDetails(selectedContact);
		showView(detailsView);
	});

	function showContactDetails(contact){
		lblContactName.innerHTML = contact.firstName + " " + contact.lastName;
		lblContactEmail.innerHTML = contact.email;
		lblContactPhone.innerHTML = contact.phone;
		lblContactId.innerHTML = contact.id;
	}

	btnEdit.addEventListener("click", function(){
		showView(formView);
		var id = lblContactId.innerHTML;
		var selectedContact = da.getById(id);
		editContact(selectedContact);
	});

	function editContact(contact){
		clearForm();
		clearValidation();
		txtId.value = contact.id;
		txtFirstName.value = contact.firstName;
		txtLastName.value = contact.lastName;
		txtEmail.value = contact.email;
		txtPhone.value = contact.phone;
	}

	function clearForm(){
		txtId.value = "";
		txtFirstName.value = "";
		txtLastName.value = "";
		txtEmail.value = "";
		txtPhone.value = "";
	}

	btnDelete.addEventListener("click", function(){
		var id = lblContactId.innerHTML;
		if(id > 0 && confirm("Are you sure you want to delete this contact?")){
			da.deleteById(id);
			clearForm();
			showAllContacts();
		}
	});

	btnSave.addEventListener("click", function(evt){
		evt.preventDefault();
		if(validate()){
			var obj = {
				id: txtId.value,
				firstName: txtFirstName.value,
				lastName: txtLastName.value,
				email: txtEmail.value,
				phone: txtPhone.value
			};

			if(obj.id > 0){
				da.update(obj);
			}else{
				da.insert(obj);
			}
			showAllContacts();
		}
	});

	function validate(){
		clearValidation();
		var valid = true;

		if(txtPhone.value == ""){
			vPhone.innerHTML = "Please enter a phone number";
			valid = false;
			txtPhone.focus();
		}else if(validatePhone(txtPhone.value) == false){
			vPhone.innerHTML = "Invalid phone number entered (valid format: (xxx)xxx-xxxx or xxx-xxx-xxxx)";
			valid = false;
			txtPhone.focus();
		}

		if(txtEmail.value == ""){
			vEmail.innerHTML = "Please enter an email address";
			valid = false;
			txtEmail.focus();
		}else if(validateEmail(txtEmail.value) == false){
			vEmail.innerHTML = "Please enter a valid email address (valid format: emailaddress@domainname.com");
			valid = false;
			txtEmail.focus();
		}

		if(txtLastName.value == ""){
			vLastName.innerHTML = "Please enter a last name";
			valid = false;
			txtLastName.focus();
		}

		if(txtFirstName.value == ""){
			vFirstName.innerHTML = "Please enter a first name";
			valid = false;
			txtFirstName.focus();
		}
		
		return valid;
	}

	function validatePhone(phone){
		var regExp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
		return regExp.test(phone);
	}

	function validateEmail(email){
        var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regExp.test(email);
	}
	
	function clearValidation(){
		vFirstName.innerHTML = "";
		vLastName.innerHTML = "";
		vPhone.innerHTML = "";
		vEmail.innerHTML = "";
    }

	function showView(view){
		
		listView.style.opacity = 0;
		detailsView.style.opacity = 0;
		formView.style.opacity = 1;

		view.style.opacity = 1;

		listView.style.zIndex = 0;
		detailsView.style.zIndex = 0;
		formView.style.zIndex = 0;

		view.style.zIndex = 1;

	}

	btnAdd.addEventListener("click", function(evt){
		clearForm();
		clearValidation();
		showView(formView);
	});

	btnBack.addEventListener("click", function(evt){
		showView(listView);
	});
	
	btnBackForm.addEventListener("click", function(evt){
		showView(listView);
	});


});