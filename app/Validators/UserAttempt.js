'use strict'

class UserAttempt {
	get rules () {
		return {
			username: 'required|exists',
			password: 'required'
		}
	}

	get messages () {
		return {
			'username.required': 'Le nom d\'utilisateur est requis.',
			'username.exists': 'Test',
			'password.required': 'Le mot de passe est requis.'
		}
	}

	get validateAll () {
		return true
	}
}

module.exports = UserAttempt
