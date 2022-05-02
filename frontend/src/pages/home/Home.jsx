import React from "react";
import { RightBar } from "../../components/rightbar/RightBar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { TimeLine } from "../../components/timeline/TimeLine";
import { Topbar } from "../../components/topbar/Topbar";
import "./home.css";

export const Home = () => {
  return (
    <>
      <Topbar />
      {/* sidebar */}
      <div className="homeContainer">
        <Sidebar />
        {/* timeline */}
        <TimeLine />
        {/* rightbar */}
        <RightBar />
      </div>
    </>
  );
};
