
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Validate required fields
        if (!name?.trim() || !email?.trim() || !password) {
            return Response.json(
                { message: "Please provide your name, email and password." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return Response.json(
                { message: "Password must contain at least 8 characters." },
                { status: 400 }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        console.log("REGISTRATION: Connecting to MongoDB...");

        await connectToDatabase();

        console.log("REGISTRATION: MongoDB connected.");

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return Response.json(
                { message: "Email already registered." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        console.log("REGISTRATION: User created successfully.");

        return Response.json(
            {
                message: "User registered successfully!",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("REGISTRATION API ERROR:", error);

        return Response.json(
            {
                message: "Registration failed.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
