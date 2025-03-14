import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Shop from "../components/Shop";
import Footer from "../components/Footer";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // เลื่อนหน้าจอกลับไปด้านบนเมื่อเข้า HomePage
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white"> {/* เปลี่ยนพื้นหลังเป็นสีดำ */}
        <Banner />
        <div className="container mx-auto max-w-[1200px] px-6 sm:px-8">
          <Shop />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
