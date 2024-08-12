

const routes = {
  home: '/'
  ,
  login: '/login',
  register: '/register',
  googleLogin: '/auth/google',
  facebookLogin: '/auth/facebook',
  terms() {
    return '/terms';
  }
};



export default routes;
