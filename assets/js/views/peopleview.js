/**
 * @website http://domain.com/
 * @description This is a test file for personal future use
 * @date 06/11/2014
 * @author Gabriel Villalobos/Jose Zuniga
 * @version 1.0
 * @dependencies jQuery, BackBoneJS, Firebase
 * Copyright(c) 2014 
 */
PeopleApp.App.PeopleFormView = Backbone.View.extend({

    el: '#main-form',

    events: {
    	'click button.add' : 'save'
    },

    initialize: function () {
        //Getting the self element
    	var self = this;
        //Getting the template from a UnderScore template
        this.template = _.template($('#form-tpl').html());
        //Binds an event to listen when a new child is added to the database
		PeopleApp.App.myDataRef.on('child_added', function(snapshot) {
			self.displayPeople();
		});
        //Binds an event to listen when a child has been removed from the database
        PeopleApp.App.myDataRef.on('child_removed', function(oldChildSnapshot) {
            self.displayPeople();
        });
        //Binds an event to listen when people list has been updated
        this.on('listupdated', this.displayMessage, this);
    },

    render: function () {
        this.$el.html(this.template());
    },
    /**
     * Fetches the collection and renders the PeopleList view
     *
     */
    displayPeople: function(){
	    $.when(
	        PeopleApp.App.peopleCollection.fetch({
	            success: function(peopleList) {
	                PeopleApp.App.peopleCollection = peopleList;
	            }})
	        ).then(function() {
	            PeopleApp.App.peopleList.render();
	        });
    },
    /**
     * Shows a div with the message to the user
     *
     */
    displayMessage: function(){
        $('div.alert').fadeIn(500, function(){
            $(this).fadeOut(5000);
        });
    },
    /**
     * Saves a child into the database
     *
     */
    save: function(){
    	//Creating a new object
    	var person = {
    		'id': $('#id').val(),
    		'name': $('#name').val(),
    		'age': $('#age').val(),
    		'sex': $('#sex').val()
    	};
        //Saving the new child
    	PeopleApp.App.myDataRef.push(person);
        //Cleaing the form
    	$('.form-horizontal')[0].reset();
        //Triggering a custom event to notify that the people list has been updated
        this.trigger('listupdated');
    }
});