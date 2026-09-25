"use client";

import { useState } from "react";
import { Users, Maximize } from "lucide-react";
import { useRouter } from "next/navigation";


export default function BookingSection({ room }) {
    const [checkin, setCheckin] = useState("")
    const [checkout, setCheckout] = useState("")

    const router = useRouter()

    // const roomBookings = bookings.filter(
    //     (booking) => booking.roomId === room.id
    // )

    async function handleCheckAvailability() {
        if (!checkin || !checkout) {
            alert("Please select your checkin and checkout dates")
            return
        }

        if (new Date(checkout) <= new Date(checkin)) {
            alert("Checkout date must be after checkin date")
            return
        }

        const response = await fetch(
            `/api/rooms/availability?roomId=${room.id}&checkin=${checkin}&checkout=${checkout}`
        )

        const data = await response.json()

        if (!data.available) {
            alert("Sorry, this room is not available for the selected dates.")
            return
        }

        router.push(
            `/booking?roomId=${room.id}&checkin=${checkin}&checkout=${checkout}`
        )

    }

    return (
        <section className="px-6 py-12 md:px-10 md:py-16">
            <div className="mx-auto max-w-5xl ">
                <div className="grid grid-cols-2 gap-4 max-w-7xl shadow-xl py-8 px-4">
                    <div className="flex items-center gap-3">
                        <Users
                            size={23}
                            strokeWidth={2.5}
                            className="text-[var(--gold-dark)]" />
                        <p className="text-sm text-[var(--rough)]">Adults: </p>
                        <p className="font-medium text-[var(--navy)]">{room.guests}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Maximize
                            size={23}
                            strokeWidth={2.5}
                            className="text-[var(--gold-dark)]" />
                        <p className="text-sm text-[var(--rough)]">Size: </p>
                        <p className="font-medium text-[var(--navy)]">{room.size} ft²</p>
                    </div>

                </div>

                <div className="mt-10 flex text-center flex-col shadow-xl">
                    <p className="text-sm text-[var(--rough)]">
                        Price starts at
                    </p>

                    <p className="text-2xl font-medium text-[var--navy)] py-5">
                        N{room.price.toLocaleString()} / per night
                    </p>
                </div>

                <div className="mt-20 bg-[var(--cloud)] py-8 px-8 grid gap-6 md:grid-cols-1">
                    <div>
                        <label className="mb-2 block text-sm text-[var(--rough)]">
                            Check-in Date
                        </label>

                        <input
                            type="date"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)}
                            className="w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 mt-6 block text-sm text-[var(--rough)]">
                            Check-out Date
                        </label>

                        <input
                            type="date"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                            className="w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                        />
                    </div>
                </div>



                <button
                    type="button"
                    onClick={handleCheckAvailability}
                    className="mt-8 w-full bg-[var(--navy)] px-6 py-4 text-sm font-medium uppercase tracking-wider text-[var(--white)] transition hover:bg-[var(--gold-dark)]">
                    Check Availability
                </button>

            </div>
        </section>
    )
}