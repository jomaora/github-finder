import {createContext, useReducer} from 'react';
import AlertReducer from './AlertReducer';

export const AlertContext = createContext();

const AlertProvider = ({children}) => {
  const initialState = {};
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        message,
        type
      }
    });

    setTimeout(() => {
      dispatch({
        type: 'HIDE_ALERT'
      })
    }, 3000);
  }

  return <AlertContext.Provider value={{
    alert: state,
    setAlert
  }}>
    {children}
  </AlertContext.Provider>
};

export default AlertProvider;
