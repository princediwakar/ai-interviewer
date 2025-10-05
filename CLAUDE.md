# Interview Preparation Tool - Development Guide


## The Core Problem
**Job seekers waste time on generic interview prep that doesn't match their specific situation.**

Most interview preparation is one-size-fits-all. People practice generic questions that may not even come up in their actual interview, and they struggle to connect their unique background to what employers are looking for.

## The Core Solution
**Personalized interview preparation based on the specific job and the person's background.**

The fundamental insight: by analyzing both the job requirements and the person's experience, we can predict what questions are most likely to be asked and help them craft relevant answers.

## The User's Mental Model
The application now supports two primary modes of interview preparation:

1. **Specific Job Prep**: "I have a job I want to interview for, and I have my background. What questions will they ask me, and how should I answer them based on my experience?"
   - **Input**: Job description + My background  
   - **Output**: Relevant questions + Personalized answer guidance

2. **Role-Based Practice**: "I want to practice interview questions for my role type to improve my general interview skills."
   - **Input**: Role selection (Engineering, Product, Marketing, etc.)
   - **Output**: Curated questions with filtering and bookmark functionality

## Target Users
Anyone preparing for a job interview who wants either personalized preparation for a specific role or general practice for their career level.

**Core User Needs**: 
- "Help me prepare for THIS specific job interview based on MY specific background."
- "Help me practice common interview questions for my role and experience level."

## User Success Criteria
- Questions feel relevant to the actual job they're applying for or their role type
- Answer guidance connects to their real experience  
- Preparation feels efficient and targeted
- They can bookmark and organize questions for future practice
- They feel more confident going into the interview

## How the Experience Should Feel

**Users can choose between personalized job-specific preparation or role-based question practice.**

The experience should be:
- **Immediate** - quick access to questions without complex setup
- **Intuitive** - obvious what to do at each step  
- **Fast** - quick to get results
- **Personalized** - clearly connected to their specific situation or role
- **Organized** - ability to bookmark and filter questions
- **Persistent** - saved progress and preferences across sessions

## What the Tool Needs to Do

### Job-Specific Mode
1. **Understand the job** - extract key requirements, responsibilities, and company context
2. **Understand the person** - identify relevant experience, skills, and background
3. **Generate relevant questions** - predict what interviewers will actually ask
4. **Provide answer guidance** - help connect their experience to strong responses
5. **Make it actionable** - format for easy practice and review

### Question Bank Mode
1. **Organize questions by role** - curated questions for Engineering, Product, Marketing, Sales, Data Science, Operations
2. **Enable filtering and search** - by difficulty, question type, and keywords
3. **Support user accounts** - bookmark questions and save preferences
4. **Provide comprehensive answers** - detailed guidance for each curated question

## Core Capabilities Needed

### Essential Functions
- **Accept job information** in whatever format is easiest for users (Job-Specific Mode)
- **Accept background information** (resume, experience, skills) for personalization
- **Generate relevant interview questions** based on the specific job-person match or role selection
- **Provide comprehensive answer guidance** that connects their background to strong responses
- **Present results** in a format that's easy to practice with and review
- **Enable question management** through bookmarking, filtering, and search
- **Support user authentication** for persistent data and preferences

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
- Must work on mobile devices (users prep everywhere)
- Must be fast (under 5 seconds from input to results)
- Must protect privacy (secure user data storage)
- Job-specific mode should work without requiring accounts
- Question bank mode requires authentication for bookmarks and preferences

### Success Indicators
- Users can complete the core task (input → personalized questions)
- Questions feel relevant to their specific situation
- Tool works for different job types and experience levels
- Users would recommend it to others preparing for interviews

## UI/UX Design Guidelines

### Modern AI Interface Design
The application follows a contemporary AI chat interface pattern similar to Claude:

**Split-Panel Layout:**
- Left panel: Input areas (job description + background)
- Right panel: Streaming AI output with real-time responses
- Full-height utilization for immersive experience

**Streaming Response Experience:**
- Letter-by-letter streaming animation for AI responses
- Animated typing cursor during generation
- Auto-scrolling output panel to follow content
- Progressive disclosure of questions and answers

**Visual Design System:**
- Primary gradient: Orange to red (warm, professional)
- Clean typography with proper hierarchy
- Numbered steps for clear progression
- Subtle shadows and borders for depth
- Consistent spacing using 4px grid system

**Interactive Elements:**
- Disabled states with visual feedback
- Hover effects on clickable elements
- Loading spinners during processing
- Clear call-to-action buttons
- "New session" reset functionality

**Accessibility & Usability:**
- Proper semantic HTML structure
- Clear labels and focus states
- Keyboard navigation support
- Responsive design principles
- Visual feedback for all user actions

### User Flow Optimization
1. **Initial State**: Clean, inviting interface with clear next steps
2. **Input Phase**: Side-by-side inputs with guided labeling
3. **Processing**: Visual feedback with progress indicators
4. **Output**: Streaming results with engaging animations
5. **Completion**: Practice tips and session management

## Implementation Notes
The specific technology choices matter less than delivering on the core user value. Focus on:
- Fast iteration and user feedback
- Simple architecture that supports the core use case
- Reliable AI integration for personalization
- Modern streaming interface for engaging user experience
- Clean, accessible interface design following established patterns

## Testing Resources

### Sample Data Files
- **SampleJD.md** - Contains sample job descriptions for testing the interview question generation
- **SampleResume.md** - Contains sample resume/background information for testing personalized responses

These files provide realistic test data to validate that the tool generates relevant questions and connects user backgrounds to strong interview responses.

### Testing Infrastructure
- **Playwright MCP** - Configured in `.mcp.json` for end-to-end testing of the user interface and user flows
- Use `npx @playwright/mcp` for automated testing of the complete user experience

## Development Server Management

### Server Status Check
To check if the development server is running:
```bash
ps aux | grep -E "(next|npm|node)" | grep -v grep
```

### Server Management Commands
- **Start server**: `npm run dev`
- **Kill existing server**: `pkill -f "next dev"` or `pkill -f "npm run dev"`
- **Check server status**: Look for `next-server` and `npm run dev` processes

### Development Workflow
1. Check if server is already running
2. If running and working correctly, use the existing server
3. If running but needs restart, kill and restart: `pkill -f "next dev" && npm run dev`
4. If not running, start with: `npm run dev`

The development server typically runs on `http://localhost:3000` with Turbopack for faster builds.

Playwright Available Tools
Available tools
With the MCP loaded you can run /mcp and then navigate to playwright to view all available tools. Here's the full list:

browser_close (read-only)
browser_resize (read-only)
browser_console_messages (read-only)
browser_handle_dialog
browser_file_upload
browser_install
browser_press_key
browser_navigate
browser_navigate_back (read-only)
browser_navigate_forward (read-only)
browser_network_requests (read-only)
browser_pdf_save (read-only)
browser_take_screenshot (read-only)
browser_snapshot (read-only)
browser_click
browser_drag
browser_hover (read-only)
browser_type
browser_select_option
browser_tab_list (read-only)
browser_tab_new (read-only)
browser_tab_select (read-only)
browser_tab_close
browser_generate_playwright_test (read-only)
browser_wait_for (read-only)


## Filepath at the top in commented state
Always add filepath at the top of every file
e.g. app/api/generate/route.ts, lib/prompts.ts, etc.

## Type safety
Never use type "any". Always write typescript and type-safe and lint-safe code.

## Git Commit Guidelines
Never include the "🤖 Generated with [Claude Code](https://claude.ai/code)" footer or "Co-Authored-By: Claude <noreply@anthropic.com>" in commit messages.



## Current Implementation Status

### Phase 1: Question Bank ✅ COMPLETED
- 150+ curated interview questions across 6 major roles
- Role selection interface with question counts
- Advanced filtering by difficulty, type, and tags
- Search functionality across question text
- Integration with existing answer guidance system

### Phase 2: User Authentication ✅ COMPLETED  
- BetterAuth integration with Google OAuth
- Secure user sessions with Neon database storage
- Bookmark functionality with visual heart icon toggles
- User preferences for roles, difficulty, and notifications
- Complete user profile management at `/profile`

### Phase 3: Database Integration ✅ COMPLETED
- Full Drizzle ORM setup with PostgreSQL/Neon
- All questions migrated to database with proper relationships
- Enhanced search API with filtering and pagination
- User data persistence for bookmarks and preferences
- RESTful APIs for bookmarks, preferences, and search

### Phase 4: Enhanced Features 🔄 PENDING
- Export functionality for question sets (PDF/CSV)
- Question collection sharing capabilities
- Advanced mobile optimization and PWA features
- Analytics dashboard for progress tracking
- Enhanced search with relevance scoring

## What's Currently Working

### Question Bank Features
- Access via `/question-bank` with full navigation integration
- 6 role categories: Engineering, Product, Marketing, Sales, Data Science, Operations
- Multi-level filtering: difficulty (entry/mid/senior/expert), question type, tags
- Real-time search across question content and metadata
- Seamless integration with existing answer guidance and full answer APIs
- Responsive design matching the existing application style

### Authentication & User Features
- Google OAuth sign-in with persistent session management
- User profile pages displaying personal information and statistics
- Real-time bookmark synchronization with visual feedback
- Comprehensive preference management system
- Secure sign-out with proper session cleanup

### Database & API Layer
- PostgreSQL database hosted on Neon with full ACID compliance
- Real-time bookmark synchronization across multiple devices
- Paginated search API with advanced filtering capabilities
- Secure user data storage following privacy best practices
- Database migration and seeding infrastructure

## Navigation & User Experience
- Dual-mode entry: Specific Job Prep vs Role-Based Practice
- Intuitive role selection with visual question count indicators
- Advanced question browser with multiple filter combinations
- Bookmark management with instant visual feedback
- Seamless navigation between different application modes

Neon DB Project ID: sparkling-brook-16012812
- Neon DB Project ID: sparkling-brook-16012812