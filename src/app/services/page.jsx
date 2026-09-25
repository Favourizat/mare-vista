
import ServicesHero from "@/components/ServicesHero/ServicesHero";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import services from "@/data/services";
import rooms from "@/data/rooms";
import Link from "next/link";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import RoomCard from "@/components/RoomCard/RoomCard";

import {
    Wind,
    Car,
    Wifi,
    Waves,
    Tv,
    Sparkles,
} from "lucide-react";



const amenities = [
    {
        id: 1,
        name: "Air Conditioning",
        icon: Wind,
    },
    {
        id: 2,
        name: "Parking",
        icon: Car,
    },
    {
        id: 3,
        name: "Free Wi-Fi",
        icon: Wifi,
    },
    {
        id: 4,
        name: "Private Pool",
        icon: Waves,
    },
    {
        id: 5,
        name: "Smart TV",
        icon: Tv,
    },
    {
        id: 6,
        name: "Breakfast",
        icon: Sparkles,
    },
];

export default function ServicePage() {
    return (
        <main>
            <ServicesHero />

            <div className="px-6 py-10 md:py-10 lg:py-35 mb-15">
                <div className="mx-auto max-w-7xl">

                    {/* Services Grid */}
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => {
                            console.log(service.name, service.image)

                            return (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            )
                        })}
                    </div>

                    {/* Room Amenities */}

                    <div className="mx-auto py-28 px-10 bg-[var(--rough-light)]">

                        <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--gold-dark)]">
                            Additional Services
                        </h3>

                        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-[var(--navy)] md:text-4xl lg:text-5xl">
                            What We Offer For You
                        </h2>


                        <div
                            className="grid mx-6 my-8 gap-6 grid-cols-2 md:grid-cols-3">
                            {amenities.slice(0, 6).map((amenity) => {

                                const Icon = amenity.icon;

                                return (
                                    <div
                                        key={amenity.id}
                                        className="flex min-h-32 flex-col items-center justify-center bg-[var(--white)] px-4 py-6 text-center shadow-xl"
                                    >

                                        <Icon
                                            size={28}
                                            strokeWidth={1.5}
                                            className="text-[var(--gold)]"
                                        />

                                        <span className="mt-4 text-sm text-[var(--rough)]">
                                            {amenity.name}
                                        </span>

                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    <div className="px-6 py-6 md:py-8">
                        {/* Section Heading */}
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                                Stay With Us
                            </p>

                            <h2 className="font-display text-3xl leading-tight text-[var(--navy)] md:text-4xl lg:text-5xl">
                                Our Luxurious Resort & Accommodation
                            </h2>

                            <div className="mx-auto mt-5 h-px w-16 bg-[var(--gold)]"></div>

                            <h3 className="mt-5 text-lg font-medium tracking-wide text-[var(--rough)] md:text-xl">
                                Rooms / Suites
                            </h3>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--rough)]/70 md:text-base">
                                Discover thoughtfully designed rooms and suites created for
                                comfort, tranquility, and an unforgettable stay.
                            </p>
                        </div>

                        {/* Room Cards */}
                        <div className="mx-auto mt-12 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {rooms.slice(0, 3).map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-end">
                            <Link
                                href="/rooms"
                                className="border border-[var(--navy)] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--navy)] transition-colors hover:bg-[var(--navy)] hover:text-[var(--white)]"
                            >
                                View All Rooms
                            </Link>
                        </div>
                    </div>

                    <HomeVideo />

                </div>

            </div>
        </main>
    )
}