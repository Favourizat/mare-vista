import Image from "next/image";
import Link from "next/link";
import { Bed, Maximize } from "lucide-react";

export default function RoomCard({ room }) {
    return (
        <article className="group overflow-hidden bg-[var(--white)]">

            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-[var(--navy)]/10" />
            </div>

            <div className="py-6 md:py-7">

                <p className="font-display text-2xl px-5 py-4 text-[var(--white)] bg-[var(--gold)]">
                    ₦{room.price.toLocaleString()}
                    <span className="text-sm">
                        {" "} / night
                    </span>
                </p>

                <h3 className="mt-3 font-display text-3xl text-[var(--navy)]">
                    {room.name}
                </h3>

                <div className="flex items-center gap-6 py-4 text-sm text-[var(--rough)]">

                    <div className="flex items-center gap-2">
                        <Bed
                            size={18}
                            strokeWidth={1.5}
                            className="text-[var(--gold)]"
                        />

                        <span>
                            Guests: {room.guests}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Maximize
                            size={18}
                            strokeWidth={1.5}
                            className="text-[var(--gold)]"
                        />

                        <span>
                            Size: 20ft
                        </span>
                    </div>

                </div>

                {/* <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/70">
                    {room.description}
                </p> */}

                <Link
                    href={`/rooms/${room.roomSlug}`}
                    className="mt-6 inline-flex border border-[var(--navy)] px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
                >
                    View Room
                </Link>

            </div>
        </article>
    );
}