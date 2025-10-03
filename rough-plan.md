# Interview Preparation Tool

## The Core Problem
**Job seekers waste time on generic interview prep that doesn't match their specific situation.**

Most interview preparation is one-size-fits-all. People practice generic questions that may not even come up in their actual interview, and they struggle to connect their unique background to what employers are looking for.

## The Core Solution
**Personalized interview preparation based on the specific job and the person's background.**

The fundamental insight: by analyzing both the job requirements and the person's experience, we can predict what questions are most likely to be asked and help them craft relevant answers.

## The User's Mental Model
"I have a job I want to interview for, and I have my background. What questions will they ask me, and how should I answer them based on my experience?"

**Input**: Job description + My background  
**Output**: Relevant questions + Personalized answer guidance

## Target Users
Anyone preparing for a job interview who wants personalized preparation instead of generic advice.

**Core User Need**: "Help me prepare for THIS specific job interview based on MY specific background."

## User Success Criteria
- Questions feel relevant to the actual job they're applying for
- Answer guidance connects to their real experience  
- Preparation feels efficient and targeted
- They feel more confident going into the interview

## How the Experience Should Feel

**The user provides their job and background information, then gets personalized interview preparation.**

The experience should be:
- **Immediate** - no signup, no waiting
- **Intuitive** - obvious what to do at each step  
- **Fast** - quick to get results
- **Personalized** - clearly connected to their specific situation
- **Portable** - can take results with them

## What the Tool Needs to Do
1. **Understand the job** - extract key requirements, responsibilities, and company context
2. **Understand the person** - identify relevant experience, skills, and background
3. **Generate relevant questions** - predict what interviewers will actually ask
4. **Provide answer guidance** - help connect their experience to strong responses
5. **Make it actionable** - format for easy practice and review

## Core Capabilities Needed

### Essential Functions
- **Accept job information** in whatever format is easiest for users
- **Accept background information** (resume, experience, skills)
- **Generate relevant interview questions** based on the specific job-person match
- **Provide personalized answer guidance** that connects their background to strong responses
- **Present results** in a format that's easy to practice with and review

### Key Quality Criteria
- Questions should feel like they could realistically be asked in this specific interview
- Answer guidance should reference the user's actual experience when possible
- The tool should work for different job types and experience levels
- Results should be immediately usable for interview practice

## Design Principles

### Remove Friction
- Minimize steps between user intent and results
- Don't require accounts or complex setup
- Accept information in formats users already have
- Make errors recoverable and rare

### Make Intent Clear
- User always knows what will happen when they take an action
- Results clearly connect back to their inputs
- Progress and outcomes are visible
- Language matches how users think about the problem

### Optimize for the Core Use Case
- Prioritize the most common path: job description + resume → questions + answers
- Don't let edge cases complicate the main experience  
- Make the tool work well for its primary purpose before adding features

## Technical Constraints & Requirements

### Non-Negotiable Requirements
- Must work without user accounts (removes friction)
- Must work on mobile devices (users prep everywhere)
- Must be fast (under 5 seconds from input to results)
- Must protect privacy (no persistent data storage)

### Success Indicators
- Users can complete the core task (input → personalized questions)
- Questions feel relevant to their specific situation
- Tool works for different job types and experience levels
- Users would recommend it to others preparing for interviews

## Implementation Notes
The specific technology choices matter less than delivering on the core user value. Focus on:
- Fast iteration and user feedback
- Simple architecture that supports the core use case
- Reliable AI integration for personalization
- Clean, accessible interface design