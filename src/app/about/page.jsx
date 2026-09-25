
import Image from "next/image"
import Link from "next/link"
import Gallery from "@/components/Gallery"
import HomeVideo from "@/components/HomeVideo/HomeVideo"

import {
    ArrowRight,
    Check,
    Waves,
    Utensils,
    Dumbbell,
    BriefcaseBusiness,
} from "lucide-react"



export default function AboutPage() {
    return (
        <main className="bg-[var(--white)] text-[var(--navy)]">

            {/* HERO */}
            {/* HERO */}
            <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
                <Image
                    src="/rooms/Deluxe-room.jpg"
                    alt="Mare Vista luxury resort"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[var(--navy)]/65" />

                {/* Hero content */}
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-[var(--white)]">

                    <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)] md:text-sm">
                        About Mare Vista
                    </p>

                    <div className="mx-auto mt-6 h-px w-12 bg-[var(--gold)]" />

                    {/* <h1 className="mt-7 font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Where the Coast Meets
            <span className="block italic text-[var(--gold)]">
                Quiet Luxury
            </span>
        </h1> */}

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[var(--white)]/80 md:text-lg">
                        A refined coastal retreat created for those who appreciate
                        beautiful spaces, thoughtful hospitality, and the freedom
                        to slow down.
                    </p>

                </div>

                {/* Scroll indicator */}
                {/* <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[var(--white)]/60">
        <span className="text-[10px] uppercase tracking-[0.3em]">
            Discover
        </span>

        <div className="h-10 w-px bg-[var(--white)]/40" />
    </div> */}
            </section>


            {/* INTRODUCTION */}
            <section className="px-6 py-20 md:py-28 lg:px-10">
                <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                            Our Story
                        </p>

                        <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                            Luxury should feel personal.
                        </h2>

                        <div className="mt-7 space-y-5 text-[var(--foreground)]/75">
                            <p className="leading-8">
                                Mare Vista was created around a simple idea: luxury
                                should feel personal. More than simply providing
                                somewhere to stay, we create an environment where
                                guests can relax, reconnect, and enjoy the moment.
                            </p>

                            <p className="leading-8">
                                Our spaces combine contemporary design with a calm,
                                welcoming atmosphere, giving you the comfort of a
                                luxury resort while maintaining the feeling of a
                                private escape.
                            </p>

                            <p className="leading-8">
                                Whether you are visiting for a quiet getaway, a
                                special occasion, a business trip, or an extended
                                stay, every part of the Mare Vista experience is
                                thoughtfully considered.
                            </p>
                        </div>
                    </div>

                    <div className="relative min-h-[480px]">
                        <div className="absolute right-0 top-0 h-[85%] w-[82%] overflow-hidden">
                            <Image
                                src="/rooms/Deluxe-room2.jpg"
                                alt="Elegant Mare Vista interior"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 h-[48%] w-[48%] overflow-hidden border-8 border-[var(--white)]">
                            <Image
                                src="/rooms/Deluxe-room3.jpg"
                                alt="Mare Vista resort atmosphere"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </section>


            {/* EXPERIENCE */}
            {/* <section className="bg-[var(--pale)] px-6 py-20 md:py-28 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                            The Experience
                        </p>

                        <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
                            Designed for moments that matter
                        </h2>

                        <p className="mt-6 leading-8 text-[var(--foreground)]/70">
                            From peaceful mornings to memorable evenings, Mare Vista
                            brings together everything you need for a stay that feels
                            effortless.
                        </p>
                    </div>


                    <div className="mt-14 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">

                        <div className="bg-[var(--white)] p-8">
                            <Waves
                                size={30}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-7 font-display text-2xl">
                                Refined Accommodation
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/65">
                                Thoughtfully designed rooms and suites created for
                                comfort, privacy, and restful stays.
                            </p>
                        </div>


                        <div className="bg-[var(--white)] p-8">
                            <Check
                                size={30}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-7 font-display text-2xl">
                                Exceptional Hospitality
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/65">
                                Attentive service focused on making your stay
                                seamless, comfortable, and memorable.
                            </p>
                        </div>


                        <div className="bg-[var(--white)] p-8">
                            <Utensils
                                size={30}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-7 font-display text-2xl">
                                Dining Experiences
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/65">
                                Carefully prepared dishes inspired by local and
                                international flavours in a welcoming setting.
                            </p>
                        </div>


                        <div className="bg-[var(--white)] p-8">
                            <Dumbbell
                                size={30}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-7 font-display text-2xl">
                                Wellness & Leisure
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/65">
                                Spaces designed to help you relax, recharge, and
                                make the most of your time away.
                            </p>
                        </div>

                    </div>
                </div>
            </section> */}

            <Gallery />


            {/* HOSPITALITY */}
            <section className="px-6 py-20 md:py-28 lg:px-10">
                <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

                    <div className="relative min-h-[550px] overflow-hidden">
                        <Image
                            src="/rooms/Tripple-classic.jpg"
                            alt="Mare Vista hospitality"
                            fill
                            className="object-cover"
                        />
                    </div>


                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                            Hospitality, With Intention
                        </p>

                        <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                            It is how you feel that matters.
                        </h2>

                        <p className="mt-7 leading-8 text-[var(--foreground)]/75">
                            At Mare Vista, genuine hospitality is at the heart of
                            everything we do. We believe the best stays are defined
                            not only by beautiful rooms, but by how a guest feels
                            throughout their experience.
                        </p>

                        <p className="mt-5 leading-8 text-[var(--foreground)]/75">
                            From the moment you arrive to the moment you leave, our
                            aim is to provide attentive service without ever getting
                            in the way of your own experience.
                        </p>

                        <div className="mt-8 h-px w-20 bg-[var(--gold)]" />

                        <p className="mt-7 font-display text-2xl italic text-[var(--navy)]">
                            "Every detail is thoughtfully considered."
                        </p>
                    </div>

                </div>
            </section>


            {/* ACCOMMODATION */}
            <section className="overflow-hidden bg-[var(--navy)] text-[var(--white)]">

                <div className="grid lg:grid-cols-2 px-6">

                    <div className="relative min-h-[550px] lg:min-h-[650px]">
                        <Image
                            src="/rooms/standard-room.jpg"
                            alt="Mare Vista luxury room"
                            fill
                            className="object-contain"
                        />
                    </div>


                    <div className="flex items-center px-6 py-15 md:px-12 lg:py-20">

                        <div className="max-w-xl">

                            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">
                                Stay With Us
                            </p>

                            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                                A place to stay. A place to unwind.
                            </h2>

                            <p className="mt-7 leading-8 text-[var(--white)]/70">
                                Our rooms and suites are designed as peaceful spaces
                                to retreat to after a day of exploring, working,
                                dining, or simply enjoying the resort.
                            </p>

                            <p className="mt-5 leading-8 text-[var(--white)]/70">
                                With modern amenities, comfortable interiors, and
                                carefully selected details, each accommodation offers
                                its own balance of elegance and ease.
                            </p>

                            <Link
                                href="/rooms"
                                className="group mt-9 inline-flex items-center gap-3 border border-[var(--gold)] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[var(--white)] transition hover:bg-[var(--gold)]"
                            >
                                Explore Our Rooms

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                        </div>

                    </div>

                </div>
            </section>


            {/* FACILITIES */}
            <section className="px-6 py-20 md:py-28 lg:px-10 mb-10">
                <div className="mx-auto max-w-7xl">

                    <div className="grid items-end gap-8 md:grid-cols-2">

                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold-dark)]">
                                More Than A Stay
                            </p>

                            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                                Everything you need, thoughtfully brought together.
                            </h2>
                        </div>

                        <p className="max-w-xl leading-8 text-[var(--foreground)]/70 md:ml-auto">
                            Whether you are here to relax, celebrate, explore, or
                            work, Mare Vista brings together the spaces and services
                            that make your stay feel complete.
                        </p>

                    </div>


                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <div className="border border-[var(--border)] p-8">
                            <Utensils
                                size={28}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-6 font-display text-2xl">
                                Restaurant
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/65">
                                Enjoy local and international cuisine prepared for
                                relaxed dining throughout your stay.
                            </p>
                        </div>


                        <div className="border border-[var(--border)] p-8">
                            <Waves
                                size={28}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-6 font-display text-2xl">
                                Indoor Pool
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/65">
                                Take a quiet break and unwind in our comfortable
                                indoor leisure environment.
                            </p>
                        </div>


                        <div className="border border-[var(--border)] p-8">
                            <Dumbbell
                                size={28}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-6 font-display text-2xl">
                                Fitness Centre
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/65">
                                Maintain your routine with convenient fitness
                                facilities available during your stay.
                            </p>
                        </div>


                        <div className="border border-[var(--border)] p-8">
                            <BriefcaseBusiness
                                size={28}
                                strokeWidth={1.5}
                                className="text-[var(--gold-dark)]"
                            />

                            <h3 className="mt-6 font-display text-2xl">
                                Business & Events
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/65">
                                Comfortable spaces for meetings, conferences,
                                celebrations, and professional gatherings.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


            {/* FINAL CTA */}
            {/* <section className="relative overflow-hidden bg-[var(--pale)] px-6 py-24 text-center md:py-32">

                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[var(--gold)]/20" />
                <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-[var(--gold)]/20" />

                <div className="relative mx-auto max-w-3xl">

                    <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold-dark)]">
                        Your Escape Awaits
                    </p>

                    <h2 className="mt-5 font-display text-4xl font-medium leading-tight md:text-6xl">
                        Come experience Mare Vista.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl leading-8 text-[var(--foreground)]/70">
                        Discover a place where thoughtful hospitality, refined
                        comfort, and quiet moments come together.
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

                        <Link
                            href="/rooms"
                            className="inline-flex items-center gap-3 bg-[var(--navy)] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--white)] transition hover:bg-[var(--gold-dark)]"
                        >
                            Explore Rooms

                            <ArrowRight size={17} />
                        </Link>

                        <Link
                            href="/"
                            className="px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--navy)] transition hover:text-[var(--gold-dark)]"
                        >
                            Return Home
                        </Link>

                    </div>

                </div>
            </section> */}

            <HomeVideo />

        </main>
    )
}
