import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Banner = ({ backgroundImage }) => {
  const text = "NextGenz เติมเกม ปลอดภัย 24 ชม.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
      className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] flex justify-center items-center text-center px-6 sm:px-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,  // ใช้ backgroundImage จาก props
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
        className="relative z-10 text-white max-w-[1000px] mx-auto"
      >
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg"
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
          className="mt-4 text-sm sm:text-lg md:text-xl font-light opacity-90"
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
