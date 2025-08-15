"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { flights } from "../../public/datasets/places";
import { Plane, Luggage, MoreHorizontal, Briefcase } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
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
  step: "search" | "options" | "booking" | "payment" | "confirmation";
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
  ticketStatus: "pending" | "confirmed";
}

const FlightCard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [bookingFlow, setBookingFlow] = useState<BookingFlow>({
    step: "search",
    selectedFlight: null,
    selectedCabinClass: "economy",
    selectedExtras: {
      insurance: false,
      seats: [],
      meals: [],
      baggage: 0,
    },
    passengers: [
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
    ],
    totalCost: 0,
    paymentMethod: "",
    pnr: "",
    ticketStatus: "pending",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getCabinPrice = (flight: Flight, cabinClass: string): number => {
    const cabin =
      flight.cabinClasses[cabinClass as keyof typeof flight.cabinClasses];
    return cabin?.price || 0;
  };

  const handleBookFlight = (flight: Flight) => {
    setBookingFlow((prev) => ({
      ...prev,
      step: "options",
      selectedFlight: flight,
    }));
  };

  const handleSelectOptions = () => {
    setBookingFlow((prev) => ({
      ...prev,
      step: "booking",
    }));
  };

  const handleProceedToPayment = () => {
    const baseFare =
      getCabinPrice(
        bookingFlow.selectedFlight!,
        bookingFlow.selectedCabinClass
      ) * bookingFlow.passengers.length;
    const insuranceCost = bookingFlow.selectedExtras.insurance ? 25 : 0;
    const baggageCost = bookingFlow.selectedExtras.baggage * 30;
    const mealsCost = bookingFlow.selectedExtras.meals.length * 15;
    const taxes = 45;

    const total = baseFare + insuranceCost + baggageCost + mealsCost + taxes;

    setBookingFlow((prev) => ({
      ...prev,
      step: "payment",
      totalCost: total,
    }));
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);

    // Generate random PNR
    const pnr = "AIR" + Math.random().toString(36).substr(2, 6).toUpperCase();

    setBookingFlow((prev) => ({
      ...prev,
      step: "confirmation",
      pnr: pnr,
      ticketStatus: "pending",
    }));

    // Simulate booking processing - ticket generation after 5 seconds
    setTimeout(() => {
      const ticketNumber =
        "TKT" + Math.random().toString(36).substr(2, 8).toUpperCase();
      setBookingFlow((prev) => ({
        ...prev,
        ticketStatus: "confirmed",
        pnr: ticketNumber,
      }));
      setIsProcessing(false);
    }, 5000);
  };

  const resetBookingFlow = () => {
    setBookingFlow({
      step: "search",
      selectedFlight: null,
      selectedCabinClass: "economy",
      selectedExtras: {
        insurance: false,
        seats: [],
        meals: [],
        baggage: 0,
      },
      passengers: [
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
      ],
      totalCost: 0,
      paymentMethod: "",
      pnr: "",
      ticketStatus: "pending",
    });
  };

  // Render different pages based on booking step using Portal for full-screen experience
  if (
    bookingFlow.step === "booking" &&
    bookingFlow.selectedFlight &&
    isMounted
  ) {
    return createPortal(
      <PassengerDetailsPage
        selectedFlight={bookingFlow.selectedFlight}
        selectedCabinClass={bookingFlow.selectedCabinClass}
        passengers={bookingFlow.passengers}
        onPassengersChange={(passengers) =>
          setBookingFlow((prev) => ({ ...prev, passengers }))
        }
        onContinue={handleProceedToPayment}
        onBack={() => setBookingFlow((prev) => ({ ...prev, step: "options" }))}
        onCancel={resetBookingFlow}
      />,
      document.body
    );
  }

  if (
    bookingFlow.step === "payment" &&
    bookingFlow.selectedFlight &&
    isMounted
  ) {
    return createPortal(
      <PaymentPage
        selectedFlight={bookingFlow.selectedFlight}
        selectedCabinClass={bookingFlow.selectedCabinClass}
        selectedExtras={bookingFlow.selectedExtras}
        passengers={bookingFlow.passengers}
        totalCost={bookingFlow.totalCost}
        paymentMethod={bookingFlow.paymentMethod}
        onPaymentMethodChange={(method) =>
          setBookingFlow((prev) => ({ ...prev, paymentMethod: method }))
        }
        onCompleteBooking={handleCompleteBooking}
        onBack={() => setBookingFlow((prev) => ({ ...prev, step: "booking" }))}
        onCancel={resetBookingFlow}
      />,
      document.body
    );
  }

  if (
    bookingFlow.step === "confirmation" &&
    bookingFlow.selectedFlight &&
    isMounted
  ) {
    return createPortal(
      <ConfirmationPage
        selectedFlight={bookingFlow.selectedFlight}
        selectedCabinClass={bookingFlow.selectedCabinClass}
        passengers={bookingFlow.passengers}
        totalCost={bookingFlow.totalCost}
        pnr={bookingFlow.pnr}
        ticketStatus={bookingFlow.ticketStatus}
        isProcessing={isProcessing}
        onBookAnother={resetBookingFlow}
      />,
      document.body
    );
  }

  return (
    <div>
      {/* Flight Search Results - Only show when not in booking flow */}
      {bookingFlow.step === "search" && (
        <>
          {flights.length ? (
            <ul className="space-y-12 mt-8">
              {flights.map((flight) => (
                <li
                  key={flight.id}
                  className="pointer bg-blue-900 border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="flex gap-2 items-center text-white py-2 px-3 text-xs font-bold rounded-r-lg">
                    <Plane size={18} />
                    Direct
                  </span>
                  <div className="w-full bg-white rounded-b-xl hover:rounded-b-none shadow-md hover:-translate-y-2 transition-transform duration-300">
                    <div className="md:grid md:grid-cols-5 w-full">
                      <div className="flex items-center flex-row sm:flex-col justify-center col-span-1 md:border-r border-b md:border-b-0 border-dashed border-blue-900 px-4 py-6 gap-10">
                        {flight.image ? (
                          <Image
                            src={flight.image}
                            alt={`${flight.airline} logo`}
                            width={50}
                            height={50}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <Plane size={24} className="text-gray-500" />
                          </div>
                        )}
                        <span className="flex flex-col text-center items-center">
                          <h1 className="text-center text-lg font-bold text-blue-900">
                            {flight.airline}
                          </h1>
                          <p className="text-gray-600">{flight.number}</p>
                        </span>
                      </div>
                      <div className="border-b md:border-b-0 md:border-r border-dashed border-blue-900 col-span-3 px-4 py-6">
                        <div className="flex items-center gap-3 justify-around">
                          <span className="flex flex-col items-center">
                            <h1 className="text-center text-lg font-bold text-blue-900">
                              {flight.departFromCode}
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
                            <h1 className="text-center text-lg font-bold text-blue-900">
                              {flight.arriveInCode}
                            </h1>
                            <h1>{flight.arriveAt}</h1>
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-5 pt-5">
                          <span className="flex items-center gap-3">
                            <Briefcase size={18} /> 7kg
                          </span>
                          <Separator
                            orientation="vertical"
                            className="h-4 bg-gray-300"
                          />
                          <span className="flex items-center gap-3">
                            <Luggage size={18} /> 20kg
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center px-4 py-6">
                        <span className="text-center text-lg font-bold text-blue-900">
                          ${getCabinPrice(flight as Flight, "economy")}
                        </span>
                        <p className="text-gray-600">per person</p>
                        <Button
                          onClick={() => handleBookFlight(flight as Flight)}
                          className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2"
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No flights found</p>
            </div>
          )}
        </>
      )}

      {/* Flight Options Modal - Keep as modal */}
      {bookingFlow.step === "options" && bookingFlow.selectedFlight && (
        <FlightOptionsPage
          selectedFlight={bookingFlow.selectedFlight}
          selectedCabinClass={bookingFlow.selectedCabinClass}
          selectedExtras={bookingFlow.selectedExtras}
          onCabinClassChange={(cabinClass) =>
            setBookingFlow((prev) => ({
              ...prev,
              selectedCabinClass: cabinClass,
            }))
          }
          onExtrasChange={(extras) =>
            setBookingFlow((prev) => ({ ...prev, selectedExtras: extras }))
          }
          onContinue={handleSelectOptions}
          onCancel={resetBookingFlow}
        />
      )}
    </div>
  );
};

export default FlightCard;
