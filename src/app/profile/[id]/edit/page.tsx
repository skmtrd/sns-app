"use client";

import React, { useState, useEffect } from "react";
import RemovableUserTag from "@/components/element/RemovableUserTag";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import UserTag from "@/components/element/UserTag";

export type Tag = {
  id: string;
  name: string;
};

const fetchTags = async (): Promise<Tag[]> => {
  const res = await fetch("http://localhost:3000/api/tag", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data.tags.map((tag: any) => ({ id: tag.id, name: tag.name }));
};

const ProfileEditPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
        setError("タグの読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    loadTags();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">プロフィール編集</h2>
      </header>
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <form className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              名前
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              ユーザーID
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-sm border border-gray-300 bg-gray-50 text-gray-500 text-sm">
                @
              </span>
              <input
                type="text"
                id="username"
                className="flex-1 block w-full rounded-sm border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              自己紹介
            </label>
            <textarea
              id="bio"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              タグ
            </label>
            <div className="mt-2 flex flex-wrap">
              <RemovableUserTag tagName="JavaScript" />
              <RemovableUserTag tagName="React" />
              <RemovableUserTag tagName="Node.js" />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-between items-center"
            >
              <span className="flex items-center">
                <Plus size={20} className="mr-2" />
                タグを追加
              </span>
              {isDrawerOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            <div
              className={`mt-2 bg-white border border-gray-200 rounded-md overflow-scroll transition-all duration-300 ease-in-out ${
                isDrawerOpen ? "max-h-64" : "max-h-0"
              }`}
            >
              <div className="p-4">
                <input
                  type="text"
                  placeholder="タグを検索"
                  className="w-full px-3 py-2 border rounded-md mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <UserTag key={tag.id} tagName={tag.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
        <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          保存
        </button>
      </main>
    </div>
  );
};

export default ProfileEditPage;
