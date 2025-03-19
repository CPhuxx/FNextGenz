import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

const PremiumAppsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(0);
  const [premiumApps, setPremiumApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buying, setBuying] = useState(false);
  const [customPrices, setCustomPrices] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (err) {
      console.error("❌ Error loading user data:", err);
    }
  }, []);

  const fetchUserCredit = async () => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:4000/api/money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      if (!response.ok) throw new Error("❌ ไม่สามารถดึงเครดิตจาก ByShop ได้");

      const data = await response.json();
      if (data.status === "success") {
        setCredit(parseFloat(data.money));
      } else {
        throw new Error("❌ ไม่พบข้อมูลเครดิต");
      }
    } catch (error) {
      console.error(error.message);
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  useEffect(() => {
    if (user) fetchUserCredit();
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`เกิดข้อผิดพลาด: ${response.statusText} (${response.status})`);

      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.products)) {
        setPremiumApps(data.products);
        const priceMap = {};
        data.products.forEach((app) => (priceMap[app.id] = app.price));
        setCustomPrices(priceMap);
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

  const handlePriceChange = (id, newPrice) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    setCustomPrices((prevPrices) => ({ ...prevPrices, [id]: newPrice }));
  };

  const handlePurchase = async (app) => {
    if (!user) {
      alert("❌ กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
      navigate("/login");
      return;
    }

    await fetchUserCredit();
    const appPrice = parseFloat(customPrices[app.id] || app.price);

    if (credit < appPrice) {
      alert("❌ เครดิตไม่เพียงพอ กรุณาเติมเงินก่อน");
      return;
    }

    setBuying(true);
    try {
      const response = await fetch("http://localhost:4000/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: app.id,
          user_id: user.id,
          username_customer: user.username,
        }),
      });

      if (!response.ok) {
        throw new Error(`❌ การสั่งซื้อไม่สำเร็จ: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        await fetchUserCredit();
        alert(`✅ สั่งซื้อสำเร็จ! Order ID: ${data.orderid}`);
        navigate("/order-history", {
          state: { product: app, orderid: data.orderid, email: data.info },
        });
      } else {
        alert(`❌ การสั่งซื้อไม่สำเร็จ: ${data.message}`);
      }
    } catch (error) {
      alert(`❌ เกิดข้อผิดพลาด: ${error.message}`);
    } finally {
      setBuying(false);
    }
  };

  const openPopup = (app) => {
    setSelectedApp(app);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedApp(null);
  };

  return (
    <div className="flex flex-col min-h-screen starry-background text-white">
      <Navbar />
      <main className="flex-grow container mx-auto py-20 px-4 text-center max-w-[1200px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 bg-black bg-opacity-70 p-2 rounded-lg">
          🎬 Premium Apps
        </h2>

        {loading ? (
          <p className="text-white text-lg bg-black bg-opacity-70 p-2 rounded-lg">
            ⏳ กำลังโหลดข้อมูลสินค้า...
          </p>
        ) : error ? (
          <p className="text-red-500 bg-black bg-opacity-70 p-2 rounded-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {premiumApps.map((app) => (
              <div
                key={app.id}
                className="bg-gray-800 bg-opacity-90 rounded-lg p-3 shadow-lg"
              >
                <img
                  src={app.img || "https://via.placeholder.com/150"}
                  alt={app.name}
                  className="w-full aspect-square rounded-lg mb-3 border border-gray-700"
                />
                <h3 className="text-md font-semibold text-white">{app.name}</h3>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={
                      customPrices[app.id] !== undefined
                        ? customPrices[app.id]
                        : app.price
                    }
                    onChange={(e) =>
                      handlePriceChange(app.id, parseFloat(e.target.value))
                    }
                    className="w-20 p-1 rounded-md text-black"
                    min="0"
                    disabled
                  />
                  <span className="text-gray-400 text-sm">บาท</span>
                </div>

                <p className="text-sm font-bold text-yellow-400 mt-2">
                  สินค้าคงเหลือ: <span className="text-lg">{app.stock} ชิ้น</span>
                </p>

                <p
                  className={`text-xs font-semibold mt-2 ${
                    app.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {app.stock > 0 ? "พร้อมจำหน่าย" : "สินค้าหมด"}
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  <button
                    className={`btn btn-buy ${
                      app.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => openPopup(app)}
                    disabled={app.stock <= 0}
                  >
                    รายละเอียด
                  </button>
                  <button
                    className={`btn btn-order ${
                      app.stock > 0 ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => handlePurchase(app)}
                    disabled={buying || app.stock <= 0}
                  >
                    {buying ? "⏳ กำลังซื้อ..." : "🛒 สั่งซื้อสินค้า"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showPopup && selectedApp && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={closePopup}>
              ×
            </button>
            <h3 className="text-lg font-semibold text-white">{selectedApp.name}</h3>
            <img
              src={selectedApp.img || "https://via.placeholder.com/150"}
              alt={selectedApp.name}
              className="popup-img"
            />
            <p className="popup-details text-white">{selectedApp.description}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PremiumAppsPage;