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
      <h1>Profile</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
