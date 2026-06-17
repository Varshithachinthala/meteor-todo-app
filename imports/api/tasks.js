import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const TasksCollection = new Mongo.Collection('tasks');

Meteor.methods({
  async 'tasks.insert'(text, category) {
    check(text, String);
    check(category, String);
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    const lastTask = await TasksCollection.findOneAsync(
      { userId: this.userId },
      { sort: { order: -1 } }
    );
    const order = lastTask ? lastTask.order + 1 : 0;
    await TasksCollection.insertAsync({
      text,
      category,
      createdAt: new Date(),
      userId: this.userId,
      isChecked: false,
      order,
    });
  },
  async 'tasks.delete'(taskId) {
    check(taskId, String);
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    await TasksCollection.removeAsync(taskId);
  },
  async 'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    await TasksCollection.updateAsync(taskId, { $set: { isChecked } });
  },
  async 'tasks.reorder'(orderedIds) {
    check(orderedIds, [String]);
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    for (let i = 0; i < orderedIds.length; i++) {
      await TasksCollection.updateAsync(orderedIds[i], { $set: { order: i } });
    }
  },
});