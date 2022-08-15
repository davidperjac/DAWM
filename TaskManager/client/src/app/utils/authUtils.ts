export const authUtils = {
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return token;
    // try {
    //   const res = await authApi.verifyToken();
    //   return res.user;
    // } catch {
    //   return false;
    // }
  },
};
