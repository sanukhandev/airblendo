"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";

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

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  image?: string;
  cabinClasses: {
    economy: {
      price: number;
      available: boolean;
      seats: number;
      baggage: string;
      refundable: boolean;
      changeable: boolean;
      changeeFee: number;
    };
    business: {
      price: number;
      available: boolean;
      seats: number;
      baggage: string;
      refundable: boolean;
      changeable: boolean;
      changeeFee: number;
    };
    first: {
      price: number;
      available: boolean;
      seats: number;
      baggage: string;
      refundable: boolean;
      changeable: boolean;
      changeeFee: number;
    };
  };
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking page...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [passengers, setPassengers] = useState<PassengerInfo[]>([
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

  const [flightData, setFlightData] = useState<Flight | null>(null);
  const [cabinClass, setCabinClass] = useState("economy");

  useEffect(() => {
    // Get flight data from URL params or localStorage
    const flightId = searchParams.get("flightId");
    const cabin = searchParams.get("cabin") || "economy";
    setCabinClass(cabin);

    // In a real app, you'd fetch this from an API
    // For now, we'll simulate getting flight data
    if (flightId) {
      const mockFlight: Flight = {
        id: parseInt(flightId),
        airline: "Emirates",
        flightNumber: "EK123",
        departure: "Dubai (DXB)",
        arrival: "New York (JFK)",
        departureTime: "10:30",
        arrivalTime: "15:45",
        duration: "14h 15m",
        price: 899,
        cabinClasses: {
          economy: {
            price: 899,
            available: true,
            seats: 120,
            baggage: "1 x 23kg",
            refundable: false,
            changeable: true,
            changeeFee: 100,
          },
          business: {
            price: 2299,
            available: true,
            seats: 24,
            baggage: "2 x 32kg",
            refundable: true,
            changeable: true,
            changeeFee: 0,
          },
          first: {
            price: 4599,
            available: true,
            seats: 8,
            baggage: "3 x 32kg",
            refundable: true,
            changeable: true,
            changeeFee: 0,
          },
        },
      };
      setFlightData(mockFlight);
    }
  }, [searchParams]);

  const addPassenger = () => {
    setPassengers([
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

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleContinue = () => {
    // Store passenger data and navigate to payment
    const bookingData = {
      flightId: flightData?.id,
      cabin: cabinClass,
      passengers,
    };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push("/payment");
  };

  const handleBack = () => {
    router.back();
  };

  if (!flightData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-blue-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Passenger Details
            </h1>
          </div>
          <div className="text-sm text-gray-600">Step 2 of 3</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Passenger Forms */}
              <div className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Passenger {index + 1}
                      </h3>
                      {passengers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePassenger(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <select
                          value={passenger.title}
                          onChange={(e) =>
                            updatePassenger(index, "title", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Dr">Dr</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) =>
                            updatePassenger(index, "firstName", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter first name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) =>
                            updatePassenger(index, "lastName", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter last name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={passenger.email}
                          onChange={(e) =>
                            updatePassenger(index, "email", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter email address"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) =>
                            updatePassenger(index, "phone", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter nationality"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter passport number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Passenger Button */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={addPassenger}
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Passenger
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Flight Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Flight Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight</span>
                  <span className="font-medium">{flightData.flightNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Route</span>
                  <span className="font-medium text-sm">
                    {flightData.departure} → {flightData.arrival}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Class</span>
                  <span className="font-medium capitalize">{cabinClass}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-medium">{passengers.length}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      $
                      {(
                        flightData.cabinClasses[
                          cabinClass as keyof typeof flightData.cabinClasses
                        ].price * passengers.length
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
