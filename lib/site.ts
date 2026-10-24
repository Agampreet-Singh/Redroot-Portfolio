/**
 * Everything you are likely to edit lives in this file:
 * contact details, payment details, prices and the course syllabus.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://redroot.vercel.app";

export const owner = {
  name: "Agampreet Singh",
  alias: "RedRoot",
  email: "th3redr00t@gmail.com",
  github: "https://github.com/Agampreet-Singh",
  instagram: "https://www.instagram.com/redr00t_cyber/",
  linkedin: "https://www.linkedin.com/in/agampreet-singh-6a9111220/",
};

export const payment = {
  upiId: "9354333175@pthdfc",
  payeeName: "RedRoot",
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
      schedule: "₹10,000 now, ₹10,000 midway through the course",
      firstLabel: "First instalment",
    },
    {
      id: "emi",
      name: "Monthly EMI",
      firstPayment: 1500,
      total: 18000,
      saving: 2000,
      schedule: "₹1,500 a month for 12 months",
      firstLabel: "First month",
    },
  ],
  // TODO: confirm these two before going live.
  duration: "8 weeks",
  format: "Live online classes with hands-on labs",
  batches: ["Weekday evenings", "Weekends"],
  levels: ["New to security", "Some hands-on experience", "Working in IT or security"],
  includes: [
    "Live classes taught by Agampreet",
    "Hands-on lab work in every module",
    "Doubt-clearing support throughout the course",
    "Certificate of completion",
  ],
  modules: [
    {
      key: "network",
      title: "Network penetration testing",
      port: "445/tcp",
      service: "network-pentest",
      summary:
        "Find, enumerate and exploit the hosts and services on an internal network, then move through it the way a real attacker would.",
      topics: [
        "Reconnaissance, host discovery and service fingerprinting",
        "Exploiting common services: SMB, FTP, SSH, RDP and more",
        "Active Directory attacks: Kerberoasting, AS-REP roasting, pass-the-hash",
        "Linux and Windows privilege escalation",
        "Pivoting and tunnelling into segmented networks",
      ],
    },
    {
      key: "web",
      title: "Web penetration testing",
      port: "443/tcp",
      service: "web-pentest",
      summary:
        "Test web applications and APIs methodically with Burp Suite, from mapping the attack surface to proving real impact.",
      topics: [
        "The OWASP Top 10, in practice rather than theory",
        "A complete Burp Suite testing workflow",
        "Injection flaws: SQLi, XSS, SSTI and command injection",
        "Access control and logic bugs: IDOR, SSRF, auth and session flaws",
        "REST and GraphQL API testing",
      ],
    },
    {
      key: "wireless",
      title: "Wireless penetration testing",
      port: "802.11",
      service: "wireless-pentest",
      summary:
        "Assess Wi-Fi networks end to end: capture traffic, attack authentication and test how clients behave around rogue access points.",
      topics: [
        "802.11 fundamentals, monitor mode and packet capture",
        "WPA2 handshake and PMKID attacks",
        "WPA3 and its weaknesses",
        "Evil twin and rogue access point attacks",
        "Enterprise Wi-Fi (WPA2-Enterprise / EAP) testing",
      ],
    },
    {
      key: "ai",
      title: "AI penetration testing",
      port: "11434/tcp",
      service: "ai-pentest",
      summary:
        "Attack LLM-powered applications and agents, the newest and fastest-growing attack surface in the industry.",
      topics: [
        "The OWASP Top 10 for LLM applications",
        "Direct and indirect prompt injection",
        "Jailbreaks and system prompt extraction",
        "Data leakage through RAG pipelines",
        "Abusing tools and plugins in AI agents",
      ],
    },
    {
      key: "redteam",
      title: "Red Team exercises",
      port: "50050/tcp",
      service: "red-team-ops",
      summary:
        "Bring everything together in objective-based engagements that emulate a real adversary from first access to final report.",
      topics: [
        "Planning, threat emulation and rules of engagement",
        "Initial access and phishing simulation",
        "Command and control (C2) infrastructure",
        "Persistence, lateral movement and evasion",
        "Writing a professional engagement report",
      ],
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
