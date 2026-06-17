import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TasksCollection } from '../api/tasks.js';
import './App.html';

const activeFilter = new ReactiveVar('All');

Template.mainContainer.onCreated(function() {
  this.autorun(() => {
    this.subscribe('tasks');
  });
});

Template.mainContainer.helpers({
  tasks() {
    const filter = activeFilter.get();
    const query = { userId: Meteor.userId() };
    if (filter !== 'All') query.category = filter;
    return TasksCollection.find(query, { sort: { order: 1 } });
  },
  isActive(filter) {
    return activeFilter.get() === filter;
  },
  taskCount() {
    return TasksCollection.find({ userId: Meteor.userId() }).count();
  },
  completedCount() {
    return TasksCollection.find({ userId: Meteor.userId(), isChecked: true }).count();
  },
  userEmail() {
    const user = Meteor.user();
    return user && user.emails && user.emails[0].address;
  },
  userName() {
    const user = Meteor.user();
    if (!user) return '';
    if (user.username) return user.username.toUpperCase();
    if (user.emails) return user.emails[0].address.split('@')[0].toUpperCase();
    return 'USER';
  },
});

Template.mainContainer.events({
  'click #add-task-btn'(event, instance) {
    const text = document.getElementById('task-input').value.trim();
    const category = document.getElementById('category-select').value;
    if (!text) return;
    Meteor.call('tasks.insert', text, category, (err) => {
      if (!err) document.getElementById('task-input').value = '';
    });
  },
  'keypress #task-input'(event) {
    if (event.key === 'Enter') {
      const text = event.target.value.trim();
      const category = document.getElementById('category-select').value;
      if (!text) return;
      Meteor.call('tasks.insert', text, category, (err) => {
        if (!err) event.target.value = '';
      });
    }
  },
  'click .filter-btn'(event) {
    activeFilter.set(event.target.dataset.filter);
  },
  'click #clear-completed-btn'(event) {
    const completed = TasksCollection.find({ userId: Meteor.userId(), isChecked: true }).fetch();
    completed.forEach(task => {
      Meteor.call('tasks.delete', task._id);
    });
  },
  'click #logout-btn'(event) {
    Meteor.logout();
  },
});

Template.task.helpers({
  categoryClass() {
    return this.category ? this.category.toLowerCase() : 'other';
  },
});

Template.task.events({
  'click .task-checkbox'(event) {
    Meteor.call('tasks.setIsChecked', this._id, event.target.checked);
  },
  'click .delete-btn'(event) {
    Meteor.call('tasks.delete', this._id);
  },
});

let draggedId = null;

Template.task.events({
  'dragstart .task-item'(event) {
    draggedId = this._id;
    event.target.classList.add('dragging');
  },
  'dragend .task-item'(event) {
    event.target.classList.remove('dragging');
  },
  'dragover .task-item'(event) {
    event.preventDefault();
  },
  'drop .task-item'(event) {
    event.preventDefault();
    const targetId = this._id;
    if (draggedId === targetId) return;
    const items = [...document.querySelectorAll('.task-item')];
    const orderedIds = items.map(el => el.dataset.id);
    const fromIndex = orderedIds.indexOf(draggedId);
    const toIndex = orderedIds.indexOf(targetId);
    orderedIds.splice(fromIndex, 1);
    orderedIds.splice(toIndex, 0, draggedId);
    Meteor.call('tasks.reorder', orderedIds);
  },
});