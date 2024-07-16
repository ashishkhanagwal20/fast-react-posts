import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem('fastaccessToken');
    // Example: Check token validity here (expiration, etc.)
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const login = (token: string) => {
    // Example: Perform login logic and set isAuthenticated
    setIsAuthenticated(true);
    localStorage.setItem('fastaccessToken', token); // Set your actual token
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('fastaccessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

export {AuthContext}