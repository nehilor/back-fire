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
        'index.html': 'showLanding'
    },

    /**
     * Initializer function
     */
    initialize: function () {
        this.initializeGlobalElements();
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
        //this.initializeGlobalElements();
        (!!fn) && this[fn].call(this);
    },

    /**
     * This method gets executed every time a route is processed. It checks if the header was already rendered and if
     * not renders them.
    */ 
    initializeGlobalElements: function (e) {
       
        /*if (MyUtilization.App.People === undefined) {
            MyUtilization.App.People = new MyUtilization.App.peopleView();
            MyUtilization.App.People.render();
        }*/
    },
    /**
     * Route Handler for the Landing Page
     */
    showLanding: function () {
        // Remove all loading indicators
        var peopleView = new PeopleApp.App.peopleView();
        peopleView.render();
    },
    /**
     * Route Handler for the default route
     */
    defaultRoute: function () {
        var fragment = Backbone.history.fragment || (Backbone.history.location.pathname).split('/').pop();
        switch (fragment) {
            default:
                this.showLanding();
        }
    }
});