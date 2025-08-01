"use client";

import { useState } from "react";
import { Filter, ChevronDown, X } from "lucide-react";

// interface MobileFilterProps {
//   onFilterChange: (filters: FilterState) => void;
// }

interface FilterState {
  duration: string;
  priceRange: string;
  airline: string;
  stops: string;
}

export default function MobileFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    duration: "",
    priceRange: "",
    airline: "",
    stops: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    // onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      duration: "",
      priceRange: "",
      airline: "",
      stops: "",
    };
    setFilters(clearedFilters);
    // onFilterChange(clearedFilters); 
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== ""
  ).length;

  return (
    <div className="md:hidden relative">
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-700 font-medium w-full"
        >
          <Filter size={20} />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-auto">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filter Flights</h3>
            <button
              onClick={clearFilters}
              className="text-blue-600 text-sm hover:text-blue-800"
            >
              Clear all
            </button>
          </div>

          {/* Duration Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Any Duration</option>
              <option value="short">Short (0-3h)</option>
              <option value="medium">Medium (3-6h)</option>
              <option value="long">Long (6h+)</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Any Price</option>
              <option value="low">Under $300</option>
              <option value="medium">$300 - $600</option>
              <option value="high">Over $600</option>
            </select>
          </div>

          {/* Airline Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Airline
            </label>
            <select
              value={filters.airline}
              onChange={(e) => handleFilterChange("airline", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Airlines</option>
              <option value="emirates">Emirates</option>
              <option value="etihad">Etihad</option>
              <option value="qatar">Qatar Airways</option>
              <option value="ita">ITA Airways</option>
              <option value="lufthansa">Lufthansa</option>
            </select>
          </div>

          {/* Stops Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stops
            </label>
            <select
              value={filters.stops}
              onChange={(e) => handleFilterChange("stops", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Any Stops</option>
              <option value="direct">Direct Only</option>
              <option value="one-stop">1 Stop</option>
              <option value="multiple">Multiple Stops</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.duration && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-2 rounded-full flex items-center gap-2">
              Duration: {filters.duration}
              <button
                onClick={() => handleFilterChange("duration", "")}
                className="hover:bg-blue-200 rounded-full p-1"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {filters.priceRange && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-2 rounded-full flex items-center gap-2">
              Price: {filters.priceRange}
              <button
                onClick={() => handleFilterChange("priceRange", "")}
                className="hover:bg-blue-200 rounded-full p-1"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {filters.airline && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-2 rounded-full flex items-center gap-2">
              Airline: {filters.airline}
              <button
                onClick={() => handleFilterChange("airline", "")}
                className="hover:bg-blue-200 rounded-full p-1"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {filters.stops && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-2 rounded-full flex items-center gap-2">
              Stops: {filters.stops}
              <button
                onClick={() => handleFilterChange("stops", "")}
                className="hover:bg-blue-200 rounded-full p-1"
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
