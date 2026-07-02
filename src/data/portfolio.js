// ============================================
// Kartikey Singh — Portfolio Data
// ============================================

export const personalInfo = {
  name: "Kartikey Singh",
  firstName: "Kartikey",
  title: "AI/ML Engineer & Back-end Developer",
  tagline: "Building intelligent systems that make a difference",
  bio: `Computer Science Engineering graduate specializing in Python, AI/ML, 
and back-end development. I've built and deployed production-grade NLP systems 
using BERT, GPT-2, and Google Gemini API. Experienced with Flask-based web 
applications, REST APIs, and database-driven architectures.

I believe in building technology that fights misinformation, promotes sustainability, 
and pushes the boundaries of what's possible with AI.`,
  location: "Delhi, India",
  email: "kartikeysingh0719@gmail.com",
  phone: "+91 8920331248",
  github: "https://github.com/kartikey-07",
  linkedin: "https://www.linkedin.com/in/kartikey-singh-a75451256/",
  resumeFile: "/Kartikey_Singh_Resume.pdf",
};

export const education = {
  degree: "Bachelor of Technology — Computer Science Engineering",
  university: "Dr. A.P.J. Abdul Kalam Technical University, Lucknow, UP",
  period: "August 2022 — May 2026",
};

export const skills = {
  "AI & ML": [
    { name: "Python", level: 92 },
    { name: "PyTorch", level: 80 },
    { name: "Transformers / NLP", level: 85 },
    { name: "BERT / GPT-2", level: 82 },
    { name: "Google Gemini API", level: 88 },
    { name: "Scikit-learn", level: 78 },
  ],
  "Backend": [
    { name: "Flask", level: 90 },
    { name: "REST APIs", level: 88 },
    { name: "PostgreSQL", level: 78 },
    { name: "MySQL", level: 80 },
    { name: "SQLite", level: 82 },
    { name: "Authentication / RBAC", level: 75 },
  ],
  "Frontend & Tools": [
    { name: "HTML / CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "Git & GitHub", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Google Colab", level: 88 },
  ],
  "CS Fundamentals": [
    { name: "Data Structures", level: 82 },
    { name: "Algorithms", level: 80 },
    { name: "OOP", level: 85 },
    { name: "System Design", level: 70 },
    { name: "Database Management", level: 78 },
    { name: "Linux", level: 72 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "SatyaX",
    subtitle: "AI-Powered Fact Verification & Misinformation Analysis",
    description: `A multi-stage AI pipeline to detect fake news and assess credibility of 
articles and content. Fine-tuned BERT-based classification model achieving 93% accuracy 
for detection across multiple article categories. Integrated Gemini API for contextual 
reasoning, claim analysis, evidence summarization, and truth-score generation.`,
    highlights: [
      "93% accuracy BERT-based fake news classifier",
      "Gemini API for contextual reasoning & truth-scoring",
      "GPT-2 misinformation simulation module for awareness",
      "URL-based content analysis with automated scraping",
      "Shareable reports with PDF export & history management",
      "Secure auth with Clerk, role-based access control",
    ],
    tech: ["Flask", "Gemini API", "BERT", "GPT-2", "Clerk Auth", "SQLite", "PostgreSQL", "NLP"],
    github: "https://github.com/kartikey-07",
    live: "https://satyax.in/",
    date: "June 2025",
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "Smart Scrap",
    subtitle: "AI-Based Waste Management & Recycling Platform",
    description: `A web-based waste management platform with ML-based reward-driven recycling 
system. Trained models on structured datasets achieving 94% accuracy for waste 
categorization. Separate user and admin workflows for reporting, tracking, verification, 
and incentive features.`,
    highlights: [
      "94% accuracy ML-based waste categorization",
      "Reward-driven recycling incentive system",
      "Separate user & admin dashboards",
      "Automated waste tracking & verification",
      "Published research paper in AIJFR Vol 7, Issue 2",
    ],
    tech: ["Flask", "Machine Learning", "MySQL", "HTML/CSS", "Python", "Scikit-learn"],
    github: "https://github.com/kartikey-07",
    live: null,
    paper: "https://www.aijfr.com/research-paper.php?id=4373",
    paperPdf: "https://www.aijfr.com/papers/2026/2/4373.pdf",
    date: "July 2025",
    color: "#10B981",
  },
];

export const publications = [
  {
    title: "Smart Scrap: An AI-driven Segregation & Reward-Driven Recycling System",
    journal: "Advanced International Journal for Research (AIJFR)",
    volume: "Volume 7, Issue 2",
    date: "March–April 2026",
    url: "https://www.aijfr.com/research-paper.php?id=4373",
    pdf: "https://www.aijfr.com/papers/2026/2/4373.pdf",
    description: "Co-authored research paper on AI-driven waste segregation integrating ML-based categorization with reward mechanisms.",
  },
];

export const certifications = [
  {
    name: "AI & Machine Learning Program",
    org: "ICTRD",
    category: "AI / ML",
    date: "June 2026",
    color: "#8B5CF6",
    file: "AI_ML_Program_ICTRD.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/AI_ML_Program_ICTRD.pdf",
  },
  {
    name: "GenAI Virtual Internship",
    org: "IBM",
    category: "Generative AI",
    date: "Aug 2025",
    color: "#06B6D4",
    file: "GenAI_Virtual_Internship_IBM.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/GenAI_Virtual_Internship_IBM.pdf",
  },
  {
    name: "Data Science & ML Comprehensive",
    org: "Udemy",
    category: "Data Science",
    date: "May 2025",
    color: "#F59E0B",
    file: "Resume",
    url: "https://github.com/kartikey-07/Certifications",
  },
  {
    name: "Networking Basics",
    org: "Cisco Networking Academy",
    category: "Networking",
    date: "March 2025",
    color: "#14B8A6",
    file: "Networking_Basics_Cisco.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/Networking_Basics_Cisco.pdf",
  },
  {
    name: "Foundations of Project Management",
    org: "Google — Coursera",
    category: "Project Management",
    date: "March 2025",
    color: "#EF4444",
    file: "Coursera",
    url: "https://coursera.org/share/d62cc0f3d81af36632ca8e00633d5c1f",
  },
  {
    name: "Cybersecurity Essentials",
    org: "Cisco Networking Academy",
    category: "Cybersecurity",
    date: "Jan 2024",
    color: "#10B981",
    file: "Cybersecurity_Essentials_Cisco.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/Cybersecurity_Essentials_Cisco.pdf",
  },
  {
    name: "Java Programming Fundamentals",
    org: "Infosys Springboard",
    category: "Programming",
    date: "July 2024",
    color: "#EC4899",
    file: "Java_Fundamentals_Infosys_Springboard.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/Java_Fundamentals_Infosys_Springboard.pdf",
  },
  {
    name: "HTML5 — The Language",
    org: "Infosys Springboard",
    category: "Web Development",
    date: "Jan 2024",
    color: "#F43F5E",
    file: "HTML5_Infosys_Springboard.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/HTML5_Infosys_Springboard.pdf",
  },
  {
    name: "C Programming",
    org: "IIT Bombay",
    category: "Programming",
    date: "Jan 2024",
    color: "#F97316",
    file: "C_Programming_IIT_Bombay.pdf",
    url: "https://github.com/kartikey-07/Certifications/blob/main/C_Programming_IIT_Bombay.pdf",
  },
  {
    name: "Python",
    org: "GUVI — HCL",
    category: "Programming",
    date: "July 2025",
    color: "#FBBF24",
    file: "Python_Certification.png",
    url: "https://github.com/kartikey-07/Certifications/blob/main/Python_Certification.png",
    isImage: true,
  },
];

// (Removed: gitCommits, bootMessages, fileTree — no longer used in glass window redesign)
