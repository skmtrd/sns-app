"use client";

import React, { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";
import RemovableUserTag from "@/components/element/RemovableUserTag";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Loader2 } from "lucide-react";
import { UserInfo } from "../page";
import { set } from "zod";

export type Tag = {
  id: string;
  name: string;
};

const ProfileEditPage = () => {
  const nameRef = React.createRef<HTMLInputElement>();
  const userIdRef = React.createRef<HTMLInputElement>();
  const introRef = React.createRef<HTMLTextAreaElement>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ownedTags, setOwnedTags] = useState<Tag[]>([]);
  const [notOwnedTags, setNotOwnedTags] = useState<Tag[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = pathname.split("/profile/")[1].split("/edit")[0];
        const res = await fetch(`http://localhost:3000/api/profile/${userId}`, {
          cache: "no-cache",
        });
        const data = await res.json();
        setUserInfo(data.data);
        setOwnedTags(data.data.tags);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setError("ユーザー情報の読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [pathname]);

  useEffect(() => {
    if (nameRef.current && userIdRef.current && introRef.current && userInfo) {
      nameRef.current.value = userInfo.name;
      userIdRef.current.value = userInfo.id;
      introRef.current.value = userInfo.introduction;
    }
  }, [userInfo, nameRef, userIdRef, introRef]);

  if (isLoading)
    return (
      <div className="flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100">
        <Loader2 size="64" className="animate-spin text-blue-600" />
        ロード中...
      </div>
    );
  if (error) return <div>{error}</div>;

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
              ref={nameRef}
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50/50"
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
                ref={userIdRef}
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
              ref={introRef}
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
              {ownedTags.map((tag) => (
                <RemovableUserTag key={tag.id} tagName={tag.name} />
              ))}
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
                  {/* {tags.map((tag) => (
                    <UserTag key={tag.id} tagName={tag.name} />
                  ))} */}
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
