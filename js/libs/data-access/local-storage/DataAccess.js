/**
* This class uses HTML5 local storage to save objects.
* All data will be stored in the 'items' key unless otherwise specified in the options

* @contructor
* @class DataAccess
*
* @param {string}[key] 		You may specify a key to use in local storage (the default is 'items')
*/
function DataAccess(key){

		//////////////////////////////
		// INSTANCE VARIABLES
		//////////////////////////////
		var storageKey = key || "items";	// localStorage is a key/value store, we'll store all our data under this key
		var allItems = null;				// the array that holds the data (once it's fetched from local storage)

		initialize();

		//////////////////////////////
		// PRIVATE METHODS
		//////////////////////////////
		function initialize(){

			if(!window.localStorage){
				throw new Error("ContactDataAccess requires localStorage support");
			}

			var str = localStorage.getItem(storageKey);

			// check to see if the data already exists, if not then we need to
			// initialize an empty array and save it in the local storage
			if(!str){
				// we need to set up the localStorage, create an empty array an save it
				allItems = [];
				save();
			}else{
				// the localStorage has already been created, so let's parse it from JSON to an array
				allItems = JSON.parse(str);		
			}

		}

		// save all items to the localStorage
		function save(){
			var json = JSON.stringify(allItems);
			//console.log(json);
			localStorage.setItem(storageKey, json);
		}


		//////////////////////////////
		// PUBLIC METHODS
		//////////////////////////////
		
		/**
		* Retrieves all objects in the data set.
		* @instance
		* @memberof DataAccess
		* @returns {Object[]}	Returns an array of the objects that have been saved.
		*/
		function getAll(){
			return allItems;
		}
		
		/**
		* Gets an object from the data set by it's id.
		* @instance
		* @memberof DataAccess
		* @param {number} id 			The id of the object to get.
		* @returns {(Object|false)} 	Returns the object with the specified id if successful, 
		* 								otherwise returns false		
		*/
		function getById(id){
			
			var item = null;
			
			for(var x = 0; x < allItems.length; x++){
				if(allItems[x].id == id){
					item = allItems[x];
					break;
				}
			}

			if(item){
				return item;
			}else{
				return false;
			}
		}

		/**
		* Inserts an object into the data set. Note that an id will be assigned to the object
		* @instance
		* @memberof DataAccess
		* @param {Object} item 			The object to be inserted into the data set
		* @returns {(number|false)} 	Returns the id assigned to the object if the insert succeeded, 
		* 								otherwise returns false
		*/
		function insert(item){

			if(typeof item !== "object"){
				throw new Error("Only objects can be inserted!");
			}

			allItems.push(item);

			var maxId = 0;
			for(var x = 0; x < allItems.length; x++){
				var currentContact = allItems[x]; 
				if(currentContact.id > maxId){
					maxId = Number(currentContact.id);
				}
			}

			item.id = maxId + 1;
			save();
		}
	
		/**
		* Updates an object in the data set.
		* @instance
		* @memberof DataAccess
		* @param {Object} item		The object to be updated.
		* @returns {boolean} 		Returns true if the update succeeded, otherwise returns false
		*/
		function update(item){

			var i = null;
			if(i = getById(item.id)){

				for(var prop in i){
					i[prop] = item[prop];
				}
				save();
				return true;
			}else{
				return false;
			}
			
		}

		/**
		* Deletes an object in the data set.
		* @instance
		* @memberof DataAccess
		* @param {number} itemId		The id of the object to be updated.
		* @returns {boolean} 			Returns true if the delete succeeded, otherwise returns false
		*/
		function deleteById(itemId){

			var item = getById(itemId);
			if(item){
				var itemIndex = allItems.indexOf(item); 
				allItems.splice(itemIndex,1);
				save();
				return true;
			}else{
				return false;
			}
						
		}

		/**
		* Changes the storage key.
		* @instance
		* @memberof DataAccess
		* @param {string} key		The new storage key to use
		*/
		function setStorageKey(key){
			localStorage.setItem(storageKey, null);
			localStorage.removeItem(storageKey);
			storageKey = key;
			if(!allItems || allItems.length == 0){
				initialize();	
			}else{
				save();
			}
			
		}

		/**
		* Gets the storage key being used.
		* @instance
		* @memberof DataAccess
		* @returns {string}		The storage key being used.
		*/
		function getStorageKey(){
			return storageKey;
		}

		// Return the PUBLIC API for this module in an object
		return{
			getAll:getAll,
			getById:getById,
			insert:insert,
			update:update,
			deleteById:deleteById,
			setStorageKey:setStorageKey,
			getStorageKey:getStorageKey
		};
}