import { motion } from "framer-motion";
import DashboardImage from "../../assets/Haaflah_Dashboard.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <section id="home" className="pt-44 lg:pt-32 bg-gray-100 h-[100%] overflow-hidden">
      <div className="lg:space-y-10 space-y-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#1F2937] text-5xl md:px-20 px-5 lg:text-5xl font-bold text-center lg:leading-[60px]"
        >
          Haaflah – Where Every Event <br className="max-md:hidden"/> Begins With Insight.
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-[#1F2937] font-extralight text-center lg:px-80 md:px-20 px-5"
        >
          Simplify event planning and management. Haaflah helps organizers and vendors collaborate effortlessly to deliver exceptional events.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center space-x-5"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0C1421] text-white flex items-center gap-2 px-7 py-3 rounded-full"
          >
            <Link to="/sign-in">Get Started</Link>
          </motion.button>
        </motion.div>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="pt-20 max-md:pt-10 bg-split px-5"
      >
        <motion.img
          src={DashboardImage}
          alt=""
          className="md:max-w-2xl rounded-xl lg:max-w-3xl mx-auto max-w-[300px]"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </section>
  );
}

export default Header;
