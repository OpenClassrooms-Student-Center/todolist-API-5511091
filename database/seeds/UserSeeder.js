'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserSeeder {
  async run () {
	  const admin = new User()
	  admin.username = 'Jean'
	  admin.password = 'azerty123'
	  admin.is_admin = true
	  await admin.save()

	  const defaultUser = new User()
	  defaultUser.username = 'Marie'
	  defaultUser.password = 'qwwerty123'
	  await defaultUser.save()
  }
}

module.exports = UserSeeder
