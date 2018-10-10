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
const User = use('App/Models/User')
/** @type {Model} */
const Token = use('App/Models/Token')
/** @type {Model} */
const Todo = use('App/Models/Todo')

/**
* Resourceful controller for interacting with users
*/
class UserController {
	/**
	* @description Show a list of all users.
	* @method GET users
	* @param {Context} ctx
	*/
	async index ({ view }) {
		const users = await User.all()

		return view.render('users.index', { users: users.toJSON() })
	}

	/**
	* @description Render a form to be used for creating a new user.
	* @method GET users/create
	* @param {Context} ctx
	*/
	async create ({ auth, response, view }) {
		try {
			await auth.check()

			return response.redirect(`/users/${auth.user.id}`)
		} catch {
			return view.render('users.create')
		}
	}

	/**
	* @description Render a form to be used for login a user.
	* @method GET users/signin
	* @param {Context} ctx
	*/
	async signin ({ auth, response, view }) {
		try {
			await auth.check()

			return response.redirect(`/users/${auth.user.id}`)
		} catch {
			return view.render('users.signin')
		}
	}

	/**
	* @description Attempt user.
	* @method POST users/attempt
	* @param {Context} ctx
	*/
	async attempt ({ auth, request, response }) {
		const data = request.only(['username', 'password'])

		const user = await auth
			.remember(true)
			.attempt(data.username, data.password)

		return response.redirect(`/users/${user.id}`)
	}

	/**
	* @description Create/save a new user.
	* @method POST users
	* @param {Context} ctx
	*/
	async store ({ auth, request, response }) {
		const data = request.only(['username', 'password'])
		const user = await User.create(data)

		await Todo.create({
			user_id: user.id,
			text: 'J\'apprend Redux avec Open Class Room'
		})

		await auth
			.remember(true)
			.login(user)

		return response.redirect(`/users/${user.id}`)
	}

	/**
	* @description Display a single user.
	* @method GET users/:id
	* @param {Context} ctx
	*/
	async show ({ auth, params, response, view }) {
		if (auth.user.id !== parseInt(params.id)) {
			return response.redirect('/users/create')
		}

		let tokenData = await Token
			.query()
			.where('user_id', auth.user.id)
			.where('type', 'bearer')
			.first()

		if (!tokenData) {
			tokenData = await auth.authenticator('api').generate(auth.user)
			await Token.create({
				user_id: auth.user.id,
				token: tokenData.token,
				type: tokenData.type
			})
		}

		return view.render('users.show', { user: auth.user, token: tokenData.token })
	}

	/**
	* @description Render a form to update an existing user.
	* @method GET users/:id/edit
	* @param {Context} ctx
	*/
	async edit ({ params, request, response, view }) {}

	/**
	* @description Update user details.
	* @method PUT or PATCH users/:id
	* @param {Context} ctx
	*/
	async update ({ params, request, response }) {}

	/**
	* @description Logout user with id.
	* @method DELETE users/:id
	* @param {Context} ctx
	*/
	async destroy ({ auth, response }) {
		await auth.logout()

		return response.redirect('/users/create')
	}
}

module.exports = UserController
