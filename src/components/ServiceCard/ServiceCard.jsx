
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
    console.log("Service:", service)
    console.log("Service image:", service.image)

    return (
        <article className="group relative overflow-hidden">
            <div className="relative aspect-[4/4]">
                <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Price */}
                <div className="absolute right-4 top-4 bg-[var(--white)] px-4 py-2 text-sm font-medium text-[var(--navy)]">
                    {service.isFree
                        ? "Free"
                        : `₦${service.price.toLocaleString()} / day`}
                </div>

                {/* Service Tag */}
                <div className="absolute bottom-4 left-4 max-w-[90%] bg-[var(--navy)] px-5 py-3 text-[var(--white)]">
                    <p className="text-sm tracking-[0.15em]">
                        {service.name}
                    </p>

                    {/* Expand on Hover */}
                    <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--pale)]">
                                {service.description}
                            </p>

                            <Link
                                href={`/services/${service.slug}`}
                                className="mt-4 inline-block text-sm font-medium text-[var(--gold)]"
                            >
                                See More →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
