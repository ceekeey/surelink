import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // For restoring state on app load

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) setUser(JSON.parse(storedUser));
            } catch (err) {
                console.log('Failed to load user:', err);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    // Register: Used for new users who just signed up (default verified false)
    const registerUser = async (userData = false) => {
        const userObj = { ...userData, verified: false };
        setUser(userObj);
    };

    // ✅ New loginUser: Used for logging in with full backend data (incl. verified + token)
    const loginUser = async (userData, remember = false) => {
        setUser(userData);
        if (remember) {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
        }
    };

    const verifyUser = async (verifiedData) => {
        const verifiedUser = { ...verifiedData, verified: true };
        setUser(verifiedUser);
        await AsyncStorage.setItem('user', JSON.stringify(verifiedUser));
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, registerUser, loginUser, verifyUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);