"use client";

import React from "react";
import { Button } from "../ui/button";
import { X, Plus, ArrowLeft } from "lucide-react";

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  title: string;
  nationality: string;
  passportNumber: string;
}

interface CabinClass {
  price: number;
  available: boolean;
  seats: number;
  baggage: string;
  refundable: boolean;
  changeable: boolean;
  changeeFee: number;
}

interface Flight {
  id: number;
  airline: string;
  number: string;
  duration: string;
  image: string;
  departFrom: string;
  departFromCode: string;
  arriveIn: string;
  arriveInCode: string;
  departAt: string;
  arriveAt: string;
  aircraft: string;
  stops: number;
  stopInfo: string;
  cabinClasses: {
    economy?: CabinClass;
    premiumEconomy?: CabinClass;
    business?: CabinClass;
    first?: CabinClass;
  };
}

interface PassengerDetailsPageProps {
  selectedFlight: Flight;
  selectedCabinClass: string;
  passengers: PassengerInfo[];
  onPassengersChange: (passengers: PassengerInfo[]) => void;
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

const PassengerDetailsPage: React.FC<PassengerDetailsPageProps> = ({
  selectedFlight,
  selectedCabinClass,
  passengers,
  onPassengersChange,
  onContinue,
  onBack,
  onCancel,
}) => {
  const getCabinClassName = (cabinType: string): string => {
    switch (cabinType) {
      case "premiumEconomy":
        return "Premium Economy";
      case "business":
        return "Business";
      case "first":
        return "First Class";
      default:
        return "Economy";
    }
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    onPassengersChange(newPassengers);
  };

  const addPassenger = () => {
    onPassengersChange([
      ...passengers,
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        title: "Mr",
        nationality: "",
        passportNumber: "",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-auto">
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 hover:bg-blue-100"
              >
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Passenger Details
                </h1>
                <p className="text-gray-600">
                  Please fill in passenger information
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="p-2 hover:bg-red-100 text-red-600"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Flight Summary
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">From</div>
                    <div className="font-bold text-blue-900 text-lg">
                      {selectedFlight.departFrom}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedFlight.departAt}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                    <div className="font-medium text-gray-900">
                      {selectedFlight.duration}
                    </div>
                    <div className="text-xs text-blue-600">
                      {selectedFlight.stopInfo}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">To</div>
                    <div className="font-bold text-blue-900 text-lg">
                      {selectedFlight.arriveIn}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedFlight.arriveAt}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <span className="text-sm text-gray-600">Travel Class: </span>
                  <span className="font-medium text-blue-900">
                    {getCabinClassName(selectedCabinClass)}
                  </span>
                </div>
              </div>

              {/* Passenger Forms */}
              <div className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 border border-blue-100"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Passenger {index + 1}
                        {index === 0 && (
                          <span className="ml-2 text-sm text-blue-600 font-normal">
                            (Primary Contact)
                          </span>
                        )}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title *
                        </label>
                        <select
                          value={passenger.title}
                          onChange={(e) =>
                            updatePassenger(index, "title", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Dr">Dr</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) =>
                            updatePassenger(index, "firstName", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter first name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) =>
                            updatePassenger(index, "lastName", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter last name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          value={passenger.dateOfBirth}
                          onChange={(e) =>
                            updatePassenger(
                              index,
                              "dateOfBirth",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationality *
                        </label>
                        <input
                          type="text"
                          value={passenger.nationality}
                          onChange={(e) =>
                            updatePassenger(
                              index,
                              "nationality",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter nationality"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Passport Number *
                        </label>
                        <input
                          type="text"
                          value={passenger.passportNumber}
                          onChange={(e) =>
                            updatePassenger(
                              index,
                              "passportNumber",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter passport number"
                        />
                      </div>
                    </div>

                    {index === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={passenger.email}
                            onChange={(e) =>
                              updatePassenger(index, "email", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={passenger.phone}
                            onChange={(e) =>
                              updatePassenger(index, "phone", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Passenger Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={addPassenger}
                  className="px-8 py-3 flex items-center gap-3 mx-auto border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Plus size={20} />
                  Add Another Passenger
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flight</span>
                    <span className="font-medium">
                      {selectedFlight.airline} {selectedFlight.number}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium">
                      {selectedFlight.departFromCode} →{" "}
                      {selectedFlight.arriveInCode}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Class</span>
                    <span className="font-medium">
                      {getCabinClassName(selectedCabinClass)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers</span>
                    <span className="font-medium">
                      {passengers.length} Adult(s)
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={onContinue}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 text-lg"
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsPage;
