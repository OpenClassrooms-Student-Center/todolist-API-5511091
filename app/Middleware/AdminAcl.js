'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminAcl {
	/**
	* @param {object} ctx
	* @param {Request} ctx.request
	* @param {Function} next
	*/
	async handle ({ auth, response }, next) {
		try {
			const user = await auth.user

			if (!user.is_admin) {
				return response.redirect(`/users/${user.id}`)
			}
		} catch (e) {}

		await next()
	}
}

module.exports = AdminAcl
