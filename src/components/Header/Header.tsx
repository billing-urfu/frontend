import "./header.scss";
import "./header-media.scss";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Исправлен импорт библиотеки
import api from "@/api/api";
import { DecodedToken } from "./types";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const checkAuthenticationAndFetchUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        setIsAuthenticated(true);

        try {
          const response = await api.get(`/users/${decodedToken.id}`);
          setFullName(response.data.user.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setIsDropdownVisible(false);
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    checkAuthenticationAndFetchUser();
  }, []);

  return (
    <div className="wrapperHeader">
      <header>
        <div className="title">
          <img
            className="Alphalogo"
            width={46}
            height={46}
            src="/image/Alpha_logo_red_white.svg"
          />
        </div>
        {isAuthenticated && (
          <div className="user-profile-wrapper">
            <button className="user-profile" onClick={toggleDropdown}>
              <span>{fullName}</span>
              <img
                className="user"
                width={40}
                height={40}
                src="/image/user1.svg"
              />
            </button>
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
