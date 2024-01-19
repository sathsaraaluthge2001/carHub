// AuthService.js

export const AuthService = {
  login: (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  },
  logout: () => {
    localStorage.removeItem('loggedInUser');
  },
  isLoggedIn: () => {
    return localStorage.getItem('loggedInUser') !== null;
  },
  getUserRole: () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return loggedInUser ? loggedInUser.role : 'user';
  },
};
