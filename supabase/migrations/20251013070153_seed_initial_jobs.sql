/*
  # Seed Initial Job Postings

  ## Overview
  This migration populates the jobs table with initial job postings that are now
  displayed on the careers page. These jobs can be managed through the admin dashboard.

  ## Data Inserted
  - 3 job postings across different departments
  - All jobs are set to 'published' status
  - Jobs include complete information (title, description, requirements, location, etc.)

  ## Important Notes
  1. These are editable via the admin dashboard
  2. Jobs can be deleted, updated, or new ones can be added
  3. The published_at timestamp is set to the current time
*/

-- Insert initial job postings
INSERT INTO jobs (
  title,
  description,
  requirements,
  location,
  employment_type,
  department,
  experience_level,
  status,
  published_at,
  created_at
) VALUES
(
  'Senior Frontend Engineer (React)',
  'Build beautiful, intuitive, and performant user interfaces that empower thousands of educators and students every day. As a Senior Frontend Engineer, you''ll work closely with our design and product teams to create exceptional user experiences that make school management effortless.

Key Responsibilities:
• Design and implement responsive, accessible UI components using React and TypeScript
• Optimize application performance and ensure smooth user interactions
• Collaborate with backend engineers to integrate APIs and real-time features
• Mentor junior developers and contribute to engineering best practices
• Participate in code reviews and technical design discussions',
  'Required Qualifications:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Strong understanding of CSS, HTML5, and responsive design principles
• Experience with state management (Redux, Context API, or similar)
• Proficiency with Git and modern development workflows
• Excellent problem-solving and communication skills

Preferred Qualifications:
• Experience with Next.js, Vite, or similar frameworks
• Knowledge of web accessibility standards (WCAG)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Previous experience in EdTech or SaaS products
• Contributions to open-source projects',
  'Remote',
  'Full-time',
  'Engineering',
  'Senior',
  'published',
  now(),
  now()
),
(
  'Backend Engineer (PostgreSQL, Supabase)',
  'Design, build, and maintain the scalable and secure backend systems that power the Acadeemia platform. You''ll work on critical infrastructure that serves thousands of schools and millions of students worldwide.

Key Responsibilities:
• Design and implement robust RESTful APIs and real-time features
• Optimize database queries and ensure data integrity
• Build scalable microservices and background job processors
• Implement security best practices and data protection measures
• Monitor system performance and troubleshoot production issues
• Collaborate with frontend engineers to deliver end-to-end features',
  'Required Qualifications:
• 4+ years of backend development experience
• Strong proficiency with PostgreSQL and database design
• Experience with Supabase or similar Backend-as-a-Service platforms
• Knowledge of Node.js, Python, or similar backend languages
• Understanding of RESTful API design and authentication/authorization
• Experience with cloud platforms (AWS, GCP, or Azure)
• Strong debugging and problem-solving skills

Preferred Qualifications:
• Experience with real-time systems and WebSockets
• Knowledge of caching strategies (Redis, Memcached)
• Familiarity with containerization (Docker, Kubernetes)
• Previous experience with educational software
• Understanding of Row Level Security (RLS) and data privacy regulations',
  'Remote',
  'Full-time',
  'Engineering',
  'Mid',
  'published',
  now(),
  now()
),
(
  'Account Executive',
  'Drive growth by building relationships with school leaders and demonstrating the value of Acadeemia to prospective clients. As an Account Executive, you''ll be at the forefront of our mission to transform education technology.

Key Responsibilities:
• Generate and qualify leads through outbound prospecting and inbound inquiries
• Conduct product demonstrations and presentations to school administrators
• Understand customer needs and articulate how Acadeemia solves their challenges
• Negotiate contracts and close deals with K-12 schools and educational institutions
• Build long-term relationships with key decision-makers
• Collaborate with customer success team for smooth handoffs
• Meet and exceed quarterly sales targets',
  'Required Qualifications:
• 3+ years of B2B sales experience, preferably in SaaS
• Proven track record of meeting or exceeding sales quotas
• Excellent presentation and communication skills
• Strong negotiation and closing abilities
• Self-motivated with a results-driven approach
• Proficiency with CRM systems (Salesforce, HubSpot, or similar)
• Ability to travel occasionally for client meetings

Preferred Qualifications:
• Experience selling to K-12 schools or educational institutions
• Background in EdTech or education sector
• Understanding of school administration and management challenges
• Network of contacts in the education industry
• Experience with consultative selling methodologies',
  'New York, NY',
  'Full-time',
  'Sales & Marketing',
  'Mid',
  'published',
  now(),
  now()
)
ON CONFLICT DO NOTHING;