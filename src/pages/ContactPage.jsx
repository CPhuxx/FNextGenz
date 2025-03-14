import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaFacebook, FaLine } from "react-icons/fa"; // เพิ่มไอคอน Facebook และ Line

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow container mx-auto pt-32 pb-8 px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center animate__animated animate__fadeIn">
          ติดต่อเรา
        </h2>

        <div className="flex flex-col items-center gap-6">
          <p className="text-lg text-gray-300 mb-6 text-center animate__animated animate__fadeIn animate__delay-1s">
            หากท่านมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่าง:
          </p>

          {/* ช่องทางการติดต่อ */}
          <div className="flex gap-8 animate__animated animate__fadeIn animate__delay-2s">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 p-6 rounded-lg shadow-lg text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <FaFacebook className="text-3xl" /> Facebook
            </a>

            {/* Line */}
            <a
              href="https://line.me/ti/p/~yourlineid"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 p-6 rounded-lg shadow-lg text-white hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <FaLine className="text-3xl" /> Line
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
