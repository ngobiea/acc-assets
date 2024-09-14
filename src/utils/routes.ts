
const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  googleLogin: '/auth/google',
  facebookLogin: '/auth/facebook',
  userSetup: (userId: string) => { 
    return `/setup/${userId}`;
  },
  setup: '/setup',
  declaration: '/declaration',
  newDeclaration: '/declaration/new',
  profile:'/profile',

  terms() {
    return '/terms';
  },
};

export default routes;
