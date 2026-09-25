
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs"

export async function POST() {
    try {
        await connectToDatabase()

        const { email, password } = await request.json()

        const user = await User.findOne({ email })

        if (!user) {
            return Response.json(
                {
                    message: "Invalid email or password"
                },
                {
                    status: 401
                }
            )
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!password) {
            return Reponse.json(
                {
                    message: "Invalid email or password"
                },
                {
                    status: 401
                }
            )
        }
        return Response.json(
            {
                message: "Login successful!",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        )
    } catch (error) {
        return Response.json(
            {
                message: "Login failed",
                error: error.message,
            },
            { status: 500 }
        )
    }

}