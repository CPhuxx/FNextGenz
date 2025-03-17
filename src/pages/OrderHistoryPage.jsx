import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // ดึงข้อมูลผู้ใช้

  useEffect(() => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนดูประวัติการสั่งซื้อ");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/order-history/history", {
          username: user.username,
        });

        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto py-12 px-6 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-6">ประวัติการสั่งซื้อ</h2>

        {loading ? (
          <p className="text-center text-gray-400">กำลังโหลดข้อมูล...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-400">ไม่มีประวัติการสั่งซื้อ</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 border border-gray-700">#</th>
                  <th className="p-3 border border-gray-700">สินค้า</th>
                  <th className="p-3 border border-gray-700">ราคา</th>
                  <th className="p-3 border border-gray-700">สถานะ</th>
                  <th className="p-3 border border-gray-700">วันที่</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-700">
                    <td className="p-3 border border-gray-700">{index + 1}</td>
                    <td className="p-3 border border-gray-700">{order.name}</td>
                    <td className="p-3 border border-gray-700">{order.price} บาท</td>
                    <td className="p-3 border border-gray-700">
                      {order.status_fix === "0" ? (
                        <span className="text-yellow-400">รอดำเนินการ</span>
                      ) : order.status_fix === "1" ? (
                        <span className="text-green-400">สำเร็จ</span>
                      ) : (
                        <span className="text-red-400">ล้มเหลว</span>
                      )}
                    </td>
                    <td className="p-3 border border-gray-700">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
