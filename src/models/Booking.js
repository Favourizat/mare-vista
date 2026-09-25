import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    roomId: {
        type: Number,
        required: true,
    },

    roomName: {
        type: String,
        required: true,
    },

    checkin: {
        type: String,
        required: true,
    },

    checkout: {
        type: String,
        required: true,
    },

    nights: {
        type: Number,
        required: true,
    },

    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    services: [
        {
            name: {
                type: String,
                required: true,
            },

            price: {
                type: Number,
                required: true,
            },
        },
    ],

    roomTotal: {
        type: Number,
        required: true,
    },

    additionalServicesTotal: {
        type: Number,
        required: true,
    },

    grandTotal: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
    },

    bookingReference: {
        type: String,
        required: true,
        unique: true,
    },
    paymentReference: {
        type: String,
        required: false,
    },
    paymentDate: {
        type: Date,
        required: false,
    },

    status: {
        type: String,
        default: "confirmed",
    },
}, {
    timestamps: true,
});

const Booking =
    mongoose.models.Booking ||
    mongoose.model("Booking", bookingSchema);

export default Booking;