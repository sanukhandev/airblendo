'use client';
// @ts-nocheck

import React, { useState } from 'react';
import Image from 'next/image';
import { flights } from '../../public/datasets/places';
import { Button } from './ui/button';
import { 
  Plane, 
  Clock, 
  Users, 
  Wifi, 
  Monitor, 
  Coffee, 
  Volume2, 
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  User,
  X,
  CheckCircle,
  Star,
  Luggage,
  Shield
} from 'lucide-react';

interface FlightCardProps {
  className?: string;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

const FlightCard: React.FC<FlightCardProps> = ({ className = '' }) => {
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCabinClass, setSelectedCabinClass] = useState('economy');
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  });

  const toggleFlightDetails = (flightId: number) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking flight:', selectedFlight);
    console.log('Passenger info:', passengerInfo);
    console.log('Selected cabin class:', selectedCabinClass);
    alert('Booking submitted successfully!');
    setShowBookingModal(false);
  };

  const getCabinPrice = (flight: any, cabinClass: string): number => {
    return flight.cabinClasses[cabinClass]?.price || 0;
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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi size={16} className="text-blue-600" />;
      case 'entertainment':
        return <Monitor size={16} className="text-purple-600" />;
      case 'meals':
        return <Coffee size={16} className="text-orange-600" />;
      case 'priority boarding':
        return <Users size={16} className="text-green-600" />;
      case 'extra legroom':
        return <Zap size={16} className="text-yellow-600" />;
      case 'noise canceling':
        return <Volume2 size={16} className="text-indigo-600" />;
      default:
        return <CheckCircle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {flights && flights.length > 0 ? (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Main Flight Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {flight.image && (
                      <div className="w-12 h-12 relative">
                        <Image
                          src={flight.image}
                          alt={`${flight.airline} logo`}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {flight.airline}
                      </h3>
                      <p className="text-sm text-gray-600">{flight.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-900">
                      ${getCabinPrice(flight, 'economy')}
                    </div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                </div>

                {/* Flight Route */}
                <div className="grid grid-cols-3 gap-4 items-center mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {flight.departAt}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {flight.departFrom}
                    </div>
                  </div>
                  
                  <div className="text-center relative">
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-px bg-gray-300 flex-1"></div>
                      <Plane size={20} className="mx-2 text-blue-600" />
                      <div className="h-px bg-gray-300 flex-1"></div>
                    </div>
                    <div className="text-sm text-gray-600">{flight.duration}</div>
                    <div className="text-xs text-gray-500">{flight.stopInfo}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {flight.arriveAt}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {flight.arriveIn}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleFlightDetails(flight.id)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    View Details
                    {expandedFlight === flight.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                  <Button
                    onClick={() => handleSelectFlight(flight)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Select Flight
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedFlight === flight.id && (
                <div className="border-t bg-gray-50">
                  <div className="p-6">
                    {/* Flight Timeline */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock size={16} />
                        Flight Timeline
                      </h4>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div>
                              <div className="font-medium">{flight.departAt}</div>
                              <div className="text-sm text-gray-600">{flight.departFrom}</div>
                            </div>
                          </div>
                          <ArrowRight className="text-gray-400" size={20} />
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-medium">{flight.arriveAt}</div>
                              <div className="text-sm text-gray-600">{flight.arriveIn}</div>
                            </div>
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cabin Classes */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Users size={16} />
                        Available Cabin Classes
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        {Object.entries(flight.cabinClasses).map(([cabinType, cabinInfo]) => (
                          <div
                            key={cabinType}
                            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-medium text-gray-900">
                                {getCabinClassName(cabinType)}
                              </h5>
                              <div className="text-right">
                                <div className="text-xl font-bold text-blue-900">
                                  ${cabinInfo.price}
                                </div>
                                <div className="text-xs text-green-600">
                                  {cabinInfo.seats} seats left
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Luggage size={14} className="text-gray-500" />
                                <span className="text-gray-700">{cabinInfo.baggage}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield size={14} className="text-gray-500" />
                                <span className="text-gray-700">
                                  {cabinInfo.refundable ? 'Refundable' : 'Non-refundable'}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="text-xs font-medium text-gray-700 mb-2">Amenities:</div>
                              <div className="flex flex-wrap gap-1">
                                {cabinInfo.amenities && cabinInfo.amenities.map((amenity, index) => (
                                  <div key={index} className="flex items-center gap-1">
                                    {getAmenityIcon(amenity)}
                                    <span className="text-xs text-gray-600">{amenity}</span>
                                  </div>
                                ))}
                                {!cabinInfo.amenities && (
                                  <span className="text-xs text-gray-500">Standard amenities included</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">
                            Why choose {flight.airline}?
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                            <div>• On-time performance: 94%</div>
                            <div>• Customer satisfaction: 4.8/5</div>
                            <div>• Modern fleet with latest amenities</div>
                            <div>• Award-winning service</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
      
      {/* Booking Modal */}
      {showBookingModal && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book Your Flight</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBookingModal(false)}
                  className="p-2"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Flight Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4 mb-3">
                  {selectedFlight.image && (
                    <div className="w-12 h-12 relative">
                      <Image
                        src={selectedFlight.image}
                        alt={`${selectedFlight.airline} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedFlight.airline}</h4>
                    <p className="text-sm text-gray-600">{selectedFlight.number}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">From:</span>
                    <div className="font-medium">{selectedFlight.departFrom}</div>
                    <div className="text-xs text-gray-500">{selectedFlight.departAt}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600">Duration:</span>
                    <div className="font-medium">{selectedFlight.duration}</div>
                    <div className="text-xs text-gray-500">{selectedFlight.stopInfo}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600">To:</span>
                    <div className="font-medium">{selectedFlight.arriveIn}</div>
                    <div className="text-xs text-gray-500">{selectedFlight.arriveAt}</div>
                  </div>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Select Cabin Class</h5>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(selectedFlight.cabinClasses).map(([cabinType, cabinInfo]: [string, any]) => (
                    <div
                      key={cabinType}
                      onClick={() => setSelectedCabinClass(cabinType)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedCabinClass === cabinType
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-medium capitalize">
                        {getCabinClassName(cabinType)}
                      </div>
                      <div className="text-lg font-bold text-blue-900">${cabinInfo.price}</div>
                      <div className="text-xs text-gray-600">{cabinInfo.seats} seats left</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passenger Information */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={16} />
                  Passenger Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={passengerInfo.firstName}
                      onChange={(e) => setPassengerInfo({...passengerInfo, firstName: e.target.value})}
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
                      value={passengerInfo.lastName}
                      onChange={(e) => setPassengerInfo({...passengerInfo, lastName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={passengerInfo.email}
                      onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={passengerInfo.phone}
                      onChange={(e) => setPassengerInfo({...passengerInfo, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={passengerInfo.dateOfBirth}
                      onChange={(e) => setPassengerInfo({...passengerInfo, dateOfBirth: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Price Summary</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Fare ({getCabinClassName(selectedCabinClass)})</span>
                    <span>${getCabinPrice(selectedFlight, selectedCabinClass)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>$45</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-blue-900">${getCabinPrice(selectedFlight, selectedCabinClass) + 45}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBooking}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Complete Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
