

export async function POST(request) {
    const { email, amount } = await request.json()

    if (!email || !amount) {
        return Response.json(
            { message: "Email and amount are required" },
            { status: 400 }
        )
    }

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
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/payment-callback`
            })
        }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
        return Response.json(
            { message: data.message || "Unable to initialize payment" },
            { status: 400 }
        )
    }

    return Response.json({
        message: "Payment initialized successfully",
        data: data.data,
    })
}