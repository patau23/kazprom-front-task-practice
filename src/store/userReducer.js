const defaultState = {
  users: [
    {
      id: Date.now(),
      name: "Oscar Isaac",
      username: "Fernando Estrada",
      email: "oscarwanttheoscar",
      phone: "8-800-555-35-35",
    },
  ],
};

export const SET_USERS = "SET_USERS";
export const FETCH_USERS = "FETCH_USERS";
export const REMOVE_USERS = "REMOVE_USERS";

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case REMOVE_USERS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export const setUsers = (payload) => ({ type: SET_USERS, payload });
export const removeUser = (payload) => ({ type: REMOVE_USERS, payload });
export const fetchUsers = (payload) => ({ type: FETCH_USERS, payload });
