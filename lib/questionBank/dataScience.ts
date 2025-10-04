import { Question } from '@/types/interview';

export const DATA_SCIENCE_QUESTIONS: Question[] = [
  // Technical Questions - Entry Level
  {
    text: "Explain the difference between supervised and unsupervised learning with examples.",
    tags: ["machine-learning", "fundamentals"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "When would you choose one approach over the other?",
      "What are some common algorithms for each type?"
    ]
  },
  {
    text: "What is overfitting and how do you prevent it?",
    tags: ["overfitting", "model-validation"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "What techniques can you use to detect overfitting?",
      "How does cross-validation help with this problem?"
    ]
  },
  {
    text: "Explain the bias-variance tradeoff in machine learning.",
    tags: ["bias-variance", "model-complexity"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 12,
    followUps: [
      "How do you find the optimal balance?",
      "What happens when you have high bias vs high variance?"
    ]
  },
  {
    text: "What is the difference between Type I and Type II errors?",
    tags: ["statistics", "hypothesis-testing"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "In what scenarios is each type of error more costly?",
      "How do you balance these errors in practice?"
    ]
  },

  // Case Study Questions - Entry Level
  {
    text: "You're asked to predict customer churn for a subscription business. Walk me through your approach.",
    tags: ["churn-prediction", "business-problem"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 15,
    followUps: [
      "What features would you engineer for this problem?",
      "How would you handle class imbalance in churn data?"
    ]
  },
  {
    text: "Design an A/B testing framework for an e-commerce website.",
    tags: ["ab-testing", "experimentation"],
    type: "case-study",
    difficulty: "entry",
    estimatedTime: 18,
    followUps: [
      "How would you determine sample size and test duration?",
      "What metrics would you track beyond the primary KPI?"
    ]
  },

  // Technical Questions - Mid Level
  {
    text: "How would you handle missing data in a dataset?",
    tags: ["data-preprocessing", "missing-data"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "When would you use imputation vs deletion?",
      "What are the implications of different imputation methods?"
    ]
  },
  {
    text: "Explain the difference between precision, recall, and F1-score.",
    tags: ["evaluation-metrics", "classification"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 10,
    followUps: [
      "When would you optimize for precision vs recall?",
      "How do you choose the right threshold for classification?"
    ]
  },
  {
    text: "What is regularization and when would you use L1 vs L2 regularization?",
    tags: ["regularization", "feature-selection"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What are the mathematical differences between L1 and L2?",
      "How do you choose the regularization parameter?"
    ]
  },
  {
    text: "Explain how gradient descent works and its variants.",
    tags: ["optimization", "algorithms"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What are the differences between batch, mini-batch, and stochastic gradient descent?",
      "How do you handle local minima and saddle points?"
    ]
  },

  // Case Study Questions - Mid Level
  {
    text: "Design a recommendation system for a streaming platform like Netflix.",
    tags: ["recommendation-systems", "collaborative-filtering"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 20,
    followUps: [
      "How would you handle the cold start problem?",
      "What approach would you use for real-time recommendations?"
    ]
  },
  {
    text: "You need to detect fraudulent transactions in real-time. Design your solution.",
    tags: ["fraud-detection", "real-time-ml"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 18,
    followUps: [
      "How would you balance false positives vs false negatives?",
      "What features would be most important for fraud detection?"
    ]
  },
  {
    text: "Build a demand forecasting model for inventory management.",
    tags: ["time-series", "forecasting"],
    type: "case-study",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "How would you handle seasonality and trends?",
      "What external factors would you incorporate?"
    ]
  },

  // Technical Questions - Senior Level
  {
    text: "How would you design and implement a machine learning pipeline for production?",
    tags: ["mlops", "production-systems"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 20,
    followUps: [
      "What monitoring and alerting would you implement?",
      "How would you handle model versioning and rollbacks?"
    ]
  },
  {
    text: "Explain different approaches to feature selection and when to use each.",
    tags: ["feature-selection", "dimensionality-reduction"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "How do you evaluate the effectiveness of feature selection?",
      "What are the computational trade-offs of different methods?"
    ]
  },
  {
    text: "How would you handle concept drift in a production ML model?",
    tags: ["concept-drift", "model-monitoring"],
    type: "technical",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "What metrics would you use to detect drift?",
      "What strategies would you use to adapt to drift?"
    ]
  },

  // Case Study Questions - Senior Level
  {
    text: "Design an end-to-end ML system for autonomous vehicle perception.",
    tags: ["computer-vision", "autonomous-systems"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 25,
    followUps: [
      "How would you ensure safety and reliability?",
      "What data collection and labeling strategy would you use?"
    ]
  },
  {
    text: "Build a real-time bidding system for programmatic advertising.",
    tags: ["real-time-systems", "optimization"],
    type: "case-study",
    difficulty: "senior",
    estimatedTime: 22,
    followUps: [
      "How would you optimize for both performance and latency?",
      "What would your feedback loop look like?"
    ]
  },

  // Leadership Questions - Expert Level
  {
    text: "How would you build and scale a data science organization from 5 to 50 people?",
    tags: ["team-scaling", "organization"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 20,
    followUps: [
      "What roles would you hire for and in what order?",
      "How would you structure teams and responsibilities?"
    ]
  },
  {
    text: "Design a data strategy for a company transitioning to become data-driven.",
    tags: ["data-strategy", "transformation"],
    type: "leadership",
    difficulty: "expert",
    estimatedTime: 25,
    followUps: [
      "How would you prioritize different data initiatives?",
      "What cultural changes would you implement?"
    ]
  },

  // Situational Questions
  {
    text: "Your model performance has suddenly degraded in production. How do you investigate?",
    tags: ["debugging", "production-issues"],
    type: "situational",
    difficulty: "mid",
    estimatedTime: 12,
    followUps: [
      "What are the most common causes of performance degradation?",
      "How would you communicate the issue to stakeholders?"
    ]
  },
  {
    text: "Stakeholders want to deploy a model that you know has ethical concerns. How do you handle this?",
    tags: ["ethics", "stakeholder-management"],
    type: "situational",
    difficulty: "senior",
    estimatedTime: 15,
    followUps: [
      "How would you quantify and communicate the risks?",
      "What alternative approaches would you propose?"
    ]
  },
  {
    text: "You have 6 months to build an AI product from scratch. Walk me through your approach.",
    tags: ["project-management", "ai-product"],
    type: "situational",
    difficulty: "senior",
    estimatedTime: 18,
    followUps: [
      "How would you prioritize MVP features?",
      "What risks would you plan for and how?"
    ]
  },

  // SQL and Data Analysis
  {
    text: "How would you find the top 10% of customers by revenue using SQL?",
    tags: ["sql", "data-analysis"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 8,
    followUps: [
      "What if you needed to handle ties in the rankings?",
      "How would you make this query efficient for large datasets?"
    ]
  },
  {
    text: "Explain different types of JOINs in SQL and when to use each.",
    tags: ["sql", "data-modeling"],
    type: "technical",
    difficulty: "entry",
    estimatedTime: 10,
    followUps: [
      "What are the performance implications of different JOIN types?",
      "How would you optimize a slow JOIN query?"
    ]
  },
  {
    text: "How would you design a data warehouse schema for analytics?",
    tags: ["data-warehouse", "schema-design"],
    type: "technical",
    difficulty: "mid",
    estimatedTime: 15,
    followUps: [
      "What are the trade-offs between star and snowflake schemas?",
      "How would you handle slowly changing dimensions?"
    ]
  }
];