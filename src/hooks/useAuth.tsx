import { useCallback, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useFetch from "./useFetch";
import apiAuthClient from "../api/ApiAuthClient";

export interface ApiResponse {
  message: string;
  accessToken?: string;
}

const useAuth = () => {
  const { request, isLoading, error } = useFetch();

  const {
    username,
    phone,
    email,
    password,
    role,
    user,
    accessToken,
    setUsername,
    setPhone,
    setEmail,
    setPassword,
    setRole,
    setUser,
    setAccessToken,
    logout,
  } = useAuthStore();

  // hydrate from localStorage on first use
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken) setAccessToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [setAccessToken, setUser]);

  const signUp = useCallback(async () => {
    const res = await request<ApiResponse>({
      url: "/register",
      client: apiAuthClient,
      method: "POST",
      body: { username, phone, email, password, role },
    });

    return res;
  }, [username, phone, email, password, role, request]);

  const login = useCallback(async () => {
    const res = await request({
      url: "/login",
      client: apiAuthClient,
      method: "POST",
      body: { email, password, role },
    });

    if (res?.accessToken && res?.user) {
      setAccessToken(res.accessToken);
      localStorage.setItem("authToken", res.accessToken);

      setUser(res.user);
      localStorage.setItem("authUser", JSON.stringify(res.user));
    }

    return res;
  }, [email, password, role, request, setAccessToken, setUser]);

  const me = useCallback(async () => {
    const res = await request<{ message: string; user: any }>({
      url: "/me",
      client: apiAuthClient,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res?.user) {
      setUser(res.user);
      localStorage.setItem("authUser", JSON.stringify(res.user));
    }

    return res;
  }, [request, setUser, accessToken]);

  const updateProfile = useCallback(
    async (data: { username?: string; phone?: string; email?: string }) => {
      const token = localStorage.getItem("authToken");

      const res = await request({
        url: "/update-profile",
        client: apiAuthClient,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (res?.user) {
        setUser(res.user);
        localStorage.setItem("authUser", JSON.stringify(res.user));
      }

      return res;
    },
    [request, setUser]
  );

  return {
    isLoading,
    error,
    signUp,
    login,
    me,
    updateProfile,
    user,
    accessToken,
    username,
    phone,
    email,
    password,
    role,
    setUsername,
    setPhone,
    setEmail,
    setPassword,
    setRole,
    logout,
  };
};

export default useAuth;

