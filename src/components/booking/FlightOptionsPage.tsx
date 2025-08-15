"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { X, Shield, Luggage, Coffee, Plus, Minus, Check } from "lucide-react";

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

interface FlightOptionsPageProps {
  selectedFlight: Flight;
  selectedCabinClass: string;
  selectedExtras: {
    insurance: boolean;
    seats: string[];
    meals: string[];
    baggage: number;
  };
  onCabinClassChange: (cabinClass: string) => void;
  onExtrasChange: (extras: {
    insurance: boolean;
    seats: string[];
    meals: string[];
    baggage: number;
  }) => void;
  onContinue: () => void;
  onCancel: () => void;
}

const FlightOptionsPage: React.FC<FlightOptionsPageProps> = ({
  selectedFlight,
  selectedCabinClass,
  selectedExtras,
  onCabinClassChange,
  onExtrasChange,
  onContinue,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Select Your Options
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="p-2"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Flight Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              {selectedFlight.image && (
                <div className="w-12 h-12 relative">
                  <Image
                    src={selectedFlight.image}
                    alt={`${selectedFlight.airline} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {selectedFlight.airline}
                </h4>
                <p className="text-sm text-gray-600">{selectedFlight.number}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Starting from</div>
                <div className="text-xl font-bold text-blue-900">
                  ${getCabinPrice(selectedFlight, "economy")}
                </div>
              </div>
            </div>
          </div>

          {/* Cabin Class Selection */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-4">
              Choose Your Travel Class
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(selectedFlight.cabinClasses).map(
                ([cabinType, cabinInfo]: [string, CabinClass]) => (
                  <div
                    key={cabinType}
                    onClick={() => onCabinClassChange(cabinType)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedCabinClass === cabinType
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="text-center">
                      <h6 className="font-medium text-gray-900 mb-1">
                        {getCabinClassName(cabinType)}
                      </h6>
                      <div className="text-2xl font-bold text-blue-900 mb-2">
                        ${cabinInfo.price}
                      </div>
                      <div className="text-xs text-green-600 mb-3">
                        {cabinInfo.seats} seats left
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1 justify-center">
                          <Luggage size={12} />
                          <span>{cabinInfo.baggage}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-center">
                          <Shield size={12} />
                          <span>
                            {cabinInfo.refundable
                              ? "Refundable"
                              : "Non-refundable"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-4">
              Optional Add-ons
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Travel Insurance */}
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedExtras.insurance
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  onExtrasChange({
                    ...selectedExtras,
                    insurance: !selectedExtras.insurance,
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">Travel Insurance</div>
                    <div className="text-sm text-gray-600">
                      Comprehensive coverage
                    </div>
                    <div className="text-lg font-bold text-green-600">+$25</div>
                  </div>
                  {selectedExtras.insurance && (
                    <Check size={20} className="text-blue-600" />
                  )}
                </div>
              </div>

              {/* Extra Baggage */}
              <div className="p-4 rounded-lg border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Luggage size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Extra Baggage</div>
                    <div className="text-sm text-gray-600">$30 per bag</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onExtrasChange({
                        ...selectedExtras,
                        baggage: Math.max(0, selectedExtras.baggage - 1),
                      })
                    }
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-8 text-center">
                    {selectedExtras.baggage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onExtrasChange({
                        ...selectedExtras,
                        baggage: selectedExtras.baggage + 1,
                      })
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Meals */}
              <div className="p-4 rounded-lg border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Coffee size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Special Meals</div>
                    <div className="text-sm text-gray-600">$15 per meal</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {["Vegetarian", "Vegan", "Halal", "Kosher"].map((meal) => (
                    <label
                      key={meal}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedExtras.meals.includes(meal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onExtrasChange({
                              ...selectedExtras,
                              meals: [...selectedExtras.meals, meal],
                            });
                          } else {
                            onExtrasChange({
                              ...selectedExtras,
                              meals: selectedExtras.meals.filter(
                                (m) => m !== meal
                              ),
                            });
                          }
                        }}
                      />
                      {meal}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">
              Price Breakdown
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Fare ({getCabinClassName(selectedCabinClass)})</span>
                <span>
                  ${getCabinPrice(selectedFlight, selectedCabinClass)}
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
                  <span>Extra Baggage ({selectedExtras.baggage} bags)</span>
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
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-900">
                  $
                  {getCabinPrice(selectedFlight, selectedCabinClass) +
                    (selectedExtras.insurance ? 25 : 0) +
                    selectedExtras.baggage * 30 +
                    selectedExtras.meals.length * 15 +
                    45}
                </span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
          >
            Continue to Booking Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightOptionsPage;
