
"use client"

import BookingSearch from "@/components/BookingSearch/BookingSearch";
import RoomFilters from "@/components/RoomFilters/RoomFilters";
import RoomsHero from "@/components/RoomsHero/RoomsHero";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

    function RoomsPageContent() {
    const searchParams = useSearchParams()

    const checkin = searchParams.get("checkin")
    const checkout = searchParams.get("checkout")
    const guests = searchParams.get("guests")
    
    return (
        <main>
            
            <RoomsHero />
            <BookingSearch />

            {/* <div className="mx-auto mt-6 max-w-7xl px-6">
                <div className="border border-[var(--border)] bg-[var(--white)] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                        Your Search
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">

                        <div>
                            <p className="text-sm text-gray-500">
                                Checkin
                            </p>
                            <p className="mt-1 font-medium text-[var(--navy)]">
                                {checkin}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Checkout
                            </p>
                            <p className="mt-1 font-medium text-[var(--navy)]">
                                {checkout}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Guests
                            </p>
                            <p className="mt-1 font-medium text-[var(--navy)]">
                                {guests}
                            </p>
                        </div>

                    </div>

                </div>
            </div> */}
                
            <RoomFilters />
        </main>
    )
}

export default function RoomsPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center">
                    <p className="text-[var(--navy)]">
                        Loading rooms...
                    </p>
                </main>
            }
        >
            <RoomsPageContent />
        </Suspense>
    )
}