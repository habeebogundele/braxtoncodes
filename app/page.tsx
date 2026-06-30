'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Search,
  Sparkles,
  Code,
  Globe,
  Cpu,
  Layers,
  Settings,
  Zap,
  Award,
  Users,
  CheckCircle,
  MessageSquare,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ChevronRight,
  Shield,
  Clock,
  Check,
  Star,
  ExternalLink,
  BookOpen,
  Eye,
  AlertCircle,
  Play,
  RotateCcw,
  Palette
} from 'lucide-react';

// Structuring Types for the Audit Output
interface AuditPlatform {
  name: string;
  status: string;
  visibilityScore: number;
  reason: string;
}

interface AuditRecommendation {
  category: string;
  action: string;
  impact: string;
  implementationDifficulty: string;
}

interface AuditResult {
  websiteUrl: string;
  brandName: string;
  targetKeyword: string;
  overallScore: number;
  seoScore: number;
  aeoScore: number;
  geoScore: number;
  status: string;
  summary: string;
  entityGraphStatus: string;
  platforms: AuditPlatform[];
  recommendations: AuditRecommendation[];
}

const loadingSteps = [
  "Connecting to Braxton&apos;s AI Crawler Node...",
  "Crawling page semantics & markup vectors...",
  "Scanning entity mentions in search databases...",
  "Checking LLM cataloging parameters on ChatGPT & Claude...",
  "Analyzing Gemini indexing depth & Google AI Overview snippets...",
  "Synthesizing Perplexity citation ranking variables...",
  "Structuring optimization action schema items..."
];

export default function Home() {
  // Navigation active tab tracking for header highlight
  const [activeTab, setActiveTab] = useState('home');

  // Contact Form States
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    service: 'GEO & AEO Optimization',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactResponse, setContactResponse] = useState<{ success: boolean; message: string; referenceId?: string } | null>(null);

  // Portfolio Filtering Category State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Interactive GEO Checker Form States
  const [auditUrl, setAuditUrl] = useState('');
  const [auditKeyword, setAuditKeyword] = useState('');
  const [auditDesc, setAuditDesc] = useState('');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Stats Counters state for about section
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    countries: 0
  });

  // Increment statistics after page starts up
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        projects: 142,
        experience: 8,
        clients: 94,
        countries: 18
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Interval-based loading steps for the GEO Auditor
  useEffect(() => {
    let interval: any;
    if (auditLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [auditLoading]);

  // Handle Contact Form Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactResponse(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await response.json();
      if (response.ok) {
        setContactResponse({ success: true, message: data.message, referenceId: data.referenceId });
        setContactForm({ name: '', email: '', company: '', website: '', service: 'GEO & AEO Optimization', message: '' });
      } else {
        setContactResponse({ success: false, message: data.error || 'Failed to submit.' });
      }
    } catch (err) {
      setContactResponse({ success: false, message: 'Could not connect to service. Please try again.' });
    } finally {
      setContactLoading(false);
    }
  };

  // Handle Live GEO Auditor Form Submit
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setAuditLoading(true);
    setAuditError(null);
    setAuditResult(null);
    setLoadingStep(0);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: auditUrl,
          keyword: auditKeyword,
          companyDescription: auditDesc
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAuditResult(data);
      } else {
        setAuditError(data.error || 'Failed to generate audit. Please check your URL & API state.');
      }
    } catch (err: any) {
      setAuditError('A networking error occurred. Make sure process.env.GEMINI_API_KEY is configured correctly.');
    } finally {
      setAuditLoading(false);
    }
  };

  // Services definitions
  const services = [
    {
      title: "Full Stack Website Development",
      description: "Custom, ultra-fast full-stack sites tailored for conversions, SEO, and native user actions.",
      bulletPoints: ["Corporate/Business Websites", "High-Converting Landing Pages", "Fluid Showcase Portfolios", "Responsive SaaS UI Web Interfaces", "Fully Custom Tech Architectures"],
      icon: Code,
      badge: "Core"
    },
    {
      title: "Website Design",
      description: "High-end visual design systems crafted with bespoke responsive layouts, striking typography, and custom identity elements.",
      bulletPoints: ["Art Direction & Branding", "Interactive UI/UX Prototypes", "High-Contrast Visual Systems", "Responsive Desktop & Mobile Layouts", "Aesthetic Typography Architecture"],
      icon: Palette,
      badge: "Design Expert"
    },
    {
      title: "Shopify E-commerce",
      description: "High-end Shopify storefronts customized to maximize average order value (AOV) and direct conversions.",
      bulletPoints: ["Bespoke Shopify Store Setup", "Fluid Schema Theme Customization", "Product Catalog Speed Tuning", "One-Page Checkout Optimization", "Headless Shopify Storefronts"],
      icon: Layers,
      badge: "E-comm Expert"
    },
    {
      title: "Traditional SEO",
      description: "Ensure your content ranks #1 for user search intents with robust web performance parameters.",
      bulletPoints: ["Frictionless Schema Optimization", "Clean Semantic Site Audits", "Localized Search Dominance", "Core Web Vitals Performance Tuning", "Keyword Intent Frameworks"],
      icon: Globe,
      badge: "Search Authority"
    },
    {
      title: "Answer Engine (AEO)",
      description: "Optimize markup structure so immediate answers choose your brand on voice bots and smart boxes.",
      bulletPoints: ["Rich Snippet Strategy Execution", "Voice-Search (Alexa, Siri, Nest) Hooks", "Custom QA FAQ Schema Deployment", "Interactive Knowledge Panel Authority", "Semantic Mapping of Services"],
      icon: Cpu,
      badge: "Voice & Snippets"
    },
    {
      title: "Generative Search (GEO)",
      description: "Emerge as a cited reference on smart AI engines utilizing next-generation information aggregation.",
      bulletPoints: ["Generative AI Indexing Ingestion", "ChatGPT, Claude & Gemini References", "Smart Perplexity Citation Strategy", "Entity-Graph Web Registration", "AI Brand Citation Anchor Building"],
      icon: Sparkles,
      badge: "AI Optimization"
    }
  ];

  // Portfolio items definitions
  const portfolioItems = [
    {
      title: "TechFlux Enterprise",
      category: "Full Stack Website Development",
      image: "/portfolio_techflux_saas.png",
      tech: ["Next.js", "TypeScript", "Tailwind v4", "Motion"],
      desc: "An enterprise-grade SaaS platform built with pixel-perfect responsive metrics, obtaining perfect 100/100 Google PageSpeed scores.",
      demo: "#"
    },
    {
      title: "Kenza Streetwear",
      category: "Shopify Stores",
      image: "/portfolio_kenza_streetwear.png",
      tech: ["Shopify Liquid", "Tailwind", "Alpine.js", "Custom Checkout"],
      desc: "International streetwear brand with bespoke animation logic, converting 38% higher than standard theme blueprints.",
      demo: "#"
    },
    {
      title: "Aether Creative Agency",
      category: "Website Design",
      image: "/portfolio_website_design.png",
      tech: ["Typography Art", "Figma", "UI/UX Layouts", "Brand Assets"],
      desc: "A stunning, minimalist hyper-designed dark interface built for a top-tier luxury design firm, focusing on bold typographic rhythm.",
      demo: "#"
    },
    {
      title: "OmniSaaS GEO Campaign",
      category: "GEO Projects",
      image: "/portfolio_omnisaas_geo.png",
      tech: ["Entity Grounding", "Wikidata Mapping", "Citation Authority"],
      desc: "Complete GEO audit and entity overhaul, scaling Gemini Search and ChatGPT brand references from zero to top cited status.",
      demo: "#"
    },
    {
      title: "Apex Logistics",
      category: "SEO Projects",
      image: "/portfolio_apex_logistics.png",
      tech: ["Technical SEO", "Clean Pathing", "Next.js Static Generation"],
      desc: "Global shipping directory optimized for high-volume technical keyword categories, achieving a 240% rise in organic search views.",
      demo: "#"
    },
    {
      title: "Aura Skincare AEO Schema",
      category: "AEO Projects",
      image: "/portfolio_aura_skincare.png",
      tech: ["FAQ Schema", "Snippet Integration", "JSON-LD Entity Graphs"],
      desc: "Strategic restructuring of a health brand catalog capturing 42 separate featured snippet cards and voice feedback answers.",
      demo: "#"
    },
    {
      title: "Zenith Hub Portfolio",
      category: "Full Stack Website Development",
      image: "/portfolio_zenith_architecture.png",
      tech: ["React", "Custom WebGL", "TailwindCSS"],
      desc: "Stunning 3D interactive layout for global design firm that generated over $2.4M in contract inquiries within 120 days.",
      demo: "#"
    }
  ];

  // Testimonials definitions
  const testimonials = [
    {
      quote: "Braxton brought our brand from total AI invisibility to being the #1 recommended custom solution inside ChatGPT Search and Perplexity. Absolutely game-changing work.",
      author: "Dominic Thorne",
      title: "VP of Growth, TechFlux",
      stars: 5,
      avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
      quote: "The speed and conversion metrics on our custom Shopify store are unreal. Braxton removed all generic theme lag, custom-coded our cart mechanics, and our ROI increased immediately.",
      author: "Sophia Alvarez",
      title: "Founder, Kenza Apparel",
      stars: 5,
      avatar: "https://picsum.photos/seed/avatar2/100/100"
    },
    {
      quote: "Braxton understands the deep backend logic of search. While other agencies are still pitching yesterday's organic tactics, he optimizes your brand for today's AI overviews and answers.",
      author: "Marcus Sterling",
      title: "Operations Director, Apex",
      stars: 5,
      avatar: "https://picsum.photos/seed/avatar3/100/100"
    }
  ];

  // Why choose cards
  const reasons = [
    {
      title: "Results-Driven Strategy",
      desc: "Every design module and schema insertion is reverse-engineered of concrete conversion parameters, focusing strictly on high-intent lead generations."
    },
    {
      title: "AI Search Expertise",
      desc: "As search transforms into synthesized AI feeds, Braxton deploys strategies focused directly on Perplexity, Gemini, ChatGPT, and Google AI Overview captures."
    },
    {
      title: "Premium Modern Development",
      desc: "Utilizing lightweight reactive tech stacks (TypeScript, Next.js, Tailwind, and custom micro-actions) to ensure instantaneous page renders."
    },
    {
      title: "Fast, Direct Delivery",
      desc: "No corporate slow-down. No account management lag. Work directly with Braxton to deploy changes in record time, keeping you ahead of the curve."
    },
    {
      title: "Conversion-Focused UX",
      desc: "We focus on user science. Layout priority, color theory, text density, and micro-animations are carefully designed to convert visual views into actual revenue."
    },
    {
      title: "Long-Term Agile Support",
      desc: "Organic algorithms and LLM indexes update weekly. We establish real-time rank dashboards, staying responsive to system changes indefinitely."
    }
  ];

  // Portfolio categories for filter buttons
  const categories = ['All', 'Full Stack Website Development', 'Website Design', 'Shopify Stores', 'SEO Projects', 'AEO Projects', 'GEO Projects'];

  const filteredPortfolio = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="relative min-h-screen selection:bg-cyan-400 selection:text-black bg-[#050608]">
      
      {/* Absolute Ambient Background Elements Wrapped Safely to Prevent Scroll Overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full filter blur-[120px] animate-pulse duration-[10000ms]"></div>
        <div className="absolute top-2/3 right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full filter blur-[100px]"></div>
      </div>

      {/* Modern High-End Floating Frame Header */}
      <nav id="navbar-brand" className="sticky top-0 w-full z-50 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between border-slate-800/80">
          
          {/* Brand Logo Group */}
          <a href="#home" className="flex items-center space-x-3 group text-white">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl text-slate-100 font-space tracking-wider shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all duration-300">
              B
            </span>
            <div className="flex flex-col">
              <span className="font-space font-black tracking-tighter text-lg uppercase">
                BRAXTON<span className="text-cyan-400">CODES</span>
              </span>
              <span className="text-[10px] tracking-widest font-mono text-cyan-400 font-bold uppercase">
                AEO & GEO SPECIALIST
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a 
              href="#about" 
              onClick={() => setActiveTab('about')}
              className={`hover:text-cyan-400 transition-colors uppercase tracking-wider text-xs ${activeTab === 'about' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={() => setActiveTab('services')}
              className={`hover:text-cyan-400 transition-colors uppercase tracking-wider text-xs ${activeTab === 'services' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
            >
              Services
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setActiveTab('portfolio')}
              className={`hover:text-cyan-400 transition-colors uppercase tracking-wider text-xs ${activeTab === 'portfolio' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
            >
              Work
            </a>
            <a 
              href="#audit-tool" 
              onClick={() => setActiveTab('audit')}
              className="flex items-center space-x-1.5 text-cyan-400 hover:text-white transition-colors uppercase tracking-wider text-xs font-bold py-1 px-3 border border-cyan-500/30 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Search Auditor</span>
            </a>
          </div>

          {/* Fast Consultation Button CTA */}
          <div className="flex items-center space-x-3">
            <a 
              href="#contact" 
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all duration-200"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO CONTAINER (Premium Tech Layout) */}
      <header id="home" className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 z-10">
          
          {/* High visibility tech tags */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono text-cyan-400 tracking-wider font-semibold uppercase">
              Now Optimizing For ChatGPT Search, Gemini, Perplexity & AI Overviews
            </span>
          </div>

          {/* Core high-impact headline */}
          <h1 className="text-4xl sm:text-6xl font-space font-extrabold text-white leading-tight tracking-tight">
            Building High-Converting Websites & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Optimizing Brands for AI Search</span>
          </h1>

          {/* Concise and high-value strategic bio */}
          <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed max-w-xl">
            I help businesses scale through custom website architecture, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO). Ensure your brand is cited and recommended on ChatGPT, Gemini, Perplexity, Claude, and traditional Google feeds.
          </p>

          {/* Key Call to Action buttons */}
          <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <a 
              href="#portfolio"
              className="flex-1 sm:flex-initial text-center px-8 py-4 rounded-xl bg-cyan-500 text-black font-space font-bold tracking-wide shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 transition-all text-sm uppercase flex items-center justify-center space-x-2 active:scale-95"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="#audit-tool"
              className="flex-1 sm:flex-initial text-center px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-space font-semibold tracking-wide transition-all text-sm uppercase flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Free AI Scan</span>
            </a>
          </div>

          {/* Meta Brand Proof Group */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900 w-full max-w-lg">
            <div className="flex flex-col">
              <span className="text-2xl font-space font-bold text-white">100%</span>
              <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">PageSpeed Target</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-space font-bold text-white">3.4x</span>
              <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Avg GEO Citations</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-space font-bold text-white">36%</span>
              <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Mean CRO Uplift</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Media Block */}
        <div className="lg:col-span-5 relative z-10 flex justify-center w-full">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden glass-premium border-slate-800/80 p-1 flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-slate-950/40 to-blue-500/10 z-0"></div>
            
            {/* Creative holographic workspace mockup */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950/80 p-6 flex flex-col justify-between border border-slate-800/40 font-mono text-[11px] text-slate-400">
              
              {/* Fake web window layout */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/40"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/40"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/40"></span>
                </div>
                <div className="bg-slate-900/90 py-1 px-4 rounded-md text-[10px] text-slate-400 tracking-wider flex items-center space-x-1 border border-slate-800/30">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>braxtoncodes.com/audit</span>
                </div>
                <div className="w-4"></div>
              </div>

              {/* Generative UI feedback simulation */}
              <div className="flex-1 py-4 flex flex-col space-y-4 overflow-y-auto">
                <div className="space-y-1">
                  <span className="text-cyan-400 font-semibold">[INFO] Starting indexing scan...</span>
                  <p className="text-slate-500 text-[10px]">Evaluating ChatGPT, Google AI Overviews, Gemini, Perplexity</p>
                </div>

                <div className="glass p-3 rounded-lg border-cyan-500/10 bg-cyan-500/5 space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center space-x-1 text-cyan-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ChatGPT Search Status</span>
                    </span>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">High Visibility</span>
                  </div>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Brand &ldquo;BRAXTON CODES&rdquo; identified inside semantic graph. Primary citation mapped in 3 separate technical search queries. Entity score: 87/100.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-850">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">AEO Schema</div>
                    <div className="text-base text-cyan-400 font-space font-extrabold mt-1">94%</div>
                    <div className="text-[9px] text-cyan-400 mt-0.5 font-bold">FAQ Structured</div>
                  </div>
                  <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-850">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">GEO Score</div>
                    <div className="text-base text-cyan-400 font-space font-extrabold mt-1">89/100</div>
                    <div className="text-[9px] text-cyan-300 mt-0.5 font-bold">Google Overviews</div>
                  </div>
                </div>

                <div className="text-slate-500 text-[9px] flex items-center space-x-1 justify-center pt-2">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span>Real-time analysis updated on 2026-06-04</span>
                </div>
              </div>

              {/* Action bar */}
              <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[10px]">
                <span className="text-[10px] text-slate-500">SYSTEM RESPONSE: STABLE</span>
                <span className="text-cyan-400 uppercase tracking-wider font-bold hover:underline cursor-pointer flex items-center space-x-1">
                  <span>DEPLOY OPTIMIZER</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Glowing background halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 filter blur-3xl rounded-full -z-10 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* SECTION 2: INTERACTIVE AUDITOR TOOL (AEO & GEO VISIBILITY CHECKER) */}
      <section id="audit-tool" className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
        <div className="glass-premium rounded-3xl p-6 md:p-12 border-slate-800/90 relative overflow-hidden">
          
          {/* Ambient light streak inside container */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-cyan-500/10 to-transparent filter blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex flex-col space-y-5 justify-center">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">AI Grounded Tool</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-space font-bold text-white tracking-tight">
                Inspect Your AI Search Visibility Report
              </h2>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Curious context? Type in your company&apos;s URL, your primary industry/description, and your key target search term. Our Gemini-3.5-powered engine will execute an immediate architectural lookup scoring your index metrics across Perplexity, Gemini, Claude, and ChatGPT.
              </p>

              <div className="space-y-3.5 text-xs text-slate-400 font-mono bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Calculates actual GEO Citation Depth index</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Formulates instant schema optimization task lists</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Completely integrated with server-side SDK processes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass rounded-2xl p-6 md:p-8 border-slate-800/80 bg-slate-950/90 relative">
                
                {/* Form submission when auditResult is null */}
                {!auditResult && !auditLoading && (
                  <form onSubmit={handleAuditSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                        Website Domain URL <span className="text-cyan-400">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. kenzaapparel.com"
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                          Primary Target Search Term
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. customized vegan cosmetics"
                          value={auditKeyword}
                          onChange={(e) => setAuditKeyword(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                          Short Brand/Service Description
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. Ecommerce skin therapy label"
                          value={auditDesc}
                          onChange={(e) => setAuditDesc(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 font-mono">
                      * Rest assured: Domain information is handled transiently solely for optimization synthesis context. No active credential setups are needed.
                    </p>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-space font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-lg shadow-cyan-500/20 active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span>Execute Generative Search Audit</span>
                    </button>
                    
                    {auditError && (
                      <div className="mt-4 p-3 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl flex items-start space-x-2 text-xs">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{auditError}</span>
                      </div>
                    )}
                  </form>
                )}

                {/* Loading state animation workflow */}
                {auditLoading && (
                  <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping"></div>
                      <div className="w-12 h-12 rounded-full border-2 border-t-cyan-400 border-r-blue-400 border-b-indigo-400 border-l-transparent animate-spin"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-base font-space font-semibold text-white tracking-wide">
                        Synthesizing Security Vectors...
                      </h4>
                      <div className="h-6 overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={loadingStep}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-xs font-mono text-cyan-400 tracking-wide"
                          >
                            {loadingSteps[loadingStep]}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audit Result Display Metrics */}
                {auditResult && !auditLoading && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Audited website</div>
                        <h4 className="text-lg font-space font-bold text-white mt-1">
                          {auditResult.brandName || "YOUR SITE"}
                        </h4>
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5 select-all">
                          {auditResult.websiteUrl}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Overall Visibility</div>
                        <div className="text-3xl font-space font-extrabold text-cyan-400 mt-1">
                          {auditResult.overallScore}%
                        </div>
                        <div className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 mt-1 uppercase w-fit inline-block">
                          {auditResult.status}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Scores Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Traditional SEO</span>
                        <span className="text-xl font-space font-bold text-cyan-400 mt-1">{auditResult.seoScore}%</span>
                        <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-2">
                          <div className="bg-cyan-400 h-full" style={{ width: `${auditResult.seoScore}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Answer Eng (AEO)</span>
                        <span className="text-xl font-space font-bold text-cyan-300 mt-1">{auditResult.aeoScore}%</span>
                        <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-2">
                          <div className="bg-cyan-400 h-full" style={{ width: `${auditResult.aeoScore}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-900 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Generative Eng (GEO)</span>
                        <span className="text-xl font-space font-bold text-blue-400 mt-1">{auditResult.geoScore}%</span>
                        <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-2">
                          <div className="bg-blue-500 h-full" style={{ width: `${auditResult.geoScore}%` }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">Executive Strategic Analysis:</h5>
                      <p className="text-xs text-slate-300 bg-slate-900/40 p-4 rounded-xl border border-slate-900/80 leading-relaxed font-sans">
                        {auditResult.summary}
                      </p>
                    </div>

                    {/* Platforms analysis */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Platform Indexing Health:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {auditResult.platforms?.map((plat, idx) => (
                          <div key={idx} className="bg-slate-900/40 border border-slate-900 p-3 rounded-xl flex flex-col">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white font-space font-semibold">{plat.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                plat.visibilityScore > 75 ? 'bg-emerald-500/10 text-emerald-400' :
                                plat.visibilityScore > 40 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                              }`}>
                                {plat.status} ({plat.visibilityScore}%)
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                              {plat.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations action plan list */}
                    <div className="space-y-3 border-t border-slate-900 pt-4">
                      <h5 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Action items to Rank First (AEO-GEO Strategy Plan):</h5>
                      <div className="space-y-2">
                        {auditResult.recommendations?.slice(0, 3).map((rec, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-900 px-4 py-3 rounded-xl flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-slate-300">
                              <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded uppercase font-bold font-mono tracking-wider shrink-0">
                                {rec.category}
                              </span>
                              <span>{rec.action}</span>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded uppercase font-extrabold tracking-wider">
                                Impact: {rec.impact}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          setAuditResult(null);
                          setAuditKeyword('');
                          setAuditUrl('');
                          setAuditDesc('');
                        }}
                        className="flex items-center space-x-1 py-1.5 px-3 rounded bg-slate-900 text-slate-400 hover:text-white transition-all text-xs font-mono border border-slate-800"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Scan</span>
                      </button>
                      <a
                        href="#contact"
                        className="flex items-center space-x-1 text-cyan-400 hover:text-white transition-all text-xs uppercase font-space font-bold hover:underline"
                      >
                        <span>Fix these results with Braxton</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT ME (Compelling Bio and Animated Stat Cards) */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Profile Picture with Futuristic Tech Frame */}
          <div className="lg:col-span-4 flex justify-center w-full relative group">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden glass-premium border-slate-800/80 p-1 flex items-center justify-center shadow-2xl">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-blue-500/10 z-0"></div>
              
              {/* Photo layer */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/40">
                <img 
                  src="/braxton_profile.jpg" 
                  alt="Braxton Codes" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual sci-fi corner markers and overlays */}
                <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-slate-800/80 px-2.5 py-1 rounded-md text-[9px] font-mono text-cyan-400 tracking-wider flex items-center space-x-1 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>SYSTEM: BRAXTON.LIVE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 glass-premium border-slate-800/60 p-3 rounded-xl bg-slate-950/80">
                  <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">GEO Expert Agent</span>
                    <span className="text-emerald-400 font-bold">STATUS: READY</span>
                  </div>
                  <div className="text-[9px] text-slate-400 leading-normal font-sans">
                    Specialized in semantic graph structuring, AEO node generation, and high-performance React deployment.
                  </div>
                </div>

                {/* Cybernetic grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,213,250,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              </div>

              {/* Outside decorative corner frames */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg pointer-events-none"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg pointer-events-none"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg pointer-events-none"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Bio side content */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-cyan-300 font-bold uppercase">The Architect</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-space font-extrabold text-white leading-tight tracking-tight">
              Pioneering High Visibility Solutions in the Generative Search Era
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Hello, I&apos;m <strong>Braxton codes</strong>. I operate at the direct convergence of professional full-stack website development, advanced e-commerce engineering, traditional SEO, and critical emergent generative indexing frameworks (AEO & GEO). 
            </p>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              Over the last 8 years, standard search has undergone dramatic transformations. Modern consumers do not just click link list aggregates; they request unified answers from active LLMs. I ensure your custom business sites, landing pages, and Shopify models are cleanly optimized to capture featured snippets and emerge as high-value citations inside ChatGPT and Gemini replies. 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-900">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-200">Shopify Custom Liquidity</span>
                  <p className="text-xs text-slate-400 mt-0.5">Highly optimized themes ensuring lightning performance scores.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-900">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-200">AEO/GEO Citation Capture</span>
                  <p className="text-xs text-slate-400 mt-0.5">Formulating semantic graphs placing you inside AI knowledge baselines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical Info Stat panel */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="glass hover:bg-slate-900/50 transition-all duration-300 p-6 rounded-2xl border-slate-900 flex flex-col justify-between">
              <div>
                <Award className="w-8 h-8 text-cyan-400" />
                <div className="text-3xl font-space font-extrabold text-white mt-4">
                  {stats.projects || "140"}+
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">
                Projects Completed
              </div>
            </div>

            <div className="glass hover:bg-slate-900/50 transition-all duration-300 p-6 rounded-2xl border-slate-900 flex flex-col justify-between">
              <div>
                <Clock className="w-8 h-8 text-cyan-400" />
                <div className="text-3xl font-space font-extrabold text-white mt-4">
                  {stats.experience || "8"}+
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">
                Years Experience
              </div>
            </div>

            <div className="glass hover:bg-slate-900/50 transition-all duration-300 p-6 rounded-2xl border-slate-900 flex flex-col justify-between">
              <div>
                <Users className="w-8 h-8 text-blue-400" />
                <div className="text-3xl font-space font-extrabold text-white mt-4">
                  {stats.clients || "90"}+
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">
                Clients Served
              </div>
            </div>

            <div className="glass hover:bg-slate-900/50 transition-all duration-300 p-6 rounded-2xl border-slate-900 flex flex-col justify-between">
              <div>
                <Globe className="w-8 h-8 text-indigo-400" />
                <div className="text-3xl font-space font-extrabold text-white mt-4">
                  {stats.countries || "15"}+
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">
                Countries Reached
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES WITH COMPREHENSIVE CARDS */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-12 md:py-24 bg-slate-950/40 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-wider text-cyan-400 font-bold uppercase">Our Offerings</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            Comprehensive Digital Optimization Capabilities
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            Merging premium custom engineering with aggressive marketing frameworks to establish permanent visibility across standard browsers and emergent generative search ecosystems.
          </p>
        </div>

        {/* Dynamic services modular list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={idx}
                className="glass-premium rounded-2xl p-6 md:p-8 border-slate-900 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 relative group"
              >
                {/* Accent link indicator in top right */}
                <span className="absolute top-4 right-4 text-[9px] font-mono font-bold uppercase text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded tracking-widest border border-cyan-500/10">
                  {service.badge}
                </span>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-space font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-slate-900/60">
                    <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-2">Technical Areas:</div>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                      {service.bulletPoints.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: FILTABLE PORTFOLIO SECTION */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono tracking-wider text-cyan-400 font-bold uppercase">Proven History</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
              Selected Collaborations
            </h2>
          </div>

          {/* Filtering controls tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-lg text-xs font-mono transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/15'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase Grid Layout with motion list transitions */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.title}
                className="group relative rounded-2xl overflow-hidden bg-slate-900/40 border border-slate-900 flex flex-col justify-between"
              >
                {/* Images with fallback reference settings */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-cyan-400 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded font-bold uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-space font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-900/80">
                    {/* Tech list tag */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-[9px] bg-slate-900 text-slate-400 font-mono py-0.5 px-2 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500 text-[10px] uppercase font-mono">STATUS: DEPLOYED</span>
                      <a 
                        href="#contact"
                        className="flex items-center space-x-1 text-cyan-400 hover:text-white transition-colors font-bold uppercase font-space text-[11px]"
                      >
                        <span>Case Study</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECTION 7: INTERACTIVE SKILL ASSESSMENT PROGRESS BARS */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
        <div className="glass rounded-3xl p-6 md:p-10 border-slate-900/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase">
                  <span>Stack Evaluation</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-space font-bold text-white tracking-tight">
                  Expert Capabilities Matched for Modern Search Scale
                </h3>
                
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Deeply fluent across foundational front-end interfaces, adaptive server architectures, CMS configurations, and highly-targeted organic optimizations. 
                </p>
              </div>

              <div className="border-t border-slate-900 pt-4 space-y-2">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Core Quality Metrix:</div>
                <div className="text-xs text-slate-300 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Perfect Lighthouse Web Vitals</span>
                </div>
                <div className="text-xs text-slate-300 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Complies fully with modern security standards</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Frontend and backends */}
              <div className="space-y-4 bg-slate-900/30 border border-slate-900/60 p-5 rounded-2xl">
                <h4 className="text-sm font-space font-bold text-cyan-400 uppercase tracking-widest">
                  Frontend Development
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>HTML / CSS</span>
                      <span className="text-slate-400 font-bold">95%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>React / Next.js</span>
                      <span className="text-slate-400 font-bold">90%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>TypeScript</span>
                      <span className="text-slate-400 font-bold">88%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>

                <h4 className="text-sm font-space font-bold text-cyan-400 uppercase tracking-widest pt-3 border-t border-slate-900">
                  Backend & Systems
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>Node.js / Express</span>
                      <span className="text-slate-400 font-bold">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>REST & GraphQL APIs</span>
                      <span className="text-slate-400 font-bold">92%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Platforms and Marketing */}
              <div className="space-y-4 bg-slate-900/30 border border-slate-900/60 p-5 rounded-2xl">
                <h4 className="text-sm font-space font-bold text-blue-400 uppercase tracking-widest">
                  Platforms & CRMs
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>Shopify Ecosystem</span>
                      <span className="text-slate-400 font-bold">94%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>WordPress Custom Themes</span>
                      <span className="text-slate-400 font-bold">82%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>

                <h4 className="text-sm font-space font-bold text-indigo-400 uppercase tracking-widest pt-3 border-t border-slate-900">
                  Search & Traffic Growth
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>AEO snippet schemas</span>
                      <span className="text-slate-400 font-bold">92%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-indigo-400 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>GEO LLM Index Optimization</span>
                      <span className="text-slate-400 font-bold">96%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-indigo-400 h-full rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                      <span>Conversion Optimization (CRO)</span>
                      <span className="text-slate-400 font-bold">89%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="bg-indigo-400 h-full rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: 6 WHY CHOOSE ME FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-wider text-cyan-400 font-bold uppercase">The Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            Why Braxton Codes?
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl">
            Bringing elite technical execution and high fidelity transparency to keep your brand resilient through generative change.
          </p>
        </div>

        {/* Feature Grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((rec, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/40 border border-slate-900 hover:border-cyan-500/20 p-6 rounded-2xl flex flex-col space-y-3 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/20">
                0{idx + 1}
              </div>
              <h3 className="text-base font-space font-bold text-white pt-1">
                {rec.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {rec.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: PREMIUM CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-wider text-cyan-400 font-bold uppercase">Valid Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            What Forward-Thinking Brands Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/80 border border-slate-900 p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative"
            >
              <div className="space-y-4">
                {/* Rating system stars */}
                <div className="flex items-center space-x-0.5">
                  {[...Array(test.stars)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed font-sans">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Bio Group footer */}
              <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-slate-900/70">
                <img 
                  src={test.avatar} 
                  alt={test.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0 bg-slate-900 border border-slate-800"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">{test.author}</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">{test.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: CONVERSION INTAKE CONTACT FORM */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Detail side details branding */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono tracking-wider text-cyan-300 font-bold uppercase">Get in Touch</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white leading-tight tracking-tight">
                Ready to Grow Your Online Presence?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Let&apos;s construct a pixel perfect responsive web interface styled with elite components, optimized natively to conquer ChatGPT, Google Overviews, Gemini, and Siri direct actions.
              </p>

              {/* Directly actionable contact coordinates */}
              <div className="space-y-4 pt-4 shrink-0 text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href="mailto:braxtoncodes02@gmail.com" className="hover:text-white hover:underline transition-all">
                    braxtoncodes02@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Structured Branding Channels */}
            <div className="space-y-2 border-t border-slate-950 pt-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">Braxton Everywhere:</div>
              <div className="flex items-center space-x-3">
                <a href="https://github.com/braxtoncodes02" target="_blank" className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white border border-slate-800 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white border border-slate-800 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white border border-slate-800 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Consultation Intake Form */}
          <div className="lg:col-span-7">
            <div className="glass-premium rounded-3xl p-6 md:p-8 border-slate-900/80 bg-slate-950/80">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Dominic Thorne"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. dom@techflux.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      Company/Organization
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. TechFlux Enterprise"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      Current Website (Optional)
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. techflux.com"
                      value={contactForm.website}
                      onChange={(e) => setContactForm({...contactForm, website: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Focus Needed
                  </label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-300 outline-none transition-all"
                  >
                    <option>Full Stack Website Development</option>
                    <option>Bespoke Website Design</option>
                    <option>Shopify Conversion Storefronts</option>
                    <option>GEO & AEO Optimization</option>
                    <option>Technical SEO Audit Campaign</option>
                    <option>Full-Scale Stack & SEO Redesign</option>
                  </select>
                </div>

                 <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">
                    Strategic Project Description <span className="text-cyan-400">*</span>
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Briefly describe your business goals, speed blocks, conversion drops, or AI indexing desires..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-space font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 active:scale-95"
                >
                  {contactLoading ? (
                    <span>Registering Consultation...</span>
                  ) : (
                    <>
                      <span>Book Strategic Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {contactResponse && (
                  <div className={`mt-4 p-4 rounded-2xl text-xs border ${
                    contactResponse.success 
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                      : 'bg-red-950/40 border-red-500/30 text-red-300'
                  }`}>
                    <div className="font-semibold">{contactResponse.success ? 'Consultation Saved!' : 'Error Submitting'}</div>
                    <div className="mt-1">{contactResponse.message}</div>
                    {contactResponse.referenceId && (
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                        Ticket Ref ID: {contactResponse.referenceId}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER SECTION: MULTI COLUMN AND BRAND LEGAL */}
      <footer className="bg-slate-950 border-t border-slate-900/80 px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-sm text-slate-950 font-space tracking-wider">
                B
              </span>
              <span className="font-space font-bold tracking-widest text-base">
                BRAXTON CODES
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Helping businesses rank in Google, AI Search, ChatGPT, Gemini, Perplexity, Siri, and other emergent generative answer ecosystems worldwide.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">Services Matrix</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Full Stack Website Development</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Bespoke Website Design</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Shopify Store Optimization</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">AI Citations Analytics</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Generative Search SEO/GEO</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Voice Assistant Schema</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">Resource Quicklinks</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Professional Case Bio</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Showcase Work</a></li>
              <li><a href="#audit-tool" className="hover:text-cyan-400 transition-colors text-cyan-400">Live AI Search Scan</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors border-b border-dashed border-slate-800">Direct Consultancy</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">Location context</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Nigeria<br />
              Available Globally<br />
              Time: 2026-06-04 UTC
            </p>
          </div>

        </div>

        {/* Closing copyright lines */}
        <div className="max-w-7xl mx-auto border-t border-slate-900/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Braxton Codes. All Rights Mapped.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Strategic Engagement</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
            <span className="hover:text-slate-300 cursor-pointer">Entity Data Disclosures</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
