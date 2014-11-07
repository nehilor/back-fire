/**
 * @website http://domain.com/
 * @description This is a test file for personal future use
 * @date 06/11/2014
 * @author Gabriel Villalobos/Jose Zuniga
 * @version 1.0
 * @dependencies jQuery, BackBoneJS, Firebase
 * Copyright(c) 2014 
 */

//If the object doesn't exists then instantiate it
var PeopleApp = PeopleApp || {}; 

//If the object doesn't exists then instantiate it
PeopleApp.App = PeopleApp.App || {}; 

//New instance of the Firebase databae {people}
PeopleApp.App.myDataRef = new Firebase('https://glowing-inferno-6048.firebaseio.com/people');

//Backbone pushstate
PeopleApp.App.pushState = true;

PeopleApp.App.MyApp = function () {

    PeopleApp.App.root = 'http://localhost:8080/back-fire/';
    
    /**
	 * Perform all the initialization logic
	 */
    this.initialize = function () {
        var startingUrl = PeopleApp.App.root;
        //Initializes the router
        PeopleApp.App.router = new PeopleApp.App.Router();
        Backbone.history.start({ pushState: PeopleApp.App.pushState, root: startingUrl });
    };

};

/**
 * JQuery function that initializes the webapp when the done is ready.
 */
$(document).ready(function () {
    new PeopleApp.App.MyApp().initialize();
});