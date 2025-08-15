import React from "react";
import { flights } from "../../public/datasets/places";
import { Plane, Clock, Wifi, Monitor, Luggage, CreditCard } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const FlightCard = () => {
  return (
    <div className="space-y-6">
      {flights.length ? (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {flights.length} flights found
                </h3>
                <p className="text-sm text-gray-600">
                  Sorted by best value • Prices include taxes and fees
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Clock size={16} className="mr-1" />
                  Fastest
                </Button>
                <Button variant="outline" size="sm">
                  <CreditCard size={16} className="mr-1" />
                  Cheapest
                </Button>
              </div>
            </div>
          </div>

          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Airline Logo & Info */}
                  <div className="lg:col-span-3 flex items-center gap-3">
                    {flight.image && (
                      <div className="w-14 h-14 relative">
                        <Image
                          src={flight.image}
                          alt={`${flight.airline} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {flight.airline}
                      </h4>
                      <p className="text-sm text-gray-600">{flight.number}</p>
                      <p className="text-xs text-gray-500">{flight.aircraft}</p>
                    </div>
                  </div>

                  {/* Flight Route */}
                  <div className="lg:col-span-6">
                    <div className="flex items-center justify-between">
                      {/* Departure */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.departAt}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {flight.departFromCode}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.departFrom}
                        </div>
                      </div>

                      {/* Flight Path */}
                      <div className="flex-1 mx-4">
                        <div className="relative">
                          <div className="flex items-center justify-center">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <div className="mx-2 p-2 bg-blue-50 rounded-full">
                              <Plane size={16} className="text-blue-600" />
                            </div>
                            <div className="flex-1 h-px bg-gray-300"></div>
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-sm font-medium text-gray-600">
                              {flight.duration}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {flight.stops === 0 ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                  Direct
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                                  {flight.stops} stop
                                  {flight.stops > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.arriveAt}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {flight.arriveInCode}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.arriveIn}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="lg:col-span-3">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-blue-900">
                          ${flight.cabinClasses.economy.price}
                        </div>
                        <div className="text-sm text-gray-600">
                          Economy • per person
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
                          Select Flight
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Wifi size={16} className="text-blue-600" />
                        <span>WiFi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Luggage size={16} className="text-green-600" />
                        <span>Meals</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Monitor size={16} className="text-purple-600" />
                        <span>Entertainment</span>
                      </div>
                    </div>

                    {/* Cabin Classes */}
                    <div className="flex gap-2">
                      <div className="text-center p-2 bg-gray-50 rounded-lg text-xs">
                        <div className="font-medium text-gray-700">Economy</div>
                        <div className="text-blue-900 font-bold">
                          ${flight.cabinClasses.economy.price}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg text-xs">
                        <div className="font-medium text-gray-700">Premium</div>
                        <div className="text-blue-900 font-bold">
                          ${flight.cabinClasses.premiumEconomy.price}
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg text-xs">
                        <div className="font-medium text-gray-700">
                          Business
                        </div>
                        <div className="text-blue-900 font-bold">
                          ${flight.cabinClasses.business.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <Plane size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No flights found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
