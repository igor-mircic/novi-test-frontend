import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import { ILocalUser } from "../types/user.types";

type AuthState = { user: ILocalUser | null };
type AUTH_ACTION_TYPES =
  | { type: "LOGIN"; payload: ILocalUser }
  | { type: "LOGOUT"; payload: null };

const initialAuthState: AuthState = { user: null };

export const authReducer = (state: AuthState, action: AUTH_ACTION_TYPES) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  user: ILocalUser | null;
  dispatch: React.Dispatch<AUTH_ACTION_TYPES>;
}>({
  user: null,
  dispatch: () => null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) return;

    const user = JSON.parse(localUser);
    if (!user) return;

    dispatch({ type: "LOGIN", payload: user });
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
