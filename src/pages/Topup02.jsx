import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import qrcode from "../assets/img/qrcode.jpg";

const Topup02 = () => {
  const [selectedMethod, setSelectedMethod] = useState("TrueMoney");
  const [slipFile, setSlipFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleTopup = async () => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการเติมเงิน");
      return;
    }

    if (!slipFile) {
      alert("กรุณาอัปโหลดสลิปก่อนยืนยัน");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("method", selectedMethod);
      formData.append("slip", slipFile);

      const response = await axios.post("http://localhost:4001/api/topup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("เติมเงินสำเร็จ! รอตรวจสอบสลิป...");
        window.location.reload();
      } else {
        alert(response.data.message || "เติมเงินไม่สำเร็จ กรุณาลองอีกครั้ง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเติมเงิน:", error);
      alert("ไม่สามารถทำรายการได้ในขณะนี้");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto pt-16 pb-8 px-4 sm:px-6">
        <h2 className="text-3xl my-8 font-extrabold text-white mb-6 text-center">ช่องทางการชำระเงิน</h2>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
          {/* ช่องทางการชำระเงิน */}
          <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-white text-center">เลือกช่องทางการชำระเงิน</h3>
            <div className="space-y-4">
              {["TrueMoney", "โอนผ่านธนาคาร"].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`w-full p-4 rounded-lg font-semibold transition duration-300 ${
                    selectedMethod === method
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* การแสดง QR และการอัปโหลดสลิป */}
          <div className="w-full md:w-2/3 bg-gray-800 p-8 rounded-lg shadow-xl">
            {selectedMethod === "โอนผ่านธนาคาร" && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-white text-center">โอนเงินผ่านธนาคาร</h3>
                <img
                  src={qrcode}
                  alt="Bank QR"
                  className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-md"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg mt-4"
                  onChange={(e) => setSlipFile(e.target.files[0])}
                />
              </>
            )}

            <button
              onClick={handleTopup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-6 rounded-lg font-bold transition duration-300"
            >
              ยืนยันเติมเงิน
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Topup02;
