const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  verify: '/verify',
  googleLogin: '/auth/google',
  facebookLogin: '/auth/facebook',
  userSetup: (userId: string) => {
    return `/setup/${userId}`;
  },
  setup: '/setup',
  previewDeclaration: (id: string) => {
    return '/declaration/preview/' + id;
  },
  newDeclaration: '/declaration/new',
  declarationId: (id: string) => {
    return `/declaration/${id}`;
  },
  profile: '/profile',
  terms() {
    return '/terms';
  },
};

export default routes;
