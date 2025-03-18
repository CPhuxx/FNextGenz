import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameList = () => {
  const navigate = useNavigate();
  const [gameProduct, setGameProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch game product data from the API
  const fetchGameProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/game-products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.gameProducts)) {
        setGameProduct(data.gameProducts);
        setError(null);
      } else {
        throw new Error("No game products found or API response is incorrect.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameProduct();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      <div className="relative container mx-auto pt-24 pb-12 px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-400 drop-shadow-lg mb-8">
          🎮 เติมเกมทั้งหมด
        </h2>

        {loading ? (
          <p className="text-white text-lg animate-pulse">⏳ กำลังโหลดข้อมูลเกม...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {gameProduct.map((game) => (
              <div
                key={game.name}
                className="relative bg-white/10 backdrop-blur-lg border border-gray-600 rounded-lg p-4 text-center shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate("/item-topup", { state: { item: game } })}
              >
                {/* Light Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-50 hover:opacity-10 transition-opacity duration-300"></div>

                {/* Game Image */}
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-36 object-contain mx-auto rounded-md mb-2 shadow-md border border-gray-500 bg-gray-900 p-2 transition-all duration-300"
                />

                {/* Game Title */}
                <p className="text-lg font-semibold text-blue-300 drop-shadow-md">{game.name}</p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg shadow-lg"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameList;
