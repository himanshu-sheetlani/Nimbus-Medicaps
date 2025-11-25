import { Suspense, lazy, useState, useEffect } from "react";
import { Container } from "@/components/global/container";
import Hero from "./components/hero";
import Feature from "./components/features";
import Pricing from "./components/pricing";
import Testinomals from "./components/testimonials";
import { Footer } from "@/components/navigation/footer";
import { Spinner } from "@/components/ui/spinner";

// Lazy load the WorldMap to improve initial load time
const WorldMap = lazy(() => import("@/components/ui/world-map"));

// Loading component for instant feedback
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center z-50">
    <Spinner />
  </div>
);

// Fallback component for WorldMap
const MapFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-950 to-zinc-900 opacity-30" />
);

const Land = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Show content immediately
    setIsLoaded(true);

    // Delay map loading to prioritize hero content
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner only for the first 500ms
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  const mapDots = [
    {
      start: { lat: 64.2008, lng: -149.4937 }, // Alaska
      end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    },
    {
      start: { lat: 64.2008, lng: -149.4937 }, // Alaska
      end: { lat: -15.7975, lng: -47.8919 }, // Brazil
    },
    {
      start: { lat: -15.7975, lng: -47.8919 }, // Brazil
      end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-x-hidden flex items-center justify-center">
      {/* Background with lazy loaded map - only visible on large screens */}
      <div className="absolute inset-0 w-full h-full z-0 hidden lg:block">
        {showMap ? (
          <Suspense fallback={<MapFallback />}>
            <WorldMap
              className="w-full h-full object-cover opacity-20"
              lineColor="#ffffff"
              dotColor="#ffffff"
              backgroundColor="transparent"
              mapColor="#27272a"
              dots={mapDots}
            />
          </Suspense>
        ) : (
          <MapFallback />
        )}
      </div>

      {/* Gradient overlay for small screens */}
      <div className="absolute inset-0 w-full h-full z-0 lg:hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* Main Content */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <Container
          delay={0}
          className="w-full flex items-center justify-center"
        >
          <main className="w-full flex flex-col items-center justify-center">
            <Hero />
            <Feature />
            <Pricing />
            <Testinomals />
            <Footer />
          </main>
        </Container>
      </div>
    </div>
  );
};

export default Land;
