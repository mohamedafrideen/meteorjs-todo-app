import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Modal } from '../materialize/js/materialize';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
   notes(){
       return Notes.find({});
   }
});

Template.add.events({
    'submit .add-form': function(){
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        /*
        Notes.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
       */
       Meteor.call('notes.insert', text);

        target.text.value = '';

        $('#addModal').modal('close');

        return false;
    }
});

Template.note.events({
    'click .delete-note': function(){
        //Notes.remove(this._id);
        Meteor.call('notes.remove', this);
        return false;
    }
});
