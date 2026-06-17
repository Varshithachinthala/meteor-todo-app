import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/tasks.js';

Meteor.startup(() => {
  Meteor.publish('tasks', function() {
    return TasksCollection.find({ userId: this.userId });
  });
});