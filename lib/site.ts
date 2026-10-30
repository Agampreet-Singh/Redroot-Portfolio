/**
 * Everything you are likely to edit lives in this file:
 * contact details, payment details, prices and the course syllabus.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://redroot.vercel.app";

export const owner = {
  name: "Agampreet Singh",
  alias: "RedRoot",
  email: "agampreetsingh646@gmail.com",
  github: "https://github.com/Agampreet-Singh",
  instagram: "https://www.instagram.com/redr00t_cyber/",
  linkedin: "https://www.linkedin.com/in/agampreet-singh-6a9111220/",
};

// Payments go through Razorpay, so no personal UPI ID or phone number is ever
// sent to the browser or encoded in a QR code. Keys live in environment variables.
export const payment = {
  merchantName: "RedRoot",
  themeColor: "#e02a26",
};

export const consultation = {
  fee: 299,
  minutes: 30,
  topics: [
    "Career roadmap",
    "Certifications guidance",
    "Bug bounty strategy",
    "Portfolio or resume review",
    "General mentorship",
  ],
  includes: [
    "A cyber security career roadmap built around where you are today",
    "Which certifications to take, in what order (OSCP, CEH, PNPT and others)",
    "A review of your portfolio, GitHub and resume",
    "Bug bounty and CTF strategy",
    "Straight answers about the industry",
  ],
};

export const course = {
  slug: "professional-penetration-testing",
  title: "Professional Penetration Testing",
  price: 20000,
  // Three ways to pay. `firstPayment` is what the student pays when they enroll.
  plans: [
    {
      id: "full",
      name: "Pay in full",
      firstPayment: 18000,
      total: 18000,
      saving: 2000,
      schedule: "One payment of ₹18,000",
      firstLabel: "Full payment",
    },
    {
      id: "half",
      name: "Two instalments",
      firstPayment: 10000,
      total: 20000,
      saving: 0,
      schedule: "₹10,000 now, ₹10,000 after 9 months",
      firstLabel: "First instalment",
    },
    {
      id: "emi",
      name: "Monthly EMI",
      firstPayment: 1000,
      total: 18000,
      saving: 2000,
      schedule: "₹1,000 a month for 18 months",
      firstLabel: "First month",
    },
  ],
  duration: "1.5 years",
  months: 18,
  format: "Live online classes with hands-on labs",
  batches: ["Weekday evenings", "Weekends"],
  levels: ["New to security", "Some hands-on experience", "Working in IT or security"],
  includes: [
    "Live classes taught by Agampreet",
    "Hands-on lab work in every module",
    "Doubt-clearing support throughout the course",
    "Module projects to build your portfolio",
    "Certificate of completion",
  ],
  intro:
    "This isn't a theory course. From the first month you'll be hacking real (legal) lab machines, using the same methods professional penetration testers use on real client engagements. By the end, you'll have the skills, the portfolio and the confidence to work in offensive security.",
  placementInterview:
    "Before your batch starts, you'll have a 30-minute one-on-one interview with Agampreet. He'll ask about your current level and experience, and based on that you'll be placed in the batch that fits you best.",
  // Numbered from 0 on the site and in emails, starting with Foundations.
  modules: [
    {
      key: "foundations",
      title: "Foundations",
      months: "Months 1–2",
      port: "22/tcp",
      service: "foundations",
      tagline: "Every great hacker started here.",
      summary:
        "Before you break systems, you need to know how they work. This module gives you the base that most self-taught hackers skip, and that later separates average pentesters from great ones.",
      outcome:
        "Move confidently in Linux and Windows, understand how data travels across a network, and write your own scripts to automate attacks.",
      certs: "",
      topics: [
        "How networks really work: OSI/TCP-IP, IP addressing, ports, DNS, HTTP/HTTPS",
        "The Linux command line: files, permissions, processes, services",
        "Windows internals for hackers: PowerShell, users, services, registry",
        "Bash and Python scripting to automate your own hacking tools",
        "Building your personal hacking lab: Kali Linux, virtual machines, vulnerable targets",
        "How professionals work: methodology, scope, rules of engagement, and the law",
      ],
      handsOn: "",
      project: "Build your own home lab and write your first Python port scanner",
    },
    {
      key: "osint",
      title: "OSINT & Reconnaissance",
      months: "Month 3",
      port: "53/udp",
      service: "osint-recon",
      tagline: "The best hackers know everything about the target before they touch it.",
      summary:
        "Real attacks start with information. You'll learn to map a company's entire attack surface using only public data.",
      outcome:
        "Find subdomains, exposed services, leaked credentials and employee information, then turn them into an attack plan.",
      certs: "",
      topics: [
        "OSINT methodology and staying legal",
        "Subdomain and asset discovery",
        "Google dorking and search engine hacking",
        "Finding leaked credentials and exposed data",
        "Employee and email enumeration for social engineering",
        "Turning recon into an attack plan",
      ],
      handsOn: "",
      project: "A complete recon report on a bug bounty target",
    },
    {
      key: "network",
      title: "Network & Active Directory Penetration Testing",
      months: "Months 4–7",
      port: "445/tcp",
      service: "network-ad-pentest",
      tagline: "Break into networks the way real attackers do.",
      summary:
        "This is the core of professional pentesting, and what most company engagements are about. You'll go from scanning a network to owning the entire Windows domain.",
      outcome:
        "Find and exploit vulnerable services, escalate to root/SYSTEM, and compromise an Active Directory domain from start to finish.",
      certs: "OSCP · PNPT · CRTP",
      topics: [
        "Host discovery, port scanning and service fingerprinting",
        "Vulnerability scanning and manual verification (no blind tool usage)",
        "Exploiting SMB, FTP, SSH, RDP, SNMP and more",
        "Metasploit and manual exploitation: understand what the exploit actually does",
        "Password attacks: hash cracking, brute force, credential reuse",
        "Linux and Windows privilege escalation",
        "Active Directory attacks: Kerberoasting, AS-REP roasting, pass-the-hash, BloodHound attack paths",
        "Pivoting and tunnelling into hidden network segments",
      ],
      handsOn: "20+ vulnerable lab machines, plus a multi-machine Active Directory lab",
      project: "Compromise a full corporate AD network and write a professional report",
    },
    {
      key: "web",
      title: "Web & API Penetration Testing",
      months: "Months 8–11",
      port: "443/tcp",
      service: "web-api-pentest",
      tagline: "Every company has a website. Most of them are vulnerable.",
      summary:
        "Web apps are the most attacked surface in the world, and the biggest source of bug bounty rewards. You'll learn to find the bugs that scanners miss.",
      outcome:
        "Test any web application or API methodically, find critical vulnerabilities and prove their real impact.",
      certs: "Burp Suite Certified Practitioner (BSCP) · eWPT · bug bounty programs",
      topics: [
        "How web apps work: HTTP, sessions, cookies, same-origin policy",
        "A professional Burp Suite workflow",
        "The OWASP Top 10, in practice rather than theory",
        "Injection attacks: SQLi, XSS, SSTI, command injection",
        "Access control and logic bugs: IDOR, SSRF, authentication and session flaws",
        "File upload, path traversal, XXE and deserialization",
        "REST and GraphQL API hacking",
        "Bug bounty methodology and writing reports that get paid",
      ],
      handsOn: "",
      project: "A full pentest of a vulnerable web app and API, plus a real bug bounty submission",
    },
    {
      key: "wireless",
      title: "Wireless Penetration Testing",
      months: "Month 12",
      port: "802.11",
      service: "wireless-pentest",
      tagline: "If you can reach the Wi-Fi, you can reach the network.",
      summary: "You'll learn to assess wireless networks and show how attackers get in from the parking lot.",
      outcome:
        "Capture and crack Wi-Fi authentication, set up rogue access points and test enterprise wireless security.",
      certs: "OSWP",
      topics: [
        "802.11 fundamentals, monitor mode and packet capture",
        "WPA2 handshake and PMKID attacks",
        "WPA3 and its weaknesses",
        "Evil twin and rogue access point attacks",
        "Enterprise Wi-Fi (WPA2-Enterprise / EAP) testing",
      ],
      handsOn: "",
      project: "A complete wireless security assessment",
    },
    {
      key: "ai",
      title: "AI Penetration Testing",
      months: "Months 13–14",
      port: "11434/tcp",
      service: "ai-pentest",
      tagline: "The newest attack surface, and almost nobody knows how to test it yet.",
      summary:
        "Every company is shipping AI chatbots and agents. Very few pentesters know how to break them. This module puts you ahead of most of the industry.",
      outcome:
        "Attack LLM-powered applications, bypass their guardrails, abuse AI agents and their tools, and report AI vulnerabilities professionally.",
      certs: "",
      topics: [
        "How LLM apps, RAG pipelines and AI agents are built",
        "The OWASP Top 10 for LLM applications",
        "Direct and indirect prompt injection",
        "Jailbreaks and system prompt extraction",
        "Data leakage through RAG pipelines",
        "Abusing tools and plugins in AI agents",
        "Model attacks: data poisoning and evasion basics",
        "Reporting AI findings and recommending fixes",
      ],
      handsOn: "",
      project: "Pentest a vulnerable AI chatbot and agent application",
    },
    {
      key: "redteam",
      title: "Red Team Operations",
      months: "Months 15–17",
      port: "50050/tcp",
      service: "red-team-ops",
      tagline: "Now you think like a real adversary.",
      summary:
        "Everything comes together. Instead of finding every bug, you'll run objective-based operations: get in, stay hidden, and reach the crown jewels.",
      outcome:
        "Plan and run a full red team engagement, from the first phishing email to domain dominance, while avoiding detection.",
      certs: "CRTO · CRTE · red team roles",
      topics: [
        "Planning, threat emulation and rules of engagement",
        "Initial access and phishing simulation",
        "Command and control (C2) infrastructure",
        "Persistence, lateral movement and defense evasion",
        "Advanced Active Directory: golden/silver tickets, delegation abuse, domain persistence",
        "Purple teaming: working with defenders to improve detection",
        "Objective-based engagements from first access to final report",
      ],
      handsOn: "",
      project: "A full red team operation against a simulated company",
    },
    {
      key: "capstone",
      title: "Capstone & Career Launch",
      months: "Month 18",
      port: "8443/tcp",
      service: "career-launch",
      tagline: "Prove it. Then get hired.",
      summary:
        "You'll run a complete penetration test on your own and walk away with a portfolio, a professional report and a clear path to your first (or next) job.",
      outcome: "",
      certs: "",
      topics: [
        "A full end-to-end penetration test on a lab company",
        "Writing a client-ready pentest report",
        "Certification roadmap: OSCP, PNPT, CRTP, CRTO, BSCP: which to take and when",
        "Resume, LinkedIn, GitHub and portfolio review",
        "Mock technical interviews with Agampreet",
      ],
      handsOn: "",
      project: "",
      result: "Certificate of completion, plus a professional report and portfolio you can show employers",
    },
  ],
} as const;

export const credentials = [
  { label: "Community reach", value: "900K+" },
  { label: "People mentored", value: "1,000+" },
  { label: "Years in offensive security", value: "5+" },
  { label: "Hack The Box rank", value: "Pro Hacker" },
];

export const journey = [
  { year: "2019", text: "Started learning cyber security and ethical hacking" },
  { year: "2020", text: "Began publishing tutorials" },
  { year: "2021", text: "Went deep on penetration testing" },
  { year: "2022", text: "Reached Pro Hacker rank on Hack The Box" },
  { year: "2023", text: "Started full-time as a cyber security professional" },
  { year: "2024", text: "Built Mark 1, the first version of the RedRoot framework" },
  { year: "Now", text: "Still hacking, still teaching" },
];

export const projects = [
  {
    name: "RedRoot Mark 85",
    tag: "Private framework",
    body: "The full RedRoot framework, used on real engagements. It stays private: handing it over would mean handing myself over.",
    link: "https://github.com/Agampreet-Singh/RedRoot-Lite",
  },
  {
    name: "RedRoot-Lite",
    tag: "Open-source framework",
    body: "The open-source edition of RedRoot: recon, exploitation, payloads and reporting from one terminal.",
    link: "https://github.com/Agampreet-Singh/RedRoot-Lite",
  },
  {
    name: "CVE-2025-53770",
    tag: "CVE",
    body: "Microsoft SharePoint Server 2019: unauthenticated remote code execution via deserialization.",
    link: "https://github.com/Agampreet-Singh/CVE-2025-53770",
  },
  {
    name: "CVE-2024-25202",
    tag: "CVE",
    body: "Cross-site scripting in the search feature (search-result.php, search-visitor.php) of PHPGurukul Visitor Management System 1.0.",
    link: "https://github.com/Agampreet-Singh/CVE-2024-25202",
  },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export type PaymentKind = "enrollment" | "consultation";

/**
 * The single source of truth for what a checkout costs. The server calls this to
 * create the Razorpay order, so a visitor cannot change the price in their browser.
 */
export function priceFor(kind: PaymentKind, planId?: string) {
  if (kind === "consultation") {
    return { amount: consultation.fee, label: `1:1 session (${consultation.minutes} min)` };
  }
  const plan = course.plans.find((p) => p.id === planId);
  if (!plan) return null;
  return { amount: plan.firstPayment, label: `${course.title}: ${plan.name} (${plan.firstLabel})`, plan };
}
