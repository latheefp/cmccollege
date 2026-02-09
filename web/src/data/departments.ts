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
    Scale,
    Briefcase,
    Search,
    Heart
} from "lucide-react";

export interface DepartmentData {
    displayName?: string;
    about: string;
    vision: string;
    mission: string[]; // Changed to array for bullet points
    objectives: string;
    courses: string | { title: string; description?: string }[];
    addOnCourses?: string[];
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
        courses: [
            { title: "BCA Honours" },
            { title: "BSc Computer Science Honours" }
        ],
        addOnCourses: [
            "Cloud Computing",
            "Cyber Security",
            "Data Analytics",
            "Artificial Intelligence"
        ],
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
            name: "Rajitha P R",
            qualification: "Master of Computer Applications",
            quote: "Our goal is to transcend traditional learning and build a bridge between academia and the ever-evolving tech industry.",
            img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/rajitha.jpeg?updatedAt=1770370362231"
        },
        faculty: [
            { name: "Sumayya U", role: "Academic Coordinator", spec: "Artificial Intelligence", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/sumayya-u.jpg" },
            { name: "Rijilanadh", role: "Assistant Professor", spec: "Cyber Security", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/rijila-nath.jpg" },
            { name: "Vivek M V", role: "Lab Assistant", spec: "Data Science", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/vivek-mv-200x250.jpg" },
            { name: "Asliya A", role: "Assistant Professor", spec: "Software Architecture", img: "/images/default-user-placeholder.png" },
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/Gallery/image1?updatedAt=1768829462746", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/Gallery/image3?updatedAt=1768830080087", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/Gallery/image2?updatedAt=1768830059492", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/Gallery/image5", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Computer%20Science/Gallery/image4", category: "" },

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
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Jaseela C M", role: "Assistant Professor", spec: "Finance", img: "/images/default-user-placeholder.png" },
            { name: "Aysha K P", role: "Assistant Professor", spec: "HR Management", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/Ayisha?updatedAt=1770620889342" },
            { name: "Sini John", role: "Assistant Professor", spec: "Operations", img: "/images/default-user-placeholder.png" },
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/New%20Folder/image1", category: "CONFERENCE ROOM" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/New%20Folder/image2", category: "SEMINAR HALL" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/New%20Folder/image3", category: "LIBRARY" }
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
            img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Masscom/hod-masscom.jpg"
        },
        faculty: [
            { name: "Athira P R", role: "Assistant Professor", spec: "Broadcast Journalism", img: "/images/default-user-placeholder.png" },
            { name: "Shafvana Sherin M", role: "Assistant Professor", spec: "Mass Communication", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Masscom/Safwana" },
        ],
        gallery: [
            { img: "/images/modern_science_lab_1768116682208.png", category: "MEDIA LAB" },
            { img: "/images/science_exhibition_project_1768117868795.png", category: "NEWS ROOM" },
            { img: "/images/classroom_learning_1768115518451.png", category: "STUDIO" }
        ]
    },
    "economics": {
        about: "The department of economics is an academic unit focuses on the study of Economics system, theories and policies. Typically offers undergraduate programmes, conducting research and contributing to the understanding of economic phenomenon.",
        vision: "Bachelor of Arts (BA) in Economics programme is to equip students with a strong foundation in economic theory, analytical thinking, and practical problem-solving skills. It aims to develop graduates who can understand and interpret economic issues, contribute to policy-making, and address real-world challenges in both local and global contexts. The program envisions producing well-rounded individuals who are capable of using economic knowledge ethically and effectively to foster sustainable development, social equity, and economic progress.",
        mission: [
            "To provide a strong foundation in economic theory and quantitative analysis for understanding real-world economic issues.",
            "To develop critical thinking and problem-solving skills that enable students to analyze and interpret economic data effectively.",
            "To prepare students for diverse career paths in government, business, research, and academia by equipping them with relevant knowledge and skills.",
            "To promote ethical and socially responsible decision-making in economic policy and business practices.",
            "To encourage lifelong learning and research by fostering intellectual curiosity and an understanding of global economic systems and trends."
        ],
        objectives: "To provide deep insights into economic theories and policies.",
        courses: "Bachelor of Arts (BA) in Economics",
        highlights: [
            "Annual Econ-Fest",
            "Economic Startup",
            "Exhibition",
            "Financial Literary class"
        ],
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
            img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Ecnomics/Safiya.jpeg"
        },
        faculty: [
            { name: "Anna Biju", role: "Assistant Professor", spec: "Development Economics", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Ecnomics/Anna.jpeg" }
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Ecnomics/image1.jpg", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Ecnomics/image2", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Ecnomics/image3", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Ecnomics/image4", category: "" },
        ]
    },
    "english": {
        about: "Department provides education and training in various fields, and it is involved in many aspects of society. The department offers training in writing and communication skills across various disciplines. The department offers a wide range of courses and areas of specialization that focus on the study of language, literature, culture and Communication.",
        vision: "To be a hub of literary and cultural studies.",
        mission: [
            "To cultivate a lifetime appreciation for literature and language, enhancing students' communicative competence and critical literary analysis."
        ],
        objectives: "To enhance critical thinking through literature.",
        courses: [
            { title: "BA English Language and Literature Honours", description: "Undergraduate Programme" },
            { title: "MA English Language and Literature", description: "Postgraduate Programme" },
            { title: "Certificate in Communicative English Skills", description: "Add-on Course" },
            { title: "Certificate in Digital Media and Communication", description: "Add-on Course" },
            { title: "Certificate in Academic Writing and Professional Skill", description: "Add-on Course" }
        ],
        highlights: [
            "Extensive library and reading room",
            "Talk with experts",
            "Meet with foreigners",
            "Debate and Workshops",
            "Discussion forums",
            "Guidance for higher studies",
            "CLF CM College Literature Festival",
            "SPARK Monthly series talk"
        ],
        strengths: [
            { icon: BookOpen, text: "Literary Societies", sub: "Focus on classics & modern" },
            { icon: Users, text: "Language Lab", sub: "Phonetics & communication" },
            { icon: GraduationCap, text: "Creative Writing", sub: "Workshops by authors" },
            { icon: Globe, text: "Cultural Studies", sub: "Literature across borders" }
        ],
        hod: {
            name: "Unais T A",
            qualification: "Ph.D in English Literature",
            quote: "Language is the portal to human experience. We aim to make our students masters of this portal.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Ashif T A", role: "Assistant Professor", spec: "British Literature", img: "/images/default-user-placeholder.png" },
            { name: "Ameera M", role: "Assistant Professor", spec: "American Lit", img: "/images/default-user-placeholder.png" },
            { name: "Sara Subula", role: "Assistant Professor", spec: "Poetry & Arts", img: "/images/default-user-placeholder.png" },
            { name: "Ajmal Musharaf", role: "Assistant Professor", spec: "Victorian Studies", img: "/images/default-user-placeholder.png" },
            { name: "Aiswarya Manoj", role: "Assistant Professor", spec: "Victorian Studies", img: "/images/default-user-placeholder.png" },
        ],
        gallery: [
            { img: "/images/academic_excellence_1768115933614.png", category: "LIBRARY" },
            { img: "/images/classroom_learning_1768115518451.png", category: "WRITING HUB" },
            { img: "/images/Principal.jpeg", category: "READING ROOM" }
        ]
    },
    "commerce": {
        about: "PG Department of Commerce offers students a comprehensive academic experience for the ever changing needs of the financial world. Our three distinctive programmes – BCom in Computer Applications, BCom in finance and MCom in Finance – equip the students for a variety of career choices and provide focused mentoring and specialized training in accounting, finance, technology and business. Through the inclusion of advanced teaching methodologies and industrial linkages, we aim to improve the overall professional development of students specific to the industrial requirements.",
        vision: "Excellence in commerce and financial education.",
        mission: [
            "To produce ethical business professionals equipped with modern accounting, taxation, and financial management skills for the corporate world.",
            "To improve the overall professional development of students specific to the industrial requirements through advanced teaching methodologies."
        ],
        objectives: "To prepare students for professional careers in finance, commerce, and digital business.",
        courses: [
            { title: "B.Com Computer Applications (Honours)", description: "Four years honours degree with specialization in Computer Application." },
            { title: "B.Com Finance (Honours)", description: "Four years honours degree with specialization in Finance." },
            { title: "M.Com Finance", description: "Master’s Degree in Commerce with specialization in Finance." },
            { title: "Certification program in Supply Chain Management", description: "Students can work for decades in SCM and still learn new things every day. The field of SCM expands and changes every day. Whether it is new technologies, new management methodologies, new firms and products – the one constant in SCM is 'change'." },
            { title: "Certification Program in Master Mind Accounting", description: "Mastermind Accounting Programme provides services that are meant to fulfill the extensive and wide-ranging need for accountancy specialists with up to date and sound fundamental knowledge of the subject apart from a superior technical understanding of all facets of accountancy." },
            { title: "GST using Tally", description: "This course has modules ranging from the fundamentals of GST to practical of GST using Tally and from workplace communication. The program is enriched with varied business scenarios, charts, observations, solved illustrations, and practice scenarios on Tally." },
            { title: "Certification program in Digital Marketing", description: "Comprehensive training on online marketing strategies, analytics, SEO, social media, and content marketing to enhance skills and career prospects in the digital realm." }
        ],
        highlights: [
            "Placement Drives",
            "Internship Programs for Industry Exposure",
            "Commerce Fest",
            "Business Expo",
            "Well-equipped Computer Lab",
            "Students and Faculty exchange programme",
            "Entrepreneurship Development and startup Initiatives",
            "Add on Programmes"
        ],
        strengths: [
            { icon: TrendingUp, text: "Accounting Tally", sub: "Industry standard training" },
            { icon: Scale, text: "Taxation Laws", sub: "Direct & Indirect tax focus" },
            { icon: Users, text: "Stock Market Club", sub: "Real-time trading simulation" },
            { icon: Building2, text: "Corporate Tie-ups", sub: "Trained by CA/CS experts" }
        ],
        hod: {
            name: "Shibu Krishnan",
            qualification: "M.Com, M.Phil",
            quote: "In commerce, ethics is the foundation of trust, and skill is the engine of growth.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Bindu S.G", role: "Assistant Professor", spec: "Commerce", img: "/images/default-user-placeholder.png" },
            { name: "Shefeena K.T", role: "Assistant Professor", spec: "Commerce", img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Commerce/shefeena?updatedAt=1770620563560" },
            { name: "Jamsheena", role: "Assistant Professor", spec: "Commerce", img: "/images/default-user-placeholder.png" },
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Commerce/Gallery/image1", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Commerce/Gallery/image2", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Commerce/Gallery/image3", category: "" },
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Commerce/Gallery/image4", category: "" },
        ]
    },
    "human-resource-management": {
        about: "Focusing on the strategic management of human capital.",
        vision: "To develop future leaders in human resource management.",
        mission: [
            "To provide comprehensive education in human resource practices, organizational behavior, and strategic management."
        ],
        objectives: "To equip students with HR management skills.",
        courses: "BA Human Resource Management",
        highlights: ["HR Workshops", "Management Training"],
        strengths: [
            { icon: Users, text: "HR Analytics", sub: "Data-driven decisions" },
            { icon: TrendingUp, text: "Strategic Management", sub: "Leadership focus" },
            { icon: Scale, text: "Labor Laws", sub: "Compliance & Relations" },
            { icon: Briefcase, text: "Internships", sub: "Corporate exposure" }
        ],
        hod: {
            name: "HOD Name",
            qualification: "Qualification",
            quote: "Leadership is about empowering others.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Faculty 1", role: "Assistant Professor", spec: "HR", img: "/images/default-user-placeholder.png" }
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/New%20Folder/image1?updatedAt=1768829462746", category: "HR LAB" }
        ]
    },
    "sociology": {
        about: "Studying the structure, development, and functioning of human society.",
        vision: "To foster a deep understanding of social dynamics and cultural diversity.",
        mission: [
            "To provide students with the theoretical and methodological tools to analyze social phenomena and contribute to social justice."
        ],
        objectives: "To develop critical sociological thinking.",
        courses: "BA Sociology",
        highlights: ["Social Research", "Community Outreach"],
        strengths: [
            { icon: Users, text: "Social Theory", sub: "Classical & Contemporary" },
            { icon: Globe, text: "Cultural Studies", sub: "Global perspectives" },
            { icon: BookOpen, text: "Field Research", sub: "Ethnographic studies" },
            { icon: Users, text: "Social Work", sub: "Community engagement" }
        ],
        hod: {
            name: "HOD Name",
            qualification: "Qualification",
            quote: "Society is the mirror of our collective actions.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Faculty 1", role: "Assistant Professor", spec: "Sociology", img: "/images/default-user-placeholder.png" }
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/New%20Folder/image2", category: "SOCIAL LAB" }
        ]
    },
    "Multimedia": {
        about: "Studying the structure, development, and functioning of human society.",
        vision: "To foster a deep understanding of social dynamics and cultural diversity.",
        mission: [
            "To provide students with the theoretical and methodological tools to analyze social phenomena and contribute to social justice."
        ],
        objectives: "To develop critical sociological thinking.",
        courses: "BA Sociology",
        highlights: ["Social Research", "Community Outreach"],
        strengths: [
            { icon: Users, text: "Social Theory", sub: "Classical & Contemporary" },
            { icon: Globe, text: "Cultural Studies", sub: "Global perspectives" },
            { icon: BookOpen, text: "Field Research", sub: "Ethnographic studies" },
            { icon: Users, text: "Social Work", sub: "Community engagement" }
        ],
        hod: {
            name: "HOD Name",
            qualification: "Qualification",
            quote: "Society is the mirror of our collective actions.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Faculty 1", role: "Assistant Professor", spec: "Sociology", img: "/images/default-user-placeholder.png" }
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Management/New%20Folder/image2", category: "SOCIAL LAB" }
        ]
    },
    "malayalam": {
        about: "The Department of Malayalam focuses on the rich literary and cultural heritage of the Malayalam language.",
        vision: "To promote the study and appreciation of Malayalam literature and culture.",
        mission: [
            "To provide in-depth knowledge of Malayalam language and literature.",
            "To encourage creative writing and literary criticism."
        ],
        objectives: "To foster a deep understanding of Malayalam literary traditions.",
        courses: "BA Malayalam",
        highlights: ["Literary Week", "Kavyarangu"],
        strengths: [
            { icon: BookOpen, text: "Classical Literature", sub: "Ancient texts study" },
            { icon: Users, text: "Language Lab", sub: "Phonetics training" },
            { icon: Heart, text: "Cultural Club", sub: "Arts & Literature" },
            { icon: Search, text: "Research Centre", sub: "Literary research" }
        ],
        hod: {
            name: "Deepa NR",
            qualification: "Ph.D in Malayalam",
            quote: "Literature is the reflection of life.",
            img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Malayalam/Deepa?updatedAt=1770627331874"
        },
        faculty: [
            // { name: "Faculty 1", role: "Assistant Professor", spec: "Malayalam Literature", img: "/images/default-user-placeholder.png" }
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Malayalam/malayalam", category: "DEPARTMENT" }
        ]
    },
    "arabic": {
        about: "The Department of Arabic offers comprehensive courses in Arabic language and literature, focusing on its cultural and historical significance.",
        vision: "To be a centre of excellence in Arabic studies.",
        mission: [
            "To impart proficiency in Arabic language.",
            "To study the rich literary heritage of the Arab world."
        ],
        objectives: "To enable students to communicate effectively in Arabic.",
        courses: "BA Arabic",
        highlights: ["Arabic Day", "Translation Workshop"],
        strengths: [
            { icon: Globe, text: "Global Communication", sub: "Language skills" },
            { icon: BookOpen, text: "Islamic Studies", sub: "Historical context" },
            { icon: Users, text: "Translation Bureau", sub: "Professional translation" },
            { icon: Mic2, text: "Spoken Arabic", sub: "Communication skills" }
        ],
        hod: {
            name: "HOD Name",
            qualification: "Ph.D in Arabic",
            quote: "Language bridges cultures.",
            img: "/images/default-user-placeholder.png"
        },
        faculty: [
            { name: "Faculty 1", role: "Assistant Professor", spec: "Arabic Language", img: "/images/default-user-placeholder.png" }
        ],
        gallery: [
            { img: "https://ik.imagekit.io/1yxtj9qun/Departments%20/Arabic/Arabic-Language.jpg", category: "DEPARTMENT" }
        ]
    }
};
