"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

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
  cabinClasses: {
    economy: { price: number };
    business: { price: number };
    first: { price: number };
  };
}

export default function PaymentPage() {
  const router = useRouter();

  const [bookingData, setBookingData] = useState<{
    flightId: number;
    cabin: string;
    passengers: PassengerInfo[];
  } | null>(null);

  const [flightData, setFlightData] = useState<Flight | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get booking data from localStorage
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      const data = JSON.parse(storedBookingData);
      setBookingData(data);

      // Simulate flight data
      const mockFlight: Flight = {
        id: data.flightId,
        airline: "Emirates",
        flightNumber: "EK123",
        departure: "Dubai (DXB)",
        arrival: "New York (JFK)",
        departureTime: "10:30",
        arrivalTime: "15:45",
        duration: "14h 15m",
        price: 899,
        cabinClasses: {
          economy: { price: 899 },
          business: { price: 2299 },
          first: { price: 4599 },
        },
      };
      setFlightData(mockFlight);
    } else {
      // Redirect back if no booking data
      router.push("/search");
    }
  }, [router]);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate PNR and store confirmation data
    const pnr = Math.random().toString(36).substr(2, 6).toUpperCase();
    const confirmationData = {
      ...bookingData,
      flight: flightData,
      pnr,
      paymentMethod,
      totalAmount: flightData
        ? flightData.cabinClasses[
            bookingData?.cabin as keyof typeof flightData.cabinClasses
          ].price * (bookingData?.passengers.length || 1)
        : 0,
      bookingDate: new Date().toISOString(),
    };

    localStorage.setItem("confirmationData", JSON.stringify(confirmationData));

    setIsProcessing(false);
    router.push("/confirmation");
  };

  const handleBack = () => {
    router.back();
  };

  if (!bookingData || !flightData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const totalAmount =
    flightData.cabinClasses[
      bookingData.cabin as keyof typeof flightData.cabinClasses
    ].price * bookingData.passengers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-green-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Payment Details
            </h1>
          </div>
          <div className="text-sm text-gray-600">Step 3 of 3</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center justify-center flex-col">
                      <CreditCard className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                  </div>

                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <div className="flex items-center justify-center flex-col">
                      <div className="h-8 w-8 bg-blue-600 rounded mb-2 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">PP</span>
                      </div>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>

                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "apple"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setPaymentMethod("apple")}
                  >
                    <div className="flex items-center justify-center flex-col">
                      <div className="h-8 w-8 bg-black rounded mb-2 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">🍎</span>
                      </div>
                      <span className="font-medium">Apple Pay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Details Form */}
              {paymentMethod === "card" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Card Details
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            number: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiry: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900">
                      Billing Address
                    </h4>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          value={billingAddress.address}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              address: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            value={billingAddress.city}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                city: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="New York"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            value={billingAddress.zipCode}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                zipCode: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="10001"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          value={billingAddress.country}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              country: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
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
                  <span className="font-medium capitalize">
                    {bookingData.cabin}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-medium">
                    {bookingData.passengers.length}
                  </span>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Base Price × {bookingData.passengers.length}
                    </span>
                    <span className="font-medium">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">$89</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-green-600">
                        ${(totalAmount + 89).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay $${(totalAmount + 89).toLocaleString()}`
                )}
              </Button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By completing your purchase, you agree to our Terms of Service
                and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
