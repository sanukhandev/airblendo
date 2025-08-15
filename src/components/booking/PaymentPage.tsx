"use client";

import React from "react";
import { Button } from "../ui/button";
import { X, ArrowLeft, CreditCard, Plane, Shield, Check } from "lucide-react";

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

interface PaymentPageProps {
  selectedFlight: Flight;
  selectedCabinClass: string;
  selectedExtras: {
    insurance: boolean;
    seats: string[];
    meals: string[];
    baggage: number;
  };
  passengers: PassengerInfo[];
  totalCost: number;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  onCompleteBooking: () => void;
  onBack: () => void;
  onCancel: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  selectedFlight,
  selectedCabinClass,
  selectedExtras,
  passengers,
  totalCost,
  paymentMethod,
  onPaymentMethodChange,
  onCompleteBooking,
  onBack,
  onCancel,
}) => {
  const getCabinPrice = (flight: Flight, cabinClass: string): number => {
    const cabin =
      flight.cabinClasses[cabinClass as keyof typeof flight.cabinClasses];
    return cabin?.price || 0;
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 hover:bg-green-100"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Your Payment
              </h1>
              <p className="text-gray-600">
                Secure payment for your flight booking
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Choose Payment Method
              </h3>

              <div className="space-y-4">
                {[
                  { method: "Credit Card", icon: CreditCard, popular: true },
                  { method: "Debit Card", icon: CreditCard, popular: false },
                  { method: "PayPal", icon: CreditCard, popular: false },
                  { method: "Apple Pay", icon: CreditCard, popular: false },
                ].map(({ method, icon: Icon, popular }) => (
                  <label
                    key={method}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === method
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => onPaymentMethodChange(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <Icon size={24} className="text-green-600" />
                    <div className="flex-1">
                      <span className="font-medium">{method}</span>
                      {popular && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    {paymentMethod === method && (
                      <Check size={20} className="text-green-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Card Details Form */}
            {(paymentMethod === "Credit Card" ||
              paymentMethod === "Debit Card") && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Card Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter cardholder name"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-green-600" />
                <div>
                  <div className="font-medium text-green-800">
                    Secure Payment
                  </div>
                  <div className="text-sm text-green-700">
                    Your payment information is encrypted and secure
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Flight Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Flight Details
              </h3>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Plane size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {selectedFlight.airline}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedFlight.number}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">From:</span>
                  <div className="font-medium">{selectedFlight.departFrom}</div>
                  <div className="text-xs text-gray-500">
                    {selectedFlight.departAt}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">To:</span>
                  <div className="font-medium">{selectedFlight.arriveIn}</div>
                  <div className="text-xs text-gray-500">
                    {selectedFlight.arriveAt}
                  </div>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Passengers ({passengers.length})
              </h3>
              <div className="space-y-3">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">
                      {passenger.title} {passenger.firstName}{" "}
                      {passenger.lastName}
                    </span>
                    <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
                      {getCabinClassName(selectedCabinClass)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Price Breakdown
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Fare × {passengers.length}</span>
                  <span>
                    $
                    {getCabinPrice(selectedFlight, selectedCabinClass) *
                      passengers.length}
                  </span>
                </div>

                {selectedExtras.insurance && (
                  <div className="flex justify-between">
                    <span>Travel Insurance</span>
                    <span>$25</span>
                  </div>
                )}

                {selectedExtras.baggage > 0 && (
                  <div className="flex justify-between">
                    <span>Extra Baggage ({selectedExtras.baggage})</span>
                    <span>${selectedExtras.baggage * 30}</span>
                  </div>
                )}

                {selectedExtras.meals.length > 0 && (
                  <div className="flex justify-between">
                    <span>Special Meals ({selectedExtras.meals.length})</span>
                    <span>${selectedExtras.meals.length * 15}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>$45</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-600">${totalCost}</span>
                </div>
              </div>
            </div>

            {/* Complete Payment Button */}
            <Button
              onClick={onCompleteBooking}
              disabled={!paymentMethod}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 text-lg disabled:opacity-50 shadow-lg"
            >
              Complete Payment - ${totalCost}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
