
"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            console.log("Login failed:", result.error)
            return
        }

        console.log("Login successful:", result)
        router.push("/")
    }

    const handleGoogleSignIn = async () => {
        await signIn("google", {
            callbackUrl: "/",
        })
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-20">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md border border-[var(--border)] bg-[var(--white)] px-8 py-10 shadow-sm md:px-10"
            >

                {/* Heading */}
                <div className="text-center">

                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                        Mare Vista
                    </p>

                    <h1 className="mt-3 font-display text-3xl text-[var(--navy)] md:text-4xl">
                        Welcome Back
                    </h1>

                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[var(--foreground)]/65">
                        Sign in to manage your reservations and continue
                        your Mare Vista experience.
                    </p>

                </div>

                {/* Form Fields */}
                <div className="mt-10 space-y-6">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)]"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--navy)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)]"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--navy)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
                        />
                    </div>

                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="mt-8 w-full bg-[var(--navy)] px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-[var(--white)] transition duration-300 hover:bg-[var(--gold-dark)]"
                >
                    Sign In
                </button>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[var(--border)]" />

                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/40">
                        Or
                    </span>

                    <div className="h-px flex-1 bg-[var(--border)]" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex w-full items-center justify-center gap-3 border border-[var(--border)] bg-transparent px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)] transition duration-300 hover:border-[var(--gold)] hover:bg-[var(--pale)] cursor-pointer"
                >
                    <span>
                        Continue with Google
                    </span>
                </button>

                {/* Register Link */}
                <p className="mt-8 text-center text-sm text-[var(--foreground)]/65">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-[var(--gold-dark)] transition hover:text-[var(--navy)]"
                    >
                        Create an account
                    </a>
                </p>

            </form>

        </main>
    )
}