import React, { createContext, useContext, useState, useEffect} from'react';
import { API_URL } from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider= ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    // Check if user is logged in on mount
  const token = localStorage.getItem('token');
   if (token) {
     fetchUserData(token);
   } else {
     setLoading(false);
   }
  }, []);

 const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${API_URL}/user/data`, {
       headers: {
         'Authorization': `Bearer ${token}`
       }
     });
    const data = await response.json();
     
     if (data.success) {
       setUser(data.user);
     } else {
       localStorage.removeItem('token');
     }
   } catch (error) {
    console.error('Error fetching user data:', error);
     localStorage.removeItem('token');
   } finally {
     setLoading(false);
   }
  };

 const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email, password })
     });
     
    const data = await response.json();
     
     if (data.success) {
       localStorage.setItem('token', data.token);
       await fetchUserData(data.token);
      return { success: true };
     } else {
      return { success: false, message: data.message };
     }
   } catch (error) {
    return { success: false, message: 'Network error' };
   }
  };

 const register= async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ name, email, password })
     });
     
    const data = await response.json();
     
     if (data.success) {
       localStorage.setItem('token', data.token);
       await fetchUserData(data.token);
      return { success: true };
     } else {
      return { success: false, message: data.message };
     }
   } catch (error) {
    return { success: false, message: 'Network error' };
   }
  };

 const logout = () => {
   localStorage.removeItem('token');
   setUser(null);
  };

 const value = {
   user,
   loading,
   login,
  register,
   logout,
   isAuthenticated: !!user,
   isOwner: user?.role === 'owner'
  };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
 const context = useContext(AuthContext);
  if (!context) {
   throw new Error('useAuth must be used within an AuthProvider');
  }
 return context;
};
