import Cookies from "js-cookie";

const TokenKey = "vue_admin_template_token";
const UserId = "vue_admin_template_userInfo";
const tabsKey = "tabs";
const Roles = "roles";

export function getToken() {
  return Cookies.get(TokenKey);
}
export function getUserId() {
  return Cookies.get(UserId);
}
export function getTabs() {
    if (Cookies.get(tabsKey)==undefined) {
      return []
    }else{
      return JSON.parse(Cookies.get(tabsKey))
    }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
export function setUserId(id) {
  return Cookies.set(UserId, id);
}
export function setTabs(tabs) {
  return Cookies.set(tabsKey,JSON.stringify(tabs));
}
export function setRoles(roles) {
  sessionStorage.setItem(Roles, JSON.stringify(roles))
}
export function getRoles() {
  return JSON.parse(sessionStorage.getItem(Roles))
} 

export function removeToken() {
  return Cookies.remove(TokenKey);
}
