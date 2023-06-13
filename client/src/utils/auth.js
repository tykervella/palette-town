import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return decode(token);
    }
    return null;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem('id_token');
  }

  login(idToken, userId, username) {
    // Saves user token, userId, and username to localStorage
    sessionStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('cardName');
    sessionStorage.removeItem('cardType');
    sessionStorage.removeItem('cardSubtype');
    sessionStorage.removeItem('cardColor');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
