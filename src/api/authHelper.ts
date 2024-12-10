import { jwtDecode } from "jwt-decode";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Проверка, истек ли токен или скоро истечет
export const shouldRefreshToken = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const timeLeft = decoded.exp - currentTime;
    return timeLeft < 30; // Если осталось меньше 30 секунд, обновляем токен
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Всегда обновляем токен, если ошибка декодирования
  }
};

// Функция обновления токена
export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.error("Refresh token is missing.");
    localStorage.clear();
    return false;
  }

  try {
    const response = await axios.post(`${BASE_URL}/auth/refreshToken`, {
      token: refreshToken,
    });

    const { accessToken, token: newRefreshToken } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return true;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.clear();
    return false;
  }
};
