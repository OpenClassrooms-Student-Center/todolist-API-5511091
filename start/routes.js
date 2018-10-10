'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')
const Package = require('../package.json')

/*
|--------------------------------------------------------------------------
| REDIRECT
|--------------------------------------------------------------------------
*/
Route
	.get('/', ({ response }) => {
		return response.redirect('/users/create')
	})
	.as('view.home')

/*
|--------------------------------------------------------------------------
| USERS
|--------------------------------------------------------------------------
*/
Route
	.group(() => {
		Route
			.get('/signin', 'UserController.signin')
			.as('users.signin')
		Route
			.post('/attempt', 'UserController.attempt')
			.as('users.attempt')
	}).prefix('/users')
Route
	.resource('users', 'UserController')
	.middleware(new Map([
		[
			['show', 'edit', 'update', 'destroy'],
			['auth']
		],
		[
			['index'],
			['adminACL', 'auth']
		]
	]))
	.validator(new Map([
		[
			['users.store'], ['UserStore']
		],
		[
			['users.attempt'], ['UserAttempt']
		]
	]))

/*
|--------------------------------------------------------------------------
| GENERAL
|--------------------------------------------------------------------------
*/
Route.get('/api/', () => {
	return {
		name: Env.get('APP_NAME', 'TodoAPI'),
		version: Package.version,
		description: Package.version,
		routes: {
			'/': {
				name: 'home',
				redirectTo: '/users/create'
			},
			'/api/todos': {
				conditions: ['logged with api key'],
				'/': [
					{
						method: 'GET',
						description: 'Show a list of all todos.',
					},
					{
						method: 'POST',
						description: 'Create/save a new todo.',
						body: {
							text: 'string | required',
							cat: 'string'
						}
					},
				],
				'/:id': [
					{
						method: 'GET',
						description: 'Display a single todo with id.',
						params: {
							id: 'Todo ID',
						},
					},
					{
						method: ['PUT', 'PATCH'],
						description: 'Update todo details with id.',
						params: {
							id: 'Todo ID',
						},
					},
					{
						method: 'DELETE',
						description: 'Delete a todo with id.',
						params: {
							id: 'Todo ID',
						},
					},
				],
			},
			'/users': {
				'/': [
					{
						method: 'GET',
						description: 'Show a list of all users.',
						view: 'users/index',
						conditions: ['logged', 'role:admin'],
					},
					{
						method: 'POST',
						description: 'Create/save a new user.',
						body: {
							username: 'string | required',
							password: 'string | required',
						},
						redirectTo: '/users/:id',
					}
				],
				'/signin': {
					method: 'GET',
					description: 'Render a form to be used for login a user.',
					view: 'users/signin',
				},
				'/attempt': {
					method: 'POST',
					description: 'Attempt user.',
					body: {
						username: 'string | required',
						password: 'string | required',
					},
					redirectTo: 'users/:id',
				},
				'/create': {
					method: 'GET',
					description: 'Render a form to be used for creating a new user',
					view: 'users/create',
				},
				'/:id': [
					{
						method: 'GET',
						description: 'Display a auth user.',
						params: {
							id: 'Auth user ID',
						},
						conditions: ['logged'],
					},
					{
						method: 'DELETE',
						description: 'Logout user with id.',
						conditions: ['logged'],
					}
				],
			}
		}
	}
}).as('api.index')

/*
|--------------------------------------------------------------------------
| TODOS
|--------------------------------------------------------------------------
*/
Route
	.group(() => {
		Route
			.resource('todos', 'TodoController')
			.apiOnly()
			.middleware(['auth:api'])
			.validator(new Map([
				[
					['todos.store'], ['TodoValidation']
				]
			]))
	})
	.prefix('/api')
