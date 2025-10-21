import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  organisation?: string;
  faceIdEnabled?: boolean;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organisation: "",
    faceIdEnabled: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFaceIdToggle = (): void => {
    setFormData((prev) => ({
      ...prev,
      faceIdEnabled: !prev.faceIdEnabled,
    }));
    toast.info(
      !formData.faceIdEnabled
        ? "Face ID check-in enabled"
        : "Face ID check-in disabled"
    );
  };

  // ✅ Validate form fields
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (formData.phoneNumber.length < 7)
      newErrors.phoneNumber = "Enter a valid phone number";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("🎉 Registration successful!");
      console.log("Registration Data:", formData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        organisation: "",
        faceIdEnabled: false,
      });
      setErrors({});
    } catch {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen lg:w-3/5">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} />

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-xl shadow p-5 sm:p-7"
      >
        <div className="mb-8">
          <h2 className="font-semibold text-gray-800 md:text-lg">
            Event Registration
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Fill in your details to register for this event
          </p>
        </div>

        <p className="mb-4 semibold text-gray-700 md:text-lg">
          Personal Information
        </p>

        <div className="md:flex md:gap-4">
          {/* First Name */}
          <div className="mb-4 md:w-full">
            <label className="block text-sm font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
                errors.firstName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4 md:w-full">
            <label className="block text-sm font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
                errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.smith@example.com"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 animate-pulse">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1 555 0123"
            className={`w-full border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
              errors.phoneNumber ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1 animate-pulse">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Organisation */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">
            Organisation (Optional)
          </label>
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            placeholder="Your company or organisation"
            className="w-full border border-gray-300 rounded-lg text-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="w-full h-[0.5px] bg-gray-300 my-6 sm:my-8"></div>

        {/* Face ID Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 md:text-base">
              Face ID Check-in (Optional)
            </label>
            <p className="text-gray-500 text-xs md:text-sm">
              Enable fast and secure check-in at the venue
            </p>
          </div>

          {/* Face ID Check Toggle Switch */}
          <button
            type="button"
            onClick={handleFaceIdToggle}
            className={`relative w-8 h-4 rounded-full border border-gray-300 transition-colors md:h-4.5 ${
              formData.faceIdEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-[0.5px] left-0 size-3.5 bg-white rounded-full border border-gray-300 transition-transform md:size-4 ${
                formData.faceIdEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Processing...</span>
            </>
          ) : (
            "Complete Registration"
          )}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
