import Link from "next/link";
import {
  Home,
  BookOpen,
  HelpCircle,
  User,
  Search,
  Bell,
  TrendingUp,
} from "lucide-react";

type Props = {
  userId: string;
};

const SideBar: React.FC<Props> = ({ userId }) => {
  const navItems = [
    { page: "/timeline/all", label: "タイムライン", icon: Home },
    { page: "/assiignment", label: "課題共有", icon: BookOpen },
    { page: "/question", label: "質問スペース", icon: HelpCircle },
    { page: `/profile/${userId}`, label: "プロフィール", icon: User },
  ];
  return (
    <div className="w-20 md:w-80 bg-white p-4 border-r border-gray-200 transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 hidden md:block">
        INIAD SNS
      </h1>
      {navItems.map(({ page, label, icon: Icon }) => (
        <Link
          key={page}
          href={page}
          className="w-full flex items-center justify-center md:justify-start p-2 mb-2 rounded hover:text-blue-600 font-bold"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <Icon size={24} />
          </div>
          <span className="hidden md:inline md:ml-3">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
