export function setCookie(name: string, value: string, options : { [key: string] : any} = {}) : void {
  options = {
    path: "/",
    ...options
  };

  if (options.hasOwnProperty("expires") && options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1
  });
}
