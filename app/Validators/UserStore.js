'use strict'

class UserStore {
	get rules () {
		return {
			username: 'required|unique:users',
			password: 'required',
			password_confirmation: 'required|same:password'
		}
	}

	get messages () {
		return {
			'username.required': 'Le nom d\'utilisateur est requis.',
			'username.unique': 'Le nom d\'utilisateur est déjà pris.',
			'password.required': 'Le mot de passe est requis.',
			'password_confirmation.same': 'Les deux mots de passe doivent être les mêmes.'
		}
	}

	get validateAll () {
		return true
	}
}

module.exports = UserStore
