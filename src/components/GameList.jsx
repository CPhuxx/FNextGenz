import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

// Import รูปเกมทั้งหมด
import FreeFire from "../assets/img/freefire.png";
import Genshin from "../assets/img/genshin.png";
import Honkai from "../assets/img/honkai.png";
import Valorant from "../assets/img/Valorant.png";
import Apex from "../assets/img/apex.png";
import Ragnarok from "../assets/img/ragnarok.png";
import PUBG from "../assets/img/pubg.png";
import Identity from "../assets/img/identity.png";
import League from "../assets/img/lol.png";

const GameList = () => {
  const navigate = useNavigate();
  const [hoveredGame, setHoveredGame] = useState(null);

  const games = [
    { id: "undawn", name: "Garena Undawn", img: FreeFire },
    { id: "valorant", name: "Valorant", img: Valorant },
    { id: "apex", name: "Apex Legends", img: Apex },
    { id: "freefire", name: "Free Fire", img: FreeFire },
    { id: "honkai", name: "Honkai: Star Rail", img: Honkai },
    { id: "genshin", name: "Genshin Impact", img: Genshin },
    { id: "identity", name: "Identity V", img: Identity },
    { id: "pubg", name: "PUBG Mobile", img: PUBG },
    { id: "lol", name: "League of Legends", img: League },
    { id: "ragnarok", name: "Ragnarok Origin", img: Ragnarok },
  ];

  const handleGameClick = (game) => {
    navigate("/item-topup", { state: { item: game } });
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4 text-center bg-black-theme">
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-theme mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        เติมเกมทั้งหมด 🎮
      </motion.h2>

      <div className="max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="relative bg-white rounded-lg p-3 text-center shadow-md border border-blue-300 hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => handleGameClick(game)}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
            whileHover={{ scale: 1.08 }} // ขยายขณะ Hover
            animate={{
              y: hoveredGame === game.id ? -5 : [0, -3, 0], // สั่นไหวเบาๆ
              transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent 
              to-blue-600 opacity-0 transition-opacity duration-300 ${
                hoveredGame === game.id ? "opacity-40" : ""
              }`}
            />

            <motion.img
              src={game.img}
              alt={game.name}
              className="w-full aspect-square mx-auto rounded-md mb-2 shadow-lg border border-blue-300 bg-gray-800 p-1 transition-all duration-300"
              onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
              animate={{
                scale: hoveredGame === game.id ? 1.12 : [1, 1.02, 1], // ส่องแสงตลอดเวลา
                rotate: hoveredGame === game.id ? 3 : [0, 1, -1, 0], // หมุนเล็กน้อยตลอดเวลา
                transition: { duration: 2, repeat: Infinity, repeatType: "mirror" },
              }}
            />

            <p
              className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
                hoveredGame === game.id ? "text-blue-400" : "text-blue-900"
              }`}
            >
              {game.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
