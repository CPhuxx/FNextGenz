import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const text = "NextGenz เติมเกม ปลอดภัย";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index + 1));
        setIndex(index + 1);
      }, 80);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, index - 1));
        setIndex(index - 1);
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] flex justify-center items-center text-center px-4 sm:px-6 particle-background">
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-white w-full max-w-[900px] mx-auto"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg"
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
        >
          {displayText}
          <motion.span
            className="inline-block text-yellow-400"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            |
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-2 text-xs sm:text-sm md:text-base font-light opacity-90"
          animate={{ x: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.5)" }}
        >
          บริการเติมเกมที่รวดเร็ว ปลอดภัย และรองรับทุกช่องทางการชำระเงิน
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Banner;