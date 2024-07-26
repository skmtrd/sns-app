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
    <div>
      <h1 className="text-2xl">Profile</h1>
      <div className="flex gap-10">
        {tags.map((tag) => (
          <div
            className="bg-blue-500 flex justify-center items-center rounded-xl text-white p-2"
            key={tag.id}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
