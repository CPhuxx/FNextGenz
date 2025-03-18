import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameList from "../components/GameList";  // นำเข้า GameList

const GameTopupPage = () => {
  return (
    <div className="min-h-screen bg-black-theme text-theme">
      <Navbar />
      <div className="container mx-auto max-w-[1200px] px-6">
        <GameList />  {/* เรียกใช้งาน GameList */}
      </div>
      <Footer />
    </div>
  );
};

export default GameTopupPage;
