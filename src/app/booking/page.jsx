"use client"

import rooms from "@/data/rooms";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import hotelServices from "@/data/hotelServices"

    function BookingPageContent() {
    const { data: session } = useSession()

    const searchParams = useSearchParams()
    const router = useRouter()

    const roomId = searchParams.get("roomId")
    const checkin = searchParams.get("checkin")
    const checkout = searchParams.get("checkout")
    const guests = searchParams.get("guests")
    console.log("Room ID:", roomId)
    console.log("Check-in:", checkin)
    console.log("Check-out:", checkout)
    console.log("Guests:", guests)

    const [selectedServices, setSelectedServices] = useState([])
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [bookingSubmitted, setBookingSubmitted] = useState(false)
    const [submittedBooking, setSubmittedBooking] = useState(null)


    // const [adults, setAdults] = useState(Number((guests) || 1))
    // const [children, setChildren] = useState(0)


    const additionalServicesTotal = hotelServices
        .filter((service) => selectedServices.includes(service.name))
        .reduce((total, service) => total + service.price, 0)



    const formattedCheckin = new Date(checkin).toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    )

    const formattedCheckout = new Date(checkout).toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    )

    let nights = 0

    if (checkin && checkout) {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)

        const timeDifference = checkoutDate - checkinDate

        nights = timeDifference / (1000 * 60 * 60 * 24)
    }

    const selectedRoomId = Number(roomId)

    const room = rooms.find(
        (room) => room.id === selectedRoomId)


    if (!room) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-3xl font-semibold text-[var(--navy)]">
                        Room Not Found
                    </h1>

                    <p className="mt-3 text-gray-500">
                        We could not find the room you selected.
                    </p>

                    <Link
                        href="/rooms"
                        className="mt-6 inline-block bg-[var(--gold)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--white)]"
                    >
                        Explore Rooms
                    </Link>
                </div>
            </main>
        )
    }

    const roomTotal = room.price * nights

    const grandTotal = roomTotal + additionalServicesTotal

    async function initializePayment() {
        const bookingReference = `MV-${Date.now().toString().slice(-8)}`

        const response = await fetch("/api/paystack/initialize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: grandTotal * 100,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data?.message || "Unable to initialize payment")
            return
        }

        sessionStorage.setItem(
            "mare-vista-pending-booking",
            JSON.stringify({
                bookingReference,
                userId: session.user.id,
                roomId,
                checkin,
                checkout,
                nights,
                roomName: room.name,
                fullName,
                email,
                phone,
                address,
                city,
                country,
                services: hotelServices.filter(
                    (service) => selectedServices.includes(service.name)
                ),
                roomTotal,
                additionalServicesTotal,
                grandTotal,
                paymentMethod,
            })
        )

        window.location.href = data.data.authorization_url
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!session) {
            alert("Please login before making a booking")
            return
        }
        console.log("SESSION BEFORE BOOKING:", session)
        console.log("USER ID BEFORE BOOKING:", session?.user?.id)
        console.log("Form submitted");

        if (!fullName || !email || !phone || !address || !city || !country) {
            alert("Please complete all personal information fields.");
            return;
        }

        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        const selectedServiceDetails = hotelServices.filter(
            (service) => selectedServices.includes(service.name)
        );

        if (paymentMethod === "paystack") {
            await initializePayment()
            return
        }

        const bookingReference = `MV-${Date.now().toString().slice(-8)}`

        const bookingDate = new Date().toISOString();

        const bookingData = {
            bookingReference,
            bookingDate,
            userId: session.user.id,
            roomId: selectedRoomId,
            roomName: room.name,
            checkin,
            checkout,
            nights,
            // adults: room.guests,
            // children,
            fullName,
            email,
            phone,
            address,
            city,
            country,
            services: selectedServiceDetails,
            paymentMethod,
            roomTotal,
            additionalServicesTotal,
            grandTotal,
        };

        console.log("Booking Data:", bookingData);

        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })

        const data = await response.json()

        console.log("Booking response:", data)

        if (!response.ok) {
            alert(data?.message || "Unable to complete booking.")
            return
        }

        sessionStorage.setItem(
            "mare-vista-booking",
            JSON.stringify(bookingData)
        )
        router.push("/booking/confirmation")

    }



    return (
        <main>
            <section className="relative h-[420px]">
                <Image
                    src="/hero-image.jpg"
                    alt="Mare Vista booking"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <h1 className="font-display py-10s text-4xl text-[var(--white)] md:text-5xl lg:text-6xl">
                        Booking Confirmation
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-sm">
                        <Link
                            className="text-[var(--white)] transition-colors duration-300 hover:text-[var(--gold)"
                            href="/">
                            Home
                        </Link>

                        <span className="text-[var(--pale)]">
                            &gt;
                        </span>

                        <span className="text-[var(--gold)]">
                            Booking Confirmation
                        </span>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 md:grid-cols-2">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-covers" />
                        </div>

                        <div className="flex flex-col justify-center">

                            <h2 className="font-display mb-2 text-3xl font-semibold text-[var(--navy)] md:text-4xl">
                                Booking Details
                            </h2>
                            <div className="h-[3px] w-40 mt-2 bg-[var(--gold)]" />

                            <div className="border-b border-[var(--border)] pb-4">
                                <p className="mb-4 mt-6 font-semibold uppercase tracking-[0.2em] text-[var(--navy)]">
                                    Selected Room
                                </p>

                                <h2 className="font-display text-sm font-semibold text-gray-500 md:text-xl">
                                    {room.name}
                                </h2>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-6 border-b border-[var(--border)] pb-4">

                                <div>
                                    <p className="font-semibold text-[var(--navy)]">
                                        Check-in
                                    </p>

                                    <p className="mt-2 font-medium text-gray-500">
                                        {formattedCheckin}, from 11:00 am
                                    </p>

                                </div>

                                <div>
                                    <p className="font-semibold text-[var(--navy)]">
                                        Check-out
                                    </p>

                                    <p className="mt-2 font-medium text-gray-500">
                                        {formattedCheckout}, until 12:00 pm
                                    </p>

                                </div>

                                {/* Nights */}
                                <div>
                                    <p className="font-semibold text-[var(--navy)]">
                                        Duration
                                    </p>

                                    <p className="mt-2 font-medium text-gray-500">
                                        {nights} {nights === 1 ? "night" : "nights"}
                                    </p>
                                </div>

                            </div>

                            <p className="mt-8 text-[var(--navy)] border-b border-[var(--border)] pb-4">
                                <span className="text-2xl font-medium">Price: </span>
                                ₦{room.price.toLocaleString()}
                                <span className="ml-2 text-xl">
                                    / night
                                </span>
                            </p>

                        </div>

                        <form onSubmit={handleSubmit}>
                            <section className="px-6 py-12">
                                <div className="mx-auto max-w-6xl">
                                    <h2 className="font-display text-2xl font-semibold text-[var(--navy)] md:text-3xl">
                                        Guest Details
                                    </h2>

                                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                                        {/* Adults */}

                                        {/* <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--navy)]">
                                                Adults
                                            </label>

                                            <div className="w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)]">
                                                {room.guests} {room.guests === 1 ? "Adult" : "Adults"}
                                            </div>
                                        </div> */}

                                        <div>
                                            <label
                                                className="mb-2 block text-sm font-medium text-[var(--navy)]">
                                                Adults
                                            </label>

                                            <div
                                                className="w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)]">
                                                {room.guests} {room.guests === 1 ? "Adult" : "Adults"}
                                            </div>
                                        </div>

                                        {/* Children */}
                                        {/* <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--navy)]">
                                                Children
                                            </label>

                                            <select className="w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none"
                                                value={children}
                                                onChange={(e) => setChildren(Number(e.target.value))}>
                                                <option value="0">No Children</option>
                                                <option value="1">1 Child</option>
                                                <option value="2">2 Children</option>
                                                <option value="3">3 Children</option>
                                                <option value="4">4 Children</option>
                                            </select>
                                        </div> */}

                                        {/* Full Name */}
                                        {/* <div>
                                            <label className="mb-2 block text-sm font-medium text-[var(--navy)]">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                className="w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none" />
                                        </div> */}

                                    </div>

                                    <div className="mt-10">
                                        <h3 className="font-display text-xl font-semibold text-[var(--navy)] md:text-2xl">
                                            Choose Additional Services
                                        </h3>

                                        <div className="mt-6 grid grid-cols-2 gap-4">
                                            {hotelServices.map((service) => (
                                                <label
                                                    key={service.id}
                                                    className="flex cursor-pointer items-center gap-4 p-5"
                                                >

                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5"
                                                        checked={selectedServices.includes(service.name)}
                                                        onChange={() => {
                                                            if (selectedServices.includes(service.name)) {
                                                                setSelectedServices(
                                                                    selectedServices.filter(
                                                                        (selectedService) =>
                                                                            selectedService !== service.name
                                                                    )
                                                                );
                                                            } else {
                                                                setSelectedServices([
                                                                    ...selectedServices,
                                                                    service.name,
                                                                ]);
                                                            }
                                                        }}
                                                    />

                                                    <div>
                                                        <p className="font-medium text-[var(--navy)]">
                                                            {service.name}
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            ₦{service.price.toLocaleString()}
                                                        </p>
                                                    </div>

                                                </label>
                                            ))}


                                        </div>




                                        <div className="mt-10 p-4 md:p-8">

                                            <h3 className="font-display text-xl font-semibold text-[var(--navy)] md:text-2xl">
                                                Price Breakdown
                                            </h3>
                                            <div className="mt-2 h-[3px] w-40 bg-[var(--gold)]" />

                                            <div className="mt-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
                                                <div>
                                                    <p className="font-medium text-[var(--navy)]">
                                                        {room.name}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        N{room.price.toLocaleString()} x {nights} {" "}
                                                        {nights === 1 ? "night" : "nights"}
                                                    </p>
                                                </div>

                                                <p className="font-medium text-[var(--navy)]">
                                                    N{roomTotal.toLocaleString()}
                                                </p>
                                            </div>


                                            <div className="flex items-center justify-between border-b border-[var(--border)] py-4">
                                                <div>
                                                    <p className="font-medium text-[var(--navy)]">
                                                        Additional Services
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {selectedServices.length} {" "}
                                                        {selectedServices.length === 1 ? "service" : "services"} selected
                                                    </p>
                                                </div>

                                                <p className="font-medium text-[var(--navy)]">
                                                    N{additionalServicesTotal.toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-6">
                                                <p className="text-lg font-semibold text-[var(--navy)]">
                                                    Total
                                                </p>

                                                <p className="text-2xl font-semibold text-[var(--gold-dark)]">
                                                    N{grandTotal.toLocaleString()}
                                                </p>
                                            </div>

                                        </div>


                                        <div className="mt-14">

                                            <h3 className="font-display text-xl font-semibold text-[var(--navy)] md:text-2xl">
                                                Personal Information
                                            </h3>

                                            <div className="mt-6 grid gap-6 md:grid-cols-2">

                                                {/* FULL NAME */}
                                                <div>
                                                    <label
                                                        htmlFor="fullName"
                                                        className="block text-sm font-medium text-[var(--navy)]"
                                                    >
                                                        Full Name
                                                    </label>

                                                    <input
                                                        id="fullName"
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        className="mt-2 w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                                                    />
                                                </div>

                                                {/* EMAIL */}
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium text-[var(--navy)]"
                                                    >
                                                        Email Address
                                                    </label>

                                                    <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="mt-2 w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                                                    />
                                                </div>

                                                {/* PHONE */}
                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium text-[var(--navy)]"
                                                    >
                                                        Phone Number
                                                    </label>

                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="mt-2 w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                                                    />
                                                </div>

                                                {/* ADDRESS */}
                                                <div>
                                                    <label
                                                        htmlFor="address"
                                                        className="block text-sm font-medium text-[var(--navy)]"
                                                    >
                                                        Address
                                                    </label>

                                                    <input
                                                        id="address"
                                                        type="text"
                                                        placeholder="Enter your address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        className="mt-2 w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                                                    />
                                                </div>

                                                {/* CITY */}
                                                <div>
                                                    <label
                                                        htmlFor="city"
                                                        className="block text-sm font-medium text-[var(--navy)]"
                                                    >
                                                        City
                                                    </label>

                                                    <input
                                                        id="city"
                                                        type="text"
                                                        placeholder="Enter your city"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className="mt-2 w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                                                    />
                                                </div>

                                                {/* COUNTRY */}
                                                <div>
                                                    <label
                                                        htmlFor="country"
                                                        className="block text-sm font-medium text-[var(--navy)]"
                                                    >
                                                        Country
                                                    </label>

                                                    <input
                                                        id="country"
                                                        type="text"
                                                        placeholder="Enter your country"
                                                        value={country}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        className="mt-2 w-full border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-[var(--navy)] outline-none"
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                        {/* Payment Method */}
                                        <div className="mt-14">

                                            <h3 className="font-display text-xl font-semibold text-[var(--navy)] md:text-2xl">
                                                Payment Method
                                            </h3>

                                            <div className="mt-6 grid gap-4 md:grid-cols-2">

                                                <label className="flex cursor-pointer items-center gap-4 border border-[var(--border)] bg-[var(--white)] p-5">

                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="paystack"
                                                        checked={paymentMethod === "paystack"}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        className="h-5 w-5"
                                                    />

                                                    <div>
                                                        <p className="font-medium text-[var(--navy)]">
                                                            Pay Online
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Pay securely with your card or bank transfer.
                                                        </p>
                                                    </div>

                                                </label>

                                                <label className="flex cursor-pointer items-center gap-4 border border-[var(--border)] bg-[var(--white)] p-5">

                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="hotel"
                                                        checked={paymentMethod === "hotel"}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        className="h-5 w-5"
                                                    />

                                                    <div>
                                                        <p className="font-medium text-[var(--navy)]">
                                                            Pay at Hotel
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Pay when you arrive at Mare Vista.
                                                        </p>
                                                    </div>

                                                </label>

                                            </div>

                                        </div>

                                        <div className="mt-10 flex justify-start">

                                            <button
                                                type="submit"
                                                className="bg-[var(--gold)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--white)] transition-colors duration-300 hover:bg-[var(--gold-dark)]"
                                            >

                                                Book Now
                                            </button>

                                        </div>


                                    </div>

                                </div>
                            </section>
                        </form>

                        {/* {bookingSubmitted && submittedBooking && (
                            <div className="mb-8 border border-[var(--border)] bg-[var(--white)] p-6 md:p-8">
                                <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                                    Booking Confirmed
                                </p>

                                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--navy)] md:text-2xl">
                                    Your Reservation is confirmed!
                                </h3>

                                <p className="mt-3 text-gray-500">
                                    Thank you, {submittedBooking.fullName}. Your stay at Mare Vista has been successfully confirmed.
                                </p>

                                <div className="mt-8 border-t border-[var(--border)] pt-6">
                                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--navy)]">
                                        Booking Details
                                    </h3>
                                </div>

                                <div className="mt-6 flex flex-wrap">
                                    <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                        <p className="text-sm text-gray-500">
                                            Booking
                                        </p>

                                        <p className="mt-2 font-medium text-[var(--navy)]">
                                            #MV-20260919
                                        </p>
                                    </div>

                                    <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                        <p className="text-sm text-gray-500">
                                            Check-in
                                        </p>

                                        <p className="mt-2 font-medium text-[var(--navy)]">
                                            {formattedCheckin}
                                        </p>
                                    </div>

                                    <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                        <p className="text-sm text-gray-500">
                                            Check-out
                                        </p>

                                        <p className="mt-2 font-medium text-[var(--navy)]">
                                            {formattedCheckout}
                                        </p>
                                    </div>

                                    <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>

                                        <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                            ₦{submittedBooking.grandTotal.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>

                                        <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                            Confirmed
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center text-center">
                                    <h3 className="font-display text-base font-semibold text-[var(--navy)]">
                                        Details:
                                    </h3>
                                    <Link
                                        href={`/rooms/${room.roomSlug}`}
                                    >
                                        <p className="text-sm text-gray-500 ml-4 underline">
                                            {room.name}
                                        </p>
                                    </Link>
                                </div>


                                <div>
                                    <div className="mt-8 border-t border-[var(--border)] pt-6">
                                        <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--navy)]">
                                            Payment Details
                                        </h3>
                                    </div>

                                    <div className="mt-6 flex flex-wrap">
                                        <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                            <p className="text-sm text-black">
                                                Payment
                                            </p>

                                            <p className="mt-2 font-medium text-gray-500">
                                                #MV-20260919
                                            </p>
                                        </div>

                                        <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                            <p className="text-sm text-black">
                                                Date
                                            </p>

                                            <p className="mt-2 font-medium text-gray-500">
                                                {new Date().toLocaleString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                            <p className="text-sm text-gray-500">
                                                Payment Method
                                            </p>

                                            <p className="mt-2 font-medium text-[var(--navy)]">
                                                {paymentMethod}
                                            </p>
                                        </div>

                                        <div className="min-w-[180px] flex-1 border-r border-[var(--border)] p-5">
                                            <p className="text-sm text-gray-500">
                                                Total
                                            </p>

                                            <p className="mt-2 font-medium text-[var(--gold-dark)]">
                                                ₦{submittedBooking.grandTotal.toLocaleString()}
                                            </p>
                                        </div>

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

                                <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
                                    <Link
                                        href="/"
                                    >
                                        <p className="text-sm text-black ml-4 underline hover:text-gray-500">
                                            Back to home
                                        </p>
                                    </Link>

                                    <Link
                                        href="/rooms"
                                        className="text-sm text-black hover:text-gray-500 ml-4 underline"
                                    >
                                        Explore More Rooms
                                    </Link>
                                </div>

                            </div>
                        )} */}

                    </div>
                </div>
            </section>
        </main>
    )

}

export default function BookingPage() {
    return (
        <Suspense fallback={
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-[var(--navy)]">
                    Loading booking...
                </p>
            </main>
        }>
            <BookingPageContent />
        </Suspense>
    )
}