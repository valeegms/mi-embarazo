"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "@/services/loginService";
import { fetchProfile } from "@/services/perfilService";
import { UserModel } from "@/models/UserModel";

interface AuthContextProps {
  user: UserModel | null; // User data
  accessToken: string | null; // Access token
  login: (email: string, password: string) => Promise<void>; // Login method
  logout: () => void; // Logout method
  fetchUserProfile: () => Promise<void>; // Method to fetch the user profile
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // Load user and token from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
  }, []);

  // Function to fetch the user profile
  const fetchUserProfile = async () => {
    try {
      const profileResponse = await fetchProfile();
      const userResponse = profileResponse as {
        _id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
      };

      const user = new UserModel(
        userResponse._id,
        userResponse.name,
        userResponse.email,
        userResponse.phone,
        userResponse.role
      );

      setUser(user);
      localStorage.setItem("user_info", JSON.stringify(user));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Function to handle login
  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginService(email, password);
      const token = loginResponse.access_token;

      localStorage.setItem("accessToken", token);
      setAccessToken(token);

      await fetchUserProfile(); // Fetch user profile after successful login

      // Redirect based on role
      const redirectRoute =
        user?.role === "admin" ? "/admin/dashboard" : "/doctor/dashboard";
      router.push(redirectRoute);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_info");
    setAccessToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, fetchUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
