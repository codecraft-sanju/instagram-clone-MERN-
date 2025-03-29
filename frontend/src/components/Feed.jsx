import React from "react";
import Post from "../components/Post";
import Stories from "./Stories";

const HomePage = () => {
  return (
    <div className="flex justify-center w-full">

      <div className="w-full max-w-2xl mx-auto">
        <Stories />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default HomePage;
