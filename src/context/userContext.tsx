import React, { createContext, useContext, useReducer } from "react";

interface UserType {
  user: null | any;
}

const initialUser: any = {
  user: null,
};

const userContext = createContext(initialUser);

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        user: action.payload,
      };

    case "REMOVE":
      return {
        ...state,
        user: null,
      };
  }
  return state;
};

function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(userReducer, { ...initialUser });

  return (
    <userContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export { UserProvider, userContext };
