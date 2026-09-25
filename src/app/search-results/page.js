"use client"

import { useSearchParams } from "next/navigation"
import SearchResultsHero from "@/components/SearchResultsHero/SearchResultsHero"
import rooms from "@/data/rooms"
import Link from "next/link"
import { useState, Suspense, useEffect } from "react"

function SearchResultsContent() {
    const searchParams = useSearchParams()

    const checkin = searchParams.get("checkin")
    const checkout = searchParams.get("checkout")
    const guests = searchParams.get("guests")

    const [availability, setAvailability] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkAvailability() {
            if (!checkin || !checkout) {
                return
            }

            const results = await Promise.all(
                rooms.map(async (room) => {
                    const response = await fetch(
                        `/api/rooms/availability?roomId=${room.id}&checkin=${checkin}&checkout=${checkout}`
                    )

                    const data = await response.json()

                    return {
                        roomId: room.id,
                        available: data.available,
                    }
                })
            )

            console.log("AVAILABILITY RESULTS:", results)

            const availabilityMap = {}

            results.forEach((result) => {
                availabilityMap[result.roomId] = result.available
            })

            setAvailability(availabilityMap)
            setLoading(false)
        }

        checkAvailability()
    }, [checkin, checkout])


    const formatDate = (date) => {
        if (!date) return ""

        const [year, month, day] = date.split("-")

        return new Date(year, month - 1, day).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    const calculateNights = (checkin, checkout) => {
        if (!checkin || !checkout) return 0

        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)

        const difference = checkoutDate - checkinDate

        return difference / (1000 * 60 * 60 * 24)
    }


    // const isRoomBooked = (roomId, checkin, checkout) => {
    //     return bookings.some((booking) => {
    //         if (booking.roomId !== roomId) {
    //             return false
    //         }

    //         if (booking.status === "cancelled") {
    //             return false
    //         }
    //         return (
    //             checkin < booking.checkout &&
    //             checkout > booking.checkin
    //         )
    //     })
    // }
    // console.log(
    //     "Room 1 booked:",
    //     isRoomBooked(1, checkin, checkout)
    // )

    const nights = calculateNights(checkin, checkout)
    console.log("Nights:", nights)



    const formattedCheckin = formatDate(checkin)

    // This is the heart of the Filtering Logic
    const availableRooms = rooms.filter(
        (room) => room.guests >= Number(guests) &&
            // !isRoomBooked(room.id, checkin, checkout)
            availability[room.id] === true
    )
    console.log("AVAILABLE ROOMS:", availableRooms)

    const roomsWithTotal = availableRooms.map((room) => ({
        ...room,
        totalPrice: room.price * nights,
    }))




    return (
        <main>
            <SearchResultsHero />

            <section className="px-6 py-12 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="font-display text-2xl font-semibold text-[var(--navy)] md:text-3xl">
                        {roomsWithTotal.length} recommendation
                        {roomsWithTotal.length !== 1 ? "s" : ""} from {formattedCheckin}
                    </h2>



                    <div className="mt-8 space-y-4">
                        {loading ? (
                            <p className="mb-4 text-sm text-[var(--rough)]">
                                Checking room availability...
                            </p>
                        ) : roomsWithTotal.length === 0 ? (
                        <p className="text-sm text-[var(--rough)] ">
                            No rooms available for your selected dates.
                        </p>
                        ) : (
                            roomsWithTotal.map((room) => (
                        <div
                            key={room.id}
                            className="border border-[var(--border)] bg-[var(--white)] p-6 md:p-8"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <h4 className="font-display text-xl font-semibold text-[var(--navy)]">
                                        <Link
                                            className="underline transition-colors duration-300 hover:text-[var(--gold)]"
                                            href={`/rooms/${room.roomSlug}`}
                                        >
                                            {room.name}
                                        </Link>
                                    </h4>

                                    <p className="mt-2 text-sm text-[var(--rough)]">
                                        MaxOccupancy: {room.guests}{""} adult
                                        {room.guests > 1 ? "s" : ""}
                                    </p>
                                </div>

                                <p className="shrink-0 text-lg font-semibold text-[var(--navy)]">
                                    N{room.price.toLocaleString()}
                                </p>
                            </div>

                            <div className="my-6 border-t border-[var(--border)]" />

                            <div className="flex justify-end">
                                <Link
                                    href={`/booking?roomId=${room.id}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`}
                                    className="bg-[var(--navy)] px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[var(--white)] transition-colors duration-300 hover:bg-[var(--gold-dark)]">
                                    Reserve
                                </Link>
                            </div>

                        </div>
                        ))
                        )}
                    </div>

                </div>
            </section>
        </main>
    )
}


export default function SearchResultsPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center">
                    <p className="text-[var(--navy)]">
                        Loading search results...
                    </p>
                </main>
            }
        >
            <SearchResultsContent />
        </Suspense>
    )
}