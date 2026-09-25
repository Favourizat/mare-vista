
import rooms from "@/data/rooms";
import Image from "next/image";
import Link from "next/link";
import services from "@/data/services";
import RoomCard from "@/components/RoomCard/RoomCard";
import ServiceCard from "@/components/ServiceCard/ServiceCard";

import BookingSection from "@/components/BookingSection/BookingSection";

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


export default async function RoomDetailsPage({ params }) {

    const { roomSlug } = await params;

    const room = rooms.find((item) => item.roomSlug === roomSlug);

    if (!room) {
        return <div>Room not found</div>;
    }

    const relatedRooms = rooms.filter(
        (item) =>
            item.category === room.category &&
            item.roomSlug !== roomSlug

    )

    return (
        <main>

            {/* Hero */}
            <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
                <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-[var(--navy)]/55" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

                    <h1 className="capitalize font-display text-4xl text-[var(--white)] md:text-5xl lg:text-6xl">
                        {room.roomSlug
                            .replaceAll("-", " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-sm">

                        <Link
                            className="text-[var(--white)] transition-colors duration-300 hover:text-[var(--gold)]"
                            href="/"
                        >
                            Home
                        </Link>

                        <span className="text-[var(--pale)]">
                            &gt;
                        </span>

                        <Link
                            href="/rooms"
                            className="cursor-pointer text-[var(--white)] transition-colors duration-300 hover:text-[var(--gold)]">
                            Rooms
                        </Link>

                        <span className="text-[var(--pale)]">
                            &gt;
                        </span>

                        <span className="capitalize text-[var(--gold)]">
                            {room.roomSlug
                                .replaceAll("-", " ")
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </span>

                    </div>
                </div>
            </section>


            {/* Room Details */}
            <section className="px-6 py-20 md:py-28">

                <div className="mx-auto max-w-7xl">

                    {/* Main Content + Sidebar */}
                    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

                        {/* Left Column */}
                        <div>

                            {/* Main Image */}
                            <div className="group relative aspect-[16/10] overflow-hidden">
                                <Image
                                    src={room.image}
                                    alt={room.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    sizes="(max-width: 1024px) 100vw, 65vw"
                                />
                            </div>


                            {/* Image Gallery */}
                            <div className="mt-4 grid grid-cols-4 gap-4">

                                {room.images.map((image) => (
                                    <div
                                        key={image}
                                        className="group relative aspect-[4/3] overflow-hidden"
                                    >
                                        <Image
                                            src={image}
                                            alt={room.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            sizes="(max-width: 760px) 25vw, 15vw"
                                        />
                                    </div>
                                ))}

                            </div>


                            {/* Description */}
                            <h3 className="mt-12 font-display text-3xl font-bold text-[var(--navy)] md:text-4xl">
                                Mare Vista luxury room experience
                            </h3>

                            <div className="mt-6 max-w-3xl space-y-5 text-[var(--rough)]">

                                <p className="text-base leading-8">
                                    {room.description}
                                </p>

                            </div>


                            {/* Amenities */}
                            <h2 className="mt-14 font-display text-3xl font-bold text-[var(--navy)] md:text-4xl">
                                Room Amenities
                            </h2>

                            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">

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


                            {/* Around The Hotel */}
                            <div>

                                <h2 className="mt-14 font-display text-3xl font-bold text-[var(--navy)] md:text-4xl">
                                    Around the hotel
                                </h2>

                                <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">

                                    {services.slice(0, 3).map((service) => (
                                        <ServiceCard
                                            service={service}
                                            key={service.id}

                                        />
                                    ))}

                                </div>

                            </div>

                        </div>


                        {/* Right Column */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <BookingSection room={room} />
                        </div>

                    </div>


                    {/* Related Rooms - Full Width */}
                    <div className="mt-20">

                        <h2 className="font-display text-3xl font-bold text-[var(--navy)] md:text-4xl">
                            Related Rooms
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">

                            {relatedRooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                />
                            ))}

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}
