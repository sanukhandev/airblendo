"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";

const tabs = ["One-way", "Round-trip", "Tours"];

export default function BookingSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("One-way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(1);
  // Hotel and tour related states for future implementation
  const [tour, setTour] = useState("");
  const [tourDate, setTourDate] = useState("");

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
    <div className="sm:w-[80vw] w-full mx-auto px-5 sm:py-10 py-5 bg-white/90 rounded-2xl mt-0 sm:mt-6">
      {/* Tabs */}
      <div className="flex bg-white space-x-6 mb-3 items-start justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pointer py-2 px-4 text-sm ${
              activeTab === tab
                ? "border border-blue-900 rounded-lg text-blue-900"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form className="text-right " onSubmit={handleSearch}>
        <div className="md:flex bg-white justify-around px-3 py-3 rounded-2xl gap-2">
          {activeTab === "One-way" && (
            <div className="w-full flex justify-around gap-2">
              <div className="md:flex md:flex-1 md:gap-2">
                <div className="flex flex-1 items-center justify-between bg-white border p-2 rounded-lg md:h-12 gap-5 mt-2 sm:mt-0">
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
              <div className="md:flex gap-4 flex-grow">
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
                    onChange={(e) => setRet(e.target.value)}
                    className="input p-2 rounded-xl outline-none"
                    value="Read only text"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Round-trip" && (
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
            </>
          )}
        </div>
        <div className="flex mt-5 justify-end gap-5 px-4">
          <div className="flex items-center justify-between bg-white border p-2 rounded-lg h-12 gap-5 mt-2 sm:mt-0">
            {/* <span className="flex"></span> */}
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
          <div className="flex items-center justify-between bg-white border p-2 rounded-lg h-12 gap-5 mt-2 sm:mt-0">
            {/* <span className="flex"></span> */}
            <select
              value={child}
              className="input p-2 rounded-xl outline-none"
              onChange={(e) => setChild(Number(e.target.value))}
            >
              <option value={1}>1 Child</option>
              <option value={2}>2 Child</option>
            </select>
          </div>
          <button
            type="submit"
            className="pointer bg-white inline-block hover:bg-transparent border border-blue-900 hover:border hover:border-blue-900 text-blue-900 hover:text-blue-900 font-bold py-3 px-6 rounded-xl transition duration-200"
          >
            Search {activeTab}
          </button>
        </div>
      </form>
    </div>
  );
}

// Tailwind CSS input style (global.css or in component if using twin.macro)
