import { useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "Пользователи",
    icon: "zaza",
    color: "black",
    path: "/",
  },
  {
    name: "Отчётность и аналитика",
    icon: "zaza",
    color: "black",
    path: "/otchet",
  },
  {
    name: "Финансовая информация",
    icon: "zaza",
    color: "black",
    path: "/finansInfo",
  },
  {
    name: "Журнал событий",
    icon: "zaza",
    color: "black",
    path: "/eventlog",
  },
];

const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Sidebar;
