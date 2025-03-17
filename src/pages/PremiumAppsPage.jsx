import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

// 🔹 สินค้าหลักที่ต้องแสดงเสมอ (คอมเมนต์ไว้เผื่อใช้ภายหลัง)
/*
const appImages = {
  netflix: new URL("../assets/img2/netflix.png", import.meta.url).href,
  youtube: new URL("../assets/img2/youtube.png", import.meta.url).href,
  spotify: new URL("../assets/img2/spotify.png", import.meta.url).href,
  canva: new URL("../assets/img2/canva.png", import.meta.url).href,
  hbo: new URL("../assets/img2/hbo.png", import.meta.url).href,
  disney: new URL("../assets/img2/disney.png", import.meta.url).href,
  prime: new URL("../assets/img2/prime.png", import.meta.url).href,
  trueid: new URL("../assets/img2/trueid.png", import.meta.url).href,
};

const defaultPremiumApps = [
  { id: "1", name: "Netflix 4K (ส่วนตัว)", price: 571, img: appImages.netflix, details: ["✔️ รองรับทุกอุปกรณ์", "✔️ Ultra HD 4K"] },
  { id: "6", name: "YouTube Premium (ส่วนตัว)", price: 15, img: appImages.youtube, details: ["✔️ ไม่มีโฆษณา", "✔️ ดาวน์โหลดวิดีโอได้"] },
  { id: "17", name: "Spotify Premium", price: 10, img: appImages.spotify, details: ["✔️ ไม่มีโฆษณา", "✔️ ฟังเพลงออฟไลน์"] },
  { id: "15", name: "Amazon Prime Video", price: 45, img: appImages.prime, details: ["✔️ หนังและซีรีส์ Amazon", "✔️ รองรับ 4K UHD"] },
];
*/

const PremiumAppsPage = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(0);
  const [premiumApps, setPremiumApps] = useState([]); // ✅ ดึงสินค้าจาก API โดยตรง
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setCredit(storedUser.credit || 0);
    }
  }, []);

  // ✅ ฟังก์ชันดึงสินค้าจาก ByShop API
  const fetchProducts = async () => {
    console.log("📢 Fetching products from backend...");

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
        console.log("✅ Products loaded:", data.products.length);
        setPremiumApps(data.products);
        setError(null);
      } else {
        throw new Error("❌ ไม่พบข้อมูลสินค้า หรือ API ตอบกลับผิดโครงสร้าง");
      }
    } catch (error) {
      console.error("❌ Error fetching products:", error.message);
      setError("❌ ไม่สามารถโหลดสินค้าได้: " + error.message);

      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchProducts();
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ฟังก์ชันสั่งซื้อสินค้า
  const handlePurchase = async (app) => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
      navigate("/login");
      return;
    }

    if (credit < app.price) {
      alert("ไม่สามารถทำการสั่งซื้อได้เนื่องจากเครดิตไม่พอ");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyapi: "BYShop-m0XNSdX68cilPrX9gcZ81arPPN4NJv", // ✅ เพิ่ม keyapi
          id: app.id,
          username: user.username || "puridet009",
        }),
      });

      if (!response.ok) {
        throw new Error(`เกิดข้อผิดพลาด: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();

      if (data.status === "success") {
        const newCredit = credit - app.price;
        setCredit(newCredit);
        localStorage.setItem("user", JSON.stringify({ ...user, credit: newCredit }));

        alert("✅ ทำการสั่งซื้อสำเร็จ! กำลังไปยังหน้าประวัติการสั่งซื้อ...");
        navigate("/order-history", {
          state: { product: app, email: data.email, password: data.password },
        });
      } else {
        alert("❌ การสั่งซื้อไม่สำเร็จ: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error processing purchase:", error);
      alert(error.message || "❌ ไม่สามารถเชื่อมต่อ API ได้ กรุณาลองใหม่");
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
          <p className="text-white">⏳ กำลังโหลดข้อมูลสินค้า...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {premiumApps.map((app) => (
              <div key={app.id} className="bg-gray-800 rounded-lg p-3 shadow-lg transition hover:scale-105 hover:bg-gray-700">
                <img src={app.img || "https://via.placeholder.com/150"} alt={app.name} className="w-full aspect-square rounded-lg mb-3 border border-gray-700" />
                <h3 className="text-md font-semibold text-white">{app.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{app.price} บาท</p>
                <div className="flex flex-col gap-2">
                  <button className="btn btn-buy" onClick={() => setSelectedApp(app)}>รายละเอียด</button>
                  <button className="btn btn-order" onClick={() => handlePurchase(app)}>สั่งซื้อสินค้า</button>
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
