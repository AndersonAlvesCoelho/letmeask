import { createContext, ReactNode, useEffect, useState } from 'react'

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {

  //permanecendo o tema no localStorage
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme');
    
    return (storagedTheme ?? 'light') as Theme;
  });
  
  console.log('storagedTheme ', currentTheme);
  //pegando o tema no localStorage
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme])

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}