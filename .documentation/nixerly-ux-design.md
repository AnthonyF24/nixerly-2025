# User Interface Description Document for Nixerly

## Layout Structure

- **Home (Landing) Page:**  
  Welcomes users with a clear value proposition, a hero image or video showcasing real professionals, and brief explanations of how Nixerly works for both professionals and businesses. Includes CTAs to **“Sign Up as a Professional”** and **“Hire Professionals.”**

- **Contact Page:**  
  Clean and simple layout with a contact form, business contact details, links to social media, and optional map embed.

- **Login/Sign Up (Top-Right):**  
  Positioned consistently on all public pages. Modal or page-based login system with user type selection (Professional / Business).

- **Authenticated Dashboard Layout (Post-Login):**  
  - Professionals: Profile setup widget, recent job matches, portfolio tools, AI suggestions.
  - Businesses: Candidate search bar, job posting management, recommendation widgets.

- **Restricted Areas:**  
  Sections like **“Find Professionals”** and **“Job Board”** are hidden from unauthenticated users. Users are prompted to log in or sign up when attempting access.

---

## Core Components

- **Professional Dashboard:**
  - Profile creation interface
  - Certification upload
  - Portfolio upload and management
  - Availability toggle
  - Shareable profile URL

- **Business Dashboard:**
  - Professional grid/list with filters
  - Job posting form
  - Candidate contact options (WhatsApp/Email)

- **AI Assistant:**
  - Profile improvement suggestions
  - Keyword enhancements
  - Recommended courses or certifications

- **Job Board (Authenticated Only):**
  - List and map views
  - Filter by role, location, skillset, availability

---

## Interaction Patterns

- **Public Site:**
  - Scroll-based navigation
  - Clear CTAs throughout
  - Interactive contact form with validation

- **Login/Sign-Up Flow:**
  - Email/password login or SSO (Google/LinkedIn)
  - User-type selector during signup

- **Dashboards:**
  - Sidebar navigation
  - Hover states on cards
  - Drag-and-drop file uploads
  - Profile progress bar

---

## Visual Design Elements & Color Scheme

- **Palette:**
  - Background: White
  - Accents: Teal, vibrant purple, and contemporary blue
  - Success/verified: Green
  - Alerts/errors: Red

- **Design Features:**
  - Card-based UI with shadows and rounded corners
  - Interactive hover states
  - Progress bars (e.g. profile completeness)

- **Verification:**
  - Badges for certified professionals
  - Icons indicating availability

---

## Mobile, Web App, Desktop Considerations

- **Web-First Focus:**
  - Designed for desktop browser users
  - Full-width layouts, sidebar navigation, and modals

- **Responsive Design:**
  - Mobile: Collapsed menus, floating action buttons
  - Tablet: Hybrid layout adapting desktop features

---

## Typography

- **Headings:** `Open Sans`  
- **Body Text:** `Roboto`  
  Clean, legible fonts with clear hierarchy and size scaling across devices.

---

## Accessibility

- **Image Alt Text:**  
  All uploaded portfolio content supports custom alt text.

- **Color Contrast:**  
  Teal, purple, and blue used with WCAG-compliant contrast ratios.

- **ARIA & Labels:**  
  Full support for ARIA roles, input labels, and status messaging.

- **Keyboard Navigation:**  
  All features accessible via tab and keyboard navigation.

- **Responsive Readability:**  
  Text scales and layouts adjust for assistive technologies and smaller screens.

