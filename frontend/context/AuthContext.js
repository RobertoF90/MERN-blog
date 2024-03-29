import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register User
  const register = async (user) => {
    const res = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
    }
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setError(data.message);
    }
  };
  // Logout user
  const logout = async () => {
    const res = await fetch(`/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };
  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`/api/user`);
    const data = await res.json();

    if (res.ok) {
      console.log(data.user);
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, setError, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
