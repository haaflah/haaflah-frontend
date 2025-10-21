import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface TeamMember {
  img: string;
  handle: string;
  name: string;
  role: string;
  desc: string;
}

const team: TeamMember[] = [
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    handle: "@maxine",
    name: "Maxine Gilmer",
    role: "Event Designer",
    desc: "Creates stunning event layouts and visual concepts that engage attendees.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    handle: "@michael",
    name: "Michael Ellis",
    role: "Event Coordinator",
    desc: "Ensures every part of the event runs smoothly from setup to finish.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    handle: "@ruben",
    name: "Ruben Gouse",
    role: "Marketing Lead",
    desc: "Drives event awareness through strategic marketing and social engagement.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    handle: "@john",
    name: "John Smith",
    role: "Technical Lead",
    desc: "Oversees event technology—sound, lighting, and live streaming systems.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/23.jpg",
    handle: "@susan",
    name: "Susan Lee",
    role: "Guest Relations",
    desc: "Makes every guest feel valued and ensures top-tier hospitality at events.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/77.jpg",
    handle: "@david",
    name: "David Brown",
    role: "Mobile Developer",
    desc: "Develops our event management mobile experience with real-time updates.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center px-6 md:px-12 lg:px-20">
        <h1 className="text-[#1F2937] text-lg">
          Our <span className="text[#0C1421] font-semibold">Team</span>
        </h1>
        <h2 className="text-3xl font-bold text-[#1F2937] mt-2">
          Meet Our Event Management Experts
        </h2>
        <p className="text-[#4B5563] font-extralight mt-2">
          Passionate professionals ensuring unforgettable experiences.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {team.map((member, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl mb-10 shadow-md p-8 hover:shadow-xl transition-all duration-300 text-left flex flex-col h-full group">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-16 w-16 rounded-md object-cover mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-sm text-gray-500">{member.handle}</span>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-[#0C1421] font-medium">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {member.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
