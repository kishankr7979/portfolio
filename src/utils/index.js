
export const validKeywords = [
    "help",
    "clear",
    'intro',
    'resume',
    'experience',
    'skills',
    'social media',
    'contact'
]

export const dataMap = (val) => {
    let list = {
        'help': validKeywords,
        'intro': "I'm driven by a single mission: transforming ideas into scalable tech solutions that empower Indonesia\'s 60 million micro, small, and medium enterprises (MSMEs). As a Software Engineer 2 at BukuWarung, a Y-Combinator backed powerhouse, I craft user-centric tools that simplify bookkeeping, fuel digital payments, and drive commerce – all to unlock growth for the backbone of our nation\'s economy. Fueled by 2+ years of frontend expertise in React.js, Next.js, Vue.js, and TypeScript, I\'ve tackled challenges like rebuilding the BukuWarung web app from scratch, refining its Webview architecture for a 30% performance boost, and integrating crucial features like payments and digital products. My passion for tech-driven empowerment stems from my Electronics and Communication Engineering roots, shaping my approach to tackling complex problems with innovative solutions. Let\'s talk about how technology can revolutionize the way Indonesian MSMEs thrive! \n",
        'resume': 'https://drive.google.com/file/d/1J6kgGD9TO_gjpFbZYm1500N-NhjP9e1y/view',
        'experience': [
            "Software Engineer 2 (April 2023 - Present): \n \n At BukuWarung, I spearheaded the frontend development for game-changing features like B2B payments and engaging Rewards campaigns, driving user growth and platform adoption. I optimized the webview architecture, implementing advanced React practices for a sleeker build size. Prioritizing security, I integrated industry-standard principles across webview and desktop web projects, bolstering our applications' defenses.\n",
            "Software Engineer 1 (Jan 2022 - Mar 2023): \n \n Within BukuWarung's core development team, I wielded React.js and TypeScript to engineer configurable package management UI modules. Embracing flexibility, I implemented reusable and configurable UI components across diverse frameworks like Vue.js, React.js, and Next.js. My architectural prowess shone through as I rewrote the Webview framework, achieving a remarkable 30% performance gain. From scratch, I built the BukuWarung web app, integrating crucial features like payments and digital products \n  \n ",
            "Software Engineer Intern (July 2021 - Dec 2021): \n \n As a full-stack intern at BukuWarung, I played a pivotal role in building the company's internal customer support tool. I crafted a serverless interface for seamless support operations. My keen focus on user engagement led to the development of an experimental feature for the core BukuWarung app, which delivered a 5% boost in customer retention."
        ],
        'social media': [
            'LinkedIn: https://www.linkedin.com/in/kishan-k-12052a168/',
            'Github: https://github.com/kishankr7979',
            'BeReal: bere.al/kishan_02'

        ],
        'contact': [
            'Mail: kishankr.0210@gmail.com',
            'WhatsApp: +917979060284'
        ],
        'skills': [
            'React.js',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'HTML',
            'CSS',
            'Node.js',
            'Express.js',
            'System design'
        ]
    }
    return list[val];
}

export const performOperation = (val) => {
    if(validKeywords.includes(val)) {
        //next();
        if(val === 'clear') {
            return {
                error: false,
                clear: true,
                message: 'clear',
                data: {

                }
            }
        }
        return {
            error: false,
            clear: true,
            data: {
                message: dataMap(val)
            }
        }
    }
    else {
        return showError();
    }
}

export const showError = () => {
    return {
        error: true,
        clear: false,
        data: {
            message: 'Invalid keyword, please use `help` keyword'
        }
    }
}

export const displayMode = {
    'GUI': 'CLI',
    'CLI': 'GUI'
}

export const portfolioData = {
    intro: {
        name: 'Kishan Kumar',
        title: 'Full Stack Engineer',
        email: 'kishankr.0210@gmail.com',
        mobile: '+91-7979060284',
        portfolio: 'Kishan Kumar',
        linkedin: 'Kishan Kumar',
        github: 'Kishan Kumar'
    },
    experience: [
        {
            role: "Software Development Engineer 2",
            company: "SaaS Labs",
            location: "Noida, India",
            duration: "May 2025 – Present",
            highlights: [
                "Primarily work on JustCall platform",
                "Built integrations with third-party platforms, increasing feature adoption by 15%",
                "Migrated frontend from PHP-based pages to a modern Remix application, reducing page load time by 40%",
                "Developed iframe-sync SDK to keep PHP and Remix iframe URLs in sync during navigation, improving user flow consistency",
                "Optimized critical rendering paths and caching, reducing Time-to-Interactive (TTI) by 1.2s"
            ]
        },
        {
            role: "Software Engineer 2",
            company: "BukuWarung",
            location: "Hyderabad, India",
            duration: "Apr 2023 – Apr 2025",
            highlights: [
                "Part of Experience, Rewards Loyalty Platform Team and Electronics payments",
                "Developed EDC sales order flow with order, cart and payment management",
                "Developed AI-driven drag-and-drop form builder for internal use cases",
                "Developed common interface layer in frontend projects to share Android bridge functionalities",
                "Built Secure Transfer SDK for session-based HTTP transactions using cryptographic key exchange"
            ]
        },
        {
            role: "Software Engineer 1",
            company: "BukuWarung",
            location: "Remote",
            duration: "Jan 2022 – Mar 2023",
            highlights: [
                "Developed configurable package management UI modules in React.js & TypeScript",
                "Implemented reusable and configurable UI components in Vue.js, React.js, and Next.js",
                "Refactored webview architecture and improved performance by 30%",
                "Developed Bukuwarung web app from scratch and added payments and digital products"
            ]
        },
        {
            role: "Software Engineer Intern",
            company: "BukuWarung",
            location: "Bengaluru, India",
            duration: "Jul 2021 – Dec 2021",
            highlights: [
                "Interned as Full-stack Intern; implemented Internal Customer Support Tool",
                "Developed serverless interface for Customer Support Tool",
                "Developed experiment-based feature for core BukuWarung application, increasing retention by 5%"
            ]
        }
    ],
    projects: [
        {
            name: "Game1N",
            description: "Game1n, LinkedIn for gamers. A dedicated social media platform for gamers to disrupt the billion-dollar e-sports industry. Base layer ready with authentication and account management."
        },
        {
            name: "Leftout",
            description: "A dedicated travel tech platform for solo travellers who want to explore the world with strangers."
        },
        {
            name: "t8 CMS",
            description: "A configurable content management system (open source) that can be used by any organisation free of cost. Just plug in Supabase as database and deliver high-content like blogs instantly."
        }
    ],
    education: [
        {
            degree: "B.Tech in Electronics & Communication",
            institution: "DIT University, Dehradun, India",
            duration: "Aug 2018 – Jun 2022",
            cgpa: "7.42"
        },
        {
            degree: "AISSCE",
            institution: "SAPS, Bokaro, India",
            duration: "Aug 2017 – May 2018",
            percentage: "71.60%"
        }
    ],
    Skills: "TypeScript, JavaScript, HTML, Next.js, Remix.js, React.js, Vue.js, Node.js, AWS, React Native",
    achievements: [
        "5★ in C++ on HackerRank",
        "3★ on CodeChef",
        "3★ on LeetCode"
    ]
}
