export interface ChatAction {
  label: string;
  href?: string;
  download?: boolean;
  action?: "scroll" | "link" | "query";
  query?: string;
}

export interface ChatBotResponse {
  text: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export const INITIAL_SUGGESTIONS = [
  "🚀 Top Projects",
  "🧠 Skills & Tech Stack",
  "💼 Work Experience",
  "📄 Download Resume",
  "📬 Contact Omkar",
];

export function getBotResponse(input: string): ChatBotResponse {
  const query = input.trim().toLowerCase();

  // 1. Greetings & Identity
  if (
    /^(hi|hello|hey|greetings|hola|namaste|sup|yo|good (morning|afternoon|evening))\b/i.test(
      query
    )
  ) {
    return {
      text: "Hello! 👋 I'm Omkar's Portfolio Assistant. I can help you learn about his software engineering projects, Generative AI video workflows, machine learning models, experience, or download his resumes. What would you like to explore?",
      suggestions: [
        "🚀 Top Projects",
        "🧠 AI & ML Skills",
        "💼 Work Experience",
        "📄 Download Resume",
      ],
    };
  }

  if (
    /who (are you|is this)|what (is this|can you do)|about you|introduce yourself/i.test(
      query
    )
  ) {
    return {
      text: "I'm Omkar's interactive AI Portfolio Assistant! I know all about his engineering background, full-stack web applications, GenAI video pipelines, data analytics work, and contact details. Ask me anything about his work!",
      suggestions: [
        "Tell me about Omkar",
        "What projects did he build?",
        "What is his tech stack?",
      ],
    };
  }

  // 2. About Omkar / Bio
  if (
    /who is omkar|about omkar|tell me about (him|omkar|yourself)|profile|bio/i.test(
      query
    )
  ) {
    return {
      text: "Omkar Singh is a Software Engineer & Generative AI Engineer based in Mumbai, India. He builds scalable full-stack web applications, AI-driven automation pipelines, and generative media solutions. He holds a B.Tech in Information Technology from Rajasthan Technical University (2022–2026).",
      actions: [
        { label: "Read About Section", href: "#about", action: "scroll" },
        { label: "View Experience", href: "#experience", action: "scroll" },
      ],
      suggestions: [
        "🎓 What is his education?",
        "🚀 View top projects",
        "📄 Get his resume",
      ],
    };
  }

  // 3. Education / College
  if (
    /education|college|university|degree|btech|b\.tech|study|graduat|school|rtu|rajasthan/i.test(
      query
    )
  ) {
    return {
      text: "🎓 Education:\n• Degree: Bachelor of Technology (B.Tech) in Information Technology\n• University: Rajasthan Technical University (2022 – 2026)\n• Key Coursework: Data Structures & Algorithms, Software Engineering, DBMS (SQL), Machine Learning, Operating Systems, and Computer Networks.",
      actions: [
        { label: "See Qualifications", href: "#about", action: "scroll" },
      ],
      suggestions: [
        "🧠 Technical Skills",
        "🚀 Software Projects",
        "📄 Download Resume",
      ],
    };
  }

  // 4. Resume / CV
  if (/resume|cv|biodata|curriculum vitae|download (resume|cv)/i.test(query)) {
    return {
      text: "📄 Omkar has 4 tailored resumes depending on the role you are hiring for:\n\n1. Software Engineer Resume (Full-stack, APIs, Next.js)\n2. AI / ML Engineer Resume (PyTorch, Deep Learning, Audio ML)\n3. Generative AI Engineer Resume (Sora, Kling, ElevenLabs, Workflows)\n4. Data Analyst Resume (SQL, Python, Power BI, Tableau)\n\nWhich one would you like to download?",
      actions: [
        {
          label: "💻 Software Engineer CV",
          href: "/resumes/software-engineer.pdf",
          download: true,
          action: "link",
        },
        {
          label: "🧠 AI/ML Engineer CV",
          href: "/resumes/ai-ml-engineer.pdf",
          download: true,
          action: "link",
        },
        {
          label: "✨ GenAI Engineer CV",
          href: "/resumes/genai-engineer.pdf",
          download: true,
          action: "link",
        },
        {
          label: "📊 Data Analyst CV",
          href: "/resumes/data-analyst.pdf",
          download: true,
          action: "link",
        },
      ],
      suggestions: [
        "💼 What is his experience?",
        "📬 Contact Omkar directly",
      ],
    };
  }

  // 5. Specific Project: Ashapura Metal Art
  if (/ashapura|metal art|e-?commerce platform|craft/i.test(query)) {
    return {
      text: "✨ Ashapura Metal Art Platform:\nA full-stack Next.js web application built for a craft manufacturing business. Features dynamic catalog rendering, responsive UI components, and API route query processing for international buyers with 100% digital uptime.\n\n• Tech: Next.js, TypeScript, Tailwind CSS, REST API, Node.js",
      actions: [
        {
          label: "🌐 Live Demo",
          href: "https://ashapura-metal-art.vercel.app/",
          action: "link",
        },
        {
          label: "View in Projects Section",
          href: "#software",
          action: "scroll",
        },
      ],
      suggestions: [
        "Tell me about the SER Speech project",
        "Tell me about the IRCTC project",
        "Tell me about the ETL pipeline",
      ],
    };
  }

  // 6. Specific Project: SER / Speech Emotion Recognizer
  if (/speech|ser|emotion|librosa|audio ml|voice recogni/i.test(query)) {
    return {
      text: "🎙️ Speech Emotion Recognizer (SER):\nA deep learning classification pipeline developed with PyTorch and Librosa. It extracts audio spectrogram features from speech signals and detects 7 vocal emotional states in real-time for customer QA and sentiment analysis.\n\n• Tech: Python, PyTorch, Librosa, Scikit-Learn, Streamlit",
      actions: [
        {
          label: "🚀 Try Streamlit Demo",
          href: "https://omkarsingh07-speech-recognizer-app-x0kqba.streamlit.app/",
          action: "link",
        },
        {
          label: "View in Projects Section",
          href: "#software",
          action: "scroll",
        },
      ],
      suggestions: [
        "IRCTC Travel Analytics",
        "E-Commerce ETL Pipeline",
        "What are his ML skills?",
      ],
    };
  }

  // 7. Specific Project: IRCTC
  if (/irctc|train|railway|travel analytics|gmail api/i.test(query)) {
    return {
      text: "🚆 IRCTC Travel Analytics Dashboard:\nA full-stack platform that synchronizes IRCTC confirmation emails via Gmail API (OAuth 2.0). It parses journey, fare, and refund details using BeautifulSoup & Regex, storing data in SQLite with automated duplicate detection and incremental sync.\n\n• Tech: React, FastAPI, Python, SQLite, Gmail API, BeautifulSoup",
      actions: [
        {
          label: "View in Projects Section",
          href: "#software",
          action: "scroll",
        },
      ],
      suggestions: [
        "Ashapura Metal Art E-Commerce",
        "Speech Emotion Recognizer",
        "Zomato Analytics",
      ],
    };
  }

  // 8. Specific Project: ETL Pipeline
  if (/etl|pipeline|sales analysis|revenue analytics|transaction/i.test(query)) {
    return {
      text: "⚡ E-Commerce ETL & Revenue Analytics Pipeline:\nAn automated data engineering pipeline in Python and Pandas. Ingests, validates, and cleans raw unstructured transaction logs, emitting analytical Plotly reports and JSON API feeds while cutting manual data preparation by 60%.\n\n• Tech: Python, Pandas, Plotly, REST API, ETL Architecture",
      actions: [
        {
          label: "GitHub Repository",
          href: "https://github.com/Omkarsingh07/e-commerce-sales-analysis",
          action: "link",
        },
      ],
      suggestions: [
        "What other projects has he built?",
        "Zomato Analytics project",
      ],
    };
  }

  // 9. Specific Project: Zomato
  if (/zomato|restaurant|market intelligence|cuisine/i.test(query)) {
    return {
      text: "🍽️ Zomato Restaurant Analytics & Market Intelligence:\nAn exploratory data analytics project that analyzes pricing distribution, customer ratings, and delivery density across restaurant networks to optimize cloud kitchen locations.\n\n• Tech: Python, Pandas, Tableau, SQL, Seaborn",
      actions: [
        {
          label: "View in Projects Section",
          href: "#software",
          action: "scroll",
        },
      ],
      suggestions: [
        "Tell me about his data analytics skills",
        "View all software projects",
      ],
    };
  }

  // 10. General Projects
  if (
    /project|portfolio|built|apps|applications|work showcase|github/i.test(
      query
    )
  ) {
    return {
      text: "Omkar has engineered projects across Full-Stack, AI/ML, and Data Engineering:\n\n• 🌐 Ashapura Metal Art: Production e-commerce platform with Next.js\n• 🎙️ Speech Emotion Recognizer: Deep learning audio classifier in PyTorch\n• 🚆 IRCTC Travel Analytics: Gmail OAuth API automated data parser\n• ⚡ E-Commerce ETL Pipeline: Automated Python/Pandas transformation engine\n• 🍽️ Zomato Market Intelligence: Restaurant network pricing & BI analytics",
      actions: [
        { label: "Explore Projects Section", href: "#software", action: "scroll" },
        {
          label: "Visit GitHub Profile",
          href: "https://github.com/Omkarsingh07",
          action: "link",
        },
      ],
      suggestions: [
        "Tell me about GenAI videos",
        "Download Software Engineer Resume",
        "What is his tech stack?",
      ],
    };
  }

  // 11. Generative AI & Video Workflows
  if (
    /genai|generative ai|video|sora|kling|runway|elevenlabs|midjourney|davinci|freepik|diffusion|voice cloning|video creation/i.test(
      query
    )
  ) {
    return {
      text: "🎬 Generative AI & Video Workflows:\nOmkar is an experienced Generative AI Engineer with expertise in end-to-end synthetic media pipelines:\n\n• Video Synthesis: Sora, Kling AI, Runway Gen-2, Higgsfield\n• Audio Synthesis: ElevenLabs neural voice cloning, multi-lingual dubbing\n• Visual Concept Art: Midjourney v6, Freepik AI, Flow AI\n• Post-Production: DaVinci Resolve color grading & timeline assembly\n\nHe has created commercial clips, storytelling pieces, and diffusion concepts.",
      actions: [
        {
          label: "Watch GenAI Video Showcase",
          href: "#genai",
          action: "scroll",
        },
        {
          label: "Download GenAI Resume",
          href: "/resumes/genai-engineer.pdf",
          download: true,
          action: "link",
        },
      ],
      suggestions: [
        "Work experience at On The Rise Media",
        "Work experience at Weather Films",
        "Software Engineering Projects",
      ],
    };
  }

  // 12. Skills & Tech Stack
  if (
    /skill|tech stack|technolog|stack|languages|framework|tools|python|typescript|react|next\.?js|sql|pytorch/i.test(
      query
    )
  ) {
    return {
      text: "🛠️ Technical Skills Overview:\n\n• Languages: Python, TypeScript, JavaScript, SQL, HTML5/CSS3\n• Frontend & Full Stack: Next.js, React, Tailwind CSS, REST APIs, FastAPI\n• Machine Learning: PyTorch, Scikit-Learn, Pandas, NumPy, Librosa (SER)\n• Generative AI: Sora, Kling AI, Runway, ElevenLabs, Midjourney v6, DaVinci Resolve\n• Data & BI: MySQL, PostgreSQL, SQLite, Tableau, Power BI, Advanced Excel\n• DevOps & Tools: Git, GitHub, Docker, Linux Shell",
      actions: [
        { label: "View Skills Matrix", href: "#skills", action: "scroll" },
      ],
      suggestions: [
        "🚀 See Projects built with this stack",
        "💼 Experience details",
        "📄 Download Resume",
      ],
    };
  }

  // 13. Work Experience & Career History
  if (
    /experience|career|job|intern|work history|company|companies|weather films|on the rise|tax-o-smart|idbi/i.test(
      query
    )
  ) {
    return {
      text: "💼 Professional Experience:\n\n1. On The Rise Media Agency (Feb 2026 – Apr 2026 · Remote)\n   AI Video Creator — Prompt engineering, Kling AI, Runway, ElevenLabs voice cloning & DaVinci Resolve.\n\n2. Weather Films (Dec 2025 – Feb 2026 · Remote)\n   Generative AI Creator — Storyboarding, Midjourney v6, motion diffusion & pre-production.\n\n3. Tax-O-Smart & IDBI Bank Audit (June 2025 – July 2025 · Mumbai)\n   Data Analyst & Software Intern — Financial ETL pipelines, SQL verification, and IDBI Bank ledger audit automation.",
      actions: [
        { label: "View Experience Cards", href: "#experience", action: "scroll" },
      ],
      suggestions: [
        "📬 Contact Omkar for an opportunity",
        "📄 Download Full Resume",
        "🚀 View Software Projects",
      ],
    };
  }

  // 14. Contact / Hiring / Location
  if (
    /contact|hire|email|phone|call|message|reach|location|where (is he|are you)|mumbai|available|opportunity|job offer/i.test(
      query
    )
  ) {
    return {
      text: "📬 Get In Touch with Omkar:\n\n• Email: omkarssingh26@gmail.com\n• Phone: +91-8619268050\n• Location: Mumbai, India\n• Response SLA: Usually within 24 hours\n• Status: 🟢 Open to Software Engineering, GenAI, and Data Analytics roles!",
      actions: [
        { label: "Go to Contact Form", href: "#contact", action: "scroll" },
        {
          label: "Send Email",
          href: "mailto:omkarssingh26@gmail.com",
          action: "link",
        },
        {
          label: "LinkedIn Profile",
          href: "https://linkedin.com/in/omkarsingh9",
          action: "link",
        },
        {
          label: "GitHub Profile",
          href: "https://github.com/Omkarsingh07",
          action: "link",
        },
      ],
      suggestions: [
        "📄 Download Resume",
        "🚀 Top Projects",
        "🧠 Skills Matrix",
      ],
    };
  }

  // 15. Easter Egg: Doraemon
  if (/doraemon|gadget|take-?copter|bamboo copter|cat robot|nobita/i.test(query)) {
    return {
      text: "🚁 You noticed Doraemon! Omkar loves technology that feels like 22nd-century magic. That's why the hero section features a custom vector Doraemon with a spinning Take-Copter. With modern AI and software engineering, we're building the future one gadget at a time!",
      actions: [
        { label: "Back to Hero Section", href: "#home", action: "scroll" },
      ],
      suggestions: [
        "Tell me about Omkar's AI work",
        "Show me software projects",
      ],
    };
  }

  // 16. Default Fallback
  return {
    text: "I'm not completely sure about that specific detail, but I can tell you all about Omkar's software projects, AI video synthesis workflows, machine learning models, work experience, or help you connect with him directly!",
    actions: [
      { label: "🚀 View Projects", href: "#software", action: "scroll" },
      { label: "📄 Download Resume", href: "/resumes/software-engineer.pdf", download: true, action: "link" },
      { label: "📬 Contact Omkar", href: "#contact", action: "scroll" },
    ],
    suggestions: [
      "What are his top projects?",
      "What is his tech stack?",
      "Tell me about his work experience",
      "How do I contact Omkar?",
    ],
  };
}

