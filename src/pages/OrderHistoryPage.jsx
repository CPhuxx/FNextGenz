import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, user } = location.state || {};  // รับข้อมูลสินค้าจากหน้า PremiumAppsPage และข้อมูลผู้ใช้จากการ login

  const [userCredit, setUserCredit] = useState(0); // เครดิตของผู้ใช้
  const [isOrderSuccess, setIsOrderSuccess] = useState(false); // ตัวแปรเพื่อเช็คการสั่งซื้อสำเร็จหรือไม่

  // ฟังก์ชันเพื่อตรวจสอบเครดิตของผู้ใช้
  useEffect(() => {
    // สมมุติว่าเราดึงข้อมูลเครดิตจาก API หรือจาก state ของผู้ใช้
    if (user) {
      setUserCredit(user.credit);  // สมมุติว่า user.credit คือเครดิตของผู้ใช้ที่ได้รับ
    }
  }, [user]);

  const handleOrder = () => {
    // ตรวจสอบเครดิตก่อนทำการสั่งซื้อ
    if (userCredit >= parseInt(product.price.split(" ")[0])) {
      setIsOrderSuccess(true);  // หากเครดิตเพียงพอให้การสั่งซื้อสำเร็จ
      // เพิ่มการสั่งซื้อไปยังฐานข้อมูล
      // สามารถใช้ fetch API หรือ axios เพื่อทำการบันทึกข้อมูลในฐานข้อมูล
      // หลังจากนั้นเราจะไปที่หน้าประวัติการสั่งซื้อ
      navigate("/order-history", { state: { product, user } });
    } else {
      alert("เครดิตของคุณไม่เพียงพอสำหรับการสั่งซื้อ");
    }
  };

  return (
    <div className="order-history-page p-6 bg-gray-800 min-h-screen text-white">
      <Navbar />

      <main className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">ประวัติการสั่งซื้อ</h2>

        {product ? (
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
            <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <p className="text-gray-300">ราคา: {product.price}</p>
            <p className="text-gray-300 mb-4">รายละเอียด: {product.description}</p>
            <p className="text-gray-300">จำนวน: {product.quantity} ชิ้น</p>
            <p className="text-gray-300 mb-4">เครดิตของคุณ: {userCredit} บาท</p>

            {/* ปุ่มสั่งซื้อสินค้า */}
            <button 
              className="btn btn-order mt-4"
              onClick={handleOrder}
            >
              {isOrderSuccess ? "สั่งซื้อสำเร็จ" : "สั่งซื้อสินค้า"}
            </button>
          </div>
        ) : (
          <p className="text-white">ไม่พบข้อมูลการสั่งซื้อ</p>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
