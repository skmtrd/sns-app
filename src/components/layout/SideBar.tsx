import React from "react";

import {
  Home,
  BookOpen,
  HelpCircle,
  User,
  Search,
  Bell,
  TrendingUp,
} from "lucide-react";

const SideBar = () => {
  const navItems = [
    { page: "timeline", label: "タイムライン", icon: Home },
    { page: "tasks", label: "課題共有", icon: BookOpen },
    { page: "qa", label: "質問スペース", icon: HelpCircle },
    { page: "profile", label: "プロフィール", icon: User },
  ];
  return (
    <div className="w-20 md:w-80 bg-white p-4 border-r border-gray-200 transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 hidden md:block">
        INIAD SNS
      </h1>
      {navItems.map(({ page, label, icon: Icon }) => (
        <button
          key={page}
          className="w-full flex items-center justify-center md:justify-start p-2 mb-2 rounded hover:text-blue-600 font-bold"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <Icon size={24} />
          </div>
          <span className="hidden md:inline md:ml-3">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideBar;
