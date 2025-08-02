"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaneTakeoff, PlaneLanding, Hotel } from "lucide-react";

const tabs = ["Flights", "Hotels", "Tours"];

export default function BookingSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [adults, setAdults] = useState(1);
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [people, setPeople] = useState(1);
  const [tour, setTour] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [tourPeople, setTourPeople] = useState(1);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from,
      to,
      depart,
      return: ret,
      adults: adults.toString(),
    }).toString();

    router.push(`/search?${params}`);
  };

  return (
    <div className="w-[90vw] sm:w-full mx-auto px-5 py-10 bg-blue-950/20 rounded-b-2xl mt-0 sm:mt-10">
      {/* Tabs */}
      <div className="w-[80vw] sm:w-full flex bg-white opacity-100 space-x-6 border rounded-lg p-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pointer py-2 px-4 font-medium ${
              activeTab === tab
                ? "border-b-4 border-blue-900 text-blue-900"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form className="text-right " onSubmit={handleSearch}>
        <div className="md:flex bg-white opacity-100 justify-around gap-2 px-3 py-3 rounded-2xl gap-2">
          {activeTab === "Flights" && (
            <>
              <div className="md:flex md:gap-2">
                <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                  <span className="flex gap-5">
                    <PlaneTakeoff />
                    <h1>From</h1>
                  </span>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="...from"
                    className="input p-2 rounded-xl outline-none"
                  />
                </div>
                <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                  <span className="flex gap-5">
                    <PlaneLanding />
                    <h1>To</h1>
                  </span>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="..to"
                    className="input p-2 rounded-xl outline-none"
                  />
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                  <span className="flex gap-5">
                    <h1>Dep.</h1>
                  </span>
                  <input
                    type="date"
                    value={depart}
                    onChange={(e) => setDepart(e.target.value)}
                    className="input p-2 rounded-xl outline-none"
                  />
                </div>
                <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                  <span className="flex gap-5">
                    <h1>Return</h1>
                  </span>
                  <input
                    type="date"
                    value={ret}
                    onChange={(e) => setRet(e.target.value)}
                    className="input p-2 rounded-xl outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-white border p-2 rounded-lg h-12 gap-5 mt-2 sm:mt-0">
                <span className="flex gap-5"></span>
                <select
                  value={adults}
                  className="input p-2 rounded-xl outline-none"
                  onChange={(e) => setAdults(Number(e.target.value))}
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={4}>Family (4+)</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "Hotels" && (
            <>
              <div className="flex flex-1 items-center bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                <span className="flex gap-5">
                  <Hotel />
                  <h1>Select City</h1>
                </span>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="...city"
                  className="input p-2 rounded-xl outline-none"
                />
              </div>
              <div className="sm:flex gap-4">
                <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                  <span className="flex gap-5">
                    <h1>Check-in</h1>
                  </span>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input outline-none"
                  />
                </div>
                <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                  <span className="flex gap-5">
                    <h1>Check-out</h1>
                  </span>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                <select
                  value={rooms}
                  className="input"
                  onChange={(e) => setRooms(Number(e.target.value))}
                >
                  <option>1 Room, 2 Guests</option>
                  <option>2 Rooms, 4 Guests</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "Tours" && (
            <>
              <div className="flex flex-1 items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="Location or Tour Name"
                  value={tour}
                  onChange={(e) => setTour(e.target.value)}
                  className="input outline-none"
                />
              </div>
              <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                <input
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="input outline-none"
                />
              </div>
              <div className="flex items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
                <select
                  value={tourPeople}
                  className="input outline-none"
                  onChange={(e) => setTourPeople(Number(e.target.value))}
                >
                  <option>1 Person</option>
                  <option>Group (5+)</option>
                </select>
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="pointer mt-5 bg-white inline-block hover:bg-transparent border border-blue-900 hover:border hover:border-white text-blue-900 hover:text-white font-bold py-4 px-6 rounded-xl transition duration-200"
        >
          Search {activeTab}
        </button>
      </form>
    </div>
  );
}

// Tailwind CSS input style (global.css or in component if using twin.macro)
