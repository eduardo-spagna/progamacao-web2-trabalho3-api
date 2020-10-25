/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ greeting: 'Trabalho 3 - Web 2 API' }));

Route.group(() => {
  /** ****************************************
   * Users
   ****************************************** */
  Route.resource('users', 'UserController')
    .apiOnly()
    .only(['store', 'show', 'update']);
  // .middleware(new Map([
  //   [['show', 'update'], ['auth:jwt']],
  // ]));
}).prefix('api/v1');
