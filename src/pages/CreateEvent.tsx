import React, { useEffect, useState } from "react";
import type { EventFormData, ValidationErrors } from "../types/event";
import { defaultEventFormData } from "../types/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faShield,
  faUserGroup,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const CreateEvent: React.FC = () => {
  const [form, setForm] = useState<EventFormData>(defaultEventFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (data: EventFormData): ValidationErrors => {
    const e: ValidationErrors = {};
    if (!data.name.trim()) e.name = "Event name is required";
    if (!data.date) e.date = "Event date is required";
    if (!data.time) e.time = "Event time is required";
    if (!data.venue.trim()) e.venue = "Venue is required";
    if (data.expectedAttendees != null && data.expectedAttendees < 0)
      e.expectedAttendees = "Expected attendees cannot be negative";
    if (data.registrationDeadline && data.registrationDeadline > data.date)
      e.registrationDeadline =
        "Registration deadline must be on or before the event date";
    return e;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const handleChange = <K extends keyof EventFormData>(
    key: K,
    value: EventFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-[0_3px_3px_rgba(0,0,0,0.25)] ">
      <header className="bg-[#f9fafb] p-5">
        <h1 className="text-2xl font-semibold">Event Information</h1>
        <p className="text-sm text-gray-500">
          Provide the basic details for your event
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 p-4 ">
        <div className="space-y-6 my-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-[#6192fd] text-lg mr-1"
                aria-hidden="true"
              />
              Event Name
            </label>
            <input
              aria-label="Event name"
              className={`mt-1 p-1 w-full rounded-md border-1 border-solid border-gray-500 focus:border-indigo-500 ${
                errors.name ? "border-gray-500" : ""
              }`}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              type="text"
              placeholder="e.g Tech Innovation Summit 2025"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Description
            </label>
            <textarea
              aria-label="Event description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={5}
              className="mt-1 p-1  w-full rounded-md border-1 border-solid border-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe your event and what attendes can expect..."
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-6 space-y-6 lg:space-y-0 content-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#0daa48] text-lg mr-1"
                  aria-hidden="true"
                />
                Event Date
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="date"
                  aria-label="Event date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={`mt-1 p-1  w-full rounded-md border-1 border-solid border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.date ? "border-grey-500" : ""
                  }`}
                />
              </div>
              {errors.date && (
                <p className="text-xs text-red-600 mt-1">{errors.date}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#0daa48] text-lg mr-1"
                  aria-hidden="true"
                />
                Event Time
              </label>
              <input
                type="time"
                aria-label="Event time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className={`mt-1 p-1  w-full rounded-md border-1 border-solid border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.time ? "border-gray-500" : ""
                }`}
              />
              {errors.time && (
                <p className="text-xs text-red-600 mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-[#E80812] text-lg mr-1"
                aria-hidden="true"
              />
              Venue
            </label>
            <input
              aria-label="Venue"
              className={`mt-1 p-1  w-full rounded-md border-1 border-solid border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.venue ? "border-gray-500" : ""
              }`}
              value={form.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
              type="text"
              placeholder="e.g Grand Convention Center"
            />
            {errors.venue && (
              <p className="text-xs text-red-600 mt-1">{errors.venue}</p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-6 space-y-6 lg:space-y-0 content-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="text-[#9810fa] text-lg mr-1"
                  aria-hidden="true"
                />
                Expected Attendees
              </label>
              <input
                aria-label="Expected attendees"
                type="number"
                min={0}
                value={form.expectedAttendees ?? ""}
                onChange={(e) => {
                  const v =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("expectedAttendees", v as number | null);
                }}
                className={`mt-1 p-1  w-full rounded-md border-1 border-solid border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.expectedAttendees ? "border-red-500" : ""
                }`}
              />
              {errors.expectedAttendees && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.expectedAttendees}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-[#f65813] text-lg mr-1"
                  aria-hidden="true"
                />
                Registration Deadline
              </label>
              <input
                type="date"
                aria-label="Registration deadline"
                value={form.registrationDeadline ?? ""}
                onChange={(e) =>
                  handleChange(
                    "registrationDeadline",
                    e.target.value === "" ? null : e.target.value
                  )
                }
                className={`mt-1 p-1 w-full rounded-md border-1 border-solid border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.registrationDeadline ? "border-red-500" : ""
                }`}
              />
              {errors.registrationDeadline && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.registrationDeadline}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-300 py-4">
            <div className="flex items-center justify-between bg-[#faf5ff] py-4 px-2 rounded-md border-1 border-solid border-gray-300">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faShield}
                  className="text-[#fff] text-lg bg-[#9810FA] p-2 rounded-md"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Face ID Check-In
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable Face ID for attendee check-in
                  </p>
                </div>
              </div>

              <label
                htmlFor="faceId"
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  id="faceId"
                  aria-label="Face ID Check-In"
                  type="checkbox"
                  checked={form.faceIdCheckIn}
                  onChange={(e) =>
                    handleChange("faceIdCheckIn", e.target.checked)
                  }
                  className="sr-only"
                />

                <span
                  className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 ${
                    form.faceIdCheckIn ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      form.faceIdCheckIn ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </label>
            </div>

            <div className="mt-3 flex items-center justify-between bg-[#fef2f2] py-4 px-2 rounded-md border-1 border-solid border-gray-300">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="text-[#fff] text-lg bg-[#E7000B] p-2 rounded-md"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Live Streaming
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable live stream for remote attendees
                  </p>
                </div>
              </div>

              <label
                htmlFor="liveStreaming"
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  id="liveStreaming"
                  aria-label="Live Streaming"
                  type="checkbox"
                  checked={form.liveStreaming}
                  onChange={(e) =>
                    handleChange("liveStreaming", e.target.checked)
                  }
                  className="sr-only"
                />

                <span
                  className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 ${
                    form.liveStreaming ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      form.liveStreaming ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setForm(defaultEventFormData)}
            className="cursor-pointer flex-1 px-4 py-2 rounded-md border bg-white text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || Object.keys(errors).length > 0}
            className="cursor-pointer flex-1 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
