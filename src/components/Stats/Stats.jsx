import Counter from "./Counter";

export default function Stats() {
    return (
        <section className="px-6 py-3 md:py-5">
            <div className="mx-auto max-w-6xl">

                <div className="grid grid-cols-2 md:grid-cols-4">

                    {/* Guests */}
                    <div className="border-r border-[var(--border)] p-6 text-center md:p-8">
                        <div className="font-display text-4xl text-[var(--navy)] md:text-5xl">
                            <Counter target={550} />
                            <span>+</span>
                        </div>

                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                            Guests
                        </p>
                    </div>

                    {/* Rooms */}
                    <div className="border-r border-[var(--border)] p-6 text-center md:p-8">
                        <div className="font-display text-4xl text-[var(--navy)] md:text-5xl">
                            <Counter target={120} />
                            <span>+</span>
                        </div>

                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                            Rooms
                        </p>
                    </div>

                    {/* Experiences */}
                    <div className="border-r border-[var(--border)] p-6 text-center md:p-8">
                        <div className="font-display text-4xl text-[var(--navy)] md:text-5xl">
                            <Counter target={35} />
                            <span>+</span>
                        </div>

                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                            Services
                        </p>
                    </div>

                    {/* Guest Rating */}
                    <div className="p-6 text-center md:p-8">
                        <div className="font-display text-4xl text-[var(--navy)] md:text-5xl">
                            4.9<span className="text-2xl">/5</span>
                        </div>

                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                            Guest Rating
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}