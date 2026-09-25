
"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, Suspense, useRef, useState } from "react"

    function PaymentcallbackContent() {
    const [status, setStatus] = useState("verifying")
    const hasVerified = useRef(false)

    const router = useRouter()
    const searchParams = useSearchParams()

    const reference = searchParams.get("reference")

    useEffect(() => {
        if (!reference) return

        if (hasVerified.current) return

        hasVerified.current = true

        async function verfiyPayment() {
            const pendingBooking = sessionStorage.getItem(
                "mare-vista-pending-booking"
            )

            console.log("PENDING BOOKING:", pendingBooking)

            if (!pendingBooking) {
                setStatus("failed")
                return
            }

            const bookingData = JSON.parse(pendingBooking)

            bookingData.paymentReference = reference

            const response = await fetch(
                `/api/paystack/verify?reference=${reference}&amount=${bookingData.grandTotal * 100}`
            )

            console.log("VERIFY RESPONSE STATUS:", response.status)

            const data = await response.json()

            console.log("VERIFY RESPONSE DATA:", data)

            if (!response.ok) {
                setStatus("failed")
                return
            }

            bookingData.paymentDate = data.data.paid_at

            const bookingReponse = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData)
            })

            const bookingResult = await bookingReponse.json()

            if (!bookingReponse.ok) {
                console.log("Booking creation failed:", bookingResult)
                setStatus("failed")
                return
            }

            console.log("FINAL BOOKING DATA:", bookingResult.data)

            sessionStorage.setItem(
                "mare-vista-booking",
                JSON.stringify(bookingResult.data)
            )

            sessionStorage.removeItem("mare-vista-pending-booking")

            setStatus("success")
            router.push("/booking/confirmation")
        }
        verfiyPayment()
    }, [reference])

    return (
        <main>
            {/* <div>
                {status === "verifying" && <p>Verifying your payment...</p>}

                {status === "success" && <p>Payment successful</p>}

                {status === "failed" && <p>Payment verification failed...</p>}
            </div> */}
        </main>
    )
}

export default function PaymentcallbackPage() {
    return (
        <Suspense fallback={
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-[var(--navy)]">
                    Verifying payment...
                </p>
            </main>
        }>
            <PaymentcallbackContent />
        </Suspense>
    )
}