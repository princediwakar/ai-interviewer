import { Question } from '@/types/interview';

export const MARKETING_QUESTIONS: Question[] = [
  // Case Study Questions - Entry Level
  {
    text: "How would you design a digital marketing campaign for a new mobile app launch?",
    tags: ["campaign-design", "app-marketing"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 15,
    followUps: [
      "What channels would you prioritize and why?",
      "How would you measure campaign success?"
    ]
  },
  {
    text: "A company's email open rates have dropped by 30%. How would you diagnose and fix this?",
    tags: ["email-marketing", "analytics"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "What metrics would you analyze first?",
      "What A/B tests would you run?"
    ]
  },
  {
    text: "Design a content marketing strategy for a B2B SaaS company.",
    tags: ["content-marketing", "b2b"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 18,
    followUps: [
      "What types of content would you create?",
      "How would you distribute and promote the content?"
    ]
  },

  // Technical Questions - Entry Level
  {
    text: "Explain the difference between organic and paid social media marketing.",
    tags: ["social-media", "paid-advertising"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "When would you choose one over the other?",
      "How do you measure ROI for each approach?"
    ]
  },
  {
    text: "What is the marketing funnel and how do you optimize each stage?",
    tags: ["funnel", "conversion-optimization"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "What metrics would you track at each stage?",
      "How would you identify bottlenecks?"
    ]
  },
  {
    text: "Explain the key differences between Google Ads and Facebook Ads.",
    tags: ["paid-advertising", "platform-comparison"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "When would you use each platform?",
      "How do the targeting options differ?"
    ]
  },

  // Case Study Questions - Mid Level
  {
    text: "A SaaS company wants to expand from SMB to enterprise customers. Design their marketing strategy.",
    tags: ["market-expansion", "enterprise-marketing"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 20,
    followUps: [
      "How would you adjust messaging and positioning?",
      "What new marketing channels would you introduce?"
    ]
  },
  {
    text: "Your company's customer acquisition cost (CAC) is too high. How would you reduce it?",
    tags: ["cac-optimization", "efficiency"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What levers would you pull to reduce CAC?",
      "How would you balance CAC reduction with growth?"
    ]
  },
  {
    text: "Design a growth marketing strategy for a marketplace platform (like Airbnb or Uber).",
    tags: ["growth-marketing", "marketplace"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 25,
    followUps: [
      "How would you solve the chicken-and-egg problem?",
      "What growth loops would you implement?"
    ]
  },

  // Technical Questions - Mid Level
  {
    text: "How would you set up attribution modeling for a multi-channel marketing campaign?",
    tags: ["attribution", "measurement"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What are the limitations of different attribution models?",
      "How would you handle cross-device tracking?"
    ]
  },
  {
    text: "Explain how you would implement and optimize a marketing automation workflow.",
    tags: ["marketing-automation", "workflows"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What triggers and conditions would you set up?",
      "How would you personalize the automation?"
    ]
  },
  {
    text: "How would you approach SEO for a new website in a competitive industry?",
    tags: ["seo", "content-strategy"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What would your keyword research process look like?",
      "How would you build domain authority?"
    ]
  },

  // Case Study Questions - Senior Level
  {
    text: "Design a complete go-to-market strategy for a company entering a new geographic market.",
    tags: ["go-to-market", "international"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 25,
    followUps: [
      "How would you adapt your strategy for local market conditions?",
      "What partnerships or local strategies would you consider?"
    ]
  },
  {
    text: "A competitor with a larger budget is copying all your marketing strategies. How do you respond?",
    tags: ["competitive-strategy", "differentiation"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "How would you create defensible marketing advantages?",
      "What new strategies would you explore?"
    ]
  },
  {
    text: "Design a marketing strategy for a company launching in a completely new product category.",
    tags: ["category-creation", "positioning"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 22,
    followUps: [
      "How would you educate the market about the new category?",
      "What thought leadership strategies would you implement?"
    ]
  },

  // Leadership Questions - Expert Level
  {
    text: "How would you build and scale a marketing organization from 5 to 50 people?",
    tags: ["team-scaling", "organization"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 20,
    followUps: [
      "What roles would you hire first?",
      "How would you maintain marketing consistency as you scale?"
    ]
  },
  {
    text: "Design a marketing technology stack for a fast-growing company.",
    tags: ["martech", "technology-strategy"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 18,
    followUps: [
      "How would you ensure data integration across tools?",
      "What would your technology evaluation criteria be?"
    ]
  },

  // Situational Questions
  {
    text: "Your biggest marketing campaign just launched and the results are disappointing. What's your immediate response?",
    tags: ["crisis-management", "optimization"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How quickly would you make changes to the campaign?",
      "How would you communicate this to leadership?"
    ]
  },
  {
    text: "The sales team says marketing leads are low quality. How do you address this?",
    tags: ["sales-marketing-alignment", "lead-quality"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you investigate the lead quality issue?",
      "What process changes would you implement?"
    ]
  },
  {
    text: "Budget is cut by 40% but growth targets remain the same. How do you adapt your strategy?",
    tags: ["budget-optimization", "efficiency"],
    type: "situational",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "Which marketing activities would you prioritize?",
      "How would you maintain growth with limited resources?"
    ]
  },

  // Analytics & Measurement Questions
  {
    text: "How would you measure the ROI of a brand awareness campaign?",
    tags: ["measurement", "brand-marketing"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What metrics would you track beyond direct conversions?",
      "How would you establish causation vs correlation?"
    ]
  },
  {
    text: "Design an experimentation framework for a marketing team.",
    tags: ["experimentation", "testing"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "How would you prioritize which tests to run?",
      "What would your statistical significance criteria be?"
    ]
  }
];