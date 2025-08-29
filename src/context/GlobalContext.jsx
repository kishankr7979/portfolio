import { createContext } from "preact";
import { useReducer } from "preact/hooks";
import { FaSlidersH } from "react-icons/fa";

// Action types
const TOGGLE_CLI = 'TOGGLE_CLI';
const SET_USER_PREFERENCE = 'SET_USER_PREFERENCE';

// Initial state
const initialState = {
  isCLIActive: false
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CLI:
      return { ...state, isCLIActive: !state.isCLIActive };
    case SET_USER_PREFERENCE:
      return { ...state, isCLIActive: action.payload === 'CLI' };
    default:
      return state;
  }
};

// Create context
export const GlobalContext = createContext({
  state: initialState,
  dispatch: () => {}
});

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
