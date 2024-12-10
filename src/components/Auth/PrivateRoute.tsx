import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "@/api/authHelper";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user"; // Роль для проверки доступа
}

interface DecodedToken {
  role: string;
  exp: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // Изначально не знаем, авторизован ли пользователь
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    const verifyAccess = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        // Попробуем обновить токен
        const isRefreshed = await refreshToken();
        if (!isRefreshed) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        // Декодируем JWT токен
        const decoded = jwtDecode<DecodedToken>(token);
        // Если роль админ, перенаправляем на /billing
        if (decoded.role === "admin" || decoded.role === "user") {
          setRoles(decoded.role);
          setIsAuthorized(true);
        } else if (requiredRole && decoded.role !== requiredRole) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Failed to verify access:", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, [requiredRole]);

  if (loading) {
    return <div>Загрузка...</div>; // Показываем "Загрузка", пока проверка не завершена
  }

  // Если админ, перекидываем на /billing, если он пытается попасть на другую страницу
  if (
    roles == "admin" &&
    location.pathname !== "/billing" &&
    localStorage.getItem("accessToken")
  ) {
    return <Navigate to="/billing" />;
  }
  if (
    roles == "user" &&
    location.pathname !== "/" &&
    localStorage.getItem("accessToken")
  ) {
    return <Navigate to="/" />;
  }

  // Если не авторизован, перенаправляем на страницу входа или на главную
  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, рендерим дочерние компоненты
  return <>{children}</>;
};

export default PrivateRoute;
