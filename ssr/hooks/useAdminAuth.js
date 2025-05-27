import { useState, useEffect } from "react";

export function useAdminAuth() {
  const [token, setToken] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // 🛡️ SSR protection

    const stored = localStorage.getItem("adminToken");
    if (stored) {
      validateToken(stored);
    }
  }, []);

  const validateToken = async (token) => {
    const res = await fetch("/api/admin/listings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setToken(token);
      localStorage.setItem("adminToken", token);
      setAuthorized(true);
    } else {
      localStorage.removeItem("adminToken");
    }
  };

  const login = (input) => {
    validateToken(input);
  };

  return { authorized, login, token };
}
