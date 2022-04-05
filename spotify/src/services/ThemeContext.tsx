import { createContext, ReactNode, useEffect, useState } from "react";

interface IProps {
  children: ReactNode;
}

export const darkTheme = {
  darkBckgColor: "#121212",
  lightBckgColor: "#212121",
  bckgColor: "#181818",
  lightText: "#ffffff",
  grayText: "rgba(255, 255, 255, 0.72)",
  filter: "invert(1)",
  gText: "rgba(255, 255, 255, 0.5)",
  placeholderColor: "#797979",
};

export const lightTheme = {
  darkBckgColor: "#ffffff",
  lightBckgColor: "#c1c1c1",
  bckgColor: "#797979",
  lightText: "#000000",
  grayText: "#212121",
  filter: "invert(0)",
  gText: "#212121",
  placeholderColor: "#212121",
};

export const ThemeContext = createContext({
  isLight: false,
  changeIsLight: () => {},
  theme: darkTheme,
});

export const ThemeProdiver = ({ children }: IProps) => {
  const [isLight, setIsLight] = useState(
    localStorage.getItem("isLight") === "true"
  );

  const changeIsLight = () => {
    setIsLight((isLight) => !isLight);
  };

  useEffect(() => {
    localStorage.setItem("isLight", JSON.stringify(isLight));
  }, [isLight]);

  return (
    <ThemeContext.Provider
      value={{
        isLight,
        changeIsLight,
        theme: isLight ? darkTheme : lightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
