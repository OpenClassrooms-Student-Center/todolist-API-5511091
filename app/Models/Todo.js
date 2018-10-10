'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Todo extends Model {
	static get hidden () {
		return ['user_id']
	}

	getCompleted (completed) {
		return Boolean(completed)
	}

	setCompleted (completed) {
		return Number(completed)
	}

	users () {
		return this.belongsTo('App/Models/User')
	}
}

module.exports = Todo
