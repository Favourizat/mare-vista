import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    ArrowUpRight,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[var(--navy)] text-[var(--white)]">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="font-display text-2xl tracking-wide"
                        >
                            Maré Vista
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
                            A refined coastal retreat where timeless elegance,
                            thoughtful comfort, and unforgettable stays come together.
                        </p>

                        <div className="mt-7 flex items-center gap-4">
                            

                            {/* <Link
                                href="#"
                                className="transition-colors hover:text-[var(--gold)]"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} strokeWidth={1.5} />
                            </Link> */}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
                            Explore
                        </h3>

                        <nav className="mt-6 flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                href="/rooms"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Rooms & Suites
                            </Link>

                            <Link
                                href="/services"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Services
                            </Link>

                            <Link
                                href="/gallery"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Gallery
                            </Link>
                        </nav>
                    </div>

                    {/* Stay */}
                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
                            Stay
                        </h3>

                        <nav className="mt-6 flex flex-col gap-4">
                            <Link
                                href="#booking"
                                className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Book Your Stay
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>

                            <Link
                                href="/rooms"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Our Rooms
                            </Link>

                            <Link
                                href="/contact"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Contact Us
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/65 transition-colors hover:text-white"
                            >
                                Hotel Policies
                            </Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
                            Contact
                        </h3>

                        <div className="mt-6 flex flex-col gap-5">

                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    strokeWidth={1.5}
                                    className="mt-0.5 shrink-0 text-[var(--gold)]"
                                />

                                <p className="text-sm leading-6 text-white/65">
                                    Coastal Road,
                                    <br />
                                    Maré Vista
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    strokeWidth={1.5}
                                    className="shrink-0 text-[var(--gold)]"
                                />

                                <a
                                    href="tel:+2340000000000"
                                    className="text-sm text-white/65 transition-colors hover:text-white"
                                >
                                    +234 000 000 0000
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    strokeWidth={1.5}
                                    className="shrink-0 text-[var(--gold)]"
                                />

                                <a
                                    href="mailto:stay@marevista.com"
                                    className="text-sm text-white/65 transition-colors hover:text-white"
                                >
                                    stay@marevista.com
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="my-12 h-px bg-white/10" />

                {/* Bottom */}
                <div className="flex flex-col gap-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between">

                    <p>
                        © {new Date().getFullYear()} Maré Vista. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>

            </div>
        </footer>
    );
}