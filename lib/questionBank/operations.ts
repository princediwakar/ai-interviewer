import { Question } from '@/types/interview';

export const OPERATIONS_QUESTIONS: Question[] = [
  // Case Study Questions - Entry Level
  {
    text: "A key supplier just informed you they can't deliver materials on time. How do you handle this situation?",
    tags: ["supply-chain", "crisis-management"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "What contingency plans would you activate?",
      "How would you communicate with affected stakeholders?"
    ]
  },
  {
    text: "Design a process to reduce customer support response time from 24 hours to 4 hours.",
    tags: ["process-improvement", "customer-support"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 15,
    followUps: [
      "What metrics would you track to measure success?",
      "How would you ensure quality doesn't suffer with faster response times?"
    ]
  },
  {
    text: "Your company is opening a new office location. Plan the operational setup.",
    tags: ["expansion", "setup"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 18,
    followUps: [
      "What operational systems would need to be replicated?",
      "How would you ensure consistency with existing locations?"
    ]
  },

  // Technical Questions - Entry Level
  {
    text: "What is Six Sigma and how would you apply it to improve a business process?",
    tags: ["six-sigma", "quality-improvement"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "What are the key phases of DMAIC methodology?",
      "How do you measure process capability?"
    ]
  },
  {
    text: "Explain the difference between lean and agile methodologies in operations.",
    tags: ["lean", "agile"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "When would you use lean vs agile approaches?",
      "How do you identify waste in operational processes?"
    ]
  },
  {
    text: "What are KPIs and how do you choose the right ones for an operational process?",
    tags: ["kpis", "metrics"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "How do you balance leading vs lagging indicators?",
      "What makes a KPI actionable vs just informational?"
    ]
  },

  // Case Study Questions - Mid Level
  {
    text: "Your manufacturing line is running at 70% efficiency. Design an improvement plan.",
    tags: ["efficiency", "manufacturing"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 18,
    followUps: [
      "How would you identify the root causes of inefficiency?",
      "What change management approach would you use?"
    ]
  },
  {
    text: "Design an inventory management system for a multi-location retail business.",
    tags: ["inventory-management", "retail"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 20,
    followUps: [
      "How would you handle demand forecasting across locations?",
      "What technology solutions would you implement?"
    ]
  },
  {
    text: "A critical system outage is affecting customer operations. Create an incident response plan.",
    tags: ["incident-management", "business-continuity"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you prioritize restoration efforts?",
      "What communication plan would you implement?"
    ]
  },

  // Technical Questions - Mid Level
  {
    text: "How would you implement a vendor management program?",
    tags: ["vendor-management", "procurement"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What criteria would you use for vendor evaluation?",
      "How would you manage vendor performance and relationships?"
    ]
  },
  {
    text: "Design a quality assurance program for a service-based business.",
    tags: ["quality-assurance", "service-delivery"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you measure service quality consistently?",
      "What feedback loops would you establish?"
    ]
  },
  {
    text: "Explain how you would implement automation in a manual process.",
    tags: ["automation", "process-design"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How would you identify which processes to automate first?",
      "What are the key considerations for successful automation?"
    ]
  },

  // Case Study Questions - Senior Level
  {
    text: "Your company is scaling from 100 to 1000 employees. Design the operational transformation.",
    tags: ["scaling", "organizational-design"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 25,
    followUps: [
      "What operational bottlenecks would you anticipate?",
      "How would you maintain operational efficiency during growth?"
    ]
  },
  {
    text: "Design a business continuity plan for a critical business function.",
    tags: ["business-continuity", "risk-management"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "What scenarios would you plan for?",
      "How would you test and maintain the continuity plan?"
    ]
  },
  {
    text: "A merger is creating operational redundancies. Plan the integration strategy.",
    tags: ["merger-integration", "change-management"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 22,
    followUps: [
      "How would you identify synergies and eliminate redundancies?",
      "What cultural integration challenges would you address?"
    ]
  },

  // Leadership Questions - Expert Level
  {
    text: "How would you build an operations organization that scales with rapid business growth?",
    tags: ["org-building", "scalability"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 20,
    followUps: [
      "What operational capabilities would you build vs buy?",
      "How would you maintain operational excellence during scaling?"
    ]
  },
  {
    text: "Design an operational excellence program for a global organization.",
    tags: ["operational-excellence", "global-operations"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 25,
    followUps: [
      "How would you standardize processes across different cultures?",
      "What governance model would you implement?"
    ]
  },

  // Situational Questions
  {
    text: "You discover a process that's been running incorrectly for months, affecting customer billing. What's your immediate response?",
    tags: ["error-correction", "customer-impact"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "How would you assess the scope of the impact?",
      "What's your communication strategy to affected customers?"
    ]
  },
  {
    text: "Your team is resistant to a new process you're implementing. How do you handle this?",
    tags: ["change-management", "team-resistance"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What techniques would you use to overcome resistance?",
      "How would you ensure successful adoption?"
    ]
  },
  {
    text: "Budget cuts require you to maintain the same service level with 20% fewer resources. What's your approach?",
    tags: ["resource-optimization", "efficiency"],
    type: "situational",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "How would you prioritize which activities to cut or modify?",
      "What operational improvements would you implement?"
    ]
  },

  // Project Management
  {
    text: "How would you manage a cross-functional project with competing priorities?",
    tags: ["project-management", "stakeholder-alignment"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What framework would you use to align stakeholders?",
      "How would you handle scope creep and changing requirements?"
    ]
  },
  {
    text: "Design a resource allocation strategy for multiple concurrent projects.",
    tags: ["resource-allocation", "portfolio-management"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 18,
    followUps: [
      "How would you prioritize projects when resources are constrained?",
      "What tools would you use for resource planning and tracking?"
    ]
  },

  // Data and Analytics
  {
    text: "How would you design a dashboard to monitor operational performance?",
    tags: ["dashboards", "performance-monitoring"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What visualizations would be most effective for operations?",
      "How would you ensure data accuracy and real-time updates?"
    ]
  },
  {
    text: "Design a data collection strategy to improve operational decision-making.",
    tags: ["data-strategy", "decision-support"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "What operational metrics would provide the most insight?",
      "How would you balance automated vs manual data collection?"
    ]
  },

  // Technology and Systems
  {
    text: "How would you evaluate and select operational software for your organization?",
    tags: ["technology-selection", "systems"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What criteria would you use for vendor evaluation?",
      "How would you manage the implementation and change management?"
    ]
  },
  {
    text: "Design a digital transformation strategy for operational processes.",
    tags: ["digital-transformation", "process-automation"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "How would you prioritize which processes to digitize first?",
      "What change management approach would you use?"
    ]
  }
];