import {
    Cpu,
    Users,
    GraduationCap,
    Building2,
    Mic2,
    Globe,
    PieChart,
    BookOpen,
    TrendingUp,
    Brain,
    Microscope,
    Scale
} from "lucide-react";

export interface DepartmentData {
    mission: string;
    strengths: {
        icon: any;
        text: string;
        sub: string;
    }[];
    hod: {
        name: string;
        qualification: string;
        quote: string;
        img: string;
    };
    faculty: {
        name: string;
        role: string;
        spec: string;
        img: string;
    }[];
    gallery: {
        img: string;
        category: string;
    }[];
}

export const DEPARTMENT_DATA: Record<string, DepartmentData> = {
    "computer-science": {
        mission: "To produce globally competent computer professionals by providing high-quality education, encouraging research mindset, and instilling strong ethical values tailored to meet industrial demands.",
        strengths: [
            { icon: Cpu, text: "AI & Robotics Labs", sub: "Cutting-edge infrastructure" },
            { icon: Users, text: "Industry Partnerships", sub: "MOU with tech giants" },
            { icon: GraduationCap, text: "Placement Highlights", sub: "95% success rate" },
            { icon: Building2, text: "Innovation Hub", sub: "Entrepreneurship cell" }
        ],
        hod: {
            name: "Dr. Abdul Rasheed",
            qualification: "Ph.D in Cloud Architectures",
            quote: "Our goal is to transcend traditional learning and build a bridge between academia and the ever-evolving tech industry.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Dr. Sarah Chen", role: "Professor", spec: "Artificial Intelligence", img: "/images/Principal.jpeg" },
            { name: "Prof. James Wilson", role: "Assistant Professor", spec: "Cyber Security", img: "/images/Principal.jpeg" },
            { name: "Dr. Emily Rodriguez", role: "Lecturer", spec: "Data Science", img: "/images/Principal.jpeg" },
            { name: "Prof. Michael Zhang", role: "Industry Expert", spec: "Software Architecture", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/modern_science_lab_1768116682208.png", category: "AI LAB" },
            { img: "/images/classroom_learning_1768115518451.png", category: "DEBATE HALL" },
            { img: "/images/science_exhibition_project_1768117868795.png", category: "PROJECT HUB" }
        ]
    },
    "management": {
        mission: "To nurture future-ready business leaders through a blend of academic rigor, practical exposure, and ethical grounding in the global management landscape.",
        strengths: [
            { icon: TrendingUp, text: "Business Analytics", sub: "Data-driven decision making" },
            { icon: Globe, text: "Global Exposure", sub: "International seminars" },
            { icon: Users, text: "Case Study Method", sub: "Practical problem solving" },
            { icon: Building2, text: "Leadership Cell", sub: "Executive development" }
        ],
        hod: {
            name: "Dr. Thomas Kurian",
            qualification: "MBA, Ph.D in Strategic Management",
            quote: "Management is about more than just business; it is about leading with integrity and vision in a complex world.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Prof. Anjali Nair", role: "Assistant Professor", spec: "Marketing", img: "/images/Principal.jpeg" },
            { name: "Dr. Robert Smith", role: "Professor", spec: "Finance", img: "/images/Principal.jpeg" },
            { name: "Ms. Priya Sharma", role: "Lecturer", spec: "HR Management", img: "/images/Principal.jpeg" },
            { name: "Mr. David Miller", role: "Adjunct Professor", spec: "Operations", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/clg_1.png", category: "CONFERENCE ROOM" },
            { img: "/images/Principal.jpeg", category: "SEMINAR HALL" },
            { img: "/images/academic_excellence_1768115933614.png", category: "LIBRARY" }
        ]
    },
    "journalism": {
        mission: "To empower aspiring journalists with the skills, ethics, and critical thinking necessary to serve as the pillars of a democratic and informed society.",
        strengths: [
            { icon: Mic2, text: "Media Studio", sub: "Full HD production setup" },
            { icon: BookOpen, text: "Print Media Lab", sub: "Desktop publishing" },
            { icon: Users, text: "Industry Internships", sub: "Tie-ups with leading channels" },
            { icon: Globe, text: "Digital Journalism", sub: "Focus on social media trends" }
        ],
        hod: {
            name: "Prof. Sarah Mathews",
            qualification: "M.A. Journalism, M.Phil",
            quote: "Truth is the only currency in journalism. We prepare our students to find it and tell it effectively.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Mr. Arun Varghese", role: "Assistant Professor", spec: "Broadcast Journalism", img: "/images/Principal.jpeg" },
            { name: "Ms. Meera Iyer", role: "Lecturer", spec: "Mass Communication", img: "/images/Principal.jpeg" },
            { name: "Dr. John Doe", role: "Professor", spec: "Media Ethics", img: "/images/Principal.jpeg" },
            { name: "Ms. Lisa Wong", role: "Guest Faculty", spec: "Photojournalism", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/modern_science_lab_1768116682208.png", category: "MEDIA LAB" },
            { img: "/images/science_exhibition_project_1768117868795.png", category: "NEWS ROOM" },
            { img: "/images/classroom_learning_1768115518451.png", category: "STUDIO" }
        ]
    },
    "economics": {
        mission: "To analyze and interpret complex economic phenomena, fostering a deep understanding of market dynamics and social welfare policies.",
        strengths: [
            { icon: PieChart, text: "Statistical Analysis", sub: "Advanced econometrics" },
            { icon: TrendingUp, text: "Policy Research", sub: "Global economic trends" },
            { icon: Globe, text: "Macro Studies", sub: "National & Int'l economics" },
            { icon: Users, text: "Seminar Series", sub: "Dialogues with economists" }
        ],
        hod: {
            name: "Dr. Rajesh Kumar",
            qualification: "Ph.D in Applied Economics",
            quote: "Understanding scarcity and choice is fundamental to building a more equitable and efficient world.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Dr. Linda Garcia", role: "Professor", spec: "Development Economics", img: "/images/Principal.jpeg" },
            { name: "Mr. Kevin Peters", role: "Assistant Professor", spec: "Microeconomics", img: "/images/Principal.jpeg" },
            { name: "Ms. Sara Ali", role: "Lecturer", spec: "Mathematical Economics", img: "/images/Principal.jpeg" },
            { name: "Dr. Paul Walker", role: "Professor", spec: "Econometrics", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/clg_1.png", category: "RESEARCH WING" },
            { img: "/images/academic_excellence_1768115933614.png", category: "ARCHIVE" },
            { img: "/images/Principal.jpeg", category: "DEBATE HALL" }
        ]
    },
    "english": {
        mission: "To cultivate a lifetime appreciation for literature and language, enhancing students' communicative competence and critical literary analysis.",
        strengths: [
            { icon: BookOpen, text: "Literary Societies", sub: "Focus on classics & modern" },
            { icon: Users, text: "Language Lab", sub: "Phonetics & communication" },
            { icon: GraduationCap, text: "Creative Writing", sub: "Workshops by authors" },
            { icon: Globe, text: "Cultural Studies", sub: "Literature across borders" }
        ],
        hod: {
            name: "Dr. Elizabeth George",
            qualification: "Ph.D in English Literature",
            quote: "Language is the portal to human experience. We aim to make our students masters of this portal.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Ms. Susan Jacob", role: "Assistant Professor", spec: "British Literature", img: "/images/Principal.jpeg" },
            { name: "Dr. Mark Twain", role: "Professor", spec: "American Lit", img: "/images/Principal.jpeg" },
            { name: "Mr. Alan Poe", role: "Lecturer", spec: "Poetry & Arts", img: "/images/Principal.jpeg" },
            { name: "Ms. Jane Austen", role: "Guest Faculty", spec: "Victorian Studies", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/academic_excellence_1768115933614.png", category: "LIBRARY" },
            { img: "/images/classroom_learning_1768115518451.png", category: "WRITING HUB" },
            { img: "/images/Principal.jpeg", category: "READING ROOM" }
        ]
    },
    "commerce": {
        mission: "To produce ethical business professionals equipped with modern accounting, taxation, and financial management skills for the corporate world.",
        strengths: [
            { icon: TrendingUp, text: "Accounting Tally", sub: "Industry standard training" },
            { icon: Scale, text: "Taxation Laws", sub: "Direct & Indirect tax focus" },
            { icon: Users, text: "Stock Market Club", sub: "Real-time trading simulation" },
            { icon: Building2, text: "Corporate Tie-ups", sub: "Trained by CA/CS experts" }
        ],
        hod: {
            name: "Prof. Mohammed Iqbal",
            qualification: "M.Com, M.Phil, Ph.D",
            quote: "In commerce, ethics is the foundation of trust, and skill is the engine of growth.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Mr. Faisal Rahman", role: "Assistant Professor", spec: "Audit & Tax", img: "/images/Principal.jpeg" },
            { name: "Ms. Reena George", role: "Lecturer", spec: "Corporate Law", img: "/images/Principal.jpeg" },
            { name: "Dr. James Bond", role: "Professor", spec: "Strategic Finance", img: "/images/Principal.jpeg" },
            { name: "Mr. Tony Stark", role: "Industry Lead", spec: "Business Analytics", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/science_exhibition_project_1768117868795.png", category: "BUSINESS LAB" },
            { img: "/images/clg_1.png", category: "SEMINAR HALL" },
            { img: "/images/Principal.jpeg", category: "MAIN HALL" }
        ]
    },
    "statistics": {
        mission: "To decipher the language of data and provide students with the mathematical and computational tools to model uncertainty and drive discovery.",
        strengths: [
            { icon: PieChart, text: "Data Analytics", sub: "Specialization in R & Python" },
            { icon: Microscope, text: "Probability Models", sub: "Real-world applications" },
            { icon: Cpu, text: "Computation Lab", sub: "Advanced statistical software" },
            { icon: Users, text: "Research Methods", sub: "Focus on survey design" }
        ],
        hod: {
            name: "Dr. Sreekumar Menon",
            qualification: "M.Sc, Ph.D in Statistics",
            quote: "Statistics is the science of learning from data and measuring, controlling, and communicating uncertainty.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Dr. Ada Lovelace", role: "Professor", spec: "Theoretical Stats", img: "/images/Principal.jpeg" },
            { name: "Mr. Isaac Newton", role: "Assistant Professor", spec: "Probability", img: "/images/Principal.jpeg" },
            { name: "Ms. Marie Curie", role: "Lecturer", spec: "Applied Stats", img: "/images/Principal.jpeg" },
            { name: "Dr. Alan Turing", role: "Professor", spec: "Stochastic Processes", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/modern_science_lab_1768116682208.png", category: "STAT LAB" },
            { img: "/images/science_exhibition_project_1768117868795.png", category: "CALCULATION HUB" },
            { img: "/images/academic_excellence_1768115933614.png", category: "LIBRARY" }
        ]
    },
    "psychology": {
        mission: "To explore the intricacies of human behavior and mental processes, promoting well-being and understanding through scientific inquiry and empathy.",
        strengths: [
            { icon: Brain, text: "Counseling Lab", sub: "Clinical observation setup" },
            { icon: Users, text: "Behavior Studies", sub: "Experimental research focus" },
            { icon: GraduationCap, text: "Therapy Workshops", sub: "Hands-on mental wellness" },
            { icon: Globe, text: "Social Psychology", sub: "Understanding group dynamics" }
        ],
        hod: {
            name: "Dr. Lakshmi Nair",
            qualification: "Ph.D in Clinical Psychology",
            quote: "The mind is the last frontier. We guide our students to navigate it with science and compassion.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Dr. Sigmund Freud", role: "Professor", spec: "Psychoanalysis", img: "/images/Principal.jpeg" },
            { name: "Ms. Anna Wright", role: "Assistant Professor", spec: "Child Psychology", img: "/images/Principal.jpeg" },
            { name: "Mr. Carl Jung", role: "Lecturer", spec: "Cognitive Psychology", img: "/images/Principal.jpeg" },
            { name: "Ms. Helen Keller", role: "Professor", spec: "Educational Psy", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/classroom_learning_1768115518451.png", category: "OBSERVATION LAB" },
            { img: "/images/Principal.jpeg", category: "COUNSELING ROOM" },
            { img: "/images/science_exhibition_project_1768117868795.png", category: "SEMINAR HALL" }
        ]
    }
};
