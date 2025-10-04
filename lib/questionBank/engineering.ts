import { Question } from '@/types/interview';

export const ENGINEERING_QUESTIONS: Question[] = [

  // Technical Questions - Entry Level
  {
    text: "Explain the difference between synchronous and asynchronous programming.",
    tags: ["fundamentals", "async"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "Can you give an example of when you'd use each?",
      "What are some common pitfalls with async code?"
    ]
  },
  {
    text: "What is the difference between == and === in JavaScript?",
    tags: ["javascript", "fundamentals"],
    type: "technical", 
    difficulty: "entry",
    estimatedTime: 5,
    followUps: [
      "Can you give examples where this difference matters?",
      "How does type coercion work in JavaScript?"
    ]
  },
  {
    text: "Explain what RESTful APIs are and their key principles.",
    tags: ["apis", "rest"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "What HTTP methods would you use for different operations?",
      "How do you handle errors in REST APIs?"
    ]
  },


  // Technical Questions - Mid Level  
  {
    text: "How would you design a simple URL shortener like bit.ly?",
    tags: ["system-design", "scalability"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you handle scaling to millions of URLs?",
      "What database would you choose and why?"
    ]
  },
  {
    text: "Explain database indexing and when you would use it.",
    tags: ["databases", "performance"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 10,
    followUps: [
      "What are the trade-offs of adding indexes?",
      "How do you decide which columns to index?"
    ]
  },
  {
    text: "What is the difference between SQL and NoSQL databases? When would you use each?",
    tags: ["databases", "architecture"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "Can you give specific examples of each type?",
      "How do you handle relationships in NoSQL?"
    ]
  },


  // Technical Questions - Senior Level
  {
    text: "How would you design a distributed cache system?",
    tags: ["system-design", "distributed-systems"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "How would you handle cache invalidation?",
      "What consistency guarantees would you provide?"
    ]
  },
  {
    text: "Explain microservices architecture and its trade-offs compared to monoliths.",
    tags: ["architecture", "microservices"],
    type: "technical",
    difficulty: "senior", 
    estimatedTime: 15,
    followUps: [
      "When would you choose microservices over a monolith?",
      "How do you handle data consistency across services?"
    ]
  },
  {
    text: "How would you ensure high availability and disaster recovery for a critical system?",
    tags: ["reliability", "infrastructure"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 18,
    followUps: [
      "What monitoring and alerting would you implement?",
      "How do you test your disaster recovery procedures?"
    ]
  },

  // Leadership Questions - Expert Level
  {
    text: "How do you balance technical debt with new feature development?",
    tags: ["technical-debt", "prioritization"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 15,
    followUps: [
      "How do you communicate technical debt to product managers?",
      "What metrics do you use to track technical debt?"
    ]
  },
  {
    text: "Tell me about a time you had to make a difficult architectural decision that affected multiple teams.",
    tags: ["architecture", "cross-team-collaboration"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 20,
    followUps: [
      "How did you gather input from all stakeholders?",
      "How did you handle disagreement about the direction?"
    ]
  },
  {
    text: "How do you establish and maintain engineering standards across a growing team?",
    tags: ["standards", "team-scaling"],
    type: "leadership", 
    difficulty: "expert",
    estimatedTime: 15,
    followUps: [
      "How do you ensure standards are followed without slowing development?",
      "How do you evolve standards as the team grows?"
    ]
  },

  // Situational Questions
  {
    text: "You notice a security vulnerability in production. Walk me through your response.",
    tags: ["security", "incident-response"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How do you communicate the issue to stakeholders?",
      "What steps do you take to prevent future vulnerabilities?"
    ]
  },
  {
    text: "A critical system is down and you're the only one available. How do you handle it?",
    tags: ["incident-response", "pressure"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 10,
    followUps: [
      "How do you prioritize what to fix first?",
      "When do you escalate for help?"
    ]
  },
  {
    text: "You disagree with your manager's technical approach to a project. What do you do?",
    tags: ["conflict-resolution", "communication"],
    type: "situational",
    difficulty: "senior", 
    estimatedTime: 12,
    followUps: [
      "How do you present alternative solutions?",
      "What if they still disagree after your input?"
    ]
  }
];