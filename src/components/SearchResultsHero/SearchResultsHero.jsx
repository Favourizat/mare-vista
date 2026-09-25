
import Image from "next/image"
import Link from "next/link"

export default function SearchResultsHero() {
    return (
        <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
            <Image
                src="/gallery-room/room1.jpg"
                alt="Mare vista rooms"
                fill
                priority
                className="object-cover" />

                <div className="absolute inset-0 bg-[var(--navy)]/55"/>

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <h1 className="font-display text-4xl text-[var(--white)] md:text-5xl lg:text-6xl">
                        Choose your room
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-sm">
                        <Link
                        className="text-[var(--white)] transition-colors duration-300 hover:text-[var(--gold)"
                        href="/">
                            Home
                        </Link>

                        <span className="text-[var(--pale)]">
                             &gt;
                        </span>

                        <span className="text-[var(--gold)]">
                            Rooms
                        </span>
                    </div>
                </div>
        </section>
    )
}