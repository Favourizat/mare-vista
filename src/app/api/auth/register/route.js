import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectToDatabase();

        const { name, email, password } = await request.json();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return Response.json(
                {
                    message: "Email already registered",
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return Response.json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return Response.json(
            {
                message: "Registration failed",
                error: error.message,
            },
            { status: 500 }
        );
    }
}