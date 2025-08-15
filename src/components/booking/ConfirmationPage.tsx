"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  CheckCircle,
  Loader2,
  Plane,
  Calendar,
  Users,
  Download,
  Mail,
  Phone,
} from "lucide-react";

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

interface ConfirmationPageProps {
  selectedFlight: Flight;
  selectedCabinClass: string;
  passengers: PassengerInfo[];
  totalCost: number;
  pnr: string;
  ticketStatus: "pending" | "confirmed";
  isProcessing: boolean;
  onBookAnother: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  selectedFlight,
  selectedCabinClass,
  passengers,
  totalCost,
  pnr,
  ticketStatus,
  isProcessing,
  onBookAnother,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-auto">
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="mb-6">
                {ticketStatus === "pending" ? (
                  <div className="flex flex-col items-center">
                    {isProcessing ? (
                      <div className="p-4 bg-blue-100 rounded-full mb-4">
                        <Loader2
                          size={48}
                          className="text-blue-600 animate-spin"
                        />
                      </div>
                    ) : (
                      <div className="p-4 bg-yellow-100 rounded-full mb-4">
                        <CheckCircle size={48} className="text-yellow-600" />
                      </div>
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {isProcessing
                        ? "Processing Your Booking..."
                        : "Booking Confirmed!"}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {isProcessing
                        ? "Please wait while we process your payment and generate your tickets"
                        : "Your tickets are being generated and will be ready shortly"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-green-100 rounded-full mb-4">
                      <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      Booking Successful!
                    </h1>
                    <p className="text-xl text-gray-600">
                      Your tickets have been confirmed and are ready
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Reference Card */}
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border-l-4 border-green-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-600 mb-1">
                    Booking Reference
                  </div>
                  <div className="text-3xl font-bold text-blue-900">{pnr}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <div
                    className={`text-xl font-semibold ${
                      ticketStatus === "confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {ticketStatus === "confirmed" ? "CONFIRMED" : "PROCESSING"}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-600 mb-1">Total Paid</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${totalCost}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Flight Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Plane className="text-blue-600" size={24} />
                  Flight Details
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">
                        {selectedFlight.airline}
                      </div>
                      <div className="text-gray-600">
                        {selectedFlight.number}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Aircraft</div>
                      <div className="font-medium">
                        {selectedFlight.aircraft}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 bg-gray-50 rounded-lg px-4">
                    <div className="text-center">
                      <div className="font-bold text-blue-900 text-lg">
                        {selectedFlight.departFromCode}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedFlight.departFrom}
                      </div>
                      <div className="font-medium">
                        {selectedFlight.departAt}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Duration</div>
                      <div className="font-medium">
                        {selectedFlight.duration}
                      </div>
                      <div className="text-xs text-blue-600">
                        {selectedFlight.stopInfo}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-900 text-lg">
                        {selectedFlight.arriveInCode}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedFlight.arriveIn}
                      </div>
                      <div className="font-medium">
                        {selectedFlight.arriveAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Travel Class</span>
                    <span className="font-medium bg-blue-100 px-3 py-1 rounded-full text-blue-800">
                      {getCabinClassName(selectedCabinClass)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="text-blue-600" size={24} />
                  Passenger Details ({passengers.length})
                </h3>

                <div className="space-y-4">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-lg">
                            {passenger.title} {passenger.firstName}{" "}
                            {passenger.lastName}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {passenger.nationality} • {passenger.passportNumber}
                          </div>
                          {index === 0 && (
                            <div className="text-sm text-blue-600 mt-2 space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail size={14} />
                                {passenger.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone size={14} />
                                {passenger.phone}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-600">Seat</div>
                          <div className="font-medium">TBD</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600" size={20} />
                Important Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <div className="font-medium mb-1">Check-in</div>
                  <div>Online check-in opens 24 hours before departure</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Arrive at Airport</div>
                  <div>
                    Domestic: 2 hours | International: 3 hours before departure
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Baggage</div>
                  <div>Check baggage allowance in your ticket details</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Travel Documents</div>
                  <div>Ensure passport is valid for at least 6 months</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex-1 py-3 text-lg flex items-center justify-center gap-2 border-2"
              >
                <Download size={20} />
                Download Ticket
              </Button>
              <Button
                onClick={onBookAnother}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg"
              >
                Book Another Flight
              </Button>
            </div>

            {/* Email Confirmation */}
            <div className="text-center mt-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <Mail size={16} />
                  <span className="text-sm">
                    Booking confirmation and e-tickets have been sent to{" "}
                    <strong>{passengers[0]?.email}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
