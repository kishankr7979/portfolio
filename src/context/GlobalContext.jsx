import {createContext} from "preact";


export const GlobalContext = createContext({
    appStore: {},
    updateStore: (val) => {}
});
