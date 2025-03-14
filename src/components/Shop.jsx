import { useNavigate } from "react-router-dom";

// Import รูปทั้งหมดจาก `src/assets/img/`
import FreeFire from "../assets/img/freefire.png";
import Genshin from "../assets/img/genshin.png";
import Honkai from "../assets/img/honkai.png";
import Valorant from "../assets/img/Valorant.png";
import Apex from "../assets/img/apex.png";
import Ragnarok from "../assets/img/ragnarok.png";
import PUBG from "../assets/img/pubg.png";
import Identity from "../assets/img/identity.png";
import League from "../assets/img/lol.png";
import Riot from "../assets/img/riot.png";
import Roblox from "../assets/img/roblox.png";
import Razer from "../assets/img/razer.png";
import Steam from "../assets/img/Steam.png";
import TrueMoney from "../assets/img/TrueMoney.png";
import LinePoints from "../assets/img/linepoints.png";

const Shop = () => {
  const navigate = useNavigate();

  const popularGames = [
    { name: "Free Fire", img: FreeFire },
    { name: "Honkai: Star Rail", img: Honkai },
    { name: "Genshin Impact", img: Genshin },
    { name: "Identity V", img: Identity },
    { name: "PUBG Mobile", img: PUBG },
    { name: "Valorant", img: Valorant },
    { name: "Apex Legends", img: Apex },
    { name: "Ragnarok Origin", img: Ragnarok },
    { name: "League of Legends", img: League },
  ];

  const popularTopups = [
    { name: "Riot Games", img: Riot },
    { name: "Roblox Card", img: Roblox },
    { name: "Razer Gold", img: Razer },
    { name: "Steam", img: Steam },
    { name: "True Money", img: TrueMoney },
    { name: "Line Points", img: LinePoints },
  ];

  const handleItemClick = (item) => {
    navigate("/item-topup", { state: { item } });
  };

  return (
    <div className="container mx-auto py-8 px-3 text-center max-w-[1200px] w-full">
      {/* เติมเกมยอดนิยม */}
      <h2 className="text-lg sm:text-2xl font-extrabold text-white mb-6 animate-fadeInUp">
        เติมเกมยอดนิยม
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 w-full">
        {popularGames.map((game, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(game)}
            className="cursor-pointer bg-white rounded-lg p-3 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500 border border-transparent w-full"
          >
            <img
              src={game.img}
              alt={game.name}
              className="w-20 sm:w-24 md:w-28 aspect-square mx-auto rounded-lg mb-2 shadow-md border border-gray-700 bg-gray-100 p-1"
              onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
            />
            <p className="text-xs sm:text-sm font-medium text-blue-900">{game.name}</p>
          </div>
        ))}
      </div>

      {/* เติมเงินยอดนิยม */}
      <div className="py-6 sm:py-10">
        <h2 className="text-lg sm:text-2xl font-extrabold text-white mb-6 animate-fadeInUp">
          เติมเงินยอดนิยม
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 w-full">
          {popularTopups.map((topup, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(topup)}
              className="cursor-pointer bg-white rounded-lg p-3 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500 border border-transparent w-full"
            >
              <img
                src={topup.img}
                alt={topup.name}
                className="w-20 sm:w-24 md:w-28 aspect-square mx-auto rounded-lg mb-2 shadow-md border border-gray-700 bg-gray-100 p-1"
                onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
              />
              <p className="text-xs sm:text-sm font-medium text-blue-900">{topup.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
