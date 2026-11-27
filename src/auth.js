import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                try {
                    console.log("AUTH STEP 1: Connecting to MongoDB...");

                    await connectToDatabase();

                    console.log("AUTH STEP 2: MongoDB connected.");

                    const normalizedEmail = credentials.email?.trim().toLowerCase();

                    const user = await User.findOne({
                        email: normalizedEmail,
                    });

                    console.log("AUTH STEP 3: User found:", !!user);

                    if (!user) {
                        console.log("AUTH RESULT: No account found.");
                        return null;
                    }

                    console.log("AUTH STEP 4: Password field exists:", !!user.password);

                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    console.log("AUTH STEP 5: Password matches:", passwordMatch);

                    if (!passwordMatch) {
                        return null;
                    }

                    console.log("AUTH RESULT: Authentication successful.");

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                    };

                } catch (error) {
                    console.error("CREDENTIAL AUTHENTICATION ERROR:", error);
                    throw error;
                }
            }
        }),

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider === "google") {
                    await connectToDatabase();

                    let dbUser = await User.findOne({
                        email: user.email,
                    });

                    if (!dbUser) {
                        dbUser = await User.create({
                            name: user.name,
                            email: user.email,
                        });
                    }

                    token.id = dbUser._id.toString();
                } else {
                    token.id = user.id;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id;
            }

            return session;
        },
    },
});