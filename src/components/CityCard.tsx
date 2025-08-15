import React from "react";
import { places } from "../../public/datasets/places";

const CityCard = () => {
  return (
    <div className="w-full max-w-full">
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-4 pb-4 w-full">
        {places.map((place) => (
          <div
            key={place.id}
            className="scroll w-[200px] h-[250px] md:w-[275px] md:h-[300px] p-3 rounded-xl flex items-end justify-center text-lg font-semibold shrink-0 relative overflow-hidden"
            style={{
              backgroundImage: `url(${place.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 via-gray-100/10 to-black"></div>
            <h3 className="text-white/30 font-bold text-4xl uppercase relative z-10">
              {place.city_name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityCard;
