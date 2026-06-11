export const validKeywords = [
    "help",
    "clear",
    "intro",
    "experience",
    "skills",
    "projects",
    "contact",
    "resume"
];

export const portfolioData = {
    intro: {
        name: "Kishan Kumar",
        title: "Senior Software Engineer",
        email: "kishankr.0210@gmail.com",
        mobile: "+91-7979060284",
        github: "github.com/kishankr7979",
        linkedin: "linkedin.com/in/kishan-k-12052a168",
        portfolio: "kishankr7979.github.io",
        summary: "Full-stack product engineer with 4+ years of experience building scalable web platforms, SDKs, and performance-critical systems in fintech and SaaS environments."
    },
    experience: [
        {
            role: "Senior Software Engineer",
            company: "SaaS Labs — JustCall",
            location: "Noida, India",
            duration: "May 2025 – Present",
            highlights: [
                "Led architectural migration of legacy PHP application to a modern Remix SPA, designing routing, state management, and incremental rollout, reducing page load time by 40%.",
                "Built SDKs for iframe state sync (URL, navigation, session) between PHP and Remix, enabling seamless SPA-like behavior in PHP wrappers.",
                "Built third-party platform integrations, increasing feature adoption by 15%.",
                "Optimized critical rendering paths, caching layers, and hydration strategy, reducing Time-to-Interactive (TTI) by 1.2s."
            ]
        },
        {
            role: "Software Engineer 2",
            company: "BukuWarung",
            location: "Hyderabad, India",
            duration: "Apr 2023 – Apr 2025",
            highlights: [
                "Architected EDC sales order system handling order lifecycle, cart management, and payment orchestration for electronic devices.",
                "Designed AI-driven drag-and-drop form builder platform used internally across teams for rapid workflow creation.",
                "Architected a reusable WebView–Android bridge interface enabling consistent native capability access across multiple React/Next.js apps.",
                "Designed and published Secure Transfer SDK implementing session-based encrypted HTTP communication using cryptographic key exchange."
            ]
        },
        {
            role: "Software Engineer 1",
            company: "BukuWarung",
            location: "Remote / Bengaluru, India",
            duration: "Jan 2022 – Mar 2023",
            highlights: [
                "Refactored WebView architecture, improving performance by 30% across embedded mobile web applications.",
                "Built configurable and reusable UI platform components across React, Vue, and Next.js ecosystems.",
                "Developed BukuWarung web application from scratch, integrating payments and digital product flows."
            ]
        }
    ],
    projects: [
        {
            name: "LastGood",
            url: "https://www.lastgood.space/",
            description: "A production incident time-travel and MTTR reduction tool for engineering and SRE teams. It mathematical ranks likely causes of an outage by aggregating and creating a unified ranked timeline of deployments, commits, and infrastructure changes immediately preceding the incident.",
            technologies: ["React", "Node.js", "Express", "Supabase", "SRE Tools"]
        },
        {
            name: "Game1N",
            description: "Dedicated social media platform for gamers (LinkedIn for gamers) to disrupt the e-sports industry. Base layer ready with authentication and profile management.",
            technologies: ["React", "Node.js", "MongoDB", "WebSockets"]
        },
        {
            name: "t8 CMS",
            description: "Configurable open-source Content Management System. Just plug in Supabase as a database and deliver rich content like blogs instantly.",
            technologies: ["Next.js", "Supabase", "TailwindCSS"]
        },
        {
            name: "Leftout",
            description: "A travel tech platform designed for solo travelers looking to explore the world with like-minded strangers.",
            technologies: ["React Native", "Node.js", "Google Maps API"]
        }
    ],
    skills: {
        languages: ["TypeScript", "JavaScript"],
        frontend: ["React", "Remix", "Next.js", "Vue", "React Native", "HTML5", "CSS3 / styled-components"],
        backend: ["Node.js", "Express", "Fastify", "REST & GraphQL APIs"],
        architecture: ["SDK Design", "WebView Bridge", "Cross-App Comm.", "Caching Strategies", "Performance Optimization"],
        security: ["Cryptographic Key Exchange", "Secure Session Transport"],
        cloudDevops: ["AWS", "Docker", "CI/CD Pipelines", "Vercel", "Git / GitHub Actions"]
    },
    education: [
        {
            degree: "B.Tech in Electronics & Communication",
            institution: "DIT University, Dehradun, India",
            duration: "2018 – 2022"
        }
    ]
};

export const dataMap = (val) => {
    const list = {
        help: [
            "Available commands:",
            "  intro       - Brief professional summary",
            "  experience  - Detailed professional timeline & SDE roles",
            "  skills      - Technical skills breakdown",
            "  projects    - Personal & professional projects",
            "  contact     - Email, LinkedIn, GitHub and phone details",
            "  resume      - Get link to my latest Resume",
            "  clear       - Clear the console output"
        ],
        intro: [
            `Kishan Kumar | ${portfolioData.intro.title}`,
            `=======================================`,
            portfolioData.intro.summary,
            "",
            "Passionate about building highly-optimized web applications, custom SDKs,",
            "and cross-platform WebView-native bridge components."
        ],
        resume: [
            "Opening Resume...",
            "If it didn't open automatically, use the link below:",
            "https://drive.google.com/file/d/1J6kgGD9TO_gjpFbZYm1500N-NhjP9e1y/view"
        ],
        experience: portfolioData.experience.reduce((acc, exp) => {
            acc.push(
                `⚡ ${exp.role} @ ${exp.company}`,
                `   Location: ${exp.location} | Duration: ${exp.duration}`,
                `   -------------------------------------------------`
            );
            exp.highlights.forEach(highlight => {
                acc.push(`   * ${highlight}`);
            });
            acc.push("");
            return acc;
        }, []),
        skills: [
            "⚙️ Technical Skills & Architecture",
            "==================================",
            `* Languages:      ${portfolioData.skills.languages.join(", ")}`,
            `* Frontend:       ${portfolioData.skills.frontend.join(", ")}`,
            `* Backend:        ${portfolioData.skills.backend.join(", ")}`,
            `* Architecture:   ${portfolioData.skills.architecture.join(", ")}`,
            `* Security:       ${portfolioData.skills.security.join(", ")}`,
            `* Cloud & DevOps: ${portfolioData.skills.cloudDevops.join(", ")}`
        ],
        projects: portfolioData.projects.reduce((acc, proj) => {
            acc.push(
                `🚀 ${proj.name} ${proj.url ? `(${proj.url})` : ""}`,
                `   Description: ${proj.description}`,
                `   Tech Stack:  ${proj.technologies.join(", ")}`,
                ""
            );
            return acc;
        }, []),
        contact: [
            "📞 Let's Connect!",
            "=================",
            `* Email:    ${portfolioData.intro.email}`,
            `* LinkedIn: ${portfolioData.intro.linkedin}`,
            `* GitHub:   ${portfolioData.intro.github}`,
            `* Phone:    ${portfolioData.intro.mobile}`
        ]
    };
    return list[val];
};

export const performOperation = (val) => {
    const cleanedVal = val.toLowerCase().trim();
    if (validKeywords.includes(cleanedVal)) {
        if (cleanedVal === "clear") {
            return {
                error: false,
                clear: true,
                message: "clear",
                data: {}
            };
        }
        return {
            error: false,
            clear: false,
            data: {
                message: dataMap(cleanedVal)
            }
        };
    } else {
        return showError(val);
    }
};

export const showError = (val) => {
    return {
        error: true,
        clear: false,
        data: {
            message: `Command not found: '${val}'. Type 'help' to see list of valid commands.`
        }
    };
};

export const displayMode = {
    GUI: "CLI",
    CLI: "GUI"
};
