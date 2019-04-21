/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/home',
    // Relative to /src/views
    view: 'Home'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    view: 'Subscriptions'
  },
  {
    path: '/menu',
    name: 'Menu',
    view: 'Menu'
  },
  {
    path: '/login',
    view: 'LogIn'
  },
  {
    path: '/signup',
    view: 'SignUp'
  },
  {
    path: '/forgotten-password',
    view: 'ForgottenPassword'
  },
  {
    path: '/special-offer/:id',
    props: true,
    view: 'SpecialOffer'
  },
  {
    path: '/lunch-offer/:id',
    props: true,
    view: 'LunchOffer'
  },
]
