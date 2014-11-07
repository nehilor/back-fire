/**
 * @website http://domain.com/
 * @description This is a test file for personal future use
 * @date 06/11/2014
 * @author Gabriel Villalobos/Jose Zuniga
 * @version 1.0
 * @dependencies jQuery, BackBoneJS, Firebase
 * Copyright(c) 2014 
 */
PeopleApp.App.PeopleListView = Backbone.View.extend({

    el: '#people-list',

    events: {
        'click a.remove-item' : 'remove'
    },

    initialize: function () {
        this.template = _.template($('#list-tpl').html());
    },

    render: function () {
        //Sends the collection to the template and getting it into a variable
        var template = this.template({
            'peoplelist': this.collection.toJSON()
        });
        //Rendering the template
        this.$el.html(template);

        $("[data-toggle='tooltip']").tooltip();
        //Return the self element
        return this;
    },
    /**
     * Removes a child from the database
     *
     * @param e {event}
     */
    remove: function(e){
        e.preventDefault();
        //Getting the child id
        var id = $(e.target).attr('data-key');
        //Creating a new instance of the database with the child id
        var childRef = new Firebase('https://glowing-inferno-6048.firebaseio.com/people/' + id);
        //Removing the child
        childRef.remove();
        //Triggering a custom event to notify the PeopleForm View that the people list has been updated
        PeopleApp.App.PeopleForm.trigger('listupdated');
    }
});