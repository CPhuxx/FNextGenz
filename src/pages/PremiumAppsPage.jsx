import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

const PremiumAppsPage = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(0);
  const [premiumApps, setPremiumApps] = useState([]); // ✅ ดึงสินค้าจาก API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buying, setBuying] = useState(false); // ✅ สถานะกำลังซื้อสินค้า

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (err) {
      console.error("❌ Error loading user data:", err);
    }
  }, []);

  // ✅ ฟังก์ชันดึงเครดิตจาก ByShop API
  const fetchUserCredit = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("❌ ไม่สามารถดึงเครดิตจาก ByShop ได้");
      }

      const data = await response.json();
      if (data.status === "success") {
        setCredit(parseFloat(data.money)); // ✅ ใช้เครดิตจริงจาก ByShop
      } else {
        throw new Error("❌ ไม่พบข้อมูลเครดิต");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserCredit();
  }, []);

  // ✅ ฟังก์ชันดึงสินค้าจาก API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`เกิดข้อผิดพลาด: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();

      if (data.status === "success" && Array.isArray(data.products)) {
        setPremiumApps(data.products);
        setError(null);
      } else {
        throw new Error("❌ ไม่พบข้อมูลสินค้า หรือ API ตอบกลับผิดโครงสร้าง");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ฟังก์ชันสั่งซื้อสินค้า
  const handlePurchase = async (app) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const username = storedUser?.username || "puridet009"; // ✅ ใช้ username ที่ถูกต้อง

    if (!username) {
      alert("❌ ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
      navigate("/login");
      return;
    }

    // ✅ อัปเดตเครดิตล่าสุดก่อนซื้อ
    await fetchUserCredit();

    if (credit < app.price) {
      alert("❌ เครดิตไม่เพียงพอ กรุณาเติมเงินก่อน");
      return;
    }

    setBuying(true); // ✅ ตั้งค่าสถานะกำลังซื้อ

    try {
      const response = await fetch("http://localhost:4000/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: app.id,
          username, // ✅ ใช้ username ที่ถูกต้อง
        }),
      });

      if (!response.ok) {
        throw new Error(`เกิดข้อผิดพลาด: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();

      if (data.status === "success") {
        // ✅ อัปเดตเครดิตของผู้ใช้จาก ByShop ทันที
        await fetchUserCredit();

        alert(`✅ สั่งซื้อสำเร็จ! Order ID: ${data.orderid}`);

        // ✅ นำผู้ใช้ไปยังหน้าประวัติการสั่งซื้อ
        navigate("/order-history", {
          state: { product: app, orderid: data.orderid, email: data.info },
        });
      } else {
        alert("❌ การสั่งซื้อไม่สำเร็จ: " + data.message);
      }
    } catch (error) {
      alert("❌ ไม่สามารถเชื่อมต่อ API ได้ กรุณาลองใหม่");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black-theme text-theme">
      <Navbar />
      <main className="flex-grow container mx-auto py-20 px-4 text-center max-w-[1200px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 animate-fadeInUp">
          🎬 แอพพรีเมี่ยมยอดนิยม
        </h2>

        {loading ? (
          <p className="text-white text-lg">⏳ กำลังโหลดข้อมูลสินค้า...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {premiumApps.map((app) => (
              <div key={app.id} className="bg-gray-800 rounded-lg p-3 shadow-lg transition hover:scale-105 hover:bg-gray-700">
                <img
                  src={app.img || "https://via.placeholder.com/150"}
                  alt={app.name}
                  className="w-full aspect-square rounded-lg mb-3 border border-gray-700"
                />
                <h3 className="text-md font-semibold text-white">{app.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{app.price} บาท</p>
                <div className="flex flex-col gap-2">
                  <button className="btn btn-buy" onClick={() => setSelectedApp(app)}>รายละเอียด</button>
                  <button
                    className="btn btn-order"
                    onClick={() => handlePurchase(app)}
                    disabled={buying} // ✅ ปิดปุ่มระหว่างกำลังซื้อ
                  >
                    {buying ? "⏳ กำลังซื้อ..." : "🛒 สั่งซื้อสินค้า"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PremiumAppsPage;
