
import connectToDatabase from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(request) {
    try {
        const searchParams = new URL(request.url).searchParams;

        const roomId = searchParams.get("roomId");
        const checkin = searchParams.get("checkin");
        const checkout = searchParams.get("checkout");

        if (!roomId || !checkin || !checkout) {
            return Response.json(
                { message: "Room ID, check-in and check-out dates are required." },
                { status: 400 }
            );
        }

        const numericRoomId = Number(roomId);

        if (!Number.isInteger(numericRoomId) || numericRoomId <= 0) {
            return Response.json(
                { message: "Invalid room ID." },
                { status: 400 }
            );
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (
            !datePattern.test(checkin) ||
            !datePattern.test(checkout) ||
            !Number.isFinite(Date.parse(checkin)) ||
            !Number.isFinite(Date.parse(checkout)) ||
            checkin >= checkout
        ) {
            return Response.json(
                { message: "Please provide valid check-in and check-out dates." },
                { status: 400 }
            );
        }

        console.log("STEP 1: Connecting to MongoDB...");

        await connectToDatabase();

        console.log("STEP 2: MongoDB connected successfully.");
        console.log("STEP 3: Checking Booking model...");

        console.log("Booking model:", Booking.modelName);
        console.log("Booking collection:", Booking.collection.name);

        const existingBooking = await Booking.findOne({
            roomId: numericRoomId,
            status: {
                $nin: ["cancelled", "canceled", "CANCELLED", "CANCELED"],
            },
            checkin: { $lt: checkout },
            checkout: { $gt: checkin },
        }).lean();

        console.log("STEP 4: Booking query completed.");
        console.log("EXISTING BOOKING:", existingBooking);

        return Response.json({
            available: !existingBooking,
        });

    } catch (error) {
        console.error("ROOM AVAILABILITY API ERROR:", error);

        return Response.json(
            {
                message: "Unable to check room availability.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
