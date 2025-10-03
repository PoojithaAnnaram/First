# Court Data Fetcher - Internship Assignment

A web application for fetching case details, judgments, and orders from Indian High Courts and District Courts, with cause list download functionality.

## Overview

This application implements **Task 1** of the internship assignment, providing a comprehensive solution for:
- Searching cases by case type, number, and year
- Fetching case details including parties, dates, and status
- Downloading judgments and orders
- Downloading daily cause lists

## Features

### 1. Case Search
- Input form with case type, case number, year, and court selection
- Support for multiple case types (CRL, CS, WP, CRA, CA, MA, etc.)
- Coverage of major High Courts across India

### 2. Case Details Display
- Petitioner and respondent names
- Filing date and next hearing date
- Case status with visual indicators
- Court number and judge information

### 3. Judgment Downloads
- List of available judgments and orders
- Direct download links for PDF documents
- Organized by date and type

### 4. Cause List Downloader
- Download daily cause lists by court and date
- Separate section for easy access
- PDF format downloads

## Technology Stack

- **Frontend**: React + Vite
- **Backend**: Supabase Edge Functions
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS with modern design

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx          # Case search form
│   │   ├── CaseResults.jsx         # Display case details
│   │   └── CauseListDownloader.jsx # Cause list download interface
│   ├── lib/
│   │   └── supabase.js             # Supabase client configuration
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── supabase/
│   └── functions/
│       ├── fetch-case-data/        # Edge function for case data
│       └── download-cause-list/    # Edge function for cause lists
├── index.html
├── vite.config.js
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Environment variables are pre-configured in `.env`:
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

4. Build the project:
```bash
npm run build
```

5. Run development server (optional):
```bash
npm run dev
```

## Database Schema

The application uses the following tables:

### case_queries
Stores each case search query with metadata and raw responses.

### case_details
Stores parsed case information including parties, dates, and status.

### judgments
Stores judgment and order information with download links.

### cause_lists
Stores cause list download records.

## Edge Functions

### fetch-case-data
- **Endpoint**: `/functions/v1/fetch-case-data`
- **Method**: POST
- **Purpose**: Fetches case details from court portals
- **Input**: `{ caseType, caseNumber, year, court }`
- **Output**: Case details and judgment list

### download-cause-list
- **Endpoint**: `/functions/v1/download-cause-list`
- **Method**: POST
- **Purpose**: Downloads cause list PDFs
- **Input**: `{ court, date }`
- **Output**: PDF file

## Implementation Notes

### Current Implementation (MVP)
This is a functional MVP demonstrating the core features:
- ✅ Clean, professional UI with form inputs
- ✅ Case search functionality
- ✅ Case details display
- ✅ Judgment listing with download links
- ✅ Cause list downloader
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design

### Mock Data
The current implementation uses mock data to demonstrate functionality. In production:
- Edge functions would integrate with actual eCourts APIs
- Web scraping logic would be added for courts without APIs
- PDF downloads would fetch actual documents
- Database would store real query responses

### Limitations & Future Enhancements

1. **Court Integration**:
   - Current: Mock data responses
   - Future: Real eCourts portal integration with web scraping

2. **Authentication**:
   - Current: Public access
   - Future: User authentication with query history

3. **PDF Processing**:
   - Current: Mock PDF generation
   - Future: Actual document retrieval from court websites

4. **Search Capabilities**:
   - Future: Advanced search by party name, advocate, judge
   - Bulk search functionality
   - Search history and favorites

5. **Data Storage**:
   - Future: Complete query logging
   - Response caching
   - Analytics dashboard

## Design Decisions

1. **Component Architecture**: Modular components for maintainability
2. **State Management**: React hooks for simplicity in MVP
3. **Styling**: Custom CSS for precise control and performance
4. **Error Handling**: User-friendly error messages
5. **Responsive Design**: Mobile-first approach

## Security Considerations

- Row Level Security (RLS) policies on all database tables
- CORS configuration for Edge Functions
- Environment variable protection
- Input validation and sanitization

## Testing

To test the application:

1. Enter case details in the search form
2. Click "Search Case" to fetch results
3. View case details and judgment list
4. Click "Download PDF" on any judgment
5. Use cause list downloader for daily lists

## Deployment

The application is ready for deployment on:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

Edge Functions are deployed on Supabase platform.

## Future Roadmap

1. Integration with real eCourts APIs
2. Web scraping for courts without APIs
3. User authentication and profiles
4. Advanced search and filtering
5. Notification system for hearing dates
6. Mobile application
7. Analytics and reporting
8. Bulk operations support

## Demo Video

A demo video showcasing the functionality is available (to be recorded).

## Contact

For questions or feedback about this submission, please contact through the submission form.

---

**Note**: This is an MVP implementation for the internship assignment. The foundation is built for easy extension with real court data integration.