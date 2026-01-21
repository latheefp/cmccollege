import { LucideIcon, Book, Wifi, Coffee, Monitor, Dumbbell, Bus, Stethoscope, Home, Music, Drama } from "lucide-react";

export interface AmenityData {
    title: string;
    description: string;
    features: string[];
    image: string;
    icon?: any;
    gallery?: string[];
    busSchedules?: { busName: string; stops: { route: string; time: string; driver?: string }[] }[];
}

export const AMENITIES_DATA: Record<string, AmenityData> = {
    "transportation": {
        title: "Transportation",
        description: "Our college provides a safe and convenient bus service covering major routes in and around the city. The fleet of well-maintained buses ensures that students and staff commute comfortably and on time.",
        features: [
            "Fleet of 10+ buses covering 50km radius",
            "Experienced and licensed drivers",
            "GPS tracking for safety",
            "Separate seating for staff and students",
            "Affordable pass rates"
        ],
        image: "/images/school_bus_1768115663740.png",
        icon: Bus,
        gallery: [
            "/images/school_bus_1768115663740.png",
            "/images/school_bus_1768115663740.png"
        ],
        busSchedules: [
            {
                busName: "Bus 1",
                stops: [
                    { route: "City Centre", time: "7:30 AM", driver: "Mr. Rajan" },
                    { route: "North Junction", time: "7:40 AM" },
                    { route: "East End", time: "7:45 AM" },
                    { route: "College Campus", time: "8:00 AM" }
                ]
            },
            {
                busName: "Bus 2",
                stops: [
                    { route: "West Gate", time: "7:30 AM", driver: "Mr. Babu" },
                    { route: "South Avenue", time: "7:40 AM" },
                    { route: "Green Park", time: "7:50 AM" },
                    { route: "College Campus", time: "8:05 AM" }
                ]
            }
        ]
    },
    "hostel": {
        title: "Hostel Facility",
        description: "We offer secure and homely accommodation for students coming from distant places. Our hostels are designed to provide a conducive environment for learning and personal growth.",
        features: [
            "Separate hostels for boys and girls",
            "24/7 Security and CCTV surveillance",
            "Spacious and well-ventilated rooms",
            "Hygienic mess providing nutritious meals",
            "Study halls and recreation rooms",
            "Wi-Fi connectivity"
        ],
        image: "/images/school_hostel_1768115536813.png",
        icon: Home,
        gallery: [
            "/images/school_hostel_1768115536813.png"
        ]
    },
    "central-library": {
        title: "Central Library",
        description: "The heart of academic resources, our library houses a vast collection of books, journals, and digital archives to support research and learning.",
        features: [
            "Over 10,000 books and reference materials",
            "Subscription to national and international journals",
            "Digital library with e-books and online databases",
            "Quiet and spacious reading rooms",
            "Computer terminals for research"
        ],
        image: "/images/school_library_1768115599802.png",
        icon: Book
    },
    "computer-labs": {
        title: "Computer Labs",
        description: "State-of-the-art computer laboratories equipped with the latest hardware and software to keep students abreast of technological advancements.",
        features: [
            "High-configuration workshops",
            "High-speed internet connectivity",
            "Latest software for programming and design",
            "Expert lab assistants",
            "Project work support"
        ],
        image: "/images/science_lab_1768115578614.png",
        icon: Monitor
    },
    "cafeteria": {
        title: "Cafeteria",
        description: "A vibrant space for students to relax and enjoy healthy, delicious meals. Hygiene and quality are our top priorities.",
        features: [
            "Freshly prepared meals and snacks",
            "Hygienic kitchen and dining area",
            "Affordable prices",
            "Variety of cuisines",
            "Spacious seating arrangement"
        ],
        image: "/images/school_dining_hall_1768116701071.png",
        icon: Coffee
    },
    "sports-complex": {
        title: "Sports & Fitness",
        description: "We promote physical fitness and sportsmanship through excellent sports infrastructure and training facilities.",
        features: [
            "Large playground for cricket and football",
            "Courts for badminton, volleyball, and basketball",
            "Indoor games facility (Table Tennis, Carrom, Chess)",
            "Well-equipped Gymnasium",
            "Annual Sports Meet"
        ],
        image: "/images/school_sports_ground_1768117765955.png",
        icon: Dumbbell
    },
    "medical-care": {
        title: "Medical Care",
        description: "The health and well-being of our students are paramount. We provide basic medical facilities and support within the campus.",
        features: [
            "First-aid center",
            "On-call doctor availability",
            "Regular health check-up camps",
            "Emergency transport availability",
            "Counseling services"
        ],
        image: "/images/classroom_learning_1768115518451.png", // Placeholder
        icon: Stethoscope
    }
};
