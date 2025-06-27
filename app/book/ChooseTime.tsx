"use client";

import React, { useEffect, useState } from "react";
import { headerStyle } from "./MainClient";

interface ChooseTimeProps {
  setSelectedTime: (time: Date) => void;
  unavailableTimes?: Date[];
}

const ChooseTime: React.FC<ChooseTimeProps> = ({
  setSelectedTime,
  unavailableTimes = [],
}) => {
  const now = new Date();
  const sixHoursLater = new Date(now.getTime() + 6 * 60 * 60 * 1000);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  useEffect(() => {
    setSelectedDate(today);
  }, []);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isUnavailable = (datetime: Date) =>
    unavailableTimes.some(
      (unavailable) => unavailable.getTime() === datetime.getTime()
    );

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay());

  const generateCalendarDays = (days = 21) =>
    Array.from({ length: days }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      return d;
    });

  return (
    <div className="flex flex-col items-center w-full p-8">
      <h1 className={headerStyle}>What date suits you?</h1>

      {/* Calendar grid */}
      <div className="w-full max-w-3xl mb-10">
        <div className="grid grid-cols-7 gap-2 text-center text-gray-500 mb-2 text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {generateCalendarDays().map((date) => {
            const isPast = date < today;
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={date.toDateString()}
                onClick={() => !isPast && setSelectedDate(date)}
                disabled={isPast}
                className={`w-full py-2 rounded-lg text-sm font-medium border transition-all
                  ${
                    isPast
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 hover:bg-pink-100"
                  }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <>
          <h2 className={headerStyle}>
            Choose a time on{" "}
            <span className="text-pink-600">{selectedDate.toDateString()}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {timeSlots.map((time) => {
              const [hours, minutes] = time.split(":").map(Number);
              const dateTime = new Date(selectedDate);
              dateTime.setHours(hours, minutes, 0, 0);

              const isSameDayAsToday = isSameDay(dateTime, now);
              const isPastTime = dateTime < now;
              const isTooSoon = dateTime < sixHoursLater && isSameDayAsToday;
              const disabled =
                isPastTime || isUnavailable(dateTime) || isTooSoon;

              return (
                <button
                  key={time}
                  onClick={() => !disabled && setSelectedTime(dateTime)}
                  disabled={disabled}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    disabled
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-pink-100"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseTime;
