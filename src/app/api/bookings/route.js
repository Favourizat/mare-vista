
import connectToDatabase from "@/lib/mongodb"
import Booking from "@/models/Booking"
import { auth } from "@/auth"

export async function GET() {
    const session = await auth()

    if (!session?.user?.id) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    await connectToDatabase()

    const bookings = await Booking.find({
        userId: session.user.id,
    }).sort({ createdAt: -1 })

    return Response.json({
        message: "Bookings fetched successfully!",
        data: bookings,
    })
}

export async function POST(request) {
    try {
        const session = await auth()

        if(!session?.user?.id){
            return Response.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
        await connectToDatabase()

        const data = await request.json()

        data.userId = session.user.id

        const { roomId, checkin, checkout } = data

       

        const roomBookings = await Booking.find({
            roomId: Number(roomId),
            status: { $ne: "cancelled" },
        })
        //  console.log("ROOM 1 BOOKINGS:", roomBookings)

        const conflictingBooking = roomBookings.find((booking) => {
            const requestedCheckin = new Date(checkin)
            const requestedCheckout = new Date(checkout)

            const bookingCheckin = new Date(booking.checkin)
            const bookingCheckout = new Date(booking.checkout)

            return (
                requestedCheckin < bookingCheckout &&
                requestedCheckout > bookingCheckin
            )
        })

        // console.log("CONFLICTING BOOKING:", conflictingBooking)
        // console.log("NEW BOOKING DATES:", {
        //     roomId,
        //     checkin,
        //     checkout,
        // })

       
        if (conflictingBooking) {
            return Response.json(
                {
                    message: "This room is already booked for the selected dates.",
                },
                { status: 409 }
            )
        }

        const booking = await Booking.create(data)

        return Response.json({
            message: "Booking data received successfully!",
            data: booking,
        })
    } catch (error) {
        console.log("========== BOOKING ERROR ==========")
        console.log(error.message)
        console.log(error)
        console.log("===================================")

        return Response.json(
            {
                message: "Something went wrong",
                error: error.message,
            },
            { status: 500 }
        )
    }
}

export async function PATCH(request) {
    const session = await auth()

    if (!session?.user?.id) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    try {
        await connectToDatabase()

        const { bookingId } = await request.json()

        if (!bookingId) {
            return Response.json(
                { message: "Booking ID is required" },
                { status: 400 }
            )
        }

        const booking = await Booking.findOne({
            _id: bookingId,
            userId: session.user.id,
        })

        if (!booking) {
            return Response.json(
                { message: "Booking not found" },
                { status: 404 }
            )
        }

        booking.status = "cancelled"

        await booking.save()

        return Response.json({
            message: "Booking cancelled successfully!",
            data: booking,
        })
    } catch (error) {
        console.log("========== CANCEL BOOKING ERROR ==========")
        console.log(error.message)
        console.log("==========================================")

        return Response.json(
            {
                message: "Something went wrong",
                error: error.message,
            },
            { status: 500 }
        )
    }
}


export async function DELETE(request) {
    const session = await auth()

    if (!session?.user?.id) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    try {
        await connectToDatabase()

        const { bookingId } = await request.json()

        const booking = await Booking.findOne({
            _id: bookingId,
            userId: session.user.id,
        })

        if (!booking) {
            return Response.json(
                { message: "Booking not found" },
                { status: 404 }
            )
        }

        await Booking.deleteOne({
            _id: bookingId,
            userId: session.user.id,
        })

        return Response.json({
            message: "Booking deleted successfully!",
        })
    } catch (error) {
        console.log("========== DELETE BOOKING ERROR ==========")
        console.log(error.message)
        console.log("==========================================")

        return Response.json(
            {
                message: "Something went wrong",
                error: error.message,
            },
            { status: 500 }
        )
    }
}