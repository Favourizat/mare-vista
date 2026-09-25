
import { auth } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

export default async function AccountPage() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

        return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-20">
            <div className="mx-auto max-w-4xl">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                    Mare Vista
                </p>

                <h1 className="mt-3 font-display text-4xl text-[var(--navy)]">
                    My Account
                </h1>

                <div className="mt-10 border border-[var(--border)] bg-[var(--white)] p-8">
                    <h2 className="font-display text-2xl text-[var(--navy)]">
                        Personal Information
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-[var(--foreground)]/50">
                                Name
                            </p>

                            <p className="mt-1 text-[var(--navy)]">
                                {session.user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-[var(--foreground)]/50">
                                Email
                            </p>

                            <p className="mt-1 text-[var(--navy)]">
                                {session.user.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}