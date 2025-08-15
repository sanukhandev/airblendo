"use client";

import React, { useState } from "react";
import { flights } from "../../public/datasets/places";
import { 
  Plane, 
  Luggage,
  MoreHorizontal,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import FlightOptionsPage from "./booking/FlightOptionsPage";
import PassengerDetailsPage from "./booking/PassengerDetailsPage";
import PaymentPage from "./booking/PaymentPage";
import ConfirmationPage from "./booking/ConfirmationPage";

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

interface BookingFlow {
  step: 'search' | 'options' | 'booking' | 'payment' | 'confirmation';
  selectedFlight: Flight | null;
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
  pnr: string;
  ticketStatus: 'pending' | 'confirmed';
}

const FlightCard = () => {
  const [bookingFlow, setBookingFlow] = useState<BookingFlow>({
    step: 'search',
    selectedFlight: null,
    selectedCabinClass: 'economy',
    selectedExtras: {
      insurance: false,
      seats: [],
      meals: [],
      baggage: 0
    },
    passengers: [{
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      title: 'Mr',
      nationality: '',
      passportNumber: ''
    }],
    totalCost: 0,
    paymentMethod: '',
    pnr: '',
    ticketStatus: 'pending'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper functions
  const getCabinPrice = (flight: Flight, cabinClass: string): number => {
    const cabin = flight.cabinClasses[cabinClass as keyof typeof flight.cabinClasses];
    return cabin?.price || 0;
  };

  const getCabinClassName = (cabinType: string): string => {
    switch (cabinType) {
      case 'premiumEconomy':
        return 'Premium Economy';
      case 'business':
        return 'Business';
      case 'first':
        return 'First Class';
      default:
        return 'Economy';
    }
  };

  // Booking flow handlers
  const handleBookFlight = (flight: Flight) => {
    setBookingFlow(prev => ({
      ...prev,
      step: 'options',
      selectedFlight: flight
    }));
  };

  const handleSelectOptions = () => {
    setBookingFlow(prev => ({
      ...prev,
      step: 'booking'
    }));
  };

  const handleProceedToPayment = () => {
    const baseFare = getCabinPrice(bookingFlow.selectedFlight!, bookingFlow.selectedCabinClass) * bookingFlow.passengers.length;
    const insuranceCost = bookingFlow.selectedExtras.insurance ? 25 : 0;
    const baggageCost = bookingFlow.selectedExtras.baggage * 30;
    const mealsCost = bookingFlow.selectedExtras.meals.length * 15;
    const taxes = 45;
    
    const total = baseFare + insuranceCost + baggageCost + mealsCost + taxes;
    
    setBookingFlow(prev => ({
      ...prev,
      step: 'payment',
      totalCost: total
    }));
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);
    
    // Generate random PNR
    const pnr = 'AIR' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    setBookingFlow(prev => ({
      ...prev,
      step: 'confirmation',
      pnr: pnr,
      ticketStatus: 'pending'
    }));
    
    // Simulate booking processing - ticket generation after 5 seconds
    setTimeout(() => {
      const ticketNumber = 'TKT' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setBookingFlow(prev => ({
        ...prev,
        ticketStatus: 'confirmed',
        pnr: ticketNumber
      }));
      setIsProcessing(false);
    }, 5000);
  };

  const resetBookingFlow = () => {
    setBookingFlow({
      step: 'search',
      selectedFlight: null,
      selectedCabinClass: 'economy',
      selectedExtras: {
        insurance: false,
        seats: [],
        meals: [],
        baggage: 0
      },
      passengers: [{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        title: 'Mr',
        nationality: '',
        passportNumber: ''
      }],
      totalCost: 0,
      paymentMethod: '',
      pnr: '',
      ticketStatus: 'pending'
    });
  };
  return (
    <div>
      {flights.length ? (
        <ul className="space-y-8 mt-8">
          {flights.map((flight) => (
            <li
              key={flight.id}
              className="pointer bg-blue-900 border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {" "}
              <span className="flex gap-2 items-center text-white py-2 px-3 text-xs font-bold rounded-r-lg">
                <Plane size={18} />
                Direct
              </span>
              <div className="w-full bg-white mb-[-34] rounded-b-xl hover:rounded-b-none shadow-md hover:-translate-y-9 transition-transform duration-500">
                <div className="md:grid md:grid-cols-5 w-full">
                  <div className="flex items-center flex-row sm:flex-col justify-center col-span-1 md:border-r border-b md:border-b-0 border-dashed border-blue-900 px-4 py-6 gap-10">
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
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">
                        {flight.airline}
                      </h3>
                      <p className="text-gray-600">{flight.number}</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center col-span-3 justify-center px-6 py-10  md:mt-0">
                    <span className="flex flex-col items-center">
                      <h1 className="font-bold text-blue-900">
                        {flight.departFrom}
                      </h1>
                      <h1>{flight.departAt}</h1>
                    </span>
                    <MoreHorizontal />
                    <span className="flex flex-col items-center">
                      <Plane color="#1e3a8a" />
                      <Separator className="my-3 h-[3px] bg-green-500" />
                      <p className="text-gray-600">{flight.duration}</p>
                    </span>
                    <MoreHorizontal />
                    <span className="flex flex-col items-center">
                      <h1 className="font-bold text-blue-900">
                        {flight.arriveIn}
                      </h1>
                      <h1>{flight.arriveAt}</h1>
                    </span>
                  </div>
                  <div className="text-center px-6 py-10">
                    <>
                      <p className="text-xl font-bold text-blue-900">
                        ${getCabinPrice(flight as Flight, 'economy')}
                      </p>
                      <p className="text-sm text-gray-500">per person</p>
                      <button
                        type="button"
                        onClick={() => handleBookFlight(flight as Flight)}
                        className="pointer mt-3 bg-blue-950 hover:bg-white text-white hover:text-blue-900 border hover:border hover:border-blue-900 font-bold py-2 px-6 rounded-lg transition"
                      >
                        Book
                      </button>
                    </>
                  </div>
                </div>
              </div>
              <span className="flex gap-3 b-[-25] items-center text-white py-2 px-3 text-xs font-bold rounded-r-lg">
                <>
                  <Luggage size={18} /> 25 kg{" "}
                </>
                <>
                  <Briefcase size={18} /> 7kg
                </>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights found.</p>
      )}

      {/* Booking Flow Modals */}
      {/* Step 1: Options Selection */}
      {bookingFlow.step === 'options' && bookingFlow.selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Select Your Options</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetBookingFlow}
                  className="p-2"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Flight Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  {bookingFlow.selectedFlight.image && (
                    <div className="w-12 h-12 relative">
                      <Image
                        src={bookingFlow.selectedFlight.image}
                        alt={`${bookingFlow.selectedFlight.airline} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{bookingFlow.selectedFlight.airline}</h4>
                    <p className="text-sm text-gray-600">{bookingFlow.selectedFlight.number}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="text-xl font-bold text-blue-900">
                      ${getCabinPrice(bookingFlow.selectedFlight, 'economy')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-4">Choose Your Travel Class</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(bookingFlow.selectedFlight.cabinClasses).map(([cabinType, cabinInfo]: [string, CabinClass]) => (
                    <div
                      key={cabinType}
                      onClick={() => setBookingFlow(prev => ({...prev, selectedCabinClass: cabinType}))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        bookingFlow.selectedCabinClass === cabinType
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
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
                            <span>{cabinInfo.refundable ? 'Refundable' : 'Non-refundable'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-4">Optional Add-ons</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Travel Insurance */}
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    bookingFlow.selectedExtras.insurance ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                    onClick={() => setBookingFlow(prev => ({
                      ...prev,
                      selectedExtras: {...prev.selectedExtras, insurance: !prev.selectedExtras.insurance}
                    }))}
                  >
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium">Travel Insurance</div>
                        <div className="text-sm text-gray-600">Comprehensive coverage</div>
                        <div className="text-lg font-bold text-green-600">+$25</div>
                      </div>
                      {bookingFlow.selectedExtras.insurance && <Check size={20} className="text-blue-600" />}
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
                        onClick={() => setBookingFlow(prev => ({
                          ...prev,
                          selectedExtras: {
                            ...prev.selectedExtras, 
                            baggage: Math.max(0, prev.selectedExtras.baggage - 1)
                          }
                        }))}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center">{bookingFlow.selectedExtras.baggage}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBookingFlow(prev => ({
                          ...prev,
                          selectedExtras: {
                            ...prev.selectedExtras, 
                            baggage: prev.selectedExtras.baggage + 1
                          }
                        }))}
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
                      {['Vegetarian', 'Vegan', 'Halal', 'Kosher'].map(meal => (
                        <label key={meal} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={bookingFlow.selectedExtras.meals.includes(meal)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBookingFlow(prev => ({
                                  ...prev,
                                  selectedExtras: {
                                    ...prev.selectedExtras,
                                    meals: [...prev.selectedExtras.meals, meal]
                                  }
                                }));
                              } else {
                                setBookingFlow(prev => ({
                                  ...prev,
                                  selectedExtras: {
                                    ...prev.selectedExtras,
                                    meals: prev.selectedExtras.meals.filter(m => m !== meal)
                                  }
                                }));
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
                <h5 className="font-semibold text-gray-900 mb-3">Price Breakdown</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Fare ({getCabinClassName(bookingFlow.selectedCabinClass)})</span>
                    <span>${getCabinPrice(bookingFlow.selectedFlight, bookingFlow.selectedCabinClass)}</span>
                  </div>
                  {bookingFlow.selectedExtras.insurance && (
                    <div className="flex justify-between">
                      <span>Travel Insurance</span>
                      <span>$25</span>
                    </div>
                  )}
                  {bookingFlow.selectedExtras.baggage > 0 && (
                    <div className="flex justify-between">
                      <span>Extra Baggage ({bookingFlow.selectedExtras.baggage} bags)</span>
                      <span>${bookingFlow.selectedExtras.baggage * 30}</span>
                    </div>
                  )}
                  {bookingFlow.selectedExtras.meals.length > 0 && (
                    <div className="flex justify-between">
                      <span>Special Meals ({bookingFlow.selectedExtras.meals.length})</span>
                      <span>${bookingFlow.selectedExtras.meals.length * 15}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>$45</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-blue-900">
                      ${getCabinPrice(bookingFlow.selectedFlight, bookingFlow.selectedCabinClass) + 
                        (bookingFlow.selectedExtras.insurance ? 25 : 0) +
                        (bookingFlow.selectedExtras.baggage * 30) +
                        (bookingFlow.selectedExtras.meals.length * 15) +
                        45}
                    </span>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleSelectOptions}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
              >
                Continue to Booking Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Booking Details Page */}
      {bookingFlow.step === 'booking' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Passenger Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetBookingFlow}
                  className="p-2"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Flight Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">From:</span>
                    <div className="font-medium">{bookingFlow.selectedFlight!.departFrom}</div>
                    <div className="text-xs text-gray-500">{bookingFlow.selectedFlight!.departAt}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600">To:</span>
                    <div className="font-medium">{bookingFlow.selectedFlight!.arriveIn}</div>
                    <div className="text-xs text-gray-500">{bookingFlow.selectedFlight!.arriveAt}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600">Class:</span>
                    <div className="font-medium">{getCabinClassName(bookingFlow.selectedCabinClass)}</div>
                  </div>
                </div>
              </div>

              {/* Passenger Information */}
              {bookingFlow.passengers.map((passenger, index) => (
                <div key={index} className="mb-6 p-4 border rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-4">Passenger {index + 1}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <select
                        value={passenger.title}
                        onChange={(e) => {
                          const newPassengers = [...bookingFlow.passengers];
                          newPassengers[index].title = e.target.value;
                          setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        onChange={(e) => {
                          const newPassengers = [...bookingFlow.passengers];
                          newPassengers[index].firstName = e.target.value;
                          setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) => {
                          const newPassengers = [...bookingFlow.passengers];
                          newPassengers[index].lastName = e.target.value;
                          setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => {
                          const newPassengers = [...bookingFlow.passengers];
                          newPassengers[index].dateOfBirth = e.target.value;
                          setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality *
                      </label>
                      <input
                        type="text"
                        value={passenger.nationality}
                        onChange={(e) => {
                          const newPassengers = [...bookingFlow.passengers];
                          newPassengers[index].nationality = e.target.value;
                          setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter nationality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        value={passenger.passportNumber}
                        onChange={(e) => {
                          const newPassengers = [...bookingFlow.passengers];
                          newPassengers[index].passportNumber = e.target.value;
                          setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter passport number"
                      />
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={passenger.email}
                          onChange={(e) => {
                            const newPassengers = [...bookingFlow.passengers];
                            newPassengers[index].email = e.target.value;
                            setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) => {
                            const newPassengers = [...bookingFlow.passengers];
                            newPassengers[index].phone = e.target.value;
                            setBookingFlow(prev => ({...prev, passengers: newPassengers}));
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Passenger Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setBookingFlow(prev => ({
                    ...prev,
                    passengers: [...prev.passengers, {
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      dateOfBirth: '',
                      title: 'Mr',
                      nationality: '',
                      passportNumber: ''
                    }]
                  }));
                }}
                className="mb-6 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Another Passenger
              </Button>

              {/* Proceed to Payment */}
              <Button
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment Page */}
      {bookingFlow.step === 'payment' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Payment Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetBookingFlow}
                  className="p-2"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Form */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Method</h4>
                  
                  {/* Payment Options */}
                  <div className="space-y-3 mb-6">
                    {['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay'].map(method => (
                      <label key={method} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={bookingFlow.paymentMethod === method}
                          onChange={(e) => setBookingFlow(prev => ({...prev, paymentMethod: e.target.value}))}
                        />
                        <CreditCard size={20} className="text-blue-600" />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>

                  {/* Card Details */}
                  {(bookingFlow.paymentMethod === 'Credit Card' || bookingFlow.paymentMethod === 'Debit Card') && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter cardholder name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Booking Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Booking Summary</h4>
                  
                  {/* Flight Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Plane size={20} className="text-blue-600" />
                      <div>
                        <div className="font-medium">{bookingFlow.selectedFlight!.airline}</div>
                        <div className="text-sm text-gray-600">{bookingFlow.selectedFlight!.number}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">From:</span>
                        <div className="font-medium">{bookingFlow.selectedFlight!.departFrom}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">To:</span>
                        <div className="font-medium">{bookingFlow.selectedFlight!.arriveIn}</div>
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Passengers</h5>
                    {bookingFlow.passengers.map((passenger, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {passenger.title} {passenger.firstName} {passenger.lastName}
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Price Breakdown</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Base Fare × {bookingFlow.passengers.length}</span>
                        <span>${getCabinPrice(bookingFlow.selectedFlight!, bookingFlow.selectedCabinClass) * bookingFlow.passengers.length}</span>
                      </div>
                      {bookingFlow.selectedExtras.insurance && (
                        <div className="flex justify-between">
                          <span>Travel Insurance</span>
                          <span>$25</span>
                        </div>
                      )}
                      {bookingFlow.selectedExtras.baggage > 0 && (
                        <div className="flex justify-between">
                          <span>Extra Baggage</span>
                          <span>${bookingFlow.selectedExtras.baggage * 30}</span>
                        </div>
                      )}
                      {bookingFlow.selectedExtras.meals.length > 0 && (
                        <div className="flex justify-between">
                          <span>Special Meals</span>
                          <span>${bookingFlow.selectedExtras.meals.length * 15}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Taxes & Fees</span>
                        <span>$45</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-blue-900">${bookingFlow.totalCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Payment Button */}
              <Button
                onClick={handleCompleteBooking}
                disabled={!bookingFlow.paymentMethod}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 disabled:opacity-50"
              >
                Complete Payment - ${bookingFlow.totalCost}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation Page */}
      {bookingFlow.step === 'confirmation' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 text-center">
              {/* Success Animation */}
              <div className="mb-6">
                {bookingFlow.ticketStatus === 'pending' ? (
                  <div className="flex flex-col items-center">
                    {isProcessing ? (
                      <Loader2 size={64} className="text-blue-600 animate-spin mb-4" />
                    ) : (
                      <CheckCircle size={64} className="text-yellow-500 mb-4" />
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {isProcessing ? 'Processing Your Booking...' : 'Booking Confirmed!'}
                    </h3>
                    <p className="text-gray-600">
                      {isProcessing ? 'Please wait while we process your payment' : 'Your ticket is being generated'}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <CheckCircle size={64} className="text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h3>
                    <p className="text-gray-600">Your ticket has been confirmed</p>
                  </div>
                )}
              </div>

              {/* Booking Details */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-gray-600 text-sm">Booking Reference</span>
                    <div className="font-bold text-lg text-blue-900">{bookingFlow.pnr}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Status</span>
                    <div className={`font-medium ${bookingFlow.ticketStatus === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {bookingFlow.ticketStatus === 'confirmed' ? 'CONFIRMED' : 'PENDING'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Flight</span>
                    <div className="font-medium">{bookingFlow.selectedFlight!.airline} {bookingFlow.selectedFlight!.number}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Route</span>
                    <div className="font-medium">{bookingFlow.selectedFlight!.departFrom} → {bookingFlow.selectedFlight!.arriveIn}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Passengers</span>
                    <div className="font-medium">{bookingFlow.passengers.length} Adult(s)</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Total Paid</span>
                    <div className="font-bold text-green-600">${bookingFlow.totalCost}</div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="text-left mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Passenger Details</h4>
                <div className="space-y-2">
                  {bookingFlow.passengers.map((passenger, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>{passenger.title} {passenger.firstName} {passenger.lastName}</span>
                      <span className="text-sm text-gray-600">{getCabinClassName(bookingFlow.selectedCabinClass)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="flex-1"
                >
                  Print Ticket
                </Button>
                <Button
                  onClick={resetBookingFlow}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Book Another Flight
                </Button>
              </div>

              {/* Email Notification */}
              <p className="text-sm text-gray-500 mt-4">
                Booking confirmation has been sent to {bookingFlow.passengers[0]?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
