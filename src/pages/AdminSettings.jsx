import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // นำเข้า Navbar
import Footer from "../components/Footer"; // นำเข้า Footer

const AdminSettings = () => {
  const [banner, setBanner] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);  // สำหรับการแสดงตัวอย่างของภาพที่เลือก
  const [showModal, setShowModal] = useState(false); // สำหรับแสดง/ซ่อน Modal
  const [pendingFile, setPendingFile] = useState(null); // สำหรับเก็บไฟล์ที่กำลังจะอัปโหลด

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);

    // สร้าง URL สำหรับการดูตัวอย่างของไฟล์
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!banner) {
      setMessage("กรุณาเลือกไฟล์ Banner");
      return;
    }

    // แสดง Modal เพื่อยืนยันการอัปโหลด
    setPendingFile(banner);
    setShowModal(true);
  };

  const confirmUpload = async () => {
    // ปิด Modal และเริ่มการอัปโหลด
    setShowModal(false);

    const formData = new FormData();
    formData.append("banner", pendingFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/upload-banner",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setMessage("อัปโหลด Banner สำเร็จ!");
        // เปลี่ยนพื้นหลังหน้าเว็บด้วยภาพ Banner ใหม่
        document.body.style.backgroundImage = `url('${response.data.filePath}')`;
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการอัปโหลด Banner");
    }
  };

  const cancelUpload = () => {
    setShowModal(false); // ปิด Modal เมื่อยกเลิก
  };

  const handleClear = () => {
    setBanner(null);
    setPreview(null);
    setMessage("");
  };

  return (
    <div className="admin-settings">
      <Navbar /> {/* เพิ่ม Navbar ที่นี่ */}
      <main className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl text-gray-800 flex-grow mt-10">
        <h2 className="text-4xl my-7 font-semibold text-center text-indigo-600 mb-8">
          ปรับแต่ง Banner
        </h2>

        <form onSubmit={handleUpload} className="space-y-8">
          <div className="admin-upload-section">
            <input
              type="file"
              onChange={handleFileChange}
              className="block p-4 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-md cursor-pointer"
              required
            />
            {preview && (
              <div>
                <h3 className="text-xl text-gray-700 mb-4">ตัวอย่าง Banner</h3>
                <img
                  src={preview}
                  alt="Banner Preview"
                  className="rounded-lg shadow-xl mb-6"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="admin-button"
            >
              อัปโหลด Banner
            </button>
            {/* ปุ่ม Clear */}
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
            >
              ลบไฟล์
            </button>
          </div>
        </form>

        {message && <p className="mt-6 text-center text-yellow-500 text-xl">{message}</p>}

        {/* Modal สำหรับยืนยันการอัปโหลด */}
        {showModal && (
          <div className="admin-modal-background">
            <div className="admin-modal-content">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">ยืนยันการอัปโหลด</h3>
              <p className="text-gray-700 mb-4">คุณต้องการอัปโหลดไฟล์นี้หรือไม่?</p>
              <div className="flex justify-between">
                <button
                  onClick={confirmUpload}
                  className="admin-modal-button confirm"
                >
                  ยืนยัน
                </button>
                <button
                  onClick={cancelUpload}
                  className="admin-modal-button cancel"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer /> {/* เพิ่ม Footer ที่นี่ */}
    </div>
  );
};

export default AdminSettings;
