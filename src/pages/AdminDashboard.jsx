import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Make sure Navbar is properly imported
import Footer from '../components/Footer'; // Make sure Footer is properly imported

const AdminDashboard = () => {
  const navigate = useNavigate();

  const statistics = {
    totalTopUp: 100000,
    purchasesToday: 10000,
    topUpToday: 5000,
    purchasesThisMonth: 50000,
    topUpThisMonth: 20000,
    totalPurchases: 200000,
  };

  return (
    <div className="admin-dashboard bg-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <main className="admin-main-content p-6 flex-grow bg-gray-900 text-white">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-400">จัดการหลังบ้าน</h2>

        {/* Admin Management Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => navigate("/admin/settings")}
            className="admin-action-card bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <h3 className="text-xl font-bold mb-2">ตั้งค่าเว็บไซต์</h3>
            <p>จัดการการตั้งค่าทั่วไปของเว็บไซต์</p>
          </button>

          <button
            onClick={() => navigate("/admin/manage-data")}
            className="admin-action-card bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <h3 className="text-xl font-bold mb-2">จัดการข้อมูล</h3>
            <p>จัดการข้อมูลของผู้ใช้และระบบ</p>
          </button>

          <button
            onClick={() => navigate("/admin/topup-management")}
            className="admin-action-card bg-yellow-600 hover:bg-yellow-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <h3 className="text-xl font-bold mb-2">จัดการเติมเกมส์</h3>
            <p>ตรวจสอบและจัดการการเติมเกมส์</p>
          </button>

          <button
            onClick={() => navigate("/admin/followers-management")}
            className="admin-action-card bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <h3 className="text-xl font-bold mb-2">จัดการปั๊มผู้ติดตาม</h3>
            <p>จัดการผู้ติดตามและการเพิ่มยอด</p>
          </button>

          <button
            onClick={() => navigate("/admin/store-management")}
            className="admin-action-card bg-teal-600 hover:bg-teal-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <h3 className="text-xl font-bold mb-2">จัดการร้านค้า</h3>
            <p>จัดการสินค้าบนเว็บไซต์</p>
          </button>

          <button
            onClick={() => navigate("/admin/history")}
            className="admin-action-card bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <h3 className="text-xl font-bold mb-2">ประวัติทั้งหมด</h3>
            <p>ดูประวัติการดำเนินการทั้งหมด</p>
          </button>
        </div>

        {/* Admin Stats - Section for Money Statistics */}
        <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat-card bg-white p-6 rounded-lg shadow-md text-gray-900 hover:bg-blue-100 hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">การเติมเงินทั้งหมด</h3>
            <p className="text-3xl font-bold text-blue-600">{statistics.totalTopUp} บาท</p>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md text-gray-900 hover:bg-green-100 hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">การซื้อสินค้าวันนี้</h3>
            <p className="text-3xl font-bold text-green-600">{statistics.purchasesToday} บาท</p>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md text-gray-900 hover:bg-yellow-100 hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">ยอดการเติมในวันนี้</h3>
            <p className="text-3xl font-bold text-yellow-600">{statistics.topUpToday} บาท</p>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md text-gray-900 hover:bg-purple-100 hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">การซื้อสินค้าเดือนนี้</h3>
            <p className="text-3xl font-bold text-purple-600">{statistics.purchasesThisMonth} บาท</p>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md text-gray-900 hover:bg-teal-100 hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">การเติมเงินเดือนนี้</h3>
            <p className="text-3xl font-bold text-teal-600">{statistics.topUpThisMonth} บาท</p>
          </div>

          <div className="stat-card bg-white p-6 rounded-lg shadow-md text-gray-900 hover:bg-indigo-100 hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">การซื้อสินค้าทั้งหมด</h3>
            <p className="text-3xl font-bold text-indigo-600">{statistics.totalPurchases} บาท</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
