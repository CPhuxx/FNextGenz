import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const ItemTopupPage = () => {
  const location = useLocation();
  const { item } = location.state || { item: { name: "Unknown", img: "" } };
  
  const [gameId, setGameId] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [price, setPrice] = useState(null);

  const handleAmountChange = (amount, price) => {
    setSelectedAmount(amount);
    setPrice(price);  // คำนวณราคาที่เลือก
  };

  const handleSubmit = () => {
    if (!gameId || !selectedAmount) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ส่งข้อมูลไปยัง API หรือประมวลผลตามต้องการ
    alert(`คุณได้เลือกเติมเกม: ${item.name}, จำนวน: ${selectedAmount} คูปอง`);
  };

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
            <p className="text-lg font-semibold text-gray-300 mb-4">{item.name}</p>
            
            {/* ฟอร์มกรอก ID เกม */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="กรอก ID เกมของคุณ"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* เลือกจำนวนคูปอง */}
            <div className="mb-6">
              <div className="flex justify-around">
                <button
                  onClick={() => handleAmountChange(1000, 333.2)}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${selectedAmount === 1000 ? "bg-blue-700" : ""}`}
                >
                  1,000 Cores
                </button>
                <button
                  onClick={() => handleAmountChange(1850, 588)}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${selectedAmount === 1850 ? "bg-blue-700" : ""}`}
                >
                  1,850 Cores
                </button>
                <button
                  onClick={() => handleAmountChange(10000, 2940)}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${selectedAmount === 10000 ? "bg-blue-700" : ""}`}
                >
                  10,000 Cores
                </button>
              </div>
            </div>

            {/* แสดงราคา */}
            {price && (
              <div className="text-xl font-semibold text-white mb-4">
                ราคา: {price} บาท
              </div>
            )}

            {/* ปุ่มยืนยันการเติม */}
            <button
              onClick={handleSubmit}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
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
