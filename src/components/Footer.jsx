import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "หน้าแรก", path: "/home" },
    { name: "เติมเกม", path: "/topup" },
    { name: "แอพพรีเมี่ยม", path: "/premium-apps" },
    { name: "เติมเงิน", path: "/topup02" },
    { name: "โปรโมชั่น", path: "/promotions" },
    { name: "ติดต่อเรา", path: "/contact" },
  ];

  return (
    <footer className="bg-black text-white py-10 mt-10 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center max-w-[1200px] px-6">
        
        {/* โลโก้และลิขสิทธิ์ */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-white">NextGenz</h3>
          <p className="text-sm text-gray-400">© 2025 NextGenz สงวนลิขสิทธิ์</p>
        </div>

        {/* เมนูจาก Navbar */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-300">
          {menuItems.map((item, index) => (
            <button 
              key={index} 
              onClick={() => navigate(item.path)} 
              className="hover:text-blue-500 transition-all duration-300 cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* ไอคอนโซเชียลมีเดีย */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="https://facebook.com" target="_blank" className="social-icon">
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          <a href="https://instagram.com" target="_blank" className="social-icon">
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 6.465l-1.689-1.69a1.5 1.5 0 00-2.122 0L15.5 6.465l1.689 1.69a1.5 1.5 0 002.122 0L21 6.465zM14.5 7.465l-1.689-1.69a1.5 1.5 0 00-2.122 0L9 7.465l1.689 1.69a1.5 1.5 0 002.122 0l1.689-1.69zM8.5 9.465L6.811 7.775a1.5 1.5 0 00-2.122 0L3 9.465l1.689 1.69a1.5 1.5 0 002.122 0L8.5 9.465zM2.5 11.465L.811 9.775a1.5 1.5 0 00-2.122 0L-3 11.465l1.689 1.69a1.5 1.5 0 002.122 0L2.5 11.465zM14.5 11.465l-1.689-1.69a1.5 1.5 0 00-2.122 0L9 11.465l1.689 1.69a1.5 1.5 0 002.122 0l1.689-1.69zM8.5 13.465L6.811 11.775a1.5 1.5 0 00-2.122 0L3 13.465l1.689 1.69a1.5 1.5 0 002.122 0L8.5 13.465z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
