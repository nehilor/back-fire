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
        this.template = _.template($('#form-tpl').html());
		PeopleApp.App.myDataRef.on('child_added', function(snapshot) {
			var newPost = snapshot.val();
			//PeopleApp.App.peopleList.render();
		});
    },

    render: function () {
        this.$el.html(this.template());
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
    }
});