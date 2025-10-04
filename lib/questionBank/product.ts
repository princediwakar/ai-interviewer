import { Question } from '@/types/interview';

export const PRODUCT_QUESTIONS: Question[] = [

  // Case Study Questions - Entry Level
  {
    text: "How would you improve the user onboarding experience for a mobile banking app?",
    tags: ["user-experience", "onboarding"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 15,
    followUps: [
      "What metrics would you track to measure success?",
      "How would you prioritize different improvements?"
    ]
  },
  {
    text: "A feature you launched isn't performing as expected. Walk me through your approach to diagnose and fix it.",
    tags: ["analytics", "problem-solving"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "What data would you look at first?",
      "How would you decide whether to iterate or pivot?"
    ]
  },


  // Case Study Questions - Mid Level
  {
    text: "Design a feature to help users discover new content on a social media platform.",
    tags: ["feature-design", "user-discovery"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 20,
    followUps: [
      "How would you personalize the discovery experience?",
      "What success metrics would you define?"
    ]
  },
  {
    text: "You notice user engagement dropping. How would you investigate and address this?",
    tags: ["analytics", "user-engagement"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What hypotheses would you form about the drop?",
      "How would you test potential solutions?"
    ]
  },
  {
    text: "How would you approach pricing for a new SaaS product feature?",
    tags: ["pricing", "monetization"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 18,
    followUps: [
      "What factors would influence your pricing strategy?",
      "How would you test different pricing models?"
    ]
  },


  // Case Study Questions - Senior Level
  {
    text: "Design a product strategy for entering a new market segment.",
    tags: ["strategy", "market-expansion"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 25,
    followUps: [
      "How would you validate the market opportunity?",
      "What would your go-to-market strategy look like?"
    ]
  },
  {
    text: "A competitor just launched a feature similar to yours but better. How do you respond?",
    tags: ["competitive-strategy", "differentiation"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "How would you assess the competitive threat?",
      "What factors would influence your response strategy?"
    ]
  },

  // Leadership Questions - Expert Level
  {
    text: "How do you align multiple product teams toward a common vision?",
    tags: ["vision", "alignment"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 15,
    followUps: [
      "How do you handle conflicting team priorities?",
      "What communication mechanisms do you use?"
    ]
  },
  {
    text: "How do you balance innovation with maintaining existing products?",
    tags: ["innovation", "resource-allocation"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 18,
    followUps: [
      "How do you decide what percentage of resources to allocate to each?",
      "How do you measure success for both types of work?"
    ]
  },
  {
    text: "Describe your approach to building and scaling a product organization.",
    tags: ["org-building", "scaling"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 20,
    followUps: [
      "How do you hire and develop product talent?",
      "What processes do you put in place as the team grows?"
    ]
  },

  // Situational Questions
  {
    text: "Your engineering team says a feature will take 6 months, but the CEO wants it in 2 months. How do you handle this?",
    tags: ["expectations-management", "scope"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How do you find a compromise solution?",
      "What information would you need from engineering?"
    ]
  },
  {
    text: "You discover a critical bug in production right before a major product launch. What do you do?",
    tags: ["crisis-management", "launch"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 10,
    followUps: [
      "How do you assess the severity and impact?",
      "Who do you involve in the decision-making process?"
    ]
  },
  {
    text: "A key customer threatens to cancel unless you build their specific feature request. How do you respond?",
    tags: ["customer-management", "roadmap"],
    type: "situational",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "How do you evaluate the customer's request against your roadmap?",
      "What alternatives might you propose?"
    ]
  },

  // Technical Understanding Questions
  {
    text: "How do you work with engineering teams to estimate project timelines?",
    tags: ["estimation", "engineering-collaboration"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 10,
    followUps: [
      "What factors do you consider when pushing back on estimates?",
      "How do you handle significant timeline changes?"
    ]
  },
  {
    text: "Explain how you would evaluate different technical solutions for a product requirement.",
    tags: ["technical-evaluation", "trade-offs"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 12,
    followUps: [
      "What criteria do you use to compare solutions?",
      "How do you balance technical quality with speed to market?"
    ]
  }
];