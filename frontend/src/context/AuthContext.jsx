import { createContext, useContext, useEffect, useState } from 'react'; import api from '../services/api';
const AuthContext = createContext();
export function AuthProvider({ children }) { const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  const refreshUser = async () => { try { const { data } = await api.get('/auth/profile'); setUser(data.user); return data.user; } catch { setUser(null); return null; } finally { setLoading(false); } };
  useEffect(() => { refreshUser(); }, []);
  const login = async (values) => { const { data } = await api.post('/auth/login', values); setUser(data.user); return data.user; };
  const signup = async (values) => { const { data } = await api.post('/auth/signup', values); setUser(data.user); return data.user; };
  const logout = async () => { await api.post('/auth/logout'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser, setUser }}>{children}</AuthContext.Provider>; }
export const useAuth = () => useContext(AuthContext);
