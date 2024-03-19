function getCookieValue(name:string) {
  const nameString = name + "=";
  const value = document.cookie.split(';').find(item => item.trim().startsWith(nameString));

  if (value) {
    return value.split('=')[1];
  } else {
    return "";
  }
}

export default getCookieValue