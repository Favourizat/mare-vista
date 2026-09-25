"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function BookingConfirmationPage() {
    const [booking, setBooking] = useState(null)

    useEffect(() => {

        const savedBooking = sessionStorage.getItem("mare-vista-booking")


        if (savedBooking) {
            const bookingData = JSON.parse(savedBooking)

            setBooking(bookingData)
        }
    }, [])

    console.log("Booking State:", booking)

    const formatDate = (date) => {
        if (!date) return ""

        const [year, month, day] = date.split("-")

        return new Date(year, month - 1, day).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    const formattedCheckin = formatDate(booking?.checkin)
    const formattedCheckout = formatDate(booking?.checkout)

    const formattedBookingDate = booking?.bookingDate
        ? new Date(booking.bookingDate).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : ""

    const formattedPaymentDate = booking?.paymentDate
        ? new Date(booking.paymentDate).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : ""

    return (
        <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
            <div className="mx-auto max-w-5xl">

                {!booking ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <p className="text-sm text-gray-500">
                            Loading booking details...
                        </p>

                        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                            We couldn't find a recent booking. Please return to the
                            booking page and complete your reservation.
                        </p>

                        <Link
                            href="/booking"
                            className="mt-6 bg-[var(--navy)] px-6 py-3 text-sm font-medium text-[var(--white)] transition hover:bg-[var(--rough)]"
                        >
                            Make a Booking
                        </Link>
                    </div>
                ) : (
                    <div className="bg-[var(--white)] p-5 sm:p-7 md:p-10">

                        {/* Header */}
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)] sm:text-sm">
                                Booking Confirmed
                            </p>

                            <h1 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--navy)] sm:text-3xl md:text-4xl">
                                Your Reservation is confirmed!
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                                Thank you, {booking.fullName}. Your stay at Mare Vista
                                has been successfully confirmed.
                            </p>
                        </div>


                        {/* Booking Details */}
                        <div className="mt-8 border-t border-[var(--border)] pt-6">
                            <h2 className="font-display text-2xl font-semibold text-[var(--navy)] md:text-3xl">
                                Booking Details
                            </h2>

                            <div className="mt-6 grid grid-cols-1 border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">

                                {/* Booking */}
                                <div className="border-b border-[var(--border)] p-5 sm:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Booking
                                    </p>

                                    <p className="mt-2 break-all font-medium text-[var(--navy)]">
                                        {booking.bookingReference}
                                    </p>
                                </div>

                                {/* Check-in */}
                                <div className="border-b border-[var(--border)] p-5 lg:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Check-in
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--navy)]">
                                        {formattedCheckin}
                                    </p>
                                </div>

                                {/* Check-out */}
                                <div className="border-b border-[var(--border)] p-5 sm:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Check-out
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--navy)]">
                                        {formattedCheckout}
                                    </p>
                                </div>

                                {/* Total */}
                                <div className="border-b border-[var(--border)] p-5 lg:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Total
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                        ₦{booking.grandTotal.toLocaleString()}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="p-5">
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                        Confirmed
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* Payment Details */}
                        <div className="mt-8 border-t border-[var(--border)] pt-6">
                            <h2 className="font-display text-2xl font-semibold text-[var(--navy)] md:text-3xl">
                                Payment Details
                            </h2>

                            <div className="mt-6 grid grid-cols-1 border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">

                                {/* Payment Reference */}
                                {/* Payment Reference */}
                                <div className="border-b border-[var(--border)] p-5 sm:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Payment Reference
                                    </p>

                                    <p className="mt-2 break-all font-medium text-[var(--navy)]">
                                        {booking.paymentReference || "N/A"}
                                    </p>
                                </div>

                                {/* Payment Date */}
                                <div className="border-b border-[var(--border)] p-5 lg:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Date
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--navy)]">
                                        {formattedPaymentDate}
                                    </p>
                                </div>

                                {/* Payment Method */}
                                <div className="border-b border-[var(--border)] p-5 sm:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Payment Method
                                    </p>

                                    <p className="mt-2 break-words font-medium text-[var(--navy)]">
                                        {booking.paymentMethod}
                                    </p>


                                </div>

                                {/* Amount */}
                                <div className="border-b border-[var(--border)] p-5 lg:border-r lg:border-b-0">
                                    <p className="text-sm text-gray-500">
                                        Amount
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                        ₦{booking.grandTotal.toLocaleString()}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="p-5">
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>

                                    <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                        On-hold
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* Actions */}
                        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/"
                            >
                                <p className="text-sm text-black ml-4 underline hover:text-gray-500">
                                    Back to home
                                </p>
                            </Link>

                            <Link
                                href="/my-bookings"
                                className="text-sm text-black hover:text-gray-500 ml-4 underline"
                            >
                                My bookings
                            </Link>
                        </div>

                    </div>
                )}

            </div>
        </main>
    )
}