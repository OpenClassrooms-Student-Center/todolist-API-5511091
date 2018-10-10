'use strict'

class TodoValidation {
	get rules () {
		return {
			text: 'required'
		}
	}

	get messages () {
		return {
			'text.required': 'Le champ `text` est requis afin de pouvoir ajouter une nouvelle tâche.'
		}
	}
}

module.exports = TodoValidation
