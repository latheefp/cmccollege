import { LucideIcon, Book, Wifi, Coffee, Monitor, Dumbbell, Bus, Stethoscope, Home, Music, Drama, Cpu, HardDrive, Users, Mic2, Layout, Flower, Utensils } from "lucide-react";

export interface AmenityData {
    title: string;
    description: string;
    features: string[];
    image: string;
    icon?: any;
    gallery?: string[];
    busSchedules?: { busName: string; stops: { route: string; time: string; driver?: string }[] }[];
    hostelDetails?: {
        boys: { capacity: number; vacancies: number; warden: string };
        girls: { capacity: number; vacancies: number; warden: string };
        rules: string[];
    };
    labDetails?: {
        specs: { cpu: string; ram: string; storage: string; gpu: string }[];
        software: string[];
    };
    achievements?: {
        title: string;
        event: string;
        rank: string;
        image: string;
        date: string;
    }[];
    librarian?: {
        name: string;
        image: string;
        designation: string;
        qualification?: string;
        message?: string;
    };
}

export const AMENITIES_DATA: Record<string, AmenityData> = {
    "classrooms": {
        title: "Classrooms",
        description: "Our diverse classrooms are designed to foster an engaging learning environment. Equipped with modern teaching aids, comfortable seating, and ample natural light, they provide the perfect setting for interactive and focused academic sessions.",
        features: [
            "Smart Classrooms with Projectors",
            "Ergonomic Seating Arrangements",
            "Well-Ventilated and Spacious",
            "Whiteboards and Audio Systems",
            "High-Speed Wi-Fi Access"
        ],
        image: "https://i.pinimg.com/736x/5f/23/29/5f23298cabac68d068fb1b69bd928adb.jpg",
        icon: Users,
        gallery: []
    },
    "seminar-hall": {
        title: "Seminar Hall",
        description: "A state-of-the-art venue for guest lectures, workshops, and academic presentations. The seminar hall is equipped with advanced audio-visual technology to ensure a seamless sharing of knowledge.",
        features: [
            "Seating capacity of 200+",
            "Advanced Sound System",
            "HD Projector and Large Screen",
            "Air-Conditioned Environment",
            "Acoustically Treated Walls"
        ],
        image: "https://i.pinimg.com/736x/2a/fc/e5/2afce510dee43dad6085a5052be4fbbc.jpg", // Placeholder
        icon: Mic2,
        gallery: []
    },
    "auditorium": {
        title: "Auditorium",
        description: "The grand auditorium is the center of cultural and major academic events. With a large stage and massive seating capacity, it hosts college fests, convocations, and celebrations.",
        features: [
            "Seating capacity of 1000+",
            "Professional Lighting System",
            "Large Stage for Performances",
            "Green Rooms and Backstage Area",
            "Balcony Seating Available"
        ],
        image: "https://i.pinimg.com/736x/65/4d/8b/654d8bc2c4dc40f32657363ef7dc846e.jpg", // Placeholder
        icon: Layout,
        gallery: []
    },
    "library": {
        title: "Library",
        description: "The heart of academic resources, our library houses a vast collection of books, journals, and digital archives to support research and learning.",
        features: [
            "Over 10,000 books and reference materials",
            "Subscription to national and international journals",
            "Digital library with e-books and online databases",
            "Quiet and spacious reading rooms",
            "Computer terminals for research"
        ],
        image: "https://ik.imagekit.io/5c6j602yp/Home/images/library.jpeg",
        icon: Book,
        librarian: {
            name: "Dr. A. Rahman",
            designation: "Chief Librarian",
            qualification: "M.Li.Sc, Ph.D in Library Science",
            image: "https://ui-avatars.com/api/?name=Dr+A+Rahman&background=5D1035&color=fff&size=256",
            message: "Our library is not just a collection of books, but a gateway to knowledge and innovation. We strive to provide the best resources to nurture curious minds."
        }
    },
    "computer-lab": {
        title: "Computer Lab",
        description: "State-of-the-art computer laboratories equipped with the latest hardware and software to keep students abreast of technological advancements.",
        features: [
            "High-configuration workshops",
            "High-speed internet connectivity",
            "Latest software for programming and design",
            "Expert lab assistants",
            "Project work support"
        ],
        image: "https://ik.imagekit.io/5c6j602yp/Home/images/computer-lab.jpeg",
        icon: Monitor,
        labDetails: {
            specs: [
                { cpu: "Intel Core i7 12th Gen", ram: "16GB DDR4", storage: "512GB NVMe SSD", gpu: "NVIDIA RTX 3060" },
                { cpu: "Intel Core i5 11th Gen", ram: "16GB DDR4", storage: "512GB SSD", gpu: "Integrated Iris Xe" }
            ],
            software: [
                "Visual Studio Code", "Python 3.11", "Adobe Creative Cloud", "AutoCAD 2024", "MATLAB", "Android Studio"
            ]
        }
    },
    "rest-rooms": {
        title: "Rest Rooms",
        description: "Clean, hygienic, and well-maintained rest rooms are available on every floor for students and staff, ensuring comfort and sanitation standards are met.",
        features: [
            "Regular Cleaning Schedule",
            "24/7 Water Supply",
            "Sanitary Napkin Dispensers",
            "Separate Staff Restrooms",
            "Disability-Friendly Access"
        ],
        image: "https://i.pinimg.com/736x/fa/39/2d/fa392deb75e8ad9505997b353b9bedb9.jpg", // Placeholder
        icon: Coffee // Using coffee as a generic 'break' icon for now, or could use generic
    },
    "prayer-hall": {
        title: "Prayer Hall",
        description: "A peaceful and serene space dedicated to prayer and meditation, allowing students and staff to find spiritual solace amidst their busy academic schedules.",
        features: [
            "Quiet and Serene Atmosphere",
            "Separate Areas for Men and Women",
            "Ablution Facilities",
            "Open During College Hours",
            "Spiritual Literature Available"
        ],
        image: "https://ik.imagekit.io/5c6j602yp/Home/images/masjid.jpeg", // Placeholder
        icon: Flower,
        gallery: []
    },
    "hostels": {
        title: "Hostels",
        description: "We offer secure and homely accommodation for students coming from distant places. Our hostels are designed to provide a conducive environment for learning and personal growth.",
        features: [
            "Separate hostels for boys and girls",
            "24/7 Security and CCTV surveillance",
            "Spacious and well-ventilated rooms",
            "Hygienic mess providing nutritious meals",
            "Study halls and recreation rooms",
            "Wi-Fi connectivity"
        ],
        image: "https://ik.imagekit.io/5c6j602yp/Home/images/hostel.jpeg",
        icon: Home,
        gallery: [
            "https://ik.imagekit.io/5c6j602yp/Home/images/hostel.jpeg"
        ],
        hostelDetails: {
            boys: { capacity: 150, vacancies: 12, warden: "Mr. Thomas K." },
            girls: { capacity: 200, vacancies: 8, warden: "Mrs. Sheela V." },
            rules: [
                "Students must be inside before 8:00 PM.",
                "Visitors are allowed only on weekends.",
                "Silence hours: 10:00 PM - 6:00 AM.",
                "Mess timings must be strictly followed.",
                "Ragging is strictly prohibited."
            ]
        }
    },
    "canteen": {
        title: "Canteen",
        description: "A vibrant space for students to relax and enjoy healthy, delicious meals. Hygiene and quality are our top priorities.",
        features: [
            "Freshly prepared meals and snacks",
            "Hygienic kitchen and dining area",
            "Affordable prices",
            "Variety of cuisines",
            "Spacious seating arrangement"
        ],
        image: "https://ik.imagekit.io/5c6j602yp/Home/images/canteen.jpeg",
        icon: Utensils
    },
    "bus-facility": {
        title: "Bus Facility",
        description: "Our college provides a safe and convenient bus service covering major routes in and around the city. The fleet of well-maintained buses ensures that students and staff commute comfortably and on time.",
        features: [
            "Fleet of 10+ buses covering 50km radius",
            "Experienced and licensed drivers",
            "GPS tracking for safety",
            "CCTV Surveillance for Enhanced Security",
            "Separate seating for staff and students",
            "Affordable pass rates"
        ],
        image: "https://ik.imagekit.io/5c6j602yp/Home/images/buss.jpeg",
        icon: Bus,
        gallery: [
            "https://ik.imagekit.io/5c6j602yp/Home/images/buss.jpeg",
            "https://ik.imagekit.io/5c6j602yp/Home/images/buss.jpeg"
        ],
        busSchedules: [
            {
                busName: "Bus 1",
                stops: [
                    { route: "Kalliyod", time: "7:15 AM", driver: "Mr. Rajan" },
                    { route: "Pilakkav", time: "7:25 AM" },
                    { route: "Mananthavady", time: "7:40 AM" },
                    { route: "Thonichal", time: "7:50 AM" },
                    { route: "4th mile, Anjukunnu", time: "8:00 AM" },
                    { route: "Panamaram", time: "8:15 AM" },
                    { route: "Nadavayal", time: "8:30 AM" }
                ]
            },
            {
                busName: "Bus 2",
                stops: [
                    { route: "Korom", time: "7:00 AM", driver: "Mr. Babu" },
                    { route: "Makkiyad", time: "7:10 AM" },
                    { route: "12th Mile", time: "7:20 AM" },
                    { route: "Kandathuvayal", time: "7:25 AM" },
                    { route: "10th Mile", time: "7:35 AM" },
                    { route: "Vellamunda 8/4", time: "7:45 AM" },
                    { route: "Tharuvana", time: "7:55 AM" },
                    { route: "Puthusserikkadavu", time: "8:05 AM" },
                    { route: "Padinjarathara", time: "8:15 AM" },
                    { route: "Cheriyamkolly", time: "8:25 AM" },
                    { route: "5th Mile", time: "8:35 AM" },
                    { route: "Panamaram", time: "8:45 AM" },
                    { route: "Nadavayal", time: "9:00 AM" }
                ]
            }
        ]
    },
    "sports-games-facilities": {
        title: "Sports & Games Facilities",
        description: "We promote physical fitness and sportsmanship through excellent sports infrastructure and training facilities.",
        features: [
            "Large playground for cricket and football",
            "Courts for badminton, volleyball, and basketball",
            "Indoor games facility (Table Tennis, Carrom, Chess)",
            "Well-equipped Gymnasium",
            "Annual Sports Meet"
        ],
        image: "https://i.pinimg.com/736x/eb/d9/86/ebd986bdea50b13bb15f3b8c5bf4fc57.jpg",
        icon: Dumbbell,
        achievements: [
            {
                title: "University Champions",
                event: "Inter-Zone Football 2024",
                rank: "Winner",
                image: "https://ik.imagekit.io/5c6j602yp/Home/images/football-team.jpeg", // Placeholder
                date: "March 2024"
            },
            {
                title: "Best Athlete Award",
                event: "State Athletics Meet",
                rank: "Gold",
                image: "https://ik.imagekit.io/5c6j602yp/Home/images/athlete.jpeg", // Placeholder
                date: "Jan 2024"
            },
            {
                title: "Cricket Runners Up",
                event: "District Cricket League",
                rank: "Runner Up",
                image: "https://ik.imagekit.io/5c6j602yp/Home/images/cricket.jpeg", // Placeholder
                date: "Dec 2023"
            }
        ]
    }
};
