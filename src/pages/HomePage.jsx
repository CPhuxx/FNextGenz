import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(0);
  const [premiumApps, setPremiumApps] = useState([]);
  const [gameProducts, setGameProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buying, setBuying] = useState(false);
  const [customPrices, setCustomPrices] = useState({});
  const [editingPrice, setEditingPrice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // เลื่อนหน้าจอกลับไปด้านบนเมื่อเข้า HomePage
    fetchProducts();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [premiumRes, gameRes] = await Promise.all([
        fetch("http://localhost:4000/api/products"),
        fetch("http://localhost:4000/api/game-products"),
      ]);

      if (!premiumRes.ok || !gameRes.ok) throw new Error("ไม่สามารถโหลดข้อมูลสินค้าได้");

      const premiumData = await premiumRes.json();
      const gameData = await gameRes.json();

      // ดึงสินค้า 1 ชิ้นจากแต่ละประเภท
      setPremiumApps(premiumData.products?.slice(0, 15) || []);
      setGameProducts(gameData.gameProducts?.slice(0, 1) || []);
      setLoading(false);
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      setLoading(false);
    }
  };

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

  const handlePriceChange = (id, newPrice) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    setCustomPrices((prevPrices) => ({ ...prevPrices, [id]: newPrice }));
  };

  const handleEditPrice = (appId) => {
    setEditingPrice(appId);
  };

  const handleSavePrice = async (appId) => {
    const newPrice = customPrices[appId];

    try {
      const response = await fetch("http://localhost:4000/api/update-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: appId,
          price: newPrice,
        }),
      });

      if (!response.ok) throw new Error("❌ การอัพเดตราคาไม่สำเร็จ");

      const data = await response.json();
      if (data.status === "success") {
        setEditingPrice(null); // ปิดการแก้ไข
        alert("✅ อัพเดตราคาสำเร็จ");
        fetchProducts(); // รีเฟรชข้อมูลสินค้า
      } else {
        throw new Error(data.message || "❌ การอัพเดตไม่สำเร็จ");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingPrice(null); // Close the edit input without saving
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
    <>
      <Navbar />
      <main className="relative min-h-screen starry-background text-white">
        <div className="relative z-10">
          <Banner />
          <div className="container mx-auto max-w-[1200px] px-6 sm:px-8">
            <h2 className="text-3xl sm:text-4xl my-9 font-extrabold text-white mb-6 bg-black bg-opacity-70 p-2 rounded-lg">
              ยินดีต้อนรับสู่ NextGenz!
            </h2>
            <p className="text-lg text-center sm:text-xl text-white bg-black bg-opacity-70 p-2 rounded-lg">
              เพลิดเพลินกับการเติมเกมและบริการพรีเมียมต่าง ๆ ที่มีให้เลือกมากมายจากที่นี่
            </p>
            {loading && (
              <p className="text-white text-lg bg-black bg-opacity-70 p-2 rounded-lg">
                กำลังโหลดข้อมูล...
              </p>
            )}
            {error && (
              <p className="text-red-500 bg-black bg-opacity-70 p-2 rounded-lg">{error}</p>
            )}

            {/* แสดงข้อมูลสินค้า */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-8">
              {premiumApps.map((app) => (
                <div key={app.id} className="bg-gray-800 bg-opacity-90 rounded-lg p-3 shadow-lg">
                  <img
                    src={app.img || "https://via.placeholder.com/150"}
                    alt={app.name}
                    className="w-full aspect-square rounded-lg mb-3 border border-gray-700"
                  />
                  <h3 className="text-md font-semibold text-white">{app.name}</h3>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      value={customPrices[app.id] !== undefined ? customPrices[app.id] : app.price}
                      onChange={(e) => handlePriceChange(app.id, parseFloat(e.target.value))}
                      className="w-20 p-1 rounded-md text-black"
                      min="0"
                      disabled={editingPrice !== app.id}
                    />
                    <span className="text-gray-400 text-sm">บาท</span>
                  </div>

                  <p className="text-sm font-bold text-yellow-400 mt-2">
                    สินค้าคงเหลือ: <span className="text-lg">{app.stock} ชิ้น</span>
                  </p>

                  <p className={`text-xs font-semibold mt-2 ${app.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                    {app.stock > 0 ? "พร้อมจำหน่าย" : "สินค้าหมด"}
                  </p>

                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      className={`btn btn-buy ${app.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => openPopup(app)}
                      disabled={app.stock <= 0}
                    >
                      รายละเอียด
                    </button>
                    <button
                      className={`btn btn-order ${app.stock > 0 ? "" : "opacity-50 cursor-not-allowed"}`}
                      onClick={() => handlePurchase(app)}
                      disabled={buying || app.stock <= 0}
                    >
                      {buying ? "⏳ กำลังซื้อ..." : "🛒 สั่งซื้อสินค้า"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {showPopup && selectedApp && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={closePopup}>×</button>
            <h3 className="text-lg font-semibold text-white">{selectedApp.name}</h3>
            <img src={selectedApp.img || "https://via.placeholder.com/150"} alt={selectedApp.name} className="popup-img" />
            <p className="popup-details text-white">{selectedApp.description}</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomePage;