// cookieHandler.js
import Cookies from "js-cookie";

export const setCookie = (name, value) => {
  // Set the cookie to expire in 1 day (adjust the expiration time as needed)
  console.log("set cookie", value);
  Cookies.set(name, value, { expires: 1 });
};

export const getCookie = (name) => {
  return Cookies.get(name);
};
