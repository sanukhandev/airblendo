// app/flights/search/page.tsx
import FlightCard from "../../../components/FlightCard";
import SearchHeader from "../../../components/SearchHeader";
import SearchFilter from "../../../components/SearchFilter";
import MobileFilter from "../../../components/MobileFilter";
type Props = {
  searchParams: Promise<{
    from?: string;
    to?: string;
    depart?: string;
    return?: string;
  }>;
};

export default async function SearchResults({ searchParams }: Props) {
  const { from, to, depart, return: ret } = await searchParams;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SearchHeader from={from} to={to} depart={depart} returnDate={ret} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block sticky top-6">
              <SearchFilter />
            </div>
            <div className="lg:hidden mb-4">
              <MobileFilter />
            </div>
          </div>

          {/* Main Content - Flight Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {from && to ? (
                  <>
                    Flights from <span className="text-blue-900">{from}</span>{" "}
                    to <span className="text-blue-900">{to}</span>
                  </>
                ) : (
                  "Flight Search Results"
                )}
              </h1>
              {depart && (
                <p className="text-gray-600">
                  Departing{" "}
                  {new Date(depart).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {ret &&
                    ` • Returning ${new Date(ret).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                </p>
              )}
            </div>
            <FlightCard />
          </div>
        </div>
      </div>
    </div>
  );
}
