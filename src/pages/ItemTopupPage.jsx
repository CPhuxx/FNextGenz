import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ItemTopupPage = () => {
  const location = useLocation();
  const { item } = location.state || { item: { name: "Unknown", img: "" } };

  return (
    <div className="min-h-screen bg-black-theme text-theme">
      <Navbar />
      <div className="container mx-auto pt-32 pb-16 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-8 animate-fadeInUp">
          เติมเงิน: {item.name}
        </h2>

        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <img
              src={item.img}
              alt={item.name}
              className="w-40 h-40 mx-auto rounded-lg mb-4 shadow-md"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
            />
            <p className="text-lg font-semibold text-gray-300">{item.name}</p>
            <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
              เติมเงินตอนนี้
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemTopupPage;
