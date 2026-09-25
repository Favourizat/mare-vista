import Link from "next/link";
import rooms from "@/data/rooms";
import RoomCard from "../RoomCard/RoomCard";

export default function FeaturedRooms() {
    return (
        <section className="px-6 py-7 md:py-14">
            <div className="mx-auto">

                <div className="mx-auto flex items-center justify-between">
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                            Luxury Resort & Accomodation
                        </h3>

                        <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--navy)] md:text-5xl">
                            Rooms & Suites
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--foreground)]/70 sm:text-base">
                            From intimate retreats to expansive suites, every room at Maré Vista is
                            thoughtfully designed for comfort, privacy, and effortless coastal living.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/room"
                            className="border border-[var(--navy)] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--navy)] transition-colors hover:bg-[var(--navy)] hover:text-[var(--white)]"
                        >
                            View All Rooms
                        </Link>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {rooms.slice(0, 6).map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                        />
                    ))}
                </div>



            </div>
        </section>
    );
}