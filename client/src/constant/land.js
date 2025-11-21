import {
  Bot,
  Camera,
  Headphones,
  Globe,
  Zap,
  MapPin,
  Eye,
  Brain,
  Compass,
  Smartphone,
  Users,
  Shield,
} from "lucide-react";

export const words = [
  "intelligent",
  "personalized",
  "effortless",
  "sustainable",
  "immersive",
  "authentic",
];

export const paragraph =
  " Unlock personalized itineraries, discover hidden gems, and experience local culture like never before. Our intelligent companion makes every trip unforgettable";

// Features of NIMBUS platform
export const features = [
  {
    title: "AR Walkthrough & 3D Visualization",
    info: "Experience destinations with lifelike AR walkthroughs and auto-generated 3D models built from simple photos. Immerse yourself before you arrive.",
    icon: Eye,
  },
  {
    title: "Context-Based Travel Iteration",
    info: "Adaptive itineraries evolve in real-time, factoring in weather, local events, and your unique journey style for personalized experiences.",
    icon: Brain,
  },
  {
    title: "Personalized Voice Companion",
    info: "Human-like AI voice assistant curates trips, answers questions, and guides you through every moment of your journey.",
    icon: Headphones,
  },
  {
    title: "2D to 3D Model Generation",
    info: "Upload photos and get interactive 3D models for AR exploration. Transform flat images into immersive experiences.",
    icon: Camera,
  },
  {
    title: "Real-Time Adaptation",
    info: "Plans change dynamically based on live events, crowds, weather conditions, and local happenings for optimal experiences.",
    icon: Zap,
  },
  {
    title: "Smart Route Planning",
    info: "AI-powered navigation with safety insights, crowd analysis, and local recommendations for worry-free exploration.",
    icon: MapPin,
  },
  {
    title: "Multi-Agent Intelligence",
    info: "Multiple AI specialists collaborate to shape your experience - from safety experts to cultural guides.",
    icon: Bot,
  },
  {
    title: "Immersive Previews",
    info: "Go there virtually before you go there for real. Preview destinations in stunning 3D detail and AR visualization.",
    icon: Globe,
  },
  {
    title: "Cultural Discovery",
    info: "Uncover hidden gems, local traditions, and authentic experiences curated by AI and verified by locals.",
    icon: Compass,
  },
];

// Add this to your existing land.js constant file
export const pricingCards = [
  {
    title: "Explorer",
    description: "Perfect for casual travelers and weekend adventurers",
    price: "Free",
    duration: "",
    highlight: "What you get",
    buttonText: "Start Exploring",
    features: [
      "5 AI trip recommendations per month",
      "Basic 3D model viewing",
      "Standard voice assistant support",
      "Trip planning tools and templates",
      "Community travel insights access",
      "Basic safety alerts and tips",
      "Simple itinerary creation (up to 2 trips)",
    ],
  },
  {
    title: "Adventurer",
    description: "For frequent travelers seeking full AI-powered experiences",
    price: "$29",
    duration: "month",
    highlight: "Everything in Explorer, plus",
    buttonText: "Upgrade to Adventurer",
    features: [
      "Unlimited AI travel recommendations",
      "Full AR walkthrough access",
      "Advanced voice planning sessions",
      "Real-time trip adaptation & updates",
      "2D to 3D model generation",
      "Priority customer support",
      "Offline trip access & sync",
      "Advanced safety route planning",
    ],
  },
  {
    title: "Voyager Pro",
    description: "Premium features for travel professionals and enthusiasts",
    price: "$79",
    duration: "month",
    highlight: "Everything in Adventurer, plus",
    buttonText: "Go Premium",
    features: [
      "Private travel consultant sessions",
      "Custom AR experiences & models",
      "Team/family trip collaboration workspace",
      "Early access to new AI travel features",
      "White-label travel planning tools",
      "Downloadable trip certificates & guides",
      "API access for travel integration",
      "24/7 emergency travel assistance",
    ],
  },
];

// Additional pricing section metadata
export const pricingSection = {
  badge: "Pricing",
  title: "Choose Your Travel Adventure Plan",
  subtitle:
    "Start your journey with our free plan or unlock the full power of AI-driven travel planning with our premium features.",
  yearlyDiscount: "Save 20% with yearly billing",
};

// Feature comparison for detailed view
export const featureComparison = [
  {
    category: "AI Recommendations",
    explorer: "5 per month",
    adventurer: "Unlimited",
    voyager: "Unlimited + Priority",
  },
  {
    category: "AR/3D Features",
    explorer: "Basic viewing",
    adventurer: "Full access",
    voyager: "Custom experiences",
  },
  {
    category: "Voice Assistant",
    explorer: "Standard",
    adventurer: "Advanced sessions",
    voyager: "Private consultant",
  },
  {
    category: "Trip Storage",
    explorer: "2 trips",
    adventurer: "Unlimited",
    voyager: "Unlimited + Team",
  },
  {
    category: "Support",
    explorer: "Community",
    adventurer: "Priority",
    voyager: "24/7 Emergency",
  },
];

// Testimonials for pricing section
export const pricingTestimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Nomad",
    plan: "Adventurer",
    quote:
      "The AR previews saved me from booking a terrible hotel. Worth every penny!",
    avatar: "/api/placeholder/40/40",
  },
  {
    name: "Mike Chen",
    role: "Travel Blogger",
    plan: "Voyager Pro",
    quote:
      "The API integration lets me create amazing content for my audience. Game changer!",
    avatar: "/api/placeholder/40/40",
  },
  {
    name: "Emma Rodriguez",
    role: "Family Traveler",
    plan: "Explorer",
    quote:
      "Started with free plan, now I can't travel without NIMBUS recommendations!",
    avatar: "/api/placeholder/40/40",
  },
];

// FAQ for pricing page
export const pricingFAQ = [
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee for all paid plans. No questions asked!",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your trip data remains accessible for 30 days after cancellation. You can export all your data before it's permanently deleted.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees! What you see is what you pay. All features listed are included in your monthly subscription.",
  },
  {
    question: "Do you offer team or business plans?",
    answer:
      "Yes! Our Voyager Pro plan includes team collaboration features. Contact us for custom enterprise solutions.",
  },
];

// Reviews for testimonial section
export const reviews = [
  {
    name: "Sarah Johnson",
    username: "@sarah_travels",
    body: "NIMBUS AR previews helped me pick the perfect Taj Mahal view hotel. Game changer!",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D",
    date: "Dec 15",
  },
  {
    name: "Mike Chen",
    username: "@wanderlust_mike",
    body: "2D to 3D model generation is incredible for content creation. Saved my Goa trip!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
    date: "Nov 28",
  },
  {
    name: "Priya Sharma",
    username: "@priya_explorer",
    body: "Found hidden Rajasthan gems I'd never discover alone. Authentic experiences!",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
    date: "Dec 10",
  },
  {
    name: "James Wilson",
    username: "@james_adventures",
    body: "Safety route planning gave me confidence to explore Delhi solo. Brilliant AI!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
    date: "Nov 22",
  },
  {
    name: "Emma Rodriguez",
    username: "@family_travels",
    body: "Perfect Kerala family trip! Voice assistant understood our kids' needs perfectly.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tYW58ZW58MHx8MHx8fDA%3D",
    date: "Dec 5",
  },
  {
    name: "Arjun Patel",
    username: "@arjun_nomad",
    body: "Multi-agent AI planned my 3-month India working trip flawlessly. Incredible!",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww",
    date: "Oct 18",
  },
  {
    name: "Lisa Thompson",
    username: "@lisa_solo",
    body: "Real-time adaptation saved my Himachal trip when weather changed. Amazing!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW58ZW58MHx8MHx8fDA%3D",
    date: "Nov 15",
  },
  {
    name: "Raj Kumar",
    username: "@raj_photo",
    body: "AR walkthrough helped me plan perfect Hampi sunrise shots. Revolutionary!",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww",
    date: "Dec 8",
  },
  {
    name: "Anna Kowalski",
    username: "@anna_backpack",
    body: "Started free, upgraded to Adventurer. Immersive previews saved me money!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8fDA%3D",
    date: "Nov 30",
  },
  {
    name: "David Kim",
    username: "@david_tech",
    body: "NIMBUS API powers our travel startup. Customers love the voice companion!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww",
    date: "Oct 25",
  },
  {
    name: "Meera Singh",
    username: "@meera_travel",
    body: "Voice companion crafted an amazing Rajasthan heritage tour. Like a local guide!",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMHdvbWFufGVufDB8fDB8fHww",
    date: "Dec 12",
  },
  {
    name: "Tom Anderson",
    username: "@tom_explorer",
    body: "Kerala monsoon hit early, NIMBUS adapted instantly to indoor experiences. Brilliant!",
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    date: "Nov 8",
  },
];
