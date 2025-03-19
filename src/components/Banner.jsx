import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bannerMain from "../assets/img/bannerMain.jpg";
import imgesize from "../assets/img/imgesize.png";


const Banner = ({ backgroundImage }) => {
  const text = "NextGenz เติมเกม ปลอดภัย ";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false); // ✅ แก้จาก bannerMain(false) เป็น useState(false)

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index + 1));
        setIndex(index + 1);
      }, 100);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index - 1));
        setIndex(index - 1);
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div
      className="relative w-full h-[350px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex justify-center items-center text-center px-6 sm:px-8"
      style={{
        backgroundImage: `url(${backgroundImage || bannerMain})`, // ✅ ป้องกันค่า undefined
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-white w-full max-w-[1200px] mx-auto"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg"
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          {displayText}
          <motion.span
            className="inline-block text-yellow-400"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            |
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-light opacity-90"
          animate={{ x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          บริการเติมเกมที่รวดเร็ว ปลอดภัย และรองรับทุกช่องทางการชำระเงิน
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Banner;
