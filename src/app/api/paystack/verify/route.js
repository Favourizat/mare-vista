
export async function GET(request) {
    const { searchParams } = new URL(request.url)

    const reference = searchParams.get("reference")
    const amount = searchParams.get("amount")

    if (!reference || !amount) {
        return Response.json(
            { message: "Payment reference  and amount is missing" },
            { status: 400 }
        )
    }

    const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
        }
    )

    const data = await response.json()

console.log("PAYSTACK VERIFY STATUS:", response.status)
console.log("PAYSTACK VERIFY DATA:", data)

    // Is the response okay?
    // is the API request successsfull?
    // Is the transaction itself successful?
    if (!response.ok || 
        !data.status || 
        data.data.status !== "success" || 
        data.data.amount !== Number(amount) ||
        data.data.currency !== "NGN"
    ) {
        return Response.json(
            { message: "Payment verification failed" },
            { status: 400 }
        )
    }

    return Response.json({
        message: "Payment verified successfully!",
        data: data.data,
    })
}