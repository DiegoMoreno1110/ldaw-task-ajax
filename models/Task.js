const knex = require('../database/connection');

exports.PENDING = 'pending';

exports.all = () => {
  return knex
    .select('*')
    .from('tasks');
}

exports.create = (task) => {
  return knex('tasks')
    .insert({ description: task.description });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('tasks')
    .where('id', id)
    .first();
}

exports.delete = (id) => {
  return knex
    .delete()
    .where('id', id);
}

exports.updateTaskStatus = (id) => {
  return knex('tasks')
    .where('id', id)
    .update({status: 'done'});
}
