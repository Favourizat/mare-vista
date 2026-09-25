import Image from "next/image"
import Link from "next/link"
import services from "@/data/services"

export default async function ServicesDetailsPage({ params }) {
    const { slug } = await params

    const service = services.find(
        (service) => service.slug === slug
    )

    if (!service) {
        return (
            <section className="flex min-h-screen items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="font-display text-4xl text-[var(--navy)]">
                        Service Not Found
                    </h1>

                    <Link
                        href="/services"
                        className="mt-6 inline-block text-sm text-[var(--gold-dark)] transition-colors hover:text-[var(--navy)]"
                    >
                        ← Back to Services
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-[var(--background)]">

            {/* Hero */}
            <div className="relative h-[55vh] min-h-[450px] overflow-hidden">

                <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-[var(--navy)]/55" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--pale)]">
                        Maré Vista Experience
                    </p>

                    <h1 className="font-display text-4xl text-[var(--white)] md:text-5xl lg:text-6xl">
                        {service.name}
                    </h1>

                    {/* Breadcrumb */}
                    <div className="mt-6 flex items-center gap-3 text-sm">

                        <Link
                            href="/"
                            className="text-[var(--white)] transition-colors duration-300 hover:text-[var(--gold)]"
                        >
                            Home
                        </Link>

                        <span className="text-[var(--pale)]/60">
                            /
                        </span>

                        <Link
                            href="/services"
                            className="text-[var(--white)] transition-colors duration-300 hover:text-[var(--gold)]"
                        >
                            Services
                        </Link>

                        <span className="text-[var(--pale)]/60">
                            /
                        </span>

                        <span className="text-[var(--gold)]">
                            {service.name}
                        </span>

                    </div>

                </div>
            </div>


            {/* Service Content */}
            <section className="px-6 py-20 md:px-12 md:py-24 lg:px-20 lg:py-28">

                <div className="mx-auto max-w-6xl">

                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-16">

                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <Image
                                src={service.image}
                                alt={service.name}
                                width={900}
                                height={650}
                                className="h-auto w-full object-cover"
                            />
                        </div>


                        {/* Details */}
                        <div className="flex h-full flex-col">

                            <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold-dark)]">
                                Maré Vista Experience
                            </p>

                            <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--navy)] md:text-5xl">
                                {service.name}
                            </h2>

                            <div className="mt-7 border-y border-[var(--border)] py-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-[var(--foreground)]/60">
                                    Service Rate
                                </p>

                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="font-display text-3xl text-[var(--gold-dark)]">
                                        {service.isFree
                                            ? "Complimentary"
                                            : `₦${service.price.toLocaleString()}`}
                                    </span>

                                    {!service.isFree && (
                                        <span className="text-sm text-[var(--foreground)]/60">
                                            / day
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 space-y-6 text-base leading-8 text-[var(--foreground)]/80">
                                <p>
                                    {service.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-8">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center border border-[var(--navy)] px-7 py-3 text-sm uppercase tracking-[0.15em] text-[var(--navy)] transition-all duration-300 hover:bg-[var(--navy)] hover:text-[var(--white)]"
                                >
                                    ← All Services
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </section>
    )
}