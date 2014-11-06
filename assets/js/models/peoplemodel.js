/**
 * @website http://domain.com/
 * @description This is a test file for personal future use
 * @date 06/11/2014
 * @author Gabriel Villalobos/Jose Zuniga
 * @version 1.0
 * @dependencies jQuery, BackBoneJS, Firebase
 * Copyright(c) 2014 
 */
PeopleApp.App.PersonModel = Backbone.Model.extend({
    defaults: {
        'id': 0,
        'name': '',
        'age': '',
        'genre': ''
    },

    parse: function (response) {
        return response;
    }
});