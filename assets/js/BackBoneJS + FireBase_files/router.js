/**
 * @website http://domain.com/
 * @description This is a test file for personal future use
 * @date 06/11/2014
 * @author Gabriel Villalobos/Jose Zuniga
 * @version 1.0
 * @dependencies jQuery, BackBoneJS, Firebase
 * Copyright(c) 2014 
 */
PeopleApp.App.Router = Backbone.Router.extend({

    root: "",

    routes: {
        '': 'defaultRoute',
        'index': 'showLanding',
        'list': 'showList',
        'test/:id': 'test'
    },

    /**
     * Initializer function
     */
    initialize: function () {
        if(!PeopleApp.App.pushState){
            $.proxy(this.ieSupport, this)();
        }else{
            this.initializeGlobalElements();
        }
    },

    /**
     * IE pushState fallback and global elements initialization
     * @param  {String} route  navigation method to be triggered
     */
    ieSupport: function (route) {
        var page, fn;
        if (!route) {
            page = (Backbone.history.location.pathname).split('/').pop();
            fn = this.routes[page];
        }
        this.initializeGlobalElements();
        (!!fn) && this[fn].call(this);
    },

    /**
     * This method gets executed every time a route is processed. It checks if the header was already rendered and if
     * not renders them.
    */ 
    initializeGlobalElements: function (e) {
       
        if (PeopleApp.App.peopleList === undefined) {
            PeopleApp.App.peopleList = new PeopleApp.App.PeopleFormView();
        }

        if (PeopleApp.App.peopleCollection === undefined) {
            PeopleApp.App.peopleCollection = new PeopleApp.App.PeopleCollection();
        }

    },
    /**
     * Route Handler for the Landing Page
     */
    showLanding: function () {
        if (PeopleApp.App.PeopleForm === undefined) {
            PeopleApp.App.PeopleForm = new PeopleApp.App.PeopleFormView();
            PeopleApp.App.PeopleForm.render();
        }
    },
    /**
     * Route Handler for the Landing Page
     */
    showList: function () {
        $.when(
            PeopleApp.App.peopleCollection.fetch({
                success: function(peopleList) {
                    PeopleApp.App.peopleCollection = peopleList;
                }})
            ).then(function() {
                PeopleApp.App.peopleList = new PeopleApp.App.PeopleListView({collection: PeopleApp.App.peopleCollection});
                PeopleApp.App.peopleList.render();
            });
    },

    test: function(id){
        console.log(id);
    },
    /**
     * Route Handler for the default route
     */
    defaultRoute: function () {
        var fragment = Backbone.history.fragment || (Backbone.history.location.pathname).split('/').pop();
        switch (fragment) {
            case "list":
                this.showList();
                break;
            default:
                console.log(fragment);
                this.showLanding();
        }
    }
});