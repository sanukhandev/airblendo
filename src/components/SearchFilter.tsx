"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FlightFilterSidebar() {
  const [price, setPrice] = useState([300]);
  const [duration, setDuration] = useState<string[]>([3]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [stops, setStops] = useState("any");

  const airlines = ["Emirates", "Qatar Airways", "Etihad", "Lufthansa"];

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const handleReset = () => {
    setPrice([300]);
    setDuration(["3"]);
    setSelectedAirlines([]);
    setStops("any");
  };

  return (
    <aside className="w-full p-4 border rounded-sm bg-gray-100 space-y-6 shadow">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Price Filter */}
      <div>
        <Label className="text-sm font-medium">Max Price: ${price[0]}</Label>
        <Slider
          defaultValue={[300]}
          max={1000}
          step={50}
          value={price}
          onValueChange={setPrice}
        />
      </div>
      <div>
        <Label className="text-sm font-medium">
          Duration: {duration} hours
        </Label>
        <Slider
          defaultValue={[3]}
          max={12}
          step={1}
          value={duration.map(Number)}
          onValueChange={(val) => setDuration(val.map(String))}
        />
      </div>

      {/* Airline Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Airlines</Label>
        {airlines.map((airline) => (
          <div key={airline} className="flex items-center gap-2 ">
            <Checkbox
              id={airline}
              checked={selectedAirlines.includes(airline)}
              onCheckedChange={() => handleAirlineToggle(airline)}
              className="border border-black"
            />
            <label htmlFor={airline} className="text-sm">
              {airline}
            </label>
          </div>
        ))}
      </div>

      {/* Stops Filter */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Stops</Label>
        <RadioGroup value={stops} onValueChange={setStops}>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="any"
              id="any"
              className="border border-black"
            />
            <label htmlFor="any" className="text-sm">
              Any
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="direct"
              id="direct"
              className="border border-black"
            />
            <label htmlFor="direct" className="text-sm">
              Direct Flights
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="1stop"
              id="1stop"
              className="border border-black"
            />
            <label htmlFor="1stop" className="text-sm">
              1 Stop
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </aside>
  );
}
