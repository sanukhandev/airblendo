import React from "react";
import { flights } from "../../public/datasets/places";
import { Plane, Minus, Ellipsis } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const FlightCard = () => {
  return (
    <div>
      {flights.length ? (
        <ul className="space-y-4 mt-8">
          {flights.map((flight) => (
            <li
              key={flight.id}
              className="pointer bg-blue-900 border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {" "}
              <span className="flex gap-3 items-center text-white py-1 px-3 text-xs font-bold rounded-r-lg">
                <Plane />
                Direct
              </span>
              <div className="bg-white rounded-b-xl hover:rounded-b-none shadow-md hover:-translate-y-8 transition-transform duration-500">
                <div className="grid md:grid-cols-5 px-6 py-10 ">
                  <div className="flex items-center col-span-1 md:border-r border-blue-900 px-2 gap-10">
                    {flight.image ? (
                      <Image
                        src={flight.image}
                        alt={`${flight.airline} logo`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm font-medium">
                          {flight.airline.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {flight.airline}
                      </h3>
                      <p className="text-gray-600">{flight.number}</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center col-span-3 justify-center mt-5 md:mt-0">
                    <span className="flex flex-col items-center">
                      <h1 className="font-bold text-blue-900">
                        {flight.departFrom}
                      </h1>
                      <h1>{flight.departAt}</h1>
                    </span>
                    <Ellipsis />
                    <span className="flex flex-col items-center">
                      <Plane color="#1e3a8a" />
                      <Separator className="my-3 h-[3px] bg-green-500" />
                      <p className="text-gray-600">{flight.duration}</p>
                    </span>
                    <Ellipsis />
                    <span className="flex flex-col items-center">
                      <h1 className="font-bold text-blue-900">
                        {flight.arriveIn}
                      </h1>
                      <h1>{flight.arriveAt}</h1>
                    </span>
                  </div>
                  <div className="md:text-right mt-5 md:mt-0 md:text-center m-3">
                    <p className="text-xl font-bold text-blue-900">
                      ${flight.price}
                    </p>
                    {/* <p className="text-sm text-gray-500">per person</p> */}
                    <button
                      type="submit"
                      className="pointer mt-3 bg-blue-950 hover:bg-white text-white hover:text-blue-900 border hover:border hover:border-blue-900 font-bold py-2 px-6 rounded-lg transition"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightCard;
