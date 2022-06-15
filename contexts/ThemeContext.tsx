import React, { useContext, useState } from "react";
const ThemeContext = React.createContext({})

export function useTheme() {
    return useContext(ThemeContext)
}
export function ThemeProvider({ children }: any) {
    const [enabled, toggle] = useState(true);
    const provides = { 
        enabled,
        toggleTheme:()=>{toggle(!enabled)} 
    }
    return (
        <ThemeContext.Provider value={provides}>
            {children}
        </ThemeContext.Provider>
    );
}