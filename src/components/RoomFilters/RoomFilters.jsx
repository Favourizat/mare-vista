"use client"

import { useState } from "react"
import rooms from "@/data/rooms"
import RoomCard from "../RoomCard/RoomCard"


export default function RoomFilters() {

    const [selectedCategory, setSelectedCategory] = useState("All Rooms")


    const filteredRooms =
        selectedCategory === "All Rooms"
            ? rooms
            : rooms.filter((room) => room.slug === selectedCategory)

    const categories = [
        { label: "All Rooms", value: "All Rooms" },
        { label: "Economy", value: "economy" },
        { label: "Luxe", value: "luxe" },
        { label: "Standard", value: "standard" },
    ];

    return (
        <section className="px-4 py-28">
            <div className="flex flex-wrap items-center justify-center gap-5">
                {/* <button
                    type="button"
                    className="px-5 py-2 text-sm tracking-wide px-10 py-3 bg-[var(--navy)] text-[var(--white)]"
                    onClick={() => setSelectedCategory("All Rooms")}>
                    All rooms
                </button>
                <button
                    type="button"
                    className="px-5 py-2 text-sm tracking-wide px-10 py-3 bg-[var(--navy)] text-[var(--white)]"
                    onClick={() => setSelectedCategory("economy")}
                >
                    Economy
                </button>
                <button
                    type="button"
                    className="px-5 py-2 text-sm tracking-wide px-10 py-3 bg-[var(--navy)] text-[var(--white)]"
                    onClick={() => setSelectedCategory("luxe")}
                >
                    Luxe
                </button>
                <button
                    type="button"
                    className="px-5 py-2 text-sm tracking-wide px-10 py-3 bg-[var(--navy)] text-[var(--white)]"
                    onClick={() => setSelectedCategory("standard")}
                >
                    Standard
                </button> */}

                {categories.map((category) => (
                    <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`px-8 py-4 text-sm tracking-wide transition-colors duration-300 hover:cursor-pointer ${selectedCategory === category.value
                                ? "bg-[var(--navy)] text-[var(--white)]"
                                : "bg-[var(--pale)] text-[var(--navy)]"
                            }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <div>
                <div className="mx-auto mt-15 grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room} />
                    ))}
                </div>

            </div>
        </section>
    )
}