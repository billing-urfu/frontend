import { useEffect, useState } from "react";
import { DecodedToken } from "./types";
import { jwtDecode } from "jwt-decode";
import api from "@/api/api";

interface Props {
  title: string;
}

const HeaderAdmin: React.FC<Props> = ({ title }) => {
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
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl ml-24 py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-sembold text-gray-100">{title}</h1>
      </div>
      <div className="user-profile-wrapper">
        <button className="user-profile" onClick={toggleDropdown}>
          <span>{fullName}</span>
          <img className="user" width={40} height={40} src="/image/user1.svg" />
        </button>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;
