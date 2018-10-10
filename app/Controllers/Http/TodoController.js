'use strict'

/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

/**
* @typedef {Object} Context - Context
* @property {Auth} auth
* @property {Request} request
* @property {Response} response
* @property {View} view
*/

/** @type {Model} */
const Todo = use('App/Models/Todo')

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
	/**
	* @description Show a list of all todos.
	* @method GET todos
	* @param {Context} ctx
	*/
	async index ({ auth, response }) {
		const todos = await auth.user.todos().fetch()

		return response.json(todos)
	}

	/**
	* @description Create/save a new todo.
	* @method POST todos
	* @param {Context} ctx
	*/
	async store ({ request, response, auth }) {
		const fields = request.only(['text', 'cat'])
		const user = await auth.user

		let todo = await Todo.create({
			user_id: user.id,
			...fields
		})

		return response.status(201).json({
			message: 'La todo à été créée avec succès.',
			data: todo
		})
	}

	/**
	* @description Display a single todo.
	* @method GET todos/:id
	* @param {Context} ctx
	*/
	async show ({ params, response, auth }) {
		const todo = await auth.user.todos()
			.where('id', params.id)
			.first()

		if (!todo) {
			return response
				.status(401)
				.json({
					message: `La todo n˚${params.id} n'existe pas ou appartient à un autre utilisateur.`
				})
		}

		return response.json(todo)
	}

	/**
	* @description Update todo details.
	* @method PUT or PATCH todos/:id
	* @param {Context} ctx
	*/
	async update ({ params, request, response, auth }) {
		const fields = request.only(['text', 'cat', 'completed'])
		let todo = await auth.user.todos()
			.where('id', params.id)
			.first()

		if (!todo) {
			return response
				.status(404)
				.json({
					message: `La todo n˚${params.id} n'existe pas ou appartient à un autre utilisateur.`
				})
		}

		todo.merge({
			...fields
		})
		await todo.save()

		return response.status(200).json({
			message: `La todo n˚${params.id} à bien été mise à jour.`,
			data: todo
		})
	}

	/**
	* @description Delete a todo with id.
	* @method DELETE todos/:id
	* @param {Context} ctx
	*/
	async destroy ({ params, response, auth }) {
		const todo = await auth.user.todos()
			.where('id', params.id)
			.first()

		if (!todo) {
			return response
				.status(404)
				.json({
					message: `La todo n˚${params.id} n'existe pas ou appartient à un autre utilisateur.`
				})
		} else {
			await todo.delete()

			return response.status(204).json({
				message: `La todo n˚${params.id} à bien été supprimé.`
			})
		}
	}
}

module.exports = TodoController
