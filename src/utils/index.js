
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
        title: 'Full stack Engineer'
    },
    "experience": [
        {
            "role": "Software Engineer 2",
            "company": "BukuWarung",
            "duration": "April-2023 - Present"
        },
        {
            "role": "Software Engineer 1",
            "company": "BukuWarung",
            "duration": "Jan-2023 - Mar 2023"
        },
        {
            "role": "Software Engineer Intern",
            "company": "BukuWaring",
            "duration": "July-2022 - Dec-2021"
        },
        // ... more experience items
    ],
    "projects": [
        {
            "name": "Game1N",
            "description": "Game1n, we call it linkedIn for gamers. A dedicated social media platform for gamers out there inorder to\n" +
                "disrupt Billion dollar e-sports industry. as of now we have our base layer ready with authentication and account\n" +
                "management"
        },
        {
            "name": "Leftout",
            "description": "A dedicated travel tech platform for solo traveller who wanted to explore this world with strangers"
        },
        {
            "name": "t8 CMS",
            "description": "A configurable content management system(open source) that can be used by any organisation free of cost, just need to plug your databse(supabase) and ready to deliver high content like blogs"
        },
        // ... more project items
    ],
    "education": [
        {
            "degree": "B.Tech in ECE",
            "institution": "DIT Univeristy, Dehradun"
        },
        {
            "degree": "AISCE",
            "institution": "SAPS, Bokaro"
        }
    ],
    "Skills": "Languages: TypeScript, JavaScript, HTML, CSS Technologies: Next.Js, React.Js, Vue.Js, Node.js, AWS"

}