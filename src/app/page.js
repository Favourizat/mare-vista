import BookingSearch from "@/components/BookingSearch/BookingSearch";
import FeaturedRooms from "@/components/FeaturedRooms/FeaturedRooms";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import Services from "@/components/Services/Services";
import Stats from "@/components/Stats/Stats";
import WelcomePage from "@/components/Welcome/Welcome";

export default function Home() {
  return (
    <main className="mb-28">
      <Hero />
      <BookingSearch />
      <WelcomePage />
      <Stats />
      <Gallery />
      <FeaturedRooms />
      <Services />
      <HomeVideo />
    </main>
  );
}