import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css"; // ✅ ใช้ไฟล์ CSS ใหม่

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

const premiumApps = [
  { id: "netflix", name: "Netflix", price: "299 บาท", img: appImages.netflix, details: ["✔️ รองรับทุกอุปกรณ์", "✔️ ไม่มีโฆษณา", "✔️ Ultra HD 4K"] },
  { id: "youtube", name: "YouTube Premium", price: "199 บาท", img: appImages.youtube, details: ["✔️ ไม่มีโฆษณา", "✔️ ดาวน์โหลดวิดีโอได้", "✔️ เล่นวิดีโอพื้นหลัง"] },
  { id: "spotify", name: "Spotify", price: "149 บาท", img: appImages.spotify, details: ["✔️ ไม่มีโฆษณา", "✔️ ฟังเพลงออฟไลน์", "✔️ คุณภาพเสียงสูง"] },
  { id: "canva", name: "Canva Pro", price: "299 บาท", img: appImages.canva, details: ["✔️ เทมเพลตพรีเมียม", "✔️ ฟีเจอร์ออกแบบครบ", "✔️ ทำงานร่วมกันได้"] },
  { id: "hbo", name: "HBO Max", price: "199 บาท", img: appImages.hbo, details: ["✔️ ดูหนังและซีรีส์ใหม่", "✔️ รองรับ 4K HDR"] },
  { id: "disney", name: "Disney+", price: "159 บาท", img: appImages.disney, details: ["✔️ ภาพยนตร์ Disney", "✔️ Dolby Vision"] },
  { id: "prime", name: "Prime Video", price: "129 บาท", img: appImages.prime, details: ["✔️ หนังและซีรีส์ Amazon", "✔️ รองรับ 4K UHD"] },
  { id: "trueid", name: "TrueID+", price: "99 บาท", img: appImages.trueid, details: ["✔️ ช่องพรีเมี่ยม", "✔️ ไม่มีโฆษณา"] },
];

const PremiumAppsPage = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-black-theme text-theme">
      <Navbar />

      <main className="flex-grow container mx-auto py-20 px-4 text-center max-w-[1200px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 animate-fadeInUp">
          🎬 แอพพรีเมี่ยมยอดนิยม
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {premiumApps.map((app) => (
            <div key={app.id} className="bg-gray-800 rounded-lg p-3 shadow-lg transition hover:scale-105 hover:bg-gray-700">
              <img src={app.img} alt={app.name} className="w-full aspect-square rounded-lg mb-3 border border-gray-700" />
              <h3 className="text-md font-semibold text-white">{app.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{app.price}</p>

              <div className="flex flex-col gap-2">
                <button className="btn btn-buy" onClick={() => setSelectedApp(app)}>
                  รายละเอียด
                </button>

                <button className="btn btn-order" onClick={() => navigate(`/order/${app.id}`)}>
                  สั่งซื้อสินค้า
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* ✅ ป๊อปอัปแสดงรายละเอียดสินค้า */}
      {selectedApp && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* ปุ่มปิด */}
            <button className="popup-close" onClick={() => setSelectedApp(null)}>✕</button>

            {/* ชื่อสินค้า */}
            <h3 className="text-lg font-bold text-white">{selectedApp.name}</h3>
            
            {/* รูปภาพสินค้า */}
            <img src={selectedApp.img} alt={selectedApp.name} className="popup-img" />

            {/* รายละเอียดสินค้า */}
            <ul className="popup-details text-gray-300">
              {selectedApp.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>

            {/* ✅ ปุ่ม "สั่งซื้อสินค้า" */}
            <button className="btn btn-order w-full" onClick={() => navigate(`/order/${selectedApp.id}`)}>
              สั่งซื้อสินค้า
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumAppsPage;
