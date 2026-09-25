
"use client"

import { CalendarDays, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function BookingSearch() {
    const [checkin, setCheckin] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [guests, setGuests] = useState(2)

    const router = useRouter()

    function handleSearch(e) {
        e.preventDefault()

        if (!checkin || !checkOut) {
            alert("Please select check-in and check-out dates")
            return
        }

        if (checkOut <= checkin) {
            alert("Check-out date must be after check-in date")
            return
        }

        router.push(
            `/search-results?checkin=${checkin}&checkout=${checkOut}&guests=${guests}`
        )
    }

    return (
        <section className="relative z-20 -mt-10 px-6">
            <div className="mx-auto w-full max-w-6xl border border-[var(--border)] bg-[var(--white)] shadow-xl">

                <form
                    onSubmit={handleSearch}
                    className="grid md:grid-cols-4"
                >

                    {/* Check In */}
                    <div className="border-b border-[var(--border)] p-6 md:border-b-0 md:border-r">
                        <label
                            htmlFor="check-in"
                            className="mb-3 block text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-dark)]"
                        >
                            Check In
                        </label>

                        <div className="flex items-center gap-3">
                            <CalendarDays
                                size={19}
                                strokeWidth={1.5}
                                className="shrink-0 text-[var(--gold)]"
                            />

                            <input
                                id="check-in"
                                type="date"
                                value={checkin}
                                onChange={(event) => setCheckin(event.target.value)}
                                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--navy)] outline-none"
                            />
                        </div>
                    </div>

                    {/* Check Out */}
                    <div className="border-b border-[var(--border)] p-6 md:border-b-0 md:border-r">
                        <label
                            htmlFor="checkout"
                            className="mb-3 block text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-dark)]"
                        >
                            Check Out
                        </label>

                        <div className="flex items-center gap-3">
                            <CalendarDays
                                size={19}
                                strokeWidth={1.5}
                                className="shrink-0 text-[var(--gold)]"
                            />

                            <input
                                id="checkout"
                                type="date"
                                value={checkOut}
                                onChange={(event) => setCheckOut(event.target.value)}
                                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--navy)] outline-none"
                            />
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="border-b border-[var(--border)] p-6 md:border-b-0 md:border-r">
                        <label
                            htmlFor="guests"
                            className="mb-3 block text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-dark)]"
                        >
                            Guests
                        </label>

                        <div className="flex items-center gap-3">
                            <Users
                                size={19}
                                strokeWidth={1.5}
                                className="shrink-0 text-[var(--gold)]"
                            />

                            <select
                                id="guests"
                                value={guests}
                                onChange={(event) =>
                                    setGuests(Number(event.target.value))
                                }
                                className="w-full bg-transparent text-sm text-[var(--navy)] outline-none"
                            >
                                <option value={1}>1 Guest</option>
                                <option value={2}>2 Guests</option>
                                <option value={3}>3 Guests</option>
                                <option value={4}>4 Guests</option>
                                <option value={5}>5 Guests</option>
                                <option value={6}>6 Guests</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="p-4">
                        <button
                            type="submit"
                            className="h-full min-h-16 w-full bg-[var(--navy)] px-6 text-sm font-medium uppercase tracking-[0.2em] text-[var(--white)] transition-colors hover:cursor-pointer hover:bg-[var(--gold)] hover:text-[var(--navy)]"
                        >
                            Search Rooms
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}
