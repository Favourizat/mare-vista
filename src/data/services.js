const services = [
    {
        id: 1,
        name: "Gym",
        slug: "gym",
        description:
            "Maintain your wellness routine in an elegant, fully equipped fitness environment designed for comfort, convenience, and refined living. At Maré Vista, our gym provides a sophisticated space where guests can stay active throughout their stay, whether through focused strength training, invigorating cardio sessions, stretching, or a revitalizing morning workout. With a clean and welcoming atmosphere, the fitness space offers the privacy and convenience expected of a luxury resort, allowing you to exercise at your own pace while enjoying the exceptional standards of your stay. Whether you are beginning your morning with an energizing workout or taking time to recharge after a busy day, our fitness facilities make it effortless to prioritize your well-being.",
        Price: 0,
        isFree: true,
        image: "/services/gym.jpg",
        icon: "gym",
    },
    {
        id: 2,
        name: "Airport Pickup",
        slug: "airport-pickup",
        description: 
            "Begin your Maré Vista experience the moment you arrive with our private airport transfer service, created to make your journey from the terminal to the resort seamless, comfortable, and effortlessly refined. After your flight, enjoy the convenience of a dedicated transfer arranged with your comfort in mind, eliminating the stress of searching for transportation or navigating unfamiliar routes.",
        price: 40000,
        isFree: false,
        image: "/services/airport.jpg",
        icon: "airport",
    },
    {
        id: 3,
        name: "Laundry Service",
        slug: "laundry-service",
        description:
        "Enjoy the convenience of beautifully maintained garments throughout your stay with Maré Vista’s professional laundry service, thoughtfully designed for guests who value comfort, elegance, and effortless living. From everyday clothing to the garments you reserve for special occasions, our service takes care of your laundry needs with attention and care. Whether you are visiting for a short escape, an extended holiday, or a business stay, you can rely on our dedicated service to help keep your wardrobe fresh, clean, and ready for every occasion.",
        price: 25000,
        isFree: false,
        image: "/services/laundry.jpg",
        icon: "laundry",
    },
    {
        id: 4,
        name: "Spa & Wellness",
        slug: "spa-wellness",
        description:
           "Rejuvenate your mind and body with an elevated spa and wellness experience thoughtfully created around your comfort, relaxation, and well-being. At Maré Vista, our tranquil wellness environment offers a peaceful retreat where you can step away from the pace of everyday life and immerse yourself in moments of calm. From soothing treatments to restorative wellness rituals, every element is designed to create a serene experience that allows you to slow down, release tension, and enjoy the quiet luxury of uninterrupted relaxation.",
        price: 75000,
        isFree: false,
        image: "/services/spa.jpg",
        icon: "spa",
    },

    {
        id: 5,
        name: "Restaurant & Bar",
        slug: "restaurant-bar",
        description:
        "Savor an elevated dining experience at Maré Vista, where thoughtfully prepared local and international cuisine meets refined hospitality and a relaxed, elegant atmosphere. Our restaurant brings together carefully selected flavours and beautifully presented dishes designed to satisfy a variety of tastes and occasions. Whether you are beginning your morning with a leisurely breakfast, enjoying a relaxed afternoon meal, or settling in for an intimate dinner, every dining experience is designed to complement the comfort and sophistication of your stay. Complete your experience with a refreshing selection of beverages from our bar, served in an inviting setting designed for unwinding and conversation.",
        price: 50000,
        isFree: false,
        image: "/services/restaurant.jpg",
        icon: "restaurant",
    },
    {
        id: 6,
        name: "Workspace Access",
        slug: "workspace-access",
        description:
        "Stay productive without compromising the comfort and elegance of your Maré Vista experience with access to a thoughtfully designed workspace. Created for guests who need a quiet and professional environment, the workspace provides a comfortable setting for focused work, virtual meetings, emails, and important tasks throughout your stay. Whether you are travelling for business or simply need to attend to a few responsibilities, you can enjoy the convenience of having a dedicated space where productivity comes naturally. Designed with the modern traveller in mind, our workspace allows you to maintain your routine while enjoying everything Maré Vista has to offer.",
         price: 30000,
        isFree: false,
        image: "/services/workspace.jpg",
        icon: "workspace",
    },

]


export default services;