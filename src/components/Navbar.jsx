import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FaBars, FaTimes, FaUserCircle, FaCaretDown, FaHome, FaGamepad, FaTags, 
  FaEnvelope, FaSignInAlt, FaUserPlus, FaCrown, FaWallet
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(0);
  const [countdown, setCountdown] = useState(0); // สำหรับการนับถอยหลังเมื่อออกจากระบบ

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setCredit(storedUser.credit || 0);
    }
  }, []);

  const handleLogout = () => {
    let countdownValue = 3;
    setCountdown(countdownValue);

    const interval = setInterval(() => {
      countdownValue -= 1;
      setCountdown(countdownValue);

      if (countdownValue === 0) {
        clearInterval(interval);
        localStorage.removeItem("user");
        setUser(null);
        setCredit(0);
        navigate("/home");
        setMenuOpen(false);
        window.location.reload(); // รีเฟรชหน้าเว็บหลังจากออกจากระบบ
      }
    }, 1000);
  };

  const menuItems = [
    { name: "หน้าแรก", path: "/home", icon: <FaHome /> },
    { name: "เติมเกม", path: "/topup", icon: <FaGamepad /> },
    { name: "แอพพรีเมี่ยม", path: "/premium-apps", icon: <FaCrown /> },
    { name: "เติมเงิน", path: "/topup02", icon: <FaTags /> },
    { name: "โปรโมชั่น", path: "/promotions", icon: <FaEnvelope /> },
    { name: "ติดต่อเรา", path: "/contact", icon: <FaEnvelope /> },
  ];

  return (
    <nav className="bg-black shadow-lg h-16 p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 max-w-7xl">
        
        {/* ✅ Logo */}
        <div 
          className="text-2xl font-bold text-white cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => navigate("/home")}
        >
          NextGenz
        </div>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex space-x-5 items-center text-sm">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2 text-white hover:bg-gray-700 transition duration-300 transform hover:scale-105 cursor-pointer px-4 py-2 rounded-lg"
            >
              {item.icon} {item.name}
            </button>
          ))}

          {/* ✅ แสดงเครดิต */}
          {user && (
            <div className="flex items-center text-white space-x-2">
              <FaWallet className="text-yellow-400" />
              <span>เครดิต: {credit} บาท</span>
            </div>
          )}

          {/* ✅ บัญชีของฉัน */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAccountDropdown(!accountDropdown)}
                className="flex items-center gap-2 text-white hover:bg-gray-700 transition duration-300"
              >
                <FaUserCircle /> บัญชีของฉัน <FaCaretDown className={`transition-transform ${accountDropdown ? "rotate-180" : ""}`} />
              </button>

              {accountDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl text-xs p-2 transition-opacity duration-300 ease-in-out">
                  <button onClick={() => navigate("/profile")} className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-700 cursor-pointer">
                    <FaUserCircle /> โปรไฟล์
                  </button>
                  {/* ✅ ปุ่มประวัติการสั่งซื้อ */}
                  <button onClick={() => navigate("/order-history")} className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-700 cursor-pointer">
                    <FaWallet /> ประวัติการสั่งซื้อ
                  </button>
                  {/* ✅ ปุ่มจัดการร้านค้าใน Dropdown */}
                  {user.role === "admin" && (
                    <button onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-700 cursor-pointer">
                      <FaCrown /> จัดการร้านค้า
                    </button>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 w-full text-white hover:bg-gray-700 cursor-pointer">
                    <FaSignInAlt className="text-red-400" /> {countdown > 0 ? `ออกจากระบบ (${countdown})` : "ออกจากระบบ"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-sm">
              <button 
                onClick={() => navigate("/login")} 
                className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg text-white hover:bg-gray-700 transition-all"
              >
                <FaSignInAlt /> เข้าสู่ระบบ
              </button>
              <button 
                onClick={() => navigate("/register")} 
                className="flex items-center gap-2 px-4 py-2 border border-white rounded-lg text-white hover:bg-gray-700 transition-all"
              >
                <FaUserPlus /> สมัครสมาชิก
              </button>
            </div>
          )}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu (Sidebar) */}
      <div 
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-black shadow-xl transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 p-5`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">เมนู</h2>
          <button onClick={() => setMenuOpen(false)} className="text-white text-xl">
            <FaTimes />
          </button>
        </div>

        {menuItems.map((item, index) => (
          <button key={index} onClick={() => { navigate(item.path); setMenuOpen(false); }} className="text-white w-full text-left py-3 flex items-center gap-2">
            {item.icon} {item.name}
          </button>
        ))}

        {/* ✅ แสดงเครดิต */}
        {user && (
          <p className="text-white text-sm mt-4 flex items-center gap-2">
            <FaWallet className="text-yellow-400" /> เครดิต: {credit} บาท
          </p>
        )}

        {/* ✅ สำหรับ Admin เท่านั้น */}
        {user && user.role === "admin" && (
          <button onClick={() => { navigate("/admin/dashboard"); setMenuOpen(false); }} className="text-white w-full text-left py-3 flex items-center gap-2">
            <FaCrown /> จัดการร้านค้า
          </button>
        )}

        {/* ✅ บัญชีของฉันใน Mobile */}
        {user ? (
          <>
            <button onClick={() => navigate("/profile")} className="text-white w-full text-left py-3 flex items-center gap-2">
              <FaUserCircle /> บัญชีของฉัน
            </button>
            <button onClick={() => navigate("/order-history")} className="text-white w-full text-left py-3 flex items-center gap-2">
              <FaWallet /> ประวัติการสั่งซื้อ
            </button>
            <button onClick={handleLogout} className="text-white w-full text-left py-3 flex items-center gap-2">
              <FaSignInAlt /> {countdown > 0 ? `ออกจากระบบ (${countdown})` : "ออกจากระบบ"}
            </button>
          </>
        ) : (
          <div className="mt-4 space-y-3">
            <button onClick={() => navigate("/login")} className="w-full py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700">
              <FaSignInAlt /> เข้าสู่ระบบ
            </button>
            <button onClick={() => navigate("/register")} className="w-full py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700">
              <FaUserPlus /> สมัครสมาชิก
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
