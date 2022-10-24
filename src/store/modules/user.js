import { login, logout, getInfo } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  setRoles,
  getRoles
} from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    userId: getUserId(),
    roles:[],
  };
};

const state = getDefaultState();
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USERINFO: (state, userId) => {
    state.userId = userId;
  },

  //按钮权限
  SET_ROLES:(state,obj)=>{
    state.roles = obj
    
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, userType } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        userType: userType,
      })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          commit("SET_USERINFO", data.userId);
          setToken(data.token);
          setUserId(data.userId);
          resolve();
        })

        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state,dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo(state.userId)
        .then((response) => {
          const { data } = response;
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          const { name, avatar,roles} = data;
          setRoles(roles)
          commit("SET_NAME", name);
          commit("SET_ROLES", roles);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
      // logout(state.token)
      //   .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          // resolve();
        // })
        // .catch((error) => {
        //   reject(error);
        // });
    // });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
