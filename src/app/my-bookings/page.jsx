
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function MyBookingPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [cancellingId, setCancellingId] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    const { data: session, status } = useSession()

    const router = useRouter()

    function formatDate(date) {
        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    }

    function isPastCheckIn(checkin) {
        const today = new Date()
        const checkInDate = new Date(checkin)

        today.setHours(0, 0, 0, 0)
        checkInDate.setHours(0, 0, 0, 0)

        return checkInDate < today
    }


    async function handleCancelBooking(bookingId) {
        const confirmed = window.confirm
            ("Are you sure you want to cancel this booking?"

            )
        if (!confirmed) {
            return
        }

        setCancellingId(bookingId)

        try {
            const response = await fetch("/api/bookings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingId,
                }),
            })

            const text = await response.text()

            const data = text ? JSON.parse(text) : null

            console.log("CANCEL RESPONSE:", data)

            if (!response.ok) {
                setError(data?.message || "Failed to cancel booking")
                return
            }

            setBookings((currentBookings) =>
                currentBookings.map((booking) =>
                    booking._id.toString() === data.data._id.toString()
                        ? { ...booking, status: "cancelled" }
                        : booking
                )
            )
        } catch (error) {
            console.error("Cancel booking error:", error)
            setError("Something went wrong while cancelling your booking.")
        } finally {
            setCancellingId(null)
        }
    }

    async function handleDeleteBooking(bookingId) {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this booking?"
        )

        if (!confirmed) {
            return
        }

        setDeletingId(bookingId)

        try {
            const response = await fetch("/api/bookings", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingId,
                }),
            })

            const text = await response.text()
            const data = text ? JSON.parse(text) : null

            console.log("DELETE RESPONSE:", data)

            if (!response.ok) {
                setError(data?.message || "Failed to delete booking")
                return
            }

            setBookings((currentBookings) =>
                currentBookings.filter(
                    (booking) => booking._id.toString() !== bookingId.toString()
                ))
        } catch (error) {
            console.error("Delete booking error:", error)
            setError("Something went wrong while deleting your booking.")
        } finally {
            setDeletingId(null)
        }

    }


    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await fetch("/api/bookings")

                if (!response.ok) {
                    throw new Error("Failed to fetch bookings")
                }
                const data = await response.json()

                console.log("MY BOOKINGS:", data)

                if (response.ok) {
                    setBookings(data.data || [])
                }
            } catch (error) {
                console.error("Failed to fetch bookings:", error)
            } finally {
                setLoading(false)
            }
        }

        if (status === "authenticated") {
            fetchBookings()
        }
    }, [status])

    if (status === "unauthenticated") {
        return (
            <main className="min-h-screen bg-[var(--background)] px-6 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="font-display text-4xl text-[var(--navy)]">
                        Please log in
                    </h1>

                    <p className="mt-4 text-gray-600">
                        You need to be logged in to view your bookings.
                    </p>

                    <button
                        className="mt-8 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-medium text-[var(--white)] transition hover:bg-[var(--gold-dark)]"
                        onClick={() => router.push("/login")}>
                        Login
                    </button>
                </div>
            </main>
        )
    }

    if (status === "loading") {
        return (
            <main className="min-h-screen bg-[var(--background)] px-6 py-16">
                <div className="mx-auto max-w-6xl">
                    <p className="text-gray-500">
                        Checking your account...
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-16">
            <div className="mx-auto max-w-6xl">

                <h1 className="font-display text-4xl text-[var(--navy)]">
                    My Bookings
                </h1>

                <p className="mt-3 text-gray-600">
                    View and manage your reservations at Maré Vista.
                </p>

                <div className="mt-8">

                    {loading ? (
                        <p className="text-gray-500">
                            Loading your bookings...
                        </p>
                    ) : error ? (<p className="mt-8 text-red-600">
                        {error}
                    </p>
                    ) : bookings.length === 0 ? (
                        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-sm">
                            <h2 className="font-display text-2xl text-[var(--navy)]">
                                No bookings yet
                            </h2>

                            <p className="mt-3 text-gray-500">
                                You don't have any reservations yet.
                            </p>

                            <button
                                onClick={() => router.push("/rooms")}
                                className="mt-6 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-medium text-[var(--white)] transition hover:bg-[var(--gold-dark)]"
                            >
                                Explore Rooms
                            </button>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >

                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                                    <div>
                                        <p className="text-sm uppercase tracking-wider text-[var(--gold-dark)]">
                                            Reservation
                                        </p>

                                        <h2 className="mt-1 font-display text-2xl text-[var(--navy)]">
                                            {booking.roomName}
                                        </h2>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-4 py-2 text-sm font-medium capitalize ${booking.status === "cancelled"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-green-100 text-green-700"
                                            }`}>
                                        {booking.status}
                                    </span>

                                </div>

                                <div className="mt-6 grid gap-5 border-t border-[var(--border)] pt-6 sm:grid-cols-2 lg:grid-cols-4">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Booking Reference
                                        </p>

                                        <p className="mt-1 font-mono text-sm font-medium tracking-wide text-[var(--navy)]">
                                            {booking.bookingReference}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Check-in
                                        </p>

                                        <p className="mt-1 font-display text-lg text-[var(--navy)]">
                                            {formatDate(booking.checkin)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Check-out
                                        </p>

                                        <p className="mt-1 font-display text-lg text-[var(--navy)]">
                                            {formatDate(booking.checkout)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Nights
                                        </p>

                                        <p className="mt-1 font-medium text-[var(--navy)]">
                                            {booking.nights}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Total Amount
                                        </p>

                                        <p className="mt-1 font-display text-2xl font-semibold text-[var(--gold-dark)]">
                                            ₦{Number(booking.grandTotal).toLocaleString()}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            sessionStorage.setItem(
                                                "mare-vista-booking",
                                                JSON.stringify(booking)
                                            )

                                            router.push("/booking/confirmation")
                                        }}
                                        className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-medium text-[var(--white)] transition hover:bg-[var(--gold-dark)]"
                                    >
                                        View Details
                                    </button>

                                    {booking.status !== "cancelled" && !isPastCheckIn(booking.checkin) && (
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            disabled={cancellingId === booking._id}
                                            className="rounded-full border border-[var(--gold-dark)] px-6 py-3 text-sm font-medium text-[var(--gold-dark)] transition hover:bg-[var(--gold-dark)] hover:text-[var(--white)]"
                                        >
                                            {cancellingId === booking._id
                                                ? "Cancelling"
                                                : "Cancel Booking"}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDeleteBooking(booking._id)}
                                        disabled={deletingId === booking._id}
                                        className="rounded-full border border-red-500 px-6 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-[var(--white)]"
                                    >
                                        {deletingId === booking._id
                                            ? "Deleting..."
                                            : "Delete Booking"}
                                    </button>

                                </div>




                            </div>
                        ))
                    )}

                    <Link
                        href="/"
                    >
                        <p className="py-10 text-sm text-black ml-4 underline hover:text-gray-500">
                            Back to home
                        </p>
                    </Link>

                </div>

            </div>
        </main>
    )
}
