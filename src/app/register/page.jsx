
"use client"

import { useState } from "react"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")

        if (!name.trim() || !email.trim() || !password) {
            setError("Please complete all fields.")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || data.error || "Registration failed. Please try again."
                )
            }

            setSuccess(data.message || "Your account has been created successfully.")

            setName("")
            setEmail("")
            setPassword("")

        } catch (error) {
            console.error("REGISTRATION ERROR:", error)
            setError(error.message || "Something went wrong. Please try again.")

        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-20">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md border border-[var(--border)] bg-[var(--white)] px-8 py-10 shadow-sm md:px-10"
            >

                <div className="text-center">

                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                        Mare Vista
                    </p>

                    <h1 className="mt-3 font-display text-3xl text-[var(--navy)] md:text-4xl">
                        Create Your Account
                    </h1>

                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[var(--foreground)]/65">
                        Create an account to make your stay at Mare Vista
                        simple and memorable.
                    </p>

                </div>

                <div className="mt-10 space-y-6">

                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)]"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--navy)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)]"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--navy)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)]"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                            minLength={8}
                            className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--navy)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
                        />
                    </div>

                </div>

                {error && (
                    <p className="mt-5 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="mt-5 text-sm text-green-700">
                        {success}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full bg-[var(--navy)] px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-[var(--white)] transition duration-300 hover:bg-[var(--gold-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="mt-8 text-center text-sm text-[var(--foreground)]/65">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-[var(--gold-dark)] transition hover:text-[var(--navy)]"
                    >
                        Sign in
                    </a>
                </p>

            </form>

        </main>
    )
}
