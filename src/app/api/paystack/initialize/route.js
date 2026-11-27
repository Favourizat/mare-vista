
export async function POST(request) {
    try {
        const { email, amount } = await request.json()

        if (!email || !amount) {
            return Response.json(
                { message: "Email and amount are required" },
                { status: 400 }
            )
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL

        if (!appUrl) {
            console.error("NEXT_PUBLIC_APP_URL is missing")

            return Response.json(
                { message: "Application URL is not configured" },
                { status: 500 }
            )
        }

        const callbackUrl = `${appUrl.replace(/\/$/, "")}/booking/payment-callback`

        console.log("PAYSTACK CALLBACK URL:", callbackUrl)

        const response = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    amount: String(amount),
                    currency: "NGN",
                    callback_url: callbackUrl,
                }),
            }
        )

        const data = await response.json()

        console.log("PAYSTACK INITIALIZATION STATUS:", data.status)
        console.log("PAYSTACK INITIALIZATION MESSAGE:", data.message)

        if (!response.ok || !data.status) {
            return Response.json(
                { message: data.message || "Unable to initialize payment" },
                { status: 400 }
            )
        }

        console.log("PAYSTACK AUTHORIZATION URL RECEIVED")

        return Response.json({
            message: "Payment initialized successfully",
            data: data.data,
        })

    } catch (error) {
        console.error("PAYSTACK INITIALIZATION ERROR:", error)

        return Response.json(
            { message: "Unable to initialize payment" },
            { status: 500 }
        )
    }
}
