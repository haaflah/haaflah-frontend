import RegistrationCards from "./RegistrationCards";
import RegistrationForm from "./RegistrationForm";
import { Calendar, MapPin, Users } from "lucide-react";

const Registration: React.FC = () => {
  return (
    <section className="font-nunito bg-blue-50 px-5 py-8 min-h-screen sm:px-8 lg:px-10">
      <section className="space-y-6 mx-auto md:space-y-2 lg:max-w-5xl">
        <div className="space-y-3 p-5 bg-white rounded-lg shadow sm:p-8">
          <div className="flex justify-between items-center">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-[28px]">Tech Conference 2025</h1>
            <button className="text-[10px] bg-green-200 py-1 px-1.5 rounded-md font-bold text-green-900">
              Registration Open
            </button>
          </div>
          <div className="grid space-y-2 text-xs text-gray-500 sm:text-sm md:flex md:items-center md:gap-8 md:space-y-0 md:my-4">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="sm:size-5"/>
              3/15/2025 at 09:00 AM
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="sm:size-5"/>
              Convention Center, Downtown
            </span>
            <span className="flex items-center gap-2">
              <Users size={14} className="sm:size-5"/>
              44 spots remaining
            </span>
          </div>
          <p className="text-sm text-gray-500 md:text-base">
            Join us for the biggest tech conference of the year featuring
            keynotes, workshops and networking opportunity
          </p>
        </div>
        <div className="grid space-y-8 lg:flex lg:justify-between lg:gap-5">
           <RegistrationForm />
           <RegistrationCards />
        </div>
      </section>
    </section>
  );
};
export default Registration;
