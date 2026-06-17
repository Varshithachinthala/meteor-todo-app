import { Meteor } from 'meteor/meteor';
import '../imports/ui/App.js';
import '../imports/ui/App.css';

Meteor.startup(() => {
  Meteor.subscribe('tasks');
});
