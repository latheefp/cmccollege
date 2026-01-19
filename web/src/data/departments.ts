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
    displayName?: string;
    about: string;
    vision: string;
    mission: string[]; // Changed to array for bullet points
    objectives: string;
    courses: string | { title: string; description: string }[];
    highlights: string[];
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
        about: "The Department of Computer Science was established in the year 2010. The department curriculum has to keep abreast of the new concepts and applications and keep the students updated. The department is well equipped, and Project work is a part of the curriculum. Department exposure to latest technologies to inculcate ideas which bridge the industry gap in the IT sector by bounding to social ethics by conducting workshops, seminars, and tech talks.",
        vision: "BCA programme is to empower students with cutting-edge knowledge and skills in computer applications, preparing them to become innovative professionals and leaders in the IT industry.",
        mission: [
            "Impart quality education in computer applications with a strong theoretical and practical foundation.",
            "Develop proficient software professionals with skills in programming, database management, and system design.",
            "Encourage analytical thinking and problem-solving abilities through real-world project exposure.",
            "Promote ethical values and professionalism in the field of Information Technology.",
            "Prepare students for careers in the IT industry and for pursuing higher studies in computer science.",
            "Foster innovation and adaptability to meet the evolving demands of technology.",
            "Enhance communication and teamwork skills for effective collaboration in professional environments.",
            "Encourage continuous learning and research in emerging areas of computing."
        ],
        objectives: "BCA (Bachelor of Computer Applications) course is to provide students with a solid foundation in computer science and its practical applications. It aims to develop their programming skills, analytical thinking, and problem-solving abilities through hands-on experience with modern programming languages and software development tools. The course prepares students for successful careers in the IT industry by equipping them with knowledge in areas like software development, web technologies, databases, and networking. It also fosters communication, teamwork, and ethical values while encouraging continuous learning and innovation to keep up with the evolving technological landscape and to pursue higher education or professional certifications.",
        courses: "The Department of Computer Science offers a 4year BCA and BSc Computer Science honours degree with the following add on courses.",
        highlights: [
            "Annual IT Fest ‘Techastra”",
            "Modern Computer Lab",
            "Strong Industry Connections",
            "Industry Ready Graduates"
        ],
        strengths: [
            { icon: Cpu, text: "AI & Robotics Labs", sub: "Cutting-edge infrastructure" },
            { icon: Users, text: "Industry Partnerships", sub: "MOU with tech giants" },
            { icon: GraduationCap, text: "Placement Highlights", sub: "95% success rate" },
            { icon: Building2, text: "Innovation Hub", sub: "Entrepreneurship cell" }
        ],
        hod: {
            name: "Rajitha P",
            qualification: "Master of Computer Applications",
            quote: "Our goal is to transcend traditional learning and build a bridge between academia and the ever-evolving tech industry.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Sumayya U", role: "Academic Coordinator", spec: "Artificial Intelligence", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/sumayya-u.jpg" },
            { name: "Rijilanadh", role: "Assistant Professor", spec: "Cyber Security", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/rijila-nath.jpg" },
            { name: "Vivek M V", role: "Lab Assistant", spec: "Data Science", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/vivek-mv-200x250.jpg" },
            { name: "Asliya A", role: "Assistant Professor", spec: "Software Architecture", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/Gallery/image1?updatedAt=1768829462746", category: "" },
            { img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/Gallery/image3?updatedAt=1768830080087", category: "" },
            { img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/Gallery/image2?updatedAt=1768830059492", category: "" },
            { img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/Gallery/image5", category: "" },
            { img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/Gallery/image4", category: "" },

        ]
    },
    "management": {
        about: "BBA programmes typically cover a wide range of business related subjects. It is designed to provide students with a comprehensive understanding of various aspects of business administration. Additionally, students may have the opportunity to specialize in areas such as entrepreneurship, international business or human resource management. The curriculum often includes a mix of theoretical knowledge, practical skill development and internships.",
        vision: "The BBA course is to develop future business leaders with strong analytical, managerial, and entrepreneurial skills, grounded in ethical and global perspectives.",
        mission: [
            "Provide foundational knowledge in core areas of business such as management, marketing, finance, and accounting.",
            "Develop critical thinking and problem-solving skills for effective decision-making in business environments.",
            "Enhance leadership and communication abilities to prepare students for managerial roles.",
            "Promote ethical and socially responsible business practices.",
            "Encourage innovation and entrepreneurial thinking for adapting to a dynamic global market.",
            "Foster a global perspective through exposure to international business trends and practices.",
            "Prepare students for higher studies or professional careers through practical learning and internships."
        ],
        objectives: "To provide comprehensive management education and develop leadership skills.",
        courses: "BBA (Bachelor of Business Administration)",
        highlights: [
            "Management Fest",
            "Placement Cell",
            "Business startup ideas"
        ],
        strengths: [
            { icon: TrendingUp, text: "Business Analytics", sub: "Data-driven decision making" },
            { icon: Globe, text: "Global Exposure", sub: "International seminars" },
            { icon: Users, text: "Case Study Method", sub: "Practical problem solving" },
            { icon: Building2, text: "Leadership Cell", sub: "Executive development" }
        ],
        hod: {
            name: "Athira P",
            qualification: "MBA, Ph.D in Strategic Management",
            quote: "Management is about more than just business; it is about leading with integrity and vision in a complex world.",
            img: "/images/Principal.jpeg"
        },
        faculty: [
            { name: "Jaseela C M", role: "Assistant Professor", spec: "Finance", img: "/images/Principal.jpeg" },
            { name: "Aysha K P", role: "Assistant Professor", spec: "HR Management", img: "/images/Principal.jpeg" },
            { name: "Sini John", role: "Assistant Professor", spec: "Operations", img: "/images/Principal.jpeg" },
        ],
        gallery: [
            { img: "/images/clg_1.png", category: "CONFERENCE ROOM" },
            { img: "/images/Principal.jpeg", category: "SEMINAR HALL" },
            { img: "/images/academic_excellence_1768115933614.png", category: "LIBRARY" }
        ]
    },
    "mass-communication": {
        displayName: "Mass Communication and Journalism",
        about: "The CM School of Media Studies offers a 4-year course in Mass Communication and Journalism, combining theoretical and practical concepts, with a focus on making students aware of various nuances of the media industry. The department has full-fledged faculties and a media lab for practical sessions. The School of Media studies introduces students to the media field scientifically and motivates them to think in the most creative way, as well as to mould a new media literate society.",
        vision: "Creating a generation of responsible journalists.",
        mission: [
            "To empower aspiring journalists with the skills, ethics, and critical thinking necessary to serve as the pillars of a democratic and informed society."
        ],
        objectives: "To train students in modern media practices.",
        courses: [
            {
                title: "Introduction to Photography",
                description: "Capture the world through your lens and unleash your artistic vision with our introduction to Photography course. Whether you’re a budding enthusiast or a complete novice, this course will teach you the fundamentals of photography, from mastering composition to understanding light and exposure."
            },
            {
                title: "Basics of media software package",
                description: "Learn essential tools for media creation and editing and explore features of popular software like Adobe Creative Suite, including Photoshop for image editing, Premiere Pro for video editing, and Audition for audio editing. Gain skills in media manipulation enhancement and production workflows."
            },
            {
                title: "Basics of Graphic Design",
                description: "Design is everywhere, and in our basics of Graphic Design course, you’ll learn how to create impactful visual communication that stands out in a crowded digital landscape. From understanding color theory to mastering typography, this course will equip you with the foundational skills needed to craft compelling designs for print and digital media."
            },
            {
                title: "Introduction to RJ & VJ",
                description: "Explore the dynamic world of Radio Jockeying (RJ) and Video Jockeying (VJ). Learn the art of engaging audiences through captivating storytelling, creative presentation skills, and effective communication techniques. Dive into the history, evolution, and modern practices of RJ & VJ, gaining insights into their roles in the entertainment industry."
            },
            {
                title: "Introduction to online content creation",
                description: "With the rise of digital platforms, the demand for engaging online content has never been higher. Our introduction to online content creation course will teach you how to create competing content that captivates audiences across various online Platforms."
            }
        ],
        highlights: [
            "Media lab and inhouse production unit",
            "Annual media festiva (aykya Media Festum)",
            "Media Internship project",
            "Masscomm start-up",
            "Paper presentation & ISBN publication"
        ],
        strengths: [
            { icon: Mic2, text: "Media Studio", sub: "Full HD production setup" },
            { icon: BookOpen, text: "Print Media Lab", sub: "Desktop publishing" },
            { icon: Users, text: "Industry Internships", sub: "Tie-ups with leading channels" },
            { icon: Globe, text: "Digital Journalism", sub: "Focus on social media trends" }
        ],
        hod: {
            name: "Vidhya Viswanath",
            qualification: "M.A. Journalism",
            quote: "Truth is the only currency in journalism. We prepare our students to find it and tell it effectively.",
            img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Masscom/hod-masscom.jpg"
        },
        faculty: [
            { name: "Athira P R", role: "Assistant Professor", spec: "Broadcast Journalism", img: "/images/default-user-placeholder.png" },
            { name: "Shafvana Sherin M", role: "Assistant Professor", spec: "Mass Communication", img: "/images/default-user-placeholder.png" },
        ],
        gallery: [
            { img: "/images/modern_science_lab_1768116682208.png", category: "MEDIA LAB" },
            { img: "/images/science_exhibition_project_1768117868795.png", category: "NEWS ROOM" },
            { img: "/images/classroom_learning_1768115518451.png", category: "STUDIO" }
        ]
    },
    "economics": {
        about: "Analyzing the forces that shape our world.",
        vision: "To create economic thinkers for a better tomorrow.",
        mission: [
            "To analyze and interpret complex economic phenomena, fostering a deep understanding of market dynamics and social welfare policies."
        ],
        objectives: "To provide deep insights into economic theories and policies.",
        courses: "BA Economics",
        highlights: ["Economic Forum", "Budget Analysis Sessions"],
        strengths: [
            { icon: PieChart, text: "Statistical Analysis", sub: "Advanced econometrics" },
            { icon: TrendingUp, text: "Policy Research", sub: "Global economic trends" },
            { icon: Globe, text: "Macro Studies", sub: "National & Int'l economics" },
            { icon: Users, text: "Seminar Series", sub: "Dialogues with economists" }
        ],
        hod: {
            name: "Safiya E C",
            qualification: "Ph.D in Applied Economics",
            quote: "Understanding scarcity and choice is fundamental to building a more equitable and efficient world.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Anna Biju", role: "Assistant Professor", spec: "Development Economics", img: "/images/default-user-placeholder.png" }
        ],
        gallery: [
            { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX9R9qeanfxjMODGRgK_Lx9pgzgwgZ7zEmwQ&s", category: "RESEARCH WING" }
        ]
    },
    "english": {
        about: "Celebrating the power of language and literature.",
        vision: "To be a hub of literary and cultural studies.",
        mission: [
            "To cultivate a lifetime appreciation for literature and language, enhancing students' communicative competence and critical literary analysis."
        ],
        objectives: "To enhance critical thinking through literature.",
        courses: "BA English Language and Literature",
        highlights: ["Literary Fest", "Creative Writing Workshops"],
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
        about: "Building the financial backbone of the future.",
        vision: "Excellence in commerce and financial education.",
        mission: [
            "To produce ethical business professionals equipped with modern accounting, taxation, and financial management skills for the corporate world."
        ],
        objectives: "To prepare students for professional careers in finance and commerce.",
        courses: "B.Com Finance, B.Com Co-operation",
        highlights: ["Tally & GST Training", "Investment Workshops"],
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
        about: "Unlocking the power of data.",
        vision: "To lead in statistical research and education.",
        mission: [
            "To decipher the language of data and provide students with the mathematical and computational tools to model uncertainty and drive discovery."
        ],
        objectives: "To develop strong analytical and statistical skills.",
        courses: "B.Sc Statistics",
        highlights: ["Data Analysis Lab", "Statistical Software Training"],
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
        about: "Understanding the human mind and behavior.",
        vision: "To promote mental health and well-being.",
        mission: [
            "To explore the intricacies of human behavior and mental processes, promoting well-being and understanding through scientific inquiry and empathy."
        ],
        objectives: "To provide a scientific understanding of human behavior.",
        courses: "B.Sc Psychology",
        highlights: ["Counseling Center", "Behavioral Lab"],
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
