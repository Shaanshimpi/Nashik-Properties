import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDark: !state.isDark
      };
    case 'SET_THEME':
      return {
        ...state,
        isDark: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  isDark: false
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme === 'dark' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', state.isDark ? 'dark' : 'light');
  }, [state.isDark]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (isDark) => {
    dispatch({ type: 'SET_THEME', payload: isDark });
  };

  return (
    <ThemeContext.Provider value={{
      isDark: state.isDark,
      toggleTheme,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};