

import connectToDatabase from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(request) {
    const searchParams = new URL(request.url).searchParams

    const roomId = searchParams.get("roomId")
    console.log("CHECKING ROOM ID:", roomId)
    const checkin = searchParams.get("checkin")
    const checkout = searchParams.get("checkout")

    if (!roomId || !checkin || !checkout) {
        return Response.json(
            { message: "Room ID, check-in and check-out dates are required" },
            { status: 400 }
        )
    }

    await connectToDatabase()

    

    const roomBookings = await Booking.find({
        roomId: Number(roomId),
        status: { $ne: "cancelled" },
    })

    const existingBooking = roomBookings.find((booking) => {
        const requestedCheckin = new Date(checkin)
        const requestedCheckout = new Date(checkout)

        const bookingCheckin = new Date(booking.checkin)
        const bookingCheckout = new Date(booking.checkout)

        console.log("DATE CHECK:", {
            requestedCheckin,
            requestedCheckout,
            bookingCheckin,
            bookingCheckout,
            firstCondition: requestedCheckin < bookingCheckout,
            secondCondition: requestedCheckout > bookingCheckin,
        })

        return (
            requestedCheckin < bookingCheckout &&
            requestedCheckout > bookingCheckin
        )
    })
    console.log("EXISTING BOOKING:", existingBooking)
    return Response.json({
        available: !existingBooking,
    })
}