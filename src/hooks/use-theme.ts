import { useEffect } from 'react';
import { useAppSelector } from '../hook';
import { ThemeState } from '../types';

const useTheme = () => {
  const theme = useAppSelector(state => state.theme);
  
  useEffect(() => {
    document.body.style.backgroundColor = theme === ThemeState.light ? '#fff' : '#ccc';
  }, [theme]);
};

export { useTheme };