import React from "react";

const fetchTags = async () => {
  const res = await fetch("http://localhost:3000/api/tag", {
    cache: "no-cache",
  });

  const data = await res.json();

  return data.tags;
};

const ProfilePage = async () => {
  const tags = await fetchTags();
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">プロフィール</h2>
        <div className="flex items-center">
          <div className="relative mr-4"></div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">山田太郎</h1>
              <p className="text-gray-600">@yamada_taro</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            INIAD生です。プログラミングと映画が好きです。AI and machine learning
            enthusiast.
          </p>
          <div className="flex flex-wrap mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2 hover:bg-blue-300">
              JavaScript
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2 hover:bg-blue-300">
              JavaScript
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
