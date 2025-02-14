import { useContext } from "react";
import { AuthContext } from "./Authcontext";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token:string) => void;
    logout: () => void;
  }
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  };