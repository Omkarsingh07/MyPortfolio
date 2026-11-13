import { allProjects } from "@/components/software-projects";
import { experiences } from "@/components/experience";
import { aiVideoProjects } from "@/components/genai-showcase";
import { skillGroups } from "@/components/skills";
import { resumeOptions } from "@/components/resume-dropdown";

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
      text: "Hello! 👋 I'm Omkar's Portfolio Assistant.\n\nI dynamically track his latest software projects, GenAI video workflows, work experience, and resumes. What would you like to explore?",
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
      text: "I'm Omkar's interactive AI Portfolio Assistant! I read directly from his active portfolio data—so whenever he adds or updates a project, skill, or job experience, I stay in sync. Ask me anything!",
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
      text: "🎓 Education:\n• Degree: Bachelor of Technology (B.Tech) in Information Technology\n• University: Rajasthan Technical University (2022 – 2026)\n• Key Relevant Coursework: Data Structures & Algorithms, Software Engineering, DBMS (SQL & Database Design), Operating Systems, Computer Networks, and Machine Learning.",
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

  // 4. Resume / CV (Dynamically reads from resumeOptions)
  if (/resume|cv|biodata|curriculum vitae|download (resume|cv)/i.test(query)) {
    const resumeActions: ChatAction[] = resumeOptions.map((res) => ({
      label: res.title,
      href: res.filePath,
      download: true,
      action: "link",
    }));

    return {
      text: `📄 Omkar has ${resumeOptions.length} tailored resumes for different roles:\n\n${resumeOptions
        .map((r, i) => `${i + 1}. **${r.title}** — ${r.description}`)
        .join("\n")}\n\nClick below to download:`,
      actions: resumeActions,
      suggestions: [
        "💼 What is his experience?",
        "📬 Contact Omkar directly",
      ],
    };
  }

  // 5. Dynamic Check for Specific Project Matches
  // Matches against any project currently inside allProjects (handles new additions or updates automatically)
  const matchedProject = allProjects.find((project) => {
    const titleWords = project.title.toLowerCase().split(/\s+/);
    // If query mentions significant words of the title
    const matchesTitle = titleWords.some(
      (word) => word.length > 3 && query.includes(word)
    );
    // Or if query mentions the exact filterCategory or badge
    const matchesCategory =
      project.filterCategory.toLowerCase() === query ||
      project.badge.toLowerCase() === query;

    return matchesTitle || matchesCategory;
  });

  if (matchedProject && !/all projects|what projects|list projects/i.test(query)) {
    const actions: ChatAction[] = [];
    if (matchedProject.demoUrl) {
      actions.push({
        label: "🌐 Live Demo",
        href: matchedProject.demoUrl,
        action: "link",
      });
    }
    if (matchedProject.githubUrl) {
      actions.push({
        label: "💻 GitHub Repo",
        href: matchedProject.githubUrl,
        action: "link",
      });
    }
    actions.push({
      label: "View in Projects Section",
      href: "#software",
      action: "scroll",
    });

    return {
      text: `✨ **${matchedProject.title}** (${matchedProject.badge})\n\n• **Problem:** ${matchedProject.problem}\n• **Solution:** ${matchedProject.solution}\n• **Tech Stack:** ${matchedProject.techStack.join(", ")}\n• **Impact:** ${matchedProject.impact}`,
      actions,
      suggestions: allProjects
        .filter((p) => p.title !== matchedProject.title)
        .slice(0, 3)
        .map((p) => `Tell me about ${p.title.split(" ")[0]}`),
    };
  }

  // 6. Dynamic All Projects List (Reflects added/deleted projects automatically)
  if (
    /project|portfolio|built|apps|applications|work showcase|github/i.test(
      query
    )
  ) {
    const projectsList = allProjects
      .map(
        (p, i) =>
          `${i + 1}. **${p.title}** (${p.badge})\n   Tech: ${p.techStack.slice(0, 4).join(", ")}`
      )
      .join("\n\n");

    return {
      text: `Omkar currently has ${allProjects.length} featured software engineering projects:\n\n${projectsList}\n\nAsk me about any specific project for details or live demo links!`,
      actions: [
        { label: "Explore Projects Section", href: "#software", action: "scroll" },
        {
          label: "Visit GitHub Profile",
          href: "https://github.com/Omkarsingh07",
          action: "link",
        },
      ],
      suggestions: allProjects.slice(0, 3).map((p) => `Tell me about ${p.title.split(" ")[0]}`),
    };
  }

  // 7. Dynamic Check for Specific Work Experience Matches
  const matchedExp = experiences.find((exp) => {
    const compName = exp.company.toLowerCase();
    const roleName = exp.role.toLowerCase();
    return query.includes(compName) || compName.split(/\s+/).some((w) => w.length > 3 && query.includes(w)) || query.includes(roleName);
  });

  if (matchedExp && !/all experience|work history/i.test(query)) {
    return {
      text: `💼 **${matchedExp.role}** at **${matchedExp.company}**\n• **Period:** ${matchedExp.period} (${matchedExp.location || "Remote"})\n• **Tech Stack:** ${matchedExp.techStack.join(", ")}\n• **Key Achievements:**\n${matchedExp.achievements.map((a) => `  - ${a}`).join("\n")}`,
      actions: [
        { label: "View in Experience Section", href: "#experience", action: "scroll" },
      ],
      suggestions: [
        "What other companies has he worked at?",
        "📄 Download Resume",
        "📬 Contact Omkar",
      ],
    };
  }

  // 8. Dynamic All Work Experience List
  if (
    /experience|career|job|intern|work history|company|companies/i.test(
      query
    )
  ) {
    const expList = experiences
      .map(
        (exp, i) =>
          `${i + 1}. **${exp.company}** — ${exp.role} (${exp.period})\n   Tech: ${exp.techStack.slice(0, 4).join(", ")}`
      )
      .join("\n\n");

    return {
      text: `💼 **Professional Journey (${experiences.length} Positions):**\n\n${expList}`,
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

  // 9. Generative AI & Video Workflows (Dynamic from aiVideoProjects)
  if (
    /genai|generative ai|video|sora|kling|runway|elevenlabs|midjourney|davinci|freepik|diffusion|voice cloning|video creation/i.test(
      query
    )
  ) {
    const videoList = aiVideoProjects
      .map((v) => `• **${v.title}** (${v.category}): ${v.tools.join(", ")}`)
      .join("\n");

    return {
      text: `🎬 **Generative AI & Video Engineering Workflows:**\nOmkar builds end-to-end synthetic media pipelines with motion diffusion and neural audio:\n\n${videoList}\n\nYou can watch the video streams right on the portfolio!`,
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

  // 10. Technical Skills (Dynamic from skillGroups)
  if (
    /skill|tech stack|technolog|stack|languages|framework|tools|python|typescript|react|next\.?js|sql|pytorch/i.test(
      query
    )
  ) {
    const skillsList = skillGroups
      .map((g) => `• **${g.title}:** ${g.skills.join(", ")}`)
      .join("\n");

    return {
      text: `🛠️ **Technical Competencies Matrix:**\n\n${skillsList}`,
      actions: [
        { label: "View Skills Section", href: "#skills", action: "scroll" },
      ],
      suggestions: [
        "🚀 See Projects built with this stack",
        "💼 Experience details",
        "📄 Download Resume",
      ],
    };
  }

  // 11. Contact / Hiring / Location
  if (
    /contact|hire|email|phone|call|message|reach|location|where (is he|are you)|mumbai|available|opportunity|job offer/i.test(
      query
    )
  ) {
    return {
      text: "📬 **Get In Touch with Omkar:**\n\n• **Email:** omkarssingh26@gmail.com\n• **Phone:** +91-8619268050\n• **Location:** Mumbai, India\n• **Response SLA:** Within 24 Hours\n• **Status:** 🟢 Open to Software Engineering, GenAI, and Data Analytics roles!",
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

  // 12. Easter Egg: Doraemon
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

  // 13. Default Fallback
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
