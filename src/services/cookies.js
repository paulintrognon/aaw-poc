export default {
  setCookie,
  getCookie,
  clearCookie,
};

export function setCookie(key, value) {
  document.cookie = `${key}=${value}`;
}

export function getCookie(key) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + key + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

export function clearCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT";`;
}
