'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
* This class handles all exceptions thrown during
* the HTTP request lifecycle.
*
* @class ExceptionHandler
*/
class ExceptionHandler extends BaseExceptionHandler {
	/**
	* Handle exception thrown during the HTTP lifecycle
	*
	* @method handle
	*
	* @param  {Object} error
	* @param  {Object} options.request
	* @param  {Object} options.response
	*
	* @return {void}
	*/
	async handle (error, { session, response }) {
		switch (error.name) {
			case 'InvalidSessionException':
			session.withErrors(error.messages).flashAll()

			await session.commit()

			return response.redirect('/users/create')
			case 'InvalidApiToken':
			return response.status(401).json({
				message: 'Vous devez utiliser une clé API existante et fonctionnelle pour accéder à cette route. Veuillez vous connecter sur votre compte afin de récupérer votre clé.'
			})
			default:
			return super.handle(...arguments)
		}
	}

	/**
	* Report exception for logging or debugging.
	*
	* @method report
	*
	* @param  {Object} error
	* @param  {Object} options.request
	*
	* @return {void}
	*/
	async report (error, { request }) {
	}
}

module.exports = ExceptionHandler
