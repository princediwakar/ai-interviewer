import { Question } from '@/types/interview';

export const SALES_QUESTIONS: Question[] = [
  // Case Study Questions - Entry Level
  {
    text: "Walk me through how you would qualify a potential lead for our B2B software.",
    tags: ["lead-qualification", "discovery"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "What questions would you ask to understand their needs?",
      "How would you determine if they're a good fit?"
    ]
  },
  {
    text: "A prospect says your solution is too expensive. How do you handle this objection?",
    tags: ["objection-handling", "pricing"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "How would you uncover the real concern behind the price objection?",
      "What value propositions would you emphasize?"
    ]
  },
  {
    text: "Design a prospecting strategy for selling to mid-market companies in the healthcare industry.",
    tags: ["prospecting", "industry-focus"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 15,
    followUps: [
      "What channels would you use to reach prospects?",
      "How would you personalize your outreach?"
    ]
  },

  // Technical Questions - Entry Level
  {
    text: "Explain the difference between BANT and MEDDIC qualification frameworks.",
    tags: ["qualification", "frameworks"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "When would you use each framework?",
      "What are the limitations of each approach?"
    ]
  },
  {
    text: "What are the key stages of a typical B2B sales cycle?",
    tags: ["sales-process", "b2b"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "What activities happen at each stage?",
      "How do you know when to advance to the next stage?"
    ]
  },
  {
    text: "How do you calculate and track sales velocity?",
    tags: ["metrics", "sales-velocity"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "What factors can you control to improve sales velocity?",
      "How would you benchmark your velocity against industry standards?"
    ]
  },

  // Case Study Questions - Mid Level
  {
    text: "You're selling to a committee of 6 stakeholders with different priorities. How do you manage this?",
    tags: ["stakeholder-management", "complex-sales"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you identify the real decision maker?",
      "What's your strategy for building consensus?"
    ]
  },
  {
    text: "A deal you've been working on for 6 months suddenly goes dark. What's your approach?",
    tags: ["deal-management", "revival"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What steps would you take to re-engage the prospect?",
      "How would you diagnose what went wrong?"
    ]
  },
  {
    text: "Design a territory management strategy for a new market you're entering.",
    tags: ["territory-management", "market-entry"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 18,
    followUps: [
      "How would you prioritize accounts in the territory?",
      "What market research would you conduct first?"
    ]
  },

  // Technical Questions - Mid Level
  {
    text: "How would you build and manage a sales pipeline for a 12-month sales cycle?",
    tags: ["pipeline-management", "forecasting"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What pipeline coverage ratio would you target?",
      "How would you improve forecast accuracy?"
    ]
  },
  {
    text: "Explain how you would implement a value-based selling approach.",
    tags: ["value-selling", "methodology"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How do you quantify value for different types of customers?",
      "What tools would you use to demonstrate ROI?"
    ]
  },
  {
    text: "How would you design a sales compensation plan for a new product line?",
    tags: ["compensation", "incentives"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What behaviors would you want to incentivize?",
      "How would you balance individual vs team incentives?"
    ]
  },

  // Case Study Questions - Senior Level
  {
    text: "Your company is moving upmarket from SMB to enterprise. How do you adapt your sales strategy?",
    tags: ["enterprise-sales", "market-expansion"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "What changes would you make to the sales process?",
      "How would you adjust team structure and hiring?"
    ]
  },
  {
    text: "A major competitor just reduced their prices by 30%. How do you respond?",
    tags: ["competitive-strategy", "pricing-pressure"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 18,
    followUps: [
      "How would you train your team to handle price comparisons?",
      "What value propositions would you emphasize?"
    ]
  },
  {
    text: "Design a partner channel strategy for expanding into international markets.",
    tags: ["channel-sales", "partnerships"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 22,
    followUps: [
      "How would you structure partner agreements?",
      "What support would you provide to channel partners?"
    ]
  },

  // Leadership Questions - Expert Level
  {
    text: "How would you build a sales organization from 10 to 100 reps while maintaining culture?",
    tags: ["team-scaling", "culture"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 20,
    followUps: [
      "What hiring criteria would you establish?",
      "How would you maintain coaching quality at scale?"
    ]
  },
  {
    text: "Design a sales enablement strategy for a complex technical product.",
    tags: ["sales-enablement", "technical-selling"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 18,
    followUps: [
      "What training programs would you implement?",
      "How would you measure enablement effectiveness?"
    ]
  },

  // Situational Questions
  {
    text: "You're 30% behind quota with one month left in the quarter. What's your action plan?",
    tags: ["quota-management", "urgency"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How would you prioritize your existing pipeline?",
      "What emergency tactics would you deploy?"
    ]
  },
  {
    text: "A key client is threatening to cancel their contract. How do you handle this?",
    tags: ["retention", "crisis-management"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What questions would you ask to understand their concerns?",
      "How would you structure a retention offer?"
    ]
  },
  {
    text: "Your best rep just gave notice and has deals worth $2M in their pipeline. What do you do?",
    tags: ["transition-management", "risk-mitigation"],
    type: "situational",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "How would you ensure a smooth handover of accounts?",
      "What would you do to prevent client defection?"
    ]
  },

  // Sales Process & Technology
  {
    text: "How would you implement a sales methodology like SPIN or Challenger across a team?",
    tags: ["methodology", "training"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you ensure adoption and consistent application?",
      "What metrics would you track to measure success?"
    ]
  },
  {
    text: "Design a CRM strategy for a growing sales team.",
    tags: ["crm", "sales-operations"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What data fields and processes would you standardize?",
      "How would you ensure data quality and adoption?"
    ]
  },
  {
    text: "How would you use AI and automation to improve sales efficiency?",
    tags: ["sales-tech", "automation"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "What sales activities would you automate first?",
      "How would you balance automation with personalization?"
    ]
  },

  // Role Play Scenarios
  {
    text: "Role play: I'm a prospect who says 'We're happy with our current solution.' How do you respond?",
    tags: ["role-play", "status-quo"],
    type: "situational",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "How would you uncover dissatisfaction or pain points?",
      "What questions would help them envision a better future state?"
    ]
  },
  {
    text: "Role play: I'm a prospect asking for a 50% discount to close today. How do you handle this?",
    tags: ["role-play", "negotiation"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 10,
    followUps: [
      "How would you test if this is a real deadline?",
      "What alternatives to discounting would you propose?"
    ]
  }
];