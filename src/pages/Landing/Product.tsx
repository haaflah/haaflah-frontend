import { motion } from "framer-motion";
import { CalendarCheck, Users, Star } from "lucide-react";
import DashboardImage from "../../assets/Haaflah_Dashboard.png";

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section
      id="product"
      className="text-black py-20 px-5 Product-background space-y-3"
    >
      {/* Headings */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className=" space-y-3"
      >
        <h1 className="text-[#1F2937] text-center text-lg">
          Event <span className="text-[#0C1421] font-semibold">Management</span>
        </h1>
        <h2 className="text-3xl font-bold text-center text-[#1F2937] px-1">
          Manage, Promote & Execute <br /> Your Events Effortlessly
        </h2>
        <p className="text-center text-[#4B5563] font-extralight">
          From planning to performance — we make every event seamless, smart, <br />
          and successful.
        </p>
      </motion.div>

      {/* Main Section */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-14 md:px-5 max-w-5xl mx-auto pt-20 items-center"
      >
        {/* Image */}
        <motion.div variants={itemVariant} className="flex justify-center">
          <motion.img
            src={DashboardImage}
            alt="Event Dashboard"
            className="rounded-2xl shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Text + List */}
        <motion.div
          variants={itemVariant}
          className="w-full flex flex-col justify-center px-6 lg:pl-10"
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 mb-6">Plan. Organize. Celebrate.</p>

          <motion.ul className="space-y-6 text-gray-700">
            {[
              {
                icon: <CalendarCheck className="text-[#0C1421] w-6 h-6" />,
                title: "Effortless Planning",
                desc: "Create and schedule events with smart tools that handle registration, logistics, and timelines automatically.",
              },
              {
                icon: <Users className="text-[#0C1421] w-6 h-6" />,
                title: "Seamless Collaboration",
                desc: "Invite team members, assign roles, and manage vendors and partners all in one place.",
              },
              {
                icon: <Star className="text-[#0C1421] w-6 h-6" />,
                title: "Engage Attendees",
                desc: "Deliver personalized experiences, send updates, and keep attendees informed and excited before and after the event.",
              },
            ].map((item, index) => (
              <motion.li key={index} variants={itemVariant} className="space-y-3">
                <div className="flex items-center gap-3 font-bold text-lg">
                  {item.icon}
                  {item.title}
                </div>
                <div className="pl-9">
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
