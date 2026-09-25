"use client"

import { galleryImages } from "@/data/gallery"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useState } from "react";

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === galleryImages.length - 1
                ? 0
                : prevIndex + 1)
    }

    const previousImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0
                ? galleryImages.length - 1
                : prevIndex - 1)
    }

    return (
        <section>
            <div className="overflow-hidden">
                <div className="flex gap-6 transition-transform duration-700 ease-in-out "
                    style={{
                        transform: `translateX(-${currentIndex * 72}%)`
                    }}>
                    {galleryImages.map((item) => (
                        <div
                            key={item.id}
                            className="group relative min-w-[77%] aspect-[16/8] overflow-hidden">
                            <Image
                                src={item.image}
                                alt={`Mare vista room ${item.id}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between px-10 pt-5 sm:px-10">

                {/* Image Counter */}
                <p className="text-sm tracking-wider text-[var(--navy)]">
                    {currentIndex + 1} / {galleryImages.length}
                </p>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={previousImage}
                        aria-label="Previous image"
                        className="flex h-12 w-12 items-center justify-center border border-[var(--border)] text-[var(--navy)] transition-colors duration-300 hover:bg-[var(--navy)] hover:text-[var(--white)]"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next image"
                        className="flex h-12 w-12 items-center justify-center border border-[var(--border)] text-[var(--navy)] transition-colors duration-300 hover:bg-[var(--navy)] hover:text-[var(--white)]"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

            </div>

        </section>
    )
}