import Link from "next/link"
import Image from "next/image"

export default function HomeVideo() {
    return (
        <section className="relative h-[calc(100vh-81px)] w-full overflow-hidden py-15">

            {/* Background Video */}
            <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[var(--navy)]/45" />

            {/* Hero Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-81px)] items-center justify-center px-6 text-center">
                <div className="max-w-4xl text-[var(--white)]">

                    <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[var(--silver)]">
                        ULTIMATE RELAXATION & COMFORT
                    </p>

                    <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                        EXPERIENCE A MEMORABLE STAY AT OUR HOTEL
                    </h1>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

                        <Link
                            href="/rooms"
                            className="w-full border border-[var(--gold)] bg-[var(--gold)] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--navy)] transition-all duration-300 hover:bg-[var(--gold-dark)] hover:text-[var(--white)] sm:w-auto"
                        >
                            Explore Rooms
                        </Link>

                        <Link
                            href="/rooms"
                            className="w-full border border-[var(--cloud)]/70 bg-transparent px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--white)] transition-all duration-300 hover:bg-[var(--white)] hover:text-[var(--navy)] sm:w-auto"
                        >
                            Book Your Stay
                        </Link>

                    </div>
                </div>
            </div>

        </section>
    )
}