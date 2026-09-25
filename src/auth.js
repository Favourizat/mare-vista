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
                await connectToDatabase();

                const user = await User.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
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