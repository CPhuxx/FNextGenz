import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo text-3xl font-bold">
          <Link to="/admin/dashboard">การจัดการหลังบ้าน</Link>
        </div>
        <div className="nav-links flex space-x-8">
          <Link to="/admin/dashboard" className="nav-link hover:text-blue-500">แดชบอร์ด</Link>
          <Link to="/admin/settings" className="nav-link hover:text-blue-500">ตั้งค่าเว็บไซต์</Link>
          <Link to="/admin/manage-data" className="nav-link hover:text-blue-500">จัดการข้อมูล</Link>
          <Link to="/admin/topup-management" className="nav-link hover:text-blue-500">จัดการเติมเกมส์</Link>
          <Link to="/admin/followers-management" className="nav-link hover:text-blue-500">จัดการปั๊มผู้ติดตาม</Link>
          <Link to="/admin/store-management" className="nav-link hover:text-blue-500">จัดการร้านค้า</Link>
          <Link to="/admin/history" className="nav-link hover:text-blue-500">ประวัติทั้งหมด</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
