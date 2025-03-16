import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminManageData = () => {
  const [userData, setUserData] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "user", credit: 0 });
  const [showModal, setShowModal] = useState(false); // สำหรับแสดง modal ยืนยันการลบ
  const [userToDelete, setUserToDelete] = useState(null); // เก็บข้อมูลผู้ใช้ที่ต้องการลบ

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/get-user-data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setUserData([...userData, newUser]);
        setNewUser({ username: "", email: "", role: "user", credit: 0 });
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/admin/delete-user/${userToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setUserData(userData.filter((user) => user.id !== userToDelete));
        setShowModal(false);
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-manage-data p-6 bg-gray-800 min-h-screen text-white">
      <Navbar />
      <h2 className="admin-manage-data__header text-3xl my-17 font-semibold text-center text-blue-400 mb-8">จัดการข้อมูลผู้ใช้</h2>

      {/* Add User Form */}
      <div className="admin-manage-data__add-user-form mb-8">
        <h3 className="admin-manage-data__add-user-header text-2xl font-semibold text-gray-300 mb-4">เพิ่มผู้ใช้ใหม่</h3>
        <form onSubmit={handleAddUser} className="admin-manage-data__form space-y-4">
          <div className="admin-manage-data__form-group flex space-x-4">
            <div className="admin-manage-data__form-field w-full">
              <label className="admin-manage-data__label block text-gray-300">ชื่อผู้ใช้</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="admin-manage-data__input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                placeholder="ใส่ชื่อผู้ใช้"
                required
              />
            </div>

            <div className="admin-manage-data__form-field w-full">
              <label className="admin-manage-data__label block text-gray-300">อีเมล</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="admin-manage-data__input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                placeholder="ใส่อีเมล"
                required
              />
            </div>
          </div>

          <div className="admin-manage-data__form-group flex space-x-4">
            <div className="admin-manage-data__form-field w-full">
              <label className="admin-manage-data__label block text-gray-300">เครดิต</label>
              <input
                type="number"
                value={newUser.credit}
                onChange={(e) => setNewUser({ ...newUser, credit: e.target.value })}
                className="admin-manage-data__input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                placeholder="ใส่จำนวนเครดิต"
                required
              />
            </div>

            <div className="admin-manage-data__form-field w-full">
              <label className="admin-manage-data__label block text-gray-300">บทบาท</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="admin-manage-data__input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="admin-manage-data__submit-btn w-full p-3 mt-4 bg-blue-600 text-white rounded-lg">
            เพิ่มผู้ใช้
          </button>
        </form>
      </div>

      {/* User Data Table */}
      <div className="admin-manage-data__table overflow-x-auto">
        <table className="admin-manage-data__user-table min-w-full bg-gray-900 text-white">
          <thead>
            <tr>
              <th className="admin-manage-data__table-header px-4 py-2 border">ID</th>
              <th className="admin-manage-data__table-header px-4 py-2 border">ชื่อผู้ใช้</th>
              <th className="admin-manage-data__table-header px-4 py-2 border">อีเมล</th>
              <th className="admin-manage-data__table-header px-4 py-2 border">เครดิต</th>
              <th className="admin-manage-data__table-header px-4 py-2 border">บทบาท</th>
              <th className="admin-manage-data__table-header px-4 py-2 border">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <tr key={user.id} className="admin-manage-data__user-row">
                  <td className="admin-manage-data__user-cell px-4 py-2 border">{user.id}</td>
                  <td className="admin-manage-data__user-cell px-4 py-2 border">{user.username}</td>
                  <td className="admin-manage-data__user-cell px-4 py-2 border">{user.email}</td>
                  <td className="admin-manage-data__user-cell px-4 py-2 border">{user.credit} บาท</td>
                  <td className="admin-manage-data__user-cell px-4 py-2 border">{user.role}</td>
                  <td className="admin-manage-data__user-cell px-4 py-2 border">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="admin-manage-data__delete-btn bg-red-500 text-white p-2 rounded-lg"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="admin-manage-data__no-user text-center py-4">ไม่มีข้อมูลผู้ใช้</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="admin-manage-data__modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="admin-manage-data__modal-content bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="admin-manage-data__modal-header text-xl font-semibold mb-4">ยืนยันการลบผู้ใช้</h3>
            <p className="admin-manage-data__modal-message">คุณต้องการลบผู้ใช้คนนี้จริง ๆ หรือไม่?</p>
            <div className="admin-manage-data__modal-buttons mt-4 flex justify-between">
              <button
                onClick={confirmDelete}
                className="admin-manage-data__confirm-btn bg-red-500 text-white p-2 rounded-lg"
              >
                ยืนยัน
              </button>
              <button
                onClick={cancelDelete}
                className="admin-manage-data__cancel-btn bg-gray-500 text-white p-2 rounded-lg"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminManageData;
