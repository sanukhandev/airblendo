"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import {
  CheckCircle,
  Download,
  Calendar,
  Plane,
  Users,
  CreditCard,
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
}

interface ConfirmationData {
  flightId: number;
  cabin: string;
  passengers: PassengerInfo[];
  flight: Flight;
  pnr: string;
  paymentMethod: string;
  totalAmount: number;
  bookingDate: string;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [confirmationData, setConfirmationData] =
    useState<ConfirmationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Get confirmation data from localStorage
    const storedConfirmationData = localStorage.getItem("confirmationData");
    if (storedConfirmationData) {
      const data = JSON.parse(storedConfirmationData);
      setConfirmationData(data);

      // Simulate 5-second processing time as requested
      setTimeout(() => {
        setIsProcessing(false);
      }, 5000);
    } else {
      // Redirect back if no confirmation data
      router.push("/search");
    }
  }, [router]);

  const handleBookAnother = () => {
    // Clear all booking data
    localStorage.removeItem("bookingData");
    localStorage.removeItem("confirmationData");
    router.push("/search");
  };

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert("Ticket download feature would be implemented here");
  };

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation details...</p>
        </div>
      </div>
    );
  }

  const totalWithFees = confirmationData.totalAmount + 89;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Processing Your Booking...
              </h1>
              <p className="text-gray-600">
                Please wait while we generate your ticket numbers
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h1 className="text-3xl font-bold text-gray-900">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600">
                Your flight has been successfully booked
              </p>
            </div>
          )}
        </div>

        {!isProcessing && (
          <>
            {/* PNR and Booking Details */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* PNR Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Booking Reference
                </h2>
                <div className="text-3xl font-bold text-green-600 tracking-wider mb-4">
                  {confirmationData.pnr}
                </div>
                <p className="text-sm text-gray-600">
                  Please save this reference number for your records
                </p>
              </div>

              {/* Flight Details Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Flight Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight Number</span>
                      <span className="font-medium">
                        {confirmationData.flight.flightNumber}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Airline</span>
                      <span className="font-medium">
                        {confirmationData.flight.airline}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Route</span>
                      <span className="font-medium">
                        {confirmationData.flight.departure} →{" "}
                        {confirmationData.flight.arrival}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Class</span>
                      <span className="font-medium capitalize">
                        {confirmationData.cabin}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure</span>
                      <span className="font-medium">
                        {confirmationData.flight.departureTime}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival</span>
                      <span className="font-medium">
                        {confirmationData.flight.arrivalTime}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {confirmationData.flight.duration}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium">
                        {confirmationData.passengers.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Details Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Passenger Details
                </h3>

                <div className="space-y-4">
                  {confirmationData.passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Name</span>
                          <p className="font-medium">
                            {passenger.title} {passenger.firstName}{" "}
                            {passenger.lastName}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Email</span>
                          <p className="font-medium">{passenger.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            Passport
                          </span>
                          <p className="font-medium">
                            {passenger.passportNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Base Price × {confirmationData.passengers.length}
                    </span>
                    <span className="font-medium">
                      ${confirmationData.totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">$89</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Paid</span>
                      <span className="text-green-600">
                        ${totalWithFees.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    Payment Method:{" "}
                    {confirmationData.paymentMethod === "card"
                      ? "Credit/Debit Card"
                      : confirmationData.paymentMethod}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownloadTicket}
                  variant="outline"
                  className="flex items-center gap-2 border-green-300 text-green-600 hover:bg-green-50"
                >
                  <Download className="h-4 w-4" />
                  Download E-Ticket
                </Button>

                <Button
                  onClick={handleBookAnother}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Book Another Flight
                </Button>
              </div>

              {/* Important Information */}
              <div className="bg-blue-50 rounded-xl p-6 mt-8">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Important Information
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Please arrive at the airport at least 3 hours before
                    international departures
                  </li>
                  <li>
                    • Ensure your passport is valid for at least 6 months from
                    the travel date
                  </li>
                  <li>• Check visa requirements for your destination</li>
                  <li>• Review baggage allowance and restrictions</li>
                  <li>• Online check-in opens 24 hours before departure</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
