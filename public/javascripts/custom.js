// wrapped js in self-executing function
// to avoid any conflicts with other libraries
// and to provide some basic encapsulation
var app = (function() {

  var matchForm = document.forms['match-form'];

  // opted for a named function here 
  // instead of an anonymous function
  matchForm.onsubmit = handleFormSubmit;

  function handleFormSubmit(evt) {
   console.log('checking form');
   evt.preventDefault();
   
   var apiPath = 'http://localhost:3000/matches';
   var userInput = document.getElementById('match-input').value;
   var userData = {
    searchText : userInput
   }

   // make Ajax call - if time permitted i would put this in it's own function
   // to allow re-use something like
   /*
    
    makeRequest(config, callback); - could use promises or generator here as well
  
   */
   var request = new XMLHttpRequest();
   request.open('POST', apiPath, true);
   request.setRequestHeader("Content-Type", "application/json");

   request.onload = function (err) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log('display results');
        displayResults(request.responseText, userInput);
      }
    } else {
      console.error(request.statusText);
    }
   }

   request.onerror = function (err) {
    console.error(request.statusText);
   }

   request.send(JSON.stringify(userData));


  } // form submit

  function displayResults(responseText) {
    
    if (responseText !== '') {
      console.log('forward');
      window.location = 'http://localhost:3000/questions?' + responseText;
    } else {
      console.log(responseText);
      // could redirect to a view that does some follow up questions
    }
  }


})(window);




