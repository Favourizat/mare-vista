
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
    return (
        <section className="px-6 mt-10 py-8 md:py-10 lg:py-14">
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-20">

                {/* Content */}
                <div className="max-w-xl">

                    {/* Small Heading */}
                    <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
                        Welcome to Mare Vista Luxury Hotel
                    </p>

                    {/* Main Heading */}
                    <h2 className="font-display text-3xl leading-tight text-[var(--navy)] sm:text-4xl lg:text-5xl">
                        Refined comfort, tranquility, and effortless luxury.
                    </h2>

                    {/* Decorative Line */}
                    <div className="my-7 h-px w-16 bg-[var(--gold)]" />

                    {/* Description */}
                    <div className="space-y-5 text-sm leading-7 text-[var(--rough)] md:text-base md:leading-8">
                        <p>
                            Settle into spacious, thoughtfully designed rooms where
                            modern elegance meets effortless comfort. Indulge in a
                            memorable dining experience at our on-site restaurant,
                            offering a carefully curated selection of local and
                            international cuisine.
                        </p>

                        <p>
                            Maintain your routine in our fully equipped fitness
                            center or unwind with a refreshing swim in our indoor
                            pool. For business travelers, our elegant conference
                            rooms and dedicated business center provide a
                            sophisticated setting, complete with modern technology
                            and everything you need for a productive stay.
                        </p>

                    </div>

                    {/* CTA */}
                    <Link
                        href="/about"
                        className="mt-8 inline-flex border border-[var(--gold)] bg-[var(--gold)] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--navy)] transition-all duration-300 hover:bg-[var(--gold-dark)] hover:text-[var(--white)]"
                    >
                        Discover More
                    </Link>
                </div>

                {/* Image */}
                <div className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[600px]">
                    <Image
                        src="/hero-image.jpg"
                        alt="Mare Vista Luxury Hotel"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Image Border */}
                    <div className="pointer-events-none absolute inset-4 border border-[var(--white)]/40" />
                </div>

            </div>
        </section>
    );
}
