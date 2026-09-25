import ServiceCard from "../ServiceCard/ServiceCard";
import services from "@/data/services";
import Link from "next/link";

export default function Services() {
    return (
        <section className="px-6 py-6 md:py-8 lg:py-10 mb-15">
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-12 max-w-2xl">
                    <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[var(--gold)]">
                        HOTEL SERVICES
                    </p>

                    <h2 className="font-display text-4xl leading-tight text-[var(--navy)] md:text-5xl">
                        Everything you need for a seamless stay.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-[var(--rough)]">
                        From relaxation and wellness to dining and everyday
                        essentials, our services are designed to make your
                        stay comfortable, effortless, and memorable.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.slice(0,3).map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                        />
                    )
                    )}
                </div>

                <Link
                href={`/services`}
                className="mt-5 mr-4 flex items-center justify-end text-sm font-medium text-[var(--gold)]">
                    See All Services →
                </Link>

            </div>
        </section>
    );
}