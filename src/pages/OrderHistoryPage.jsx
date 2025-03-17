import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, email, password } = location.state || {}; // ✅ รับข้อมูลสินค้า + Email/Password

  const [userCredit, setUserCredit] = useState(0);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserCredit(storedUser.credit || 0);
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("คัดลอกสำเร็จ!");
  };

  return (
    <div className="order-history-page p-6 bg-gray-900 min-h-screen text-white">
      <Navbar />

      <main className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">🛒 ประวัติการสั่งซื้อ</h2>

        {product ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
            <img
              src={product.img || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-700"
            />
            <p className="text-gray-300">💰 ราคา: {product.price} บาท</p>
            <p className="text-gray-300">📦 จำนวน: 1 รายการ</p>
            <p className="text-gray-300 mb-4">🪙 เครดิตของคุณ: {userCredit} บาท</p>

            {/* ✅ แสดง Email & Password ถ้ามี */}
            {email && password ? (
              <div className="bg-gray-700 p-4 rounded-lg text-left">
                <p className="text-gray-300 mb-2">📩 <strong>บัญชีที่ได้รับ:</strong></p>
                <div className="flex justify-between items-center bg-gray-900 p-2 rounded-md mb-2">
                  <span className="text-gray-300">{email}</span>
                  <button className="text-blue-400 hover:text-blue-500" onClick={() => handleCopy(email)}>📋 คัดลอก</button>
                </div>

                <p className="text-gray-300 mb-2">🔑 <strong>รหัสผ่าน:</strong></p>
                <div className="flex justify-between items-center bg-gray-900 p-2 rounded-md">
                  <span className="text-gray-300">{password}</span>
                  <button className="text-blue-400 hover:text-blue-500" onClick={() => handleCopy(password)}>📋 คัดลอก</button>
                </div>
              </div>
            ) : (
              <p className="text-yellow-400 mt-4">⏳ กำลังดำเนินการส่งสินค้า...</p>
            )}

            {/* ปุ่มกลับหน้าหลัก */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 mt-6 rounded-md"
              onClick={() => navigate("/premium-apps")}
            >
              🔙 กลับไปหน้าสินค้า
            </button>
          </div>
        ) : (
          <p className="text-red-500">❌ ไม่พบข้อมูลการสั่งซื้อ</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
