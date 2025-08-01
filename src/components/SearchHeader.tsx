"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaneTakeoff, PlaneLanding, Ellipsis } from "lucide-react";
interface BookingSearchProps {
  from?: string;
  to?: string;
  depart?: string;
  adults?: number;
  returnDate?: string;
}

export default function BookingSearch({
  from,
  to,
  depart,
  adults,
  returnDate,
}: BookingSearchProps) {
  const router = useRouter();
  const [flightsFrom, setFlightsFrom] = useState(from || "");
  const [FlightsTo, setFlightsTo] = useState(to || "");
  const [FlightsDepart, setFlightsDepart] = useState(depart);
  const [FlightsReturn, setFlightsReturn] = useState(returnDate);
  const [FlightsAdults, setFlightsAdults] = useState(adults);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from: flightsFrom,
      to: FlightsTo,
      depart: FlightsDepart || "",
      return: FlightsReturn || "",
      adults: FlightsAdults?.toString() || "1",
    }).toString();

    router.push(`/search?${params}`);
  };

  return (
    <div className=" w-full mx-auto bg-gray-900 rounded-2xl shadow">
      {/* Tabs */}

      {/* Mobile Header */}
      <form
        className="flex justify-around items-center md:hidden bg-blue-950 gap-2 px-1 py-5 "
        onSubmit={handleSearch}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-3">
            <button type="submit" className="text-white flex gap-3">
              <PlaneTakeoff />
              {from}
            </button>
            <input
              type="date"
              value={FlightsDepart}
              onChange={(e) => setFlightsDepart(e.target.value)}
              className="input bg-white border p-2 rounded-lg outline-none"
            />
          </div>
        </div>
        <Ellipsis color="#fff" />
        <div className="flex flex-col gap-3">
          <button type="submit" className="text-white flex gap-3">
            <PlaneLanding />
            {to}
          </button>

          <input
            type="date"
            value={FlightsReturn}
            onChange={(e) => setFlightsReturn(e.target.value)}
            className="input bg-white border p-2 rounded-lg outline-none"
          />
        </div>
      </form>

      {/* Search Form */}
      <form
        className="hidden md:flex bg-blue-950 justify-around gap-2 px-1 py-5 "
        onSubmit={handleSearch}
      >
        <>
          <div className="flex gap-2">
            <div className="flex items-center justify-between bg-white border p-2 rounded-lg h-12 gap-5">
              <span className="flex gap-5">
                <PlaneTakeoff />
                <h1>From</h1>
              </span>
              <input
                type="text"
                value={flightsFrom}
                onChange={(e) => setFlightsFrom(e.target.value)}
                placeholder={flightsFrom}
                className="border-l border-black pl-3 flex flex-row items-end justify-end outline-none"
              />
            </div>
            <div className="flex items-center justify-between bg-white border px-2 rounded-lg h-12 gap-5">
              <span className="flex gap-5">
                <PlaneLanding />
                <h1>To</h1>
              </span>
              <input
                type="text"
                value={FlightsTo}
                onChange={(e) => setFlightsTo(e.target.value)}
                placeholder={FlightsTo}
                className="border-l border-black pl-3 flex flex-row items-end justify-end outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center justify-between bg-white p-2 rounded-lg h-12 gap-5">
              <span className="flex gap-5">
                <h1>Dep.</h1>
              </span>
              <input
                type="date"
                value={FlightsDepart}
                onChange={(e) => setFlightsDepart(e.target.value)}
                className="input bg-white p-2 rounded-lg outline-none"
              />
            </div>
            <div className="flex items-center justify-between bg-white p-2 rounded-lg h-12 gap-5">
              <span className="flex gap-5">
                <h1>Return</h1>
              </span>
              <input
                type="date"
                value={FlightsReturn}
                onChange={(e) => setFlightsReturn(e.target.value)}
                className="input bg-white p-2 rounded-lg outline-none"
              />
            </div>
          </div>
          <select
            value={FlightsAdults}
            className="input bg-white border p-2 rounded-lg outline-none"
            onChange={(e) => setFlightsAdults(Number(e.target.value))}
          >
            <option value={1}>1 Adult</option>
            <option value={2}>2 Adults</option>
            <option value={4}>Family (4+)</option>
          </select>
        </>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}

// Tailwind CSS input style (global.css or in component if using twin.macro)
