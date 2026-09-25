"use client";

import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { data: session } = useSession()

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-2xl tracking-wide text-[var(--white)]"
        >
          Maré Vista
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm text-[var(--white)] transition-colors hover:text-[var(--gold)]"
          >
            Home
          </Link>

          <Link
            href="/rooms"
            className="text-sm text-[var(--white)] transition-colors hover:text-[var(--gold)]"
          >
            Rooms
          </Link>

          <Link
            href="/services"
            className="text-sm text-[var(--white)] transition-colors hover:text-[var(--gold)]"
          >
            Services
          </Link>

          <Link
            href="/about"
            className="text-sm text-[var(--white)] transition-colors hover:text-[var(--gold)]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm text-[var(--white)] transition-colors hover:text-[var(--gold)]"
          >
            Contact
          </Link>
          {/* 
          {session ? (
            <div className="flex items-center gap-6">
              <a
                href="/account"
                className="text-sm text-[var(--white)] transition hover:text-[var(--gold)]"
              >
                My Account
              </a>

              <button
                onClick={() => signOut()}
                className="border border-[var(--cloud)]/70 px-5 py-2 text-xs uppercase tracking-[0.18em] text-[var(--white)] transition hover:bg-[var(--gold)]"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="border border-[var(--cloud)]/70 px-5 py-2 text-xs uppercase tracking-[0.18em] text-[var(--white)] transition hover:bg-[var(--gold)]"
            >
              Sign In
            </a>
          )} */}
        </div>

        {/* Desktop Booking Button */}


        <div className=" hidden md:flex relative flex items-center justify-center gap-6">
          <button className="text-[var(--white)] transition-colors hover:text-[var(--gold)] cursor-pointer"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen)
              
            }}
          >
            <User
              size={20} strokeWidth={1.5} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-52 border border-[var(--border)] bg-[var(--white)] shadow-lg transition-transform duration-700">
              {
                session ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-5 py-4 text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
                    >
                      My Account
                    </Link>

                    <Link
                      href="/my-bookings"
                      onClick={() => setIsProfileOpen(false)}
                      className="block border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
                    >
                      My Bookings
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false)
                        signOut()
                      }}
                      className="w-full border-t border-[var(--border)] px-5 py-4 text-left text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsProfileOpen(flse)}
                    className="block px-5 py-4 text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold)]"
                  >
                    Sign In
                  </Link>
                )
              }
            </div>
          )}

          <Link
            href="/rooms"
            className="hidden border border-[var(--navy)] bg-[var(--gold)] px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[var(--white)] transition-300 hover:bg-[var(--gold-dark)] hover:text-[var(--white)] md:block"
          >
            Book Your Stay
          </Link>
        </div>


        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex items-center justify-center text-[var(--white)] md:hidden"
        >
          {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>

      </nav>

      {/* Mobile Menu */}
      {
        isOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--gold)] md:hidden">

            <div className="flex flex-col px-6 py-6">

              <Link
                href="/"
                onClick={closeMenu}
                className="border-b border-[var(--border)] py-4 text-sm uppercase tracking-[0.15em] text-[var(--navy)]"
              >
                Home
              </Link>

              <Link
                href="/rooms"
                onClick={closeMenu}
                className="border-b border-[var(--border)] py-4 text-sm uppercase tracking-[0.15em] text-[var(--navy)]"
              >
                Rooms
              </Link>

              <Link
                href="/services"
                onClick={closeMenu}
                className="border-b border-[var(--border)] py-4 text-sm uppercase tracking-[0.15em] text-[var(--navy)]"
              >
                Services
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="border-b border-[var(--border)] py-4 text-sm uppercase tracking-[0.15em] text-[var(--navy)]"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="border-b border-[var(--border)] py-4 text-sm uppercase tracking-[0.15em] text-[var(--navy)]"
              >
                Contact
              </Link>

              <Link
                href="/rooms"
                onClick={closeMenu}
                className="mt-6 bg-[var(--navy)] border-[var(--cloud)]/70 px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--white)] transition-colors hover:bg-[var(--white)]"
              >
                Book Your Stay
              </Link>

              <div className="mt-6 border-t border-[var(--border)] pt-4">
                {session ? (
                  <>
                    <Link
                      href="/account"
                      onClick={closeMenu}
                      className="block py-3 text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold-dark)]"
                    >
                      My Account
                    </Link>

                    <Link
                      href="/account/bookings"
                      onClick={closeMenu}
                      className="block py-3 text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold-dark)]"
                    >
                      My Bookings
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      className="mt-2 w-full border border-[var(--navy)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--navy)] transition-colors hover:bg-[var(--navy)] hover:text-[var(--white)]"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block py-3 text-sm text-[var(--navy)] transition-colors hover:text-[var(--gold-dark)]"
                  >
                    Sign In
                  </Link>
                )}
              </div>

            </div>
          </div>
        )
      }
    </header >
  );
}