"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  DollarSign,
  Plane,
  Filter,
  RotateCcw,
  Star,
  Wifi,
  Utensils,
  MapPin,
  Calendar,
  Users,
  Shield,
  Coffee,
  Headphones,
  Zap,
} from "lucide-react";

export default function FlightFilterSidebar() {
  const [price, setPrice] = useState([1000]);
  const [duration, setDuration] = useState([12]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedCabinClasses, setSelectedCabinClasses] = useState<string[]>(
    []
  );
  const [stops, setStops] = useState("any");
  const [departureTime, setDepartureTime] = useState("any");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [aircraft, setAircraft] = useState<string[]>([]);
  const [baggage, setBaggage] = useState("any");

  const airlines = [
    "Emirates",
    "Qatar Airways",
    "Etihad",
    "Lufthansa",
    "ITA Airways",
    "Turkish Airlines",
    "British Airways",
    "Air France",
  ];

  const cabinClasses = [
    "Economy",
    "Premium Economy",
    "Business",
    "First Class",
  ];

  const departureOptions = [
    { value: "early", label: "Early Morning", time: "6AM - 12PM" },
    { value: "afternoon", label: "Afternoon", time: "12PM - 6PM" },
    { value: "evening", label: "Evening", time: "6PM - 12AM" },
    { value: "night", label: "Night", time: "12AM - 6AM" },
  ];

  const availableAmenities = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "meals", label: "Premium Meals", icon: Utensils },
    { id: "entertainment", label: "Entertainment", icon: Headphones },
    { id: "priority", label: "Priority Boarding", icon: Users },
    { id: "lounge", label: "Lounge Access", icon: Coffee },
    { id: "fasttrack", label: "Fast Track Security", icon: Zap },
  ];

  const aircraftTypes = [
    "Boeing 777",
    "Airbus A380",
    "Boeing 787",
    "Airbus A350",
    "Boeing 737",
    "Airbus A320",
  ];

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const handleCabinClassToggle = (cabinClass: string) => {
    setSelectedCabinClasses((prev) =>
      prev.includes(cabinClass)
        ? prev.filter((c) => c !== cabinClass)
        : [...prev, cabinClass]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleAircraftToggle = (aircraftType: string) => {
    setAircraft((prev) =>
      prev.includes(aircraftType)
        ? prev.filter((a) => a !== aircraftType)
        : [...prev, aircraftType]
    );
  };

  const handleReset = () => {
    setPrice([1000]);
    setDuration([12]);
    setSelectedAirlines([]);
    setSelectedCabinClasses([]);
    setStops("any");
    setDepartureTime("any");
    setAmenities([]);
    setAircraft([]);
    setBaggage("any");
  };

  return (
    <aside className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Filter size={20} />
            Search Filters
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
          >
            <RotateCcw size={16} className="mr-1" />
            Reset All
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">Refine your search results</p>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Price Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <DollarSign size={16} className="text-green-600" />
            Price Range: Up to ${price[0]}
          </Label>
          <Slider
            defaultValue={[1000]}
            max={3000}
            min={200}
            step={50}
            value={price}
            onValueChange={setPrice}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$200</span>
            <span>$3000+</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Duration Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Clock size={16} className="text-blue-600" />
            Max Duration: {duration[0]} hours
          </Label>
          <Slider
            defaultValue={[12]}
            max={24}
            min={1}
            step={1}
            value={duration}
            onValueChange={setDuration}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1h</span>
            <span>24h+</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Cabin Class Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Star size={16} className="text-yellow-600" />
            Cabin Class
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {cabinClasses.map((cabinClass) => (
              <div key={cabinClass} className="flex items-center space-x-2">
                <Checkbox
                  id={cabinClass}
                  checked={selectedCabinClasses.includes(cabinClass)}
                  onCheckedChange={() => handleCabinClassToggle(cabinClass)}
                  className="border-gray-300"
                />
                <Label htmlFor={cabinClass} className="text-xs cursor-pointer">
                  {cabinClass}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Stops Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Plane size={16} className="text-blue-600" />
            Flight Stops
          </Label>
          <RadioGroup
            value={stops}
            onValueChange={setStops}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any-stops" />
              <Label htmlFor="any-stops" className="text-sm cursor-pointer">
                Any number of stops
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nonstop" id="nonstop" />
              <Label htmlFor="nonstop" className="text-sm cursor-pointer">
                Non-stop only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onestop" id="onestop" />
              <Label htmlFor="onestop" className="text-sm cursor-pointer">
                1 stop maximum
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* Departure Time Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Calendar size={16} className="text-purple-600" />
            Departure Time
          </Label>
          <RadioGroup
            value={departureTime}
            onValueChange={setDepartureTime}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="anytime" />
              <Label htmlFor="anytime" className="text-sm cursor-pointer">
                Any time
              </Label>
            </div>
            {departureOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="text-sm cursor-pointer"
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-gray-500 text-xs block">
                    {option.time}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="my-4" />

        {/* Airlines Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <MapPin size={16} className="text-red-600" />
            Airlines
          </Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {airlines.map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  id={airline}
                  checked={selectedAirlines.includes(airline)}
                  onCheckedChange={() => handleAirlineToggle(airline)}
                  className="border-gray-300"
                />
                <Label htmlFor={airline} className="text-sm cursor-pointer">
                  {airline}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Aircraft Type Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Plane size={16} className="text-indigo-600" />
            Aircraft Type
          </Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {aircraftTypes.map((aircraftType) => (
              <div key={aircraftType} className="flex items-center space-x-2">
                <Checkbox
                  id={aircraftType}
                  checked={aircraft.includes(aircraftType)}
                  onCheckedChange={() => handleAircraftToggle(aircraftType)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={aircraftType}
                  className="text-sm cursor-pointer"
                >
                  {aircraftType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Amenities Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Shield size={16} className="text-green-600" />
            Amenities & Services
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {availableAmenities.map((amenity) => {
              const IconComponent = amenity.icon;
              return (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={amenities.includes(amenity.id)}
                    onCheckedChange={() => handleAmenityToggle(amenity.id)}
                    className="border-gray-300"
                  />
                  <Label
                    htmlFor={amenity.id}
                    className="text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <IconComponent size={14} className="text-gray-600" />
                    {amenity.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Baggage Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2 text-gray-800">
            <Users size={16} className="text-orange-600" />
            Baggage Allowance
          </Label>
          <RadioGroup
            value={baggage}
            onValueChange={setBaggage}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any-baggage" />
              <Label htmlFor="any-baggage" className="text-sm cursor-pointer">
                Any allowance
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard-baggage" />
              <Label
                htmlFor="standard-baggage"
                className="text-sm cursor-pointer"
              >
                <span className="font-medium">Standard</span>
                <span className="text-gray-500 text-xs block">
                  23kg checked + 7kg carry-on
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="premium" id="premium-baggage" />
              <Label
                htmlFor="premium-baggage"
                className="text-sm cursor-pointer"
              >
                <span className="font-medium">Premium</span>
                <span className="text-gray-500 text-xs block">
                  32kg checked + 10kg carry-on
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Apply Filters Button */}
        <div className="pt-4 border-t">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]">
            <Filter size={16} className="mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
