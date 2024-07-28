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
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <h2 className="text-xl font-bold">プロフィール</h2>
        <div className="flex items-center">
          <div className="relative mr-4"></div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center">
            <div>
              <h1 className="text-2xl font-bold">山田太郎</h1>
              <p className="text-gray-600">@yamada_taro</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            INIAD生です。プログラミングと映画が好きです。AI and machine learning
            enthusiast.
          </p>
          <div className="mb-4 flex flex-wrap">
            <span className="mb-2 mr-2 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 hover:bg-blue-300">
              JavaScript
            </span>
            <span className="mb-2 mr-2 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 hover:bg-blue-300">
              JavaScript
            </span>
          </div>
        </div>
        <button className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          編集
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;
