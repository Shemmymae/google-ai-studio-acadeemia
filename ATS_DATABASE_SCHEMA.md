# Applicant Tracking System (ATS) Database Schema

## Overview
This document describes the complete database schema for the Acadeemia ATS system, including all tables, relationships, indexes, and security policies.

---

## Tables

### 1. `jobs` Table
Stores all job postings and their details.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | bigserial | PRIMARY KEY | Auto-incrementing job ID |
| `company_name` | text | DEFAULT 'Acadeemia' | Company/organization name |
| `title` | text | NOT NULL | Job title (e.g., "Senior Frontend Developer") |
| `department` | text | NULL | Department/category (e.g., "Engineering") |
| `location` | text | NULL | Job location (e.g., "Remote", "New York, NY") |
| `employment_type` | text | DEFAULT 'Full-time' | Full-time, Part-time, Contract, Internship |
| `salary_range` | text | NULL | Salary information (e.g., "$80,000 - $120,000") |
| `description` | text | NULL | Full job description |
| `requirements` | text | NULL | Required skills, experience, qualifications |
| `responsibilities` | text | NULL | Key responsibilities and tasks |
| `status` | text | DEFAULT 'Draft', CHECK | Active, Draft, or Closed |
| `posted_date` | timestamptz | NULL | When job was posted |
| `closing_date` | timestamptz | NULL | Application deadline |
| `created_by` | uuid | NULL | User who created the job (auth.users reference) |
| `created_at` | timestamptz | DEFAULT now() | Record creation timestamp |
| `updated_at` | timestamptz | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_jobs_status` on `status`
- `idx_jobs_posted_date` on `posted_date`

**Triggers:**
- `update_jobs_updated_at` - Automatically updates `updated_at` on record modification

---

### 2. `applications` Table
Tracks all job applications from candidates.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | bigserial | PRIMARY KEY | Auto-incrementing application ID |
| `job_id` | bigint | FOREIGN KEY → jobs(id) ON DELETE CASCADE | Reference to job posting |
| `first_name` | text | NOT NULL | Applicant's first name |
| `last_name` | text | NOT NULL | Applicant's last name |
| `email` | text | NOT NULL | Contact email |
| `phone` | text | NULL | Contact phone number |
| `resume_url` | text | NULL | Link to uploaded resume/CV |
| `cover_letter` | text | NULL | Cover letter text |
| `linkedin_url` | text | NULL | LinkedIn profile URL |
| `years_experience` | integer | DEFAULT 0 | Years of relevant experience |
| `status` | text | DEFAULT 'Applied', CHECK | Applied, Under Review, Interview Scheduled, Rejected, Hired |
| `applied_date` | timestamptz | DEFAULT now() | Application submission date |
| `notes` | text | NULL | Internal notes about candidate |
| `rating` | integer | CHECK (1-5) | Rating from 1 to 5 stars |
| `created_at` | timestamptz | DEFAULT now() | Record creation timestamp |
| `updated_at` | timestamptz | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_applications_job_id` on `job_id`
- `idx_applications_status` on `status`
- `idx_applications_email` on `email`

**Triggers:**
- `update_applications_updated_at` - Automatically updates `updated_at` on record modification

**Relationships:**
- Many-to-One with `jobs` table (multiple applications per job)

---

### 3. `interviews` Table
Manages interview scheduling and tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | bigserial | PRIMARY KEY | Auto-incrementing interview ID |
| `application_id` | bigint | FOREIGN KEY → applications(id) ON DELETE CASCADE | Reference to application |
| `interview_date` | timestamptz | NOT NULL | Scheduled interview date and time |
| `interview_type` | text | DEFAULT 'Video', CHECK | Phone, Video, or In-Person |
| `location` | text | NULL | Interview location or meeting link |
| `interviewer_name` | text | NULL | Name of interviewer |
| `status` | text | DEFAULT 'Scheduled', CHECK | Scheduled, Completed, or Canceled |
| `notes` | text | NULL | Interview notes and feedback |
| `created_at` | timestamptz | DEFAULT now() | Record creation timestamp |
| `updated_at` | timestamptz | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_interviews_application_id` on `application_id`
- `idx_interviews_date` on `interview_date`

**Triggers:**
- `update_interviews_updated_at` - Automatically updates `updated_at` on record modification

**Relationships:**
- Many-to-One with `applications` table (multiple interviews per application)

---

### 4. `application_status_history` Table
Audit trail for all application status changes.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | bigserial | PRIMARY KEY | Auto-incrementing history ID |
| `application_id` | bigint | FOREIGN KEY → applications(id) ON DELETE CASCADE | Reference to application |
| `old_status` | text | NULL | Previous status (NULL for initial status) |
| `new_status` | text | NOT NULL | New status after change |
| `changed_by` | uuid | NULL | User who made the change (auth.users reference) |
| `notes` | text | NULL | Optional notes about the change |
| `created_at` | timestamptz | DEFAULT now() | When change was made |

**Indexes:**
- `idx_application_status_history_application_id` on `application_id`

**Relationships:**
- Many-to-One with `applications` table (multiple history entries per application)

---

## Entity Relationship Diagram

```
┌─────────────────────┐
│       jobs          │
│─────────────────────│
│ id (PK)             │
│ company_name        │
│ title               │
│ department          │
│ location            │
│ employment_type     │
│ salary_range        │
│ description         │
│ requirements        │
│ responsibilities    │
│ status              │
│ posted_date         │
│ closing_date        │
│ created_by          │
│ created_at          │
│ updated_at          │
└─────────────────────┘
          │
          │ 1:N
          ▼
┌─────────────────────┐
│   applications      │
│─────────────────────│
│ id (PK)             │
│ job_id (FK)         │◄───────────┐
│ first_name          │            │
│ last_name           │            │
│ email               │            │
│ phone               │            │
│ resume_url          │            │
│ cover_letter        │            │
│ linkedin_url        │            │
│ years_experience    │            │
│ status              │            │
│ applied_date        │            │
│ notes               │            │
│ rating              │            │
│ created_at          │            │
│ updated_at          │            │
└─────────────────────┘            │
          │                        │
          │ 1:N                    │
          ├────────────────────────┤
          │                        │
          ▼                        │
┌─────────────────────┐            │
│    interviews       │            │
│─────────────────────│            │
│ id (PK)             │            │
│ application_id (FK) │────────────┘
│ interview_date      │
│ interview_type      │
│ location            │
│ interviewer_name    │
│ status              │
│ notes               │
│ created_at          │
│ updated_at          │
└─────────────────────┘

          ▲
          │ 1:N
          │
┌──────────────────────────────┐
│ application_status_history   │
│──────────────────────────────│
│ id (PK)                      │
│ application_id (FK)          │
│ old_status                   │
│ new_status                   │
│ changed_by                   │
│ notes                        │
│ created_at                   │
└──────────────────────────────┘
```

---

## Row Level Security (RLS) Policies

### Jobs Table Policies

| Policy Name | Operation | Target | Condition |
|-------------|-----------|--------|-----------|
| Authenticated users can view all jobs | SELECT | authenticated | true |
| Authenticated users can create jobs | INSERT | authenticated | auth.uid() = created_by |
| Users can update their own jobs | UPDATE | authenticated | auth.uid() = created_by |
| Users can delete their own jobs | DELETE | authenticated | auth.uid() = created_by |

### Applications Table Policies

| Policy Name | Operation | Target | Condition |
|-------------|-----------|--------|-----------|
| Authenticated users can view all applications | SELECT | authenticated | true |
| Anyone can create applications | INSERT | authenticated | true |
| Authenticated users can update applications | UPDATE | authenticated | true |
| Authenticated users can delete applications | DELETE | authenticated | true |

### Interviews Table Policies

| Policy Name | Operation | Target | Condition |
|-------------|-----------|--------|-----------|
| Authenticated users can view all interviews | SELECT | authenticated | true |
| Authenticated users can create interviews | INSERT | authenticated | true |
| Authenticated users can update interviews | UPDATE | authenticated | true |
| Authenticated users can delete interviews | DELETE | authenticated | true |

### Application Status History Policies

| Policy Name | Operation | Target | Condition |
|-------------|-----------|--------|-----------|
| Authenticated users can view all status history | SELECT | authenticated | true |
| Authenticated users can create status history | INSERT | authenticated | true |

---

## Data Flow & Business Logic

### Application Lifecycle

1. **Job Creation**
   - Job is created with status = 'Draft'
   - Can be edited and updated
   - Status changed to 'Active' when ready to accept applications
   - Status changed to 'Closed' when position is filled or no longer accepting

2. **Application Submission**
   - Candidate submits application
   - Initial status = 'Applied'
   - Application is linked to a job via `job_id`
   - Automatic timestamp in `applied_date`

3. **Application Review**
   - Status updated to 'Under Review'
   - Status change logged in `application_status_history`
   - Internal notes can be added
   - Rating (1-5 stars) can be assigned

4. **Interview Scheduling**
   - Interview record created with `application_id`
   - Application status automatically updated to 'Interview Scheduled'
   - Interview details include date, type, location, and interviewer

5. **Final Decision**
   - Status updated to either 'Hired' or 'Rejected'
   - Status change logged with optional notes
   - Interview status can be marked as 'Completed' or 'Canceled'

### Automatic Triggers

1. **Status History Tracking**
   - When application status changes, automatically creates entry in `application_status_history`
   - Captures old status, new status, changed_by user, and timestamp

2. **Interview Creation**
   - When interview is created, application status automatically updates to 'Interview Scheduled'

3. **Timestamp Updates**
   - All tables automatically update `updated_at` on any modification
   - Implemented via PostgreSQL triggers

---

## Performance Optimization

### Indexes Strategy

1. **Status Indexes** - Fast filtering by status on jobs and applications
2. **Foreign Key Indexes** - Optimized joins between tables
3. **Date Indexes** - Quick date-based queries and sorting
4. **Email Index** - Fast candidate lookup by email

### Query Optimization

- All foreign keys have ON DELETE CASCADE for referential integrity
- Indexes on frequently queried columns (status, dates, foreign keys)
- Efficient joins using indexed foreign keys

---

## Security Features

1. **Row Level Security (RLS)**
   - All tables have RLS enabled
   - Policies ensure authenticated access only
   - Users can only modify jobs they created

2. **Data Validation**
   - CHECK constraints on status fields ensure valid values
   - Rating constrained to 1-5 range
   - NOT NULL constraints on critical fields

3. **Audit Trail**
   - Complete status change history
   - Timestamp tracking on all records
   - User tracking for changes (created_by, changed_by)

4. **Cascading Deletes**
   - Deleting a job removes all related applications
   - Deleting an application removes all interviews and status history
   - Maintains referential integrity

---

## Sample Queries

### Get all active jobs with application count
```sql
SELECT
  j.*,
  COUNT(a.id) as application_count
FROM jobs j
LEFT JOIN applications a ON a.job_id = j.id
WHERE j.status = 'Active'
GROUP BY j.id
ORDER BY j.posted_date DESC;
```

### Get applications with job and interview info
```sql
SELECT
  a.*,
  j.title as job_title,
  j.department,
  COUNT(i.id) as interview_count
FROM applications a
JOIN jobs j ON a.job_id = j.id
LEFT JOIN interviews i ON i.application_id = a.id
GROUP BY a.id, j.id
ORDER BY a.applied_date DESC;
```

### Get application status history
```sql
SELECT
  ash.*,
  a.first_name || ' ' || a.last_name as candidate_name,
  j.title as job_title
FROM application_status_history ash
JOIN applications a ON ash.application_id = a.id
JOIN jobs j ON a.job_id = j.id
ORDER BY ash.created_at DESC;
```

### Hiring analytics - conversion rate by job
```sql
SELECT
  j.title,
  COUNT(a.id) as total_applications,
  COUNT(CASE WHEN a.status = 'Hired' THEN 1 END) as hired_count,
  ROUND(
    COUNT(CASE WHEN a.status = 'Hired' THEN 1 END)::numeric /
    NULLIF(COUNT(a.id), 0) * 100,
    2
  ) as conversion_rate
FROM jobs j
LEFT JOIN applications a ON a.job_id = j.id
GROUP BY j.id
ORDER BY conversion_rate DESC;
```

---

## Migration File

The complete migration is available in:
`/tmp/cc-agent/57257918/project/supabase/migrations/create_ats_system.sql`

---

## TypeScript Interfaces

All TypeScript interfaces are defined in `/tmp/cc-agent/57257918/project/db.ts`:

- `Job` - Job posting interface
- `Application` - Application interface with optional jobs relation
- `Interview` - Interview interface with optional applications relation
- `ApplicationStatusHistory` - Status history interface

---

## API Functions

Complete CRUD operations available in `db.ts`:

- `getJobs()`, `getJobById()`, `addJob()`, `updateJob()`, `deleteJob()`
- `getApplications()`, `getApplicationById()`, `addApplication()`, `updateApplication()`, `deleteApplication()`
- `getInterviews()`, `addInterview()`, `updateInterview()`, `deleteInterview()`
- `getApplicationStatusHistory()`

---

*This schema is designed for scalability, security, and performance while maintaining data integrity and providing comprehensive audit trails.*
