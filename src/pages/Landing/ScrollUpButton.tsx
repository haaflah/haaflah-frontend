import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-3 lg:right-6 p-3 rounded-full bg-gray-300 text-[#0C1421] shadow-lg hover:bg-[#0C1421] duration-300 hover:text-white transition"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollUpButton;
