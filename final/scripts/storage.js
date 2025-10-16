export function savePreference(key, value) {
  localStorage.setItem(key, value);
}

export function getPreference(key) {
  return localStorage.getItem(key);
}
