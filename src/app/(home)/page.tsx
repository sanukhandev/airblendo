"use client";
import { useState } from "react";
import Search from "@/components/Search";
import CityCard from "@/components/CityCard";
import SectionCard from "@/components/SectionCard";
import { CreditCard, HandCoins, PlaneTakeoff, Hotel } from "lucide-react";
import Image from "next/image";
import Book from "../../../public/images/bg-image.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "../../../public/datasets/places";
import { flights } from "../../../public/datasets/places";

export default function Home() {
  const [selected, setSelected] = useState("Flights");

  return (
    <div className="mx-auto">
      <div className="home-page">
        <div className="h-full ]md:py-15 py-5 gap-5 flex flex-col justify-center">
          <>
            {/* <div className="p-5 text-white text-center rounded-xl">
              <h1 className="text-2xl hidden md:block md:text-4xl font-semibold">
                Explore somewhere interesting
              </h1>
            </div> */}

            <div className="md:block text-center ">
              <div className="glass-card inline-block items-center bg-muted py-4 px-2 rounded-full shadow-inner gap-4 mb-5">
                {Menu.map((option) => (
                  <Link
                    href={option.link}
                    key={option.id}
                    onClick={() => setSelected(option.name)}
                    className={cn(
                      "px-5 py-3 rounded-full text-sm  font-medium transition mx-2",
                      selected === option.name
                        ? "bg-blue-900 text-white shadow"
                        : "text-muted-foreground hover:bg-white/50"
                    )}
                  >
                    {option.name}
                  </Link>
                ))}
              </div>
              <Search />
            </div>
          </>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-3 container mx-auto items-center justify-center">
        <h1 className="col-span-1 text-3xl font-bold text-blue-900 text-center">
          Our Partners
        </h1>
        <div className="col-span-2 flex gap-15 text-center">
          {flights.map((flight) => (
            <Image
              src={flight.image}
              key={flight.id}
              alt={`${flight.airline} logo`}
              width={75}
              height={75}
              className="object-contain"
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto mt-24 px-5 md:p-0 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-blue-900 text-center">
          Top Destinations
        </h1>
        <p className="mt-4 text-base text-center text-gray-700">
          Much places suits your mood. Explore somewhere interesting and enjoy
          the vibes!
        </p>
        <div className="mt-8 w-full">
          <CityCard />
        </div>
      </div>
      <div className="container mx-auto mt-24 flex flex-col items-center px-10 md:px-0">
        <h1 className="text-5xl text-center text-blue-900 font-semibold">
          Why book with us
        </h1>

        <div className="mt-8 grid lg:grid-cols-4 grid-cols-2 gap-5">
          <>
            <SectionCard
              cardIcon={<CreditCard size={25} />}
              cardName="Pay in Installments"
            />
          </>
          <>
            {" "}
            <SectionCard
              cardIcon={<HandCoins size={25} />}
              cardName="Secure Payment"
            />
          </>
          <>
            <SectionCard
              cardIcon={<PlaneTakeoff size={25} />}
              cardName="Over 200 Airlines"
            />
          </>
          <>
            {" "}
            <SectionCard
              cardIcon={<Hotel size={25} />}
              cardName="Hotels worldwides"
            />
          </>{" "}
        </div>
      </div>
      <div className="mt-24 container bg-gray-100 mx-auto grid md:grid-cols-2 grid-cols-1 rounded-lg py-10 md:py-0 px-10 md:px-0">
        <Image src={Book} alt="booking" className="rounded-l-lg" />
        <span className="flex flex-col md:items-start items-center justify-center px-5">
          <h1 className="text-5xl text-center font-semibold mt-3">
            Plan your next Vacation
          </h1>
          <p className="mt-4 text-center">
            Choose from our 1000+ Destinations. Enjoy hustle free vacation
          </p>
          <Button className="pointer mt-4"> Book Now</Button>
        </span>
      </div>
    </div>
  );
}
