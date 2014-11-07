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
    	var self = this;
        this.template = _.template($('#form-tpl').html());
		PeopleApp.App.myDataRef.on('child_added', function(snapshot) {
			self.displayPeople();
		});
        PeopleApp.App.myDataRef.on('child_removed', function(oldChildSnapshot) {
            self.displayPeople();
        });
        this.on('child_added', this.displayMessage, this);
    },

    render: function () {
        this.$el.html(this.template());
    },

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

    displayMessage: function(){
        $('div.alert').fadeIn(500, function(){
            $(this).fadeOut(5000);
        });
    },

    save: function(){
    	var peopleRef = PeopleApp.App.myDataRef.child("person");
    	var person = {
    		'id': $('#id').val(),
    		'name': $('#name').val(),
    		'age': $('#age').val(),
    		'sex': $('#sex').val()
    	};
    	PeopleApp.App.myDataRef.push(person);
    	$('.form-horizontal')[0].reset();
        this.trigger('child_added');
    }
});