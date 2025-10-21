import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs: FAQItem[] = [
    {
      question: "What types of events do you manage?",
      answer:
        "We handle corporate events, weddings, conferences, product launches, and private parties - from concept to full execution.",
    },
    {
      question: "Do you offer customized event packages?",
      answer:
        "Absolutely! Every event package is customized to match your vision, budget, and preferred style.",
    },
    {
      question: "Can you handle last-minute bookings?",
      answer:
        "Yes, depending on availability and event scale, our team can handle short-notice requests efficiently.",
    },
    {
      question: "Do you provide decorations and setups?",
      answer:
        "We provide full event setups - decor, lighting, audio-visual systems, and stage designs for a cohesive experience.",
    },
    {
      question: "How early should I book?",
      answer:
        "We recommend booking 4–6 weeks ahead for optimal planning and coordination, especially for large events.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 max-lg:px-5 text-gray-900">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-lg text-gray-700">
          Help <span className="text-[#0C1421] font-semibold">Center</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 mt-2">
          Everything you need to know about our event services
        </p>
      </div>

      {/* FAQ Cards */}
      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:border-[#0C1421] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-300 rounded-full text-[#0C1421]">
                  <FaQuestionCircle />
                </div>
                <h3 className="text-lg font-semibold">{faq.question}</h3>
              </div>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-gray-500"
              >
                <FaChevronDown />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === idx && <Answer answer={faq.answer} />}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Answer({ answer }: { answer: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: ref.current ? ref.current.scrollHeight : "auto",
        opacity: 1,
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div ref={ref} className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
        {answer}
      </div>
    </motion.div>
  );
}
