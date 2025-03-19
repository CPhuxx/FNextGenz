import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const ItemTopupPage = () => {
  const location = useLocation();
  const { item } = location.state || { item: { name: "Unknown", img: "" } };
  
  const [gameId, setGameId] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [price, setPrice] = useState(null);

  // รายการแพ็กเกจเติมเงิน (คูปอง + ราคา)
  const topupPackages = [
    { amount: 11, price: 9.8 },
    { amount: 24, price: 19.6 },
    { amount: 60, price: 49 },
    { amount: 110, price: 88.2 },
    { amount: 185, price: 147 },
    { amount: 370, price: 294 },
    { amount: 620, price: 490 },
    { amount: 1240, price: 980 },
  ];

  // เมื่อกดเลือกแพ็กเกจ
  const handleAmountChange = (amount, price) => {
    setSelectedAmount(amount);
    setPrice(price);
  };

  // ตรวจสอบข้อมูลก่อนเติมเงิน
  const handleSubmit = () => {
    if (!gameId) {
      alert("❌ กรุณากรอก ID เกมของคุณ");
      return;
    }
    if (!selectedAmount) {
      alert("❌ กรุณาเลือกแพ็กเกจที่ต้องการเติม");
      return;
    }

    alert(`✅ เติมเกม ${item.name} สำเร็จ! \nจำนวน: ${selectedAmount} คูปอง \nราคา: ${price} บาท`);
  };

  return (
    <div className="min-h-screen bg-black-theme text-theme">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16 px-6">
        {/* ส่วนบน: ข้อมูลเกม */}
        <div className="flex flex-col items-center text-center">
          <img
            src={item.img}
            alt={item.name}
            className="w-48 h-48 rounded-lg shadow-lg border border-gray-700 mb-4"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
          />
          <h2 className="text-3xl font-extrabold text-white">{item.name}</h2>
          <p className="text-gray-400 mt-2">
            หากกรอก ID ผิด ร้านจะไม่รับผิดชอบทุกกรณี กรุณาเช็กให้เรียบร้อย
          </p>

          {/* ฟอร์มกรอก ID เกม */}
          <div className="mt-4 w-full max-w-md">
            <input
              type="text"
              placeholder="กรอก ID เกมของคุณ"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none border border-gray-600"
            />
            <p className="text-red-500 text-sm mt-2">
              * กรุณากรอก ID ก่อนเลือกสินค้า *
            </p>
          </div>
        </div>

        {/* รายการแพ็กเกจเติมเงิน */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white text-center mb-4">เลือกแพ็กเกจที่ต้องการเติม</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {topupPackages.map((pkg) => (
              <button
                key={pkg.amount}
                onClick={() => handleAmountChange(pkg.amount, pkg.price)}
                className={`p-4 rounded-lg shadow-md text-white font-semibold transition-all border border-gray-600 hover:border-blue-500 
                  ${selectedAmount === pkg.amount ? "bg-blue-700" : "bg-gray-800"}`}
              >
                ได้รับ {pkg.amount} คูปอง
                <br />
                <span className="text-blue-400">{pkg.price} THB</span>
              </button>
            ))}
          </div>
        </div>

        {/* แสดงราคาที่เลือก */}
        {price && (
          <div className="text-xl font-semibold text-white text-center mt-6">
            ราคา: <span className="text-green-400">{price} บาท</span>
          </div>
        )}

        {/* ปุ่มยืนยันการเติม */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-red-500 text-white rounded-lg font-bold text-lg hover:bg-red-600 transition-colors duration-300 shadow-lg"
          >
            เติมเงินตอนนี้
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemTopupPage;
