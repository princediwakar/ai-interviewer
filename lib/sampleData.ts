// lib/sampleData.ts
export const SAMPLE_JOB_DESCRIPTION = `Job Role: Senior Product Manager - Tech, Amazon Finance Technology

DESCRIPTION

Imagine being at the forefront of revolutionizing the tax industry with latest technologies. As a Product Manager – Technical in the FinTech Tax Technology team, you will have the opportunity to shape the future of tax products and solutions that empower businesses and individuals to navigate the ever-evolving landscape of tax regulations and compliance requirements.

In this pivotal role, you will be responsible for driving the product strategy, technical roadmap, and delivery of our innovative tax product suite. You will work closely with cross-functional teams, including engineering, design, and subject matter experts, to translate complex tax requirements into robust, scalable, and secure software solutions and ensure our products meet the evolving needs of our customers and comply with complex tax regulations.

Key job responsibilities:
• Define product strategy, roadmap, and vision for tax product portfolio
• Capture and translate complex tax requirements, regulations, and customer needs into technical specifications, user stories, and innovative user experiences
• Drive alignment across cross-functional teams on product feature, business, and strategies
• Manage end-to-end product development lifecycle
• Build, maintain, and communicate comprehensive product launch plans, tracking deliverables, milestones, risks, and bottlenecks
• Own customer engagement and communication for product updates
• Establish KPIs, identify gaps, and drive continuous improvement of product performance

BASIC QUALIFICATIONS
• Bachelor's degree in computer science, engineering, commerce, analytics, mathematics, statistics, IT or equivalent.
• 5+ years of customer-facing product development and product management experience.
• Experience managing technical products or online services.
• Experience with feature delivery and tradeoffs of a product.
• Experience owning/driving roadmap strategy and definition.
• Experience contributing to engineering discussions around technology decisions and strategy related to a product.
• Experience bridging technical and business teams to collect and refine requirements, prioritize incoming work requests, and ensure all committed work is delivered on time.

PREFERRED QUALIFICATIONS
• Knowledge of tax compliance
• Masters in Business Administration (MBA)
• Experience with conceptualizing complex interrelated applications and technical platforms, as well as the ability to communicate technical concepts to non-technical team members and business partners
• Entrepreneurial and inventive spirit, with track record of delivering results in fast-moving environments
• Strong relationships building skills; experience managing stakeholders and partners to drive cross functional programs
• Ability to communicate clearly and effectively with different functional groups, developers, business owners, and senior business leaders
• Experience in Agile/SCRUM enterprise-scale software development`;

export const SAMPLE_BACKGROUND = `Prince Diwakar
linkedin.com/in/princediwakar | +91 73888 90554 | princediwakar25@gmail.com

SUMMARY
Product Leader with expertise in consumer and SaaS apps. Proven ability to define strategy, lead teams, and drive 0→1 product innovation. Scaled Apna (+5M MAU), Josh (+9M MAU), and now transforming construction tech with Supersite.

PROFESSIONAL EXPERIENCE
Supersite | Co-founder & Head of Product (Apr 2023 – Present)
Building Supersite, a construction management platform that streamlines end-to-end project management.
• Built and launched a multi-vertical SaaS platform (Prefab, Real Estate, Infra) from scratch — enabling real-time project tracking, inventory, and financial workflows.
• Closed 5 customers — validating product-market fit with project managers, site engineers, and contractors.
• Reduced site reporting delays by 25% by automating daily logs, material tracking, and status workflows.

Josh | Senior Product Manager (May 2022 – Jan 2023)
Led growth & engagement for India's leading short-video entertainment app (300M+ users).
• Led cross-functional teams (engineering, design, data) to define engagement strategy for Josh LIVE, increasing audience by 75%.
• Launched the Josh Web App, boosting average daily usage by 2.5X (from 3 minutes to 11 minutes).
• Revamped SEO and content discoverability, driving a 3X surge in organic traffic from 5M to 14M users.

Apna Jobs | Product Manager (Oct 2020 – Jan 2022)
Led product initiatives for Apna's platform, driving massive user growth and engagement.
• Scaling Growth: Built & scaled Apna's network feed, driving 10x growth in Monthly Active Users (500K → 5M).
• Developed ranking algorithms, increasing the creator participation (+75%) & reply rates (+66%).
• Automated reactivation flows → lifting DAU by 7 percentage points & unlocking multi-million user engagement.

SKILLS
Product Leadership: Product Strategy, GTM Strategy, Roadmapping, Monetization, AI/ML Applications, Experimentation
AI & Data: AI Product Development, Machine Learning Applications, Data-Driven Decision Making
User Experience: Personalization, Engagement Loops, UI/UX Optimization
Tools: SQL, Python, Mixpanel, Clevertap, Figma, PowerBI, JIRA

EDUCATION
IIT BHU, Varanasi – B.Tech, Civil Engineering (2012-2016)`;

export const ONBOARDING_STEPS = [
  {
    target: '.job-description-area',
    title: 'Step 1: Add Job Description',
    content: 'Paste the job description you\'re applying for. This helps generate relevant interview questions.',
    placement: 'bottom' as const
  },
  {
    target: '.background-area',
    title: 'Step 2: Add Your Background (Optional)',
    content: 'Add your resume or experience details for personalized questions and answers.',
    placement: 'bottom' as const
  },
  {
    target: '.generate-button',
    title: 'Step 3: Generate Questions',
    content: 'Click to generate personalized interview questions based on your inputs.',
    placement: 'top' as const
  },
  {
    target: '.interview-panel',
    title: 'Step 4: Practice & Prepare',
    content: 'Review questions, get answer tips, and practice your responses.',
    placement: 'left' as const
  }
];