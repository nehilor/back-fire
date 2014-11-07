/**
 * @website http://domain.com/
 * @description This is a test file for personal future use
 * @date 06/11/2014
 * @author Gabriel Villalobos/Jose Zuniga
 * @version 1.0
 * @dependencies jQuery, BackBoneJS, Firebase
 * Copyright(c) 2014 
 */
PeopleApp.App.PeopleCollection = Backbone.Collection.extend({
    model: PeopleApp.App.PersonModel,
    parse: function (response) {
        var collection = [];
        var newObject = {};
        for(var person in response){
            newObject = response[person];
            newObject['key'] = person;
            collection.push(newObject);
        }
        return collection;
    },
    url: 'https://glowing-inferno-6048.firebaseio.com/people.json'
});