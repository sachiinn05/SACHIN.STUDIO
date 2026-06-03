import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  Braces,
  BrainCircuit,
  CalendarDays,
  Cloud,
  Code2,
  Command,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  Network,
  Phone,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "./lib/utils";

type Project = {
  id: string;
  name: string;
  signal: string;
  headline: string;
  live?: string;
  repo?: string;
  backend?: string;
  stack: string[];
  problem: string;
  architecture: string;
  decisions: string[];
  challenges: string[];
  impact: string;
  screen: string[];
};

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

const links = {
  email: "mailto:singhsachin0517@gmail.com",
  github: "https://github.com/sachiinn05",
  linkedin: "https://www.linkedin.com/in/sachin-singh-491252252",
  leetcode: "https://leetcode.com/u/sachinsingh17/",
  codingNinjas:
    "https://www.naukri.com/code360/profile/c8bad018-c73a-402a-b7ec-bc4f5e6de1a6",
  resume: "/ResumeSachin.pdf",
};

const projects: Project[] = [
  {
    id: "byteflame",
    name: "ByteFlame",
    signal: "Deployed real-time product system",
    headline:
      "A production-grade full-stack platform with live communication, auth, API design, and cloud delivery.",
    live: "https://byteflame.in",
    repo: "https://github.com/sachiinn05/byteflame",
    backend: "https://github.com/sachiinn05/ByteFlame_Backend",
    stack: [
      "React",
      "Redux Toolkit",
      "Tailwind",
      "Node",
      "Express",
      "MongoDB",
      "Socket.io",
      "JWT",
      "AWS EC2",
      "Cloudflare",
    ],
    problem:
      "Move beyond a portfolio demo and ship a real web application that handles authenticated users, real-time communication, persistent state, and deployment concerns.",
    architecture:
      "React client with Redux Toolkit for deterministic UI state, Node/Express REST services, MongoDB persistence, Socket.io real-time channels, JWT authentication, and an EC2 deployment protected and routed through Cloudflare.",
    decisions: [
      "Separated frontend and backend repositories to keep deployment and ownership boundaries clear.",
      "Used Socket.io only where live communication is valuable instead of forcing real-time behavior across the whole app.",
      "Chose JWT auth and REST APIs for a pragmatic, inspectable production backend.",
      "Deployed on AWS EC2 with Cloudflare in front to learn real infrastructure constraints.",
    ],
    challenges: [
      "Keeping auth state consistent across client routes and API calls.",
      "Coordinating real-time events with persistent MongoDB-backed records.",
      "Hardening a self-managed deployment with process management and network routing.",
    ],
    impact:
      "ByteFlame is the clearest proof that Sachin can assemble a complete product surface: interface, API, database, real-time layer, auth, and deployment.",
    screen: ["Live sessions", "JWT gateway", "Socket layer", "Cloud edge"],
  },
  {
    id: "netflix-gpt",
    name: "Netflix-GPT",
    signal: "AI-assisted consumer interface",
    headline:
      "A streaming discovery experience combining recommendation UX, auth, external APIs, and generated suggestions.",
    repo: "https://github.com/sachiinn05/netflix-gpt",
    stack: [
      "React",
      "Redux Toolkit",
      "Tailwind",
      "Firebase Auth",
      "TMDB API",
      "Gemini API",
    ],
    problem:
      "Traditional content discovery is slow and browse-heavy. The project reframes discovery as intent-driven search powered by AI suggestions.",
    architecture:
      "React application with Redux-managed view state, Firebase Authentication, TMDB data integration, and Gemini-powered recommendation flows.",
    decisions: [
      "Used Firebase for fast, reliable authentication so the project could focus on product flow.",
      "Combined TMDB with Gemini instead of relying on one data source for discovery.",
      "Designed with Tailwind to rapidly tune density, hierarchy, and mobile behavior.",
    ],
    challenges: [
      "Mapping natural language prompts to useful content recommendations.",
      "Keeping asynchronous API states clear for the user.",
      "Balancing familiar streaming UI patterns with AI-first discovery.",
    ],
    impact:
      "Shows product imagination: Sachin can connect AI APIs to familiar workflows and produce a usable consumer experience.",
    screen: ["Prompt intent", "TMDB catalog", "Auth shell", "AI ranking"],
  },
  {
    id: "job-portal",
    name: "Job Portal Web App",
    signal: "Workflow and role-based system",
    headline:
      "A backend-led job workflow with roles, posting, applications, email notifications, and responsive views.",
    repo: "https://github.com/sachiinn05/Job-Portal-WebAPPs",
    stack: ["Node", "Express", "MongoDB", "EJS", "Nodemailer", "RBAC", "CSS"],
    problem:
      "Recruiting workflows need different permissions, data flows, and communication moments for candidates and administrators.",
    architecture:
      "Express MVC application with MongoDB persistence, EJS server-rendered pages, role-based authentication, job/application entities, and Nodemailer notifications.",
    decisions: [
      "Used EJS for a server-rendered workflow where backend clarity mattered more than client complexity.",
      "Modeled permissions around user roles instead of treating all sessions the same.",
      "Added email notifications because workflow software must close the loop with users.",
    ],
    challenges: [
      "Designing access control without overcomplicating the app.",
      "Keeping job and application states coherent across different actors.",
      "Making backend-rendered screens responsive and clear.",
    ],
    impact:
      "Demonstrates practical backend instincts: auth, roles, data modeling, user flows, and communication infrastructure.",
    screen: ["Role matrix", "Applications", "Mail events", "MVC routes"],
  },
  {
    id: "chatter-up",
    name: "Chatter Up",
    signal: "Real-time messaging foundation",
    headline:
      "A multi-user messaging app focused on persistent conversations, live events, and secure user handling.",
    repo: "https://github.com/sachiinn05",
    stack: ["HTML", "CSS", "JavaScript", "Node", "Express", "Socket.io", "MongoDB"],
    problem:
      "Chat systems compress many backend problems into one product: identity, presence, event delivery, persistence, and latency.",
    architecture:
      "Node/Express server with Socket.io rooms, MongoDB message persistence, and browser-based real-time UI.",
    decisions: [
      "Started close to the platform with HTML, CSS, and JavaScript to understand the mechanics.",
      "Used Socket.io as the core transport for multi-user messaging.",
      "Persisted messages so the experience behaves like software, not a transient demo.",
    ],
    challenges: [
      "Managing concurrent users in shared channels.",
      "Synchronizing live UI updates with stored message history.",
      "Keeping the interface simple enough for repeated use.",
    ],
    impact:
      "Forms the technical foundation that later appears in ByteFlame: event-driven thinking and real-time architecture.",
    screen: ["Rooms", "Events", "Persistence", "Users"],
  },
];

const stackGroups = [
  {
    label: "Frontend",
    icon: Code2,
    thesis: "Interfaces that behave like product surfaces.",
    tools: ["React", "Redux Toolkit", "Tailwind", "EJS", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    icon: Server,
    thesis: "APIs, auth, workflows, and server-side structure.",
    tools: ["Node.js", "Express", "REST APIs", "JWT", "Nodemailer", "MVC"],
  },
  {
    label: "Realtime",
    icon: Network,
    thesis: "Event-driven systems for chat and live collaboration.",
    tools: ["Socket.io", "Rooms", "Events", "Message Persistence"],
  },
  {
    label: "Data",
    icon: Database,
    thesis: "Document modeling and persistence for product state.",
    tools: ["MongoDB", "Mongoose", "DBMS", "Indexes"],
  },
  {
    label: "Cloud",
    icon: Cloud,
    thesis: "Deployments that survive outside localhost.",
    tools: ["AWS EC2", "Cloudflare", "Linux", "PM2", "Nginx", "GitHub"],
  },
  {
    label: "Reasoning",
    icon: BrainCircuit,
    thesis: "DSA-backed problem solving and CS fundamentals.",
    tools: ["388+ LeetCode", "C++", "OOP", "OS", "Software Engineering"],
  },
];

const operatingSignals = [
  ["388+", "LeetCode problems solved"],
  ["1479", "Contest rating"],
  ["2025", "CSE graduate"],
  ["EC2", "Production deployment"],
];

const profileSnapshot = [
  ["Role", "Full-Stack + Backend Developer"],
  ["Email", "singhsachin0517@gmail.com"],
  ["Phone", "+91 6392635656"],
  ["Education", "B.Tech CSE, GL Bajaj"],
  ["Core", "React, Node, Express, MongoDB"],
  ["Edge", "Socket.io, JWT, AWS EC2, Cloudflare"],
];

const education = [
  {
    level: "B.Tech - Computer Science Engineering",
    place: "GL Bajaj Institute of Technology and Management",
    time: "2021 - 2025",
    result: "CGPA 7.22",
    focus: "Software engineering, DSA, OOP, DBMS, operating systems, full-stack development.",
  },
  {
    level: "Class 12 - Intermediate",
    place: "Raj English School",
    time: "Senior secondary",
    result: "71.4%",
    focus: "Academic foundation before engineering specialization.",
  },
  {
    level: "Class 10 - Matriculation",
    place: "Maa Vaishno Modern Public School",
    time: "Secondary",
    result: "78.2%",
    focus: "Early academic base and problem-solving discipline.",
  },
];

const certifications = [
  "Coding Ninjas C++",
  "Coding Ninjas Data Structures & Algorithms",
  "Coding Ninjas Frontend Development",
];

const nav = [
  ["Studio", "studio"],
  ["Lab", "lab"],
  ["Systems", "systems"],
  ["Stack", "stack"],
  ["Education", "education"],
  ["Proof", "proof"],
  ["Credentials", "credentials"],
  ["Protocol", "protocol"],
];

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/sachiinn05/repos?sort=updated&per_page=6")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Repo[]) => setRepos(Array.isArray(data) ? data : []))
      .catch(() => setRepos([]));
  }, []);

  return (
    <main className="min-h-screen bg-ink text-white selection:bg-white selection:text-black">
      <BackgroundSystem />
      <Navigation onCommand={() => setCommandOpen(true)} />
      <Hero />
      <OperatingModel />
      <FounderLab />
      <Systems projects={projects} onOpen={setActiveProject} />
      <StackMap />
      <EducationSection />
      <Proof repos={repos} />
      <Credentials />
      <Protocol />
      <Footer />
      <CommandMenu
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onProject={setActiveProject}
      />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}

function BackgroundSystem() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.11),transparent_34rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}

function Navigation({ onCommand }: { onCommand: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#studio" className="group flex items-center gap-3" aria-label="Sachin Studio home">
          <span className="grid size-8 place-items-center rounded-md border border-white/20 bg-white text-black">
            <Terminal size={16} />
          </span>
          <span className="hidden text-sm font-medium tracking-wide text-white/90 sm:block">
            SACHIN.STUDIO
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-1.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          onClick={onCommand}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          <Command size={15} />
          <span className="hidden sm:inline">Ctrl K</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="studio" className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/70">
            <span className="size-1.5 rounded-full bg-white" />
            Future founder / full-stack engineering studio
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-7xl lg:text-8xl">
            Sachin Singh builds product systems end to end.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/60 sm:text-xl">
            React interfaces, Node APIs, MongoDB data models, real-time Socket.io flows,
            JWT auth, AWS EC2 deployment, and DSA-backed engineering judgment.
          </p>
          <div className="mt-7 grid max-w-3xl gap-2 sm:grid-cols-3">
            {education.map((item) => (
              <div
                key={item.level}
                className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3"
              >
                <div className="text-xs uppercase tracking-[0.16em] text-white/35">
                  {item.level.split(" - ")[0]}
                </div>
                <div className="mt-1 text-sm font-semibold text-white/85">{item.result}</div>
                <div className="mt-1 truncate text-xs text-white/45">{item.place}</div>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="primary-action" href="#systems">
              Inspect shipped systems <ArrowRight size={17} />
            </a>
            <a className="secondary-action" href={links.resume} target="_blank" rel="noreferrer">
              <Download size={17} /> Resume
            </a>
          </div>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-lg border border-white/10 bg-white/[0.045] p-3 shadow-glow backdrop-blur"
        >
          <div className="rounded-md border border-white/10 bg-black/80">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Activity size={15} /> founder-readiness.ts
              </div>
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/40" />
                <span className="size-2 rounded-full bg-white/60" />
              </div>
            </div>
            <div className="space-y-3 p-4 font-mono text-sm">
              {[
                ["product_surface", "ByteFlame live on byteflame.in"],
                ["backend_depth", "REST + JWT + Socket.io + MongoDB"],
                ["cloud_signal", "AWS EC2, PM2, Nginx, Cloudflare"],
                ["problem_solving", "388+ LeetCode, C++ foundations"],
              ].map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + index * 0.08 }}
                  className="grid grid-cols-[auto_1fr] gap-3 rounded border border-white/8 bg-white/[0.03] p-3"
                >
                  <span className="text-white/30">0{index + 1}</span>
                  <span>
                    <span className="text-white/50">{key}</span>
                    <span className="text-white/30"> = </span>
                    <span className="text-white/90">"{value}"</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function OperatingModel() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {operatingSignals.map(([value, label]) => (
          <div key={label} className="p-5 sm:p-7">
            <div className="text-3xl font-semibold text-white sm:text-4xl">{value}</div>
            <div className="mt-2 text-sm leading-6 text-white/50">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FounderLab() {
  return (
    <section id="lab" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionKicker icon={Sparkles} label="Founder lab" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-glow sm:p-7"
        >
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.13),transparent_28rem),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.10),transparent_22rem)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/40">Operating console</p>
                <h2 className="mt-2 text-3xl font-semibold sm:text-5xl">Sachin OS</h2>
              </div>
              <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-sm text-emerald-100">
                Available for product engineering
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profileSnapshot.map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-lg border border-white/10 bg-black/35 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-white/35">{label}</div>
                  <div className="mt-2 text-sm font-medium text-white/85">{value}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["Product", "Builds full workflows, not isolated screens."],
                ["Systems", "Auth, realtime, database, APIs, cloud deployment."],
                ["Signals", "388+ DSA reps and multiple public products."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="grid gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-[#0d0d0d]/90 p-5"
          >
            <div className="flex items-center gap-2 text-sm text-white/55">
              <Command size={15} /> Ctrl + K intelligence layer
            </div>
            <div className="mt-5 space-y-2">
              {["Search projects", "Open resume", "Inspect stack", "Jump to credentials"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 py-3">
                  <span className="text-sm text-white/70">{item}</span>
                  <ArrowRight size={14} className="text-white/35" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-xl border border-white/10 bg-white/[0.035] p-5"
          >
            <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
              <Activity size={15} /> Build trajectory
            </div>
            <div className="space-y-3">
              {["Chatter Up: realtime foundation", "Job Portal: workflow/RBAC", "Netflix-GPT: AI product UX", "ByteFlame: deployed product system"].map((item, index) => (
                <div key={item} className="grid grid-cols-[28px_1fr] gap-3">
                  <span className="grid size-7 place-items-center rounded-md bg-white text-xs font-semibold text-black">{index + 1}</span>
                  <span className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-sm text-white/65">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Systems({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (project: Project) => void;
}) {
  return (
    <section id="systems" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionKicker icon={Rocket} label="Shipped systems" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Case studies, not project cards.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            The strongest proof in the resume is the progression from chat mechanics to
            workflow software to a deployed real-time platform. This module presents each
            project like a product system.
          </p>
        </div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onOpen(project)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05 }}
              className="group w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] text-left transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              <div className="grid gap-0 md:grid-cols-[1fr_260px]">
                <div className="p-5 sm:p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/50">
                      {project.signal}
                    </span>
                    {project.live && (
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black">
                        Live
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-white/60">{project.headline}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 6).map((item) => (
                      <span key={item} className="text-xs text-white/40">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ProductScreen labels={project.screen} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductScreen({ labels }: { labels: string[] }) {
  return (
    <div className="min-h-56 border-t border-white/10 bg-black/40 p-4 md:border-l md:border-t-0">
      <div className="h-full rounded-md border border-white/10 bg-white/[0.035] p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2 w-20 rounded-full bg-white/20" />
          <div className="grid grid-cols-3 gap-1">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/30" />
            <span className="size-2 rounded-full bg-white/40" />
          </div>
        </div>
        <div className="grid h-[calc(100%-24px)] grid-cols-2 gap-2">
          {labels.map((label, index) => (
            <div
              key={label}
              className={cn(
                "flex items-end rounded border border-white/8 bg-white/[0.045] p-3 text-xs text-white/50",
                index === 0 && "col-span-2 bg-white/[0.08] text-white/75"
              )}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StackMap() {
  return (
    <section id="stack" className="border-y border-white/10 bg-white/[0.025] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionKicker icon={Layers3} label="Engineering stack visualization" />
        <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            A practical stack for shipping full-stack products.
          </h2>
          <p className="max-w-md leading-7 text-white/60">
            Not a wall of badges. This is the operating capability behind the work:
            interface, API, data, realtime, cloud, and reasoning.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stackGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-lg border border-white/10 bg-black/40 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-4 grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.06]">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-xl font-semibold">{group.label}</h3>
                    <p className="mt-2 min-h-14 leading-7 text-white/50">{group.thesis}</p>
                  </div>
                  <div className="h-20 w-px bg-gradient-to-b from-white/40 to-transparent" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-sm text-white/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionKicker icon={Award} label="Education timeline" />
      <div className="mt-5 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Academic foundation behind the engineering work.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            A clear education path from Class 10 and Class 12 into Computer Science
            Engineering, backed by core CS subjects and product-building execution.
          </p>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-white/70 via-white/20 to-transparent sm:block" />
          <div className="grid gap-4">
            {education.map((item, index) => (
              <motion.article
                key={item.level}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="relative grid gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft sm:grid-cols-[56px_1fr_auto]"
              >
                <div className="relative z-10 grid size-11 place-items-center rounded-lg border border-white/10 bg-white text-sm font-semibold text-black">
                  {index + 1}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/45">
                    <CalendarDays size={15} /> {item.time}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold">{item.level}</h3>
                  <p className="mt-1 text-white/65">{item.place}</p>
                  <p className="mt-3 leading-7 text-white/50">{item.focus}</p>
                </div>
                <div className="h-fit rounded-full border border-white/10 bg-white px-3 py-1.5 text-sm font-semibold text-black">
                  {item.result}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof({ repos }: { repos: Repo[] }) {
  const cells = useMemo(
    () =>
      Array.from({ length: 84 }, (_, index) => {
        const value = (index * 17 + 11) % 5;
        return value;
      }),
    []
  );

  return (
    <section id="proof" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionKicker icon={GitBranch} label="Public proof" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
        <div>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Coding signal, repos, and consistency.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            The profile combines implementation depth with problem-solving reps:
            LeetCode, GitHub repositories, deployed systems, and fundamentals.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <SignalCard label="LeetCode" value="388+ solved" href={links.leetcode} />
            <SignalCard label="Contest" value="1479 rating" href={links.leetcode} />
            <SignalCard label="GitHub" value="sachiinn05" href={links.github} />
            <SignalCard label="Code360" value="Certified" href={links.codingNinjas} />
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Contribution field</h3>
              <p className="mt-1 text-sm text-white/50">Public activity visualization</p>
            </div>
            <a className="icon-link" href={links.github} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
            </a>
          </div>
          <div className="grid grid-cols-12 gap-1.5">
            {cells.map((value, index) => (
              <span
                key={index}
                className={cn(
                  "aspect-square rounded-[3px] border border-white/5",
                  value === 0 && "bg-white/[0.035]",
                  value === 1 && "bg-white/[0.09]",
                  value === 2 && "bg-white/[0.16]",
                  value === 3 && "bg-white/[0.28]",
                  value === 4 && "bg-white/[0.42]"
                )}
              />
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {(repos.length ? repos : fallbackRepos).slice(0, 4).map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-md border border-white/8 bg-black/40 px-3 py-3 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{repo.name}</div>
                  <div className="truncate text-xs text-white/40">
                    {repo.description || repo.language || "Repository highlight"}
                  </div>
                </div>
                <ArrowRight size={15} className="shrink-0 text-white/40" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const fallbackRepos: Repo[] = [
  {
    name: "ByteFlame_Backend",
    html_url: "https://github.com/sachiinn05/ByteFlame_Backend",
    description: "Node, Express, MongoDB, Socket.io backend",
    language: "JavaScript",
    stargazers_count: 0,
    updated_at: "",
  },
  {
    name: "byteflame",
    html_url: "https://github.com/sachiinn05/byteflame",
    description: "React product frontend",
    language: "TypeScript",
    stargazers_count: 0,
    updated_at: "",
  },
  {
    name: "netflix-gpt",
    html_url: "https://github.com/sachiinn05/netflix-gpt",
    description: "AI-powered content discovery",
    language: "JavaScript",
    stargazers_count: 0,
    updated_at: "",
  },
  {
    name: "Job-Portal-WebAPPs",
    html_url: "https://github.com/sachiinn05/Job-Portal-WebAPPs",
    description: "Role-based recruiting workflow",
    language: "JavaScript",
    stargazers_count: 0,
    updated_at: "",
  },
];

function SignalCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="text-sm text-white/50">{label}</div>
      <div className="mt-2 font-semibold">{value}</div>
    </a>
  );
}

function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <SectionKicker icon={Award} label="Credential graph" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.9fr]">
        <div>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Education, certifications, and profile data from the resume.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            This layer gives recruiters the factual scan path: degree, schools,
            scores, certifications, coding profiles, contact details, and the exact
            technical foundation behind the projects.
          </p>
          <div className="mt-8 grid gap-3">
            {education.map((item, index) => (
              <motion.article
                key={item.level}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-5"
              >
                <div aria-hidden className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-white/70 via-sky-200/70 to-emerald-200/60" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-white/45">
                      <CalendarDays size={15} /> {item.time}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{item.level}</h3>
                    <p className="mt-1 text-white/60">{item.place}</p>
                    <p className="mt-3 leading-7 text-white/50">{item.focus}</p>
                  </div>
                  <div className="w-fit rounded-full border border-white/10 bg-white px-3 py-1.5 text-sm font-semibold text-black">
                    {item.result}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        <aside className="grid gap-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
              <Award size={15} /> Certifications
            </div>
            <div className="grid gap-2">
              {certifications.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/35 px-3 py-3">
                  <ShieldCheck size={15} className="text-emerald-100" />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
              <UserRound size={15} /> Identity and links
            </div>
            <div className="grid gap-2">
              <ContactRow icon={Mail} label="Email" value="singhsachin0517@gmail.com" href={links.email} />
              <ContactRow icon={Phone} label="Phone" value="+91 6392635656" href="tel:+916392635656" />
              <ContactRow icon={GitBranch} label="GitHub" value="github.com/sachiinn05" href={links.github} />
              <ContactRow icon={BrainCircuit} label="LeetCode" value="sachinsingh17" href={links.leetcode} />
              <ContactRow icon={MapPin} label="Profile" value="LinkedIn / Code360 available" href={links.linkedin} />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <div className="text-sm uppercase tracking-[0.18em] text-white/35">Core CS base</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["DSA", "OOPs", "DBMS", "Operating Systems", "MVC", "RBAC", "Agile"].map((item) => (
                <span key={item} className="rounded-md border border-white/10 bg-black/35 px-2.5 py-1.5 text-sm text-white/62">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-3 transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <span className="grid size-8 place-items-center rounded-md border border-white/10 bg-white/[0.05]">
        <Icon size={15} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-white/40">{label}</span>
        <span className="block truncate text-sm text-white/72">{value}</span>
      </span>
    </a>
  );
}

function Protocol() {
  return (
    <section id="protocol" className="border-y border-white/10 bg-white/[0.025] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionKicker icon={ShieldCheck} label="Founder protocol" />
        <div className="mt-5 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            The career story: from fundamentals to shipped systems.
          </h2>
          <div className="grid gap-3">
            {[
              [
                "Base layer",
                "CSE graduate from GL Bajaj with DSA, OOP, DBMS, OS, and software engineering foundations.",
              ],
              [
                "Execution layer",
                "React, Node, Express, MongoDB, Socket.io, JWT auth, Redux Toolkit, and REST APIs.",
              ],
              [
                "Production layer",
                "ByteFlame live on a real domain with AWS EC2 and Cloudflare, proving deployment ownership.",
              ],
              [
                "Founder layer",
                "Builds complete workflows: product UI, backend logic, auth, realtime systems, data, and delivery.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-black/40 p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="primary-action" href={links.email}>
            <Mail size={17} /> Start a conversation
          </a>
          <a className="secondary-action" href={links.linkedin} target="_blank" rel="noreferrer">
            <UserRound size={17} /> LinkedIn
          </a>
          <a className="secondary-action" href={links.github} target="_blank" rel="noreferrer">
            <GitBranch size={17} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function CommandMenu({
  open,
  onClose,
  onProject,
}: {
  open: boolean;
  onClose: () => void;
  onProject: (project: Project) => void;
}) {
  const [query, setQuery] = useState("");
  const actions = [
    ...projects.map((project) => ({
      label: project.name,
      meta: "Project deep dive",
      icon: Braces,
      action: () => {
        onProject(project);
        onClose();
      },
    })),
    {
      label: "Download Resume",
      meta: "Resume",
      icon: Download,
      action: () => window.open(links.resume, "_blank"),
    },
    {
      label: "GitHub Profile",
      meta: "GitHub",
      icon: GitBranch,
      action: () => window.open(links.github, "_blank"),
    },
    {
      label: "Engineering Stack",
      meta: "Skills",
      icon: Layers3,
      action: () => document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Education Timeline",
      meta: "B.Tech, Class 12, Class 10",
      icon: Award,
      action: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Education + Certifications",
      meta: "Credentials",
      icon: Award,
      action: () => document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Founder Lab",
      meta: "Operating console",
      icon: Command,
      action: () => document.getElementById("lab")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Experience Story",
      meta: "Experience",
      icon: Sparkles,
      action: () => document.getElementById("protocol")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const filtered = actions.filter((item) =>
    `${item.label} ${item.meta}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-lg border border-white/20 bg-[#0d0d0d] shadow-glow"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={18} className="text-white/50" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, experience, resume, GitHub, skills..."
                className="h-10 flex-1 bg-transparent text-base outline-none placeholder:text-white/30"
              />
              <button className="icon-link" onClick={onClose} aria-label="Close command menu">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[58vh] overflow-y-auto p-2">
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={`${item.meta}-${item.label}`}
                    onClick={item.action}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition hover:bg-white/[0.07]"
                  >
                    <span className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.05]">
                      <Icon size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="block text-xs text-white/40">{item.meta}</span>
                    </span>
                    <ArrowRight size={15} className="text-white/30" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
          onMouseDown={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="mx-auto my-8 max-w-5xl overflow-hidden rounded-lg border border-white/20 bg-[#0c0c0c] shadow-glow"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0c0c0c]/90 px-5 py-4 backdrop-blur">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Product deep dive
                </div>
                <h2 className="mt-1 text-2xl font-semibold">{project.name}</h2>
              </div>
              <button className="icon-link" onClick={onClose} aria-label="Close deep dive">
                <X size={17} />
              </button>
            </div>
            <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
              <div className="p-5 sm:p-8">
                <p className="text-xl leading-8 text-white/70">{project.headline}</p>
                <DeepDiveBlock title="Problem" body={project.problem} />
                <DeepDiveBlock title="Architecture" body={project.architecture} />
                <DeepDiveList title="Decisions" items={project.decisions} />
                <DeepDiveList title="Challenges" items={project.challenges} />
                <DeepDiveBlock title="Impact" body={project.impact} />
              </div>
              <aside className="border-t border-white/10 bg-white/[0.025] p-5 lg:border-l lg:border-t-0">
                <ProductScreen labels={project.screen} />
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-white/70">Technology</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1.5 text-sm text-white/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 grid gap-2">
                  {project.live && (
                    <a className="primary-action justify-center" href={project.live} target="_blank" rel="noreferrer">
                      Live product <ExternalLink size={16} />
                    </a>
                  )}
                  {project.repo && (
                    <a className="secondary-action justify-center" href={project.repo} target="_blank" rel="noreferrer">
                      Frontend repo <GitBranch size={16} />
                    </a>
                  )}
                  {project.backend && (
                    <a className="secondary-action justify-center" href={project.backend} target="_blank" rel="noreferrer">
                      Backend repo <GitBranch size={16} />
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DeepDiveBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-8 border-t border-white/10 pt-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">{title}</h3>
      <p className="mt-3 leading-8 text-white/60">{body}</p>
    </section>
  );
}

function DeepDiveList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8 border-t border-white/10 pt-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-white/8 bg-white/[0.025] p-3 leading-7 text-white/60">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionKicker({ icon: Icon, label }: { icon: typeof Rocket; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-white/60">
      <Icon size={15} /> {label}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-white/40 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <span>Sachin Singh Engineering Studio</span>
      <span>Built as a product system, not a portfolio template.</span>
    </footer>
  );
}

export default App;
