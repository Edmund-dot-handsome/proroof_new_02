# PROROOF - Roof Leak Repair Website

Professional roof leak repair and waterproofing services in KL & Selangor.

## Features

- Modern React + TypeScript + Vite setup
- Tailwind CSS for styling
- Supabase integration for data storage
- Netlify Functions for serverless backend
- Contact form with inspection requests
- Before/after gallery
- Customer reviews and testimonials
- Hidden admin panel for data management

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Run development server: `npm run dev`

## Environment Variables

Create a `.env` file with the following variables:

```ini
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server-side Supabase (for Netlify functions)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Panel Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password

# JWT Secret for admin sessions
JWT_SECRET=your-super-secret-jwt-key-here
```

## Hidden Admin Data Viewer

The site includes a hidden admin panel for viewing database records.

### How to Use:

1. **Set Environment Variables**: Add the admin credentials to your `.env` file:
   ```ini
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=your-jwt-secret-key
   ```

2. **Access the Admin Panel**: Navigate to `/admin` (not linked anywhere on the site)

3. **Login**: Use the username and password from your environment variables

4. **View Data**: 
   - Select tables from the dropdown
   - Search records using the search box
   - Sort columns by clicking headers
   - Navigate pages using pagination controls
   - Adjust records per page (10, 20, 50, 100)

### Security Features:

- **Hidden Route**: `/admin` is not indexed by search engines or linked anywhere
- **Authentication**: Protected by username/password with JWT sessions
- **Rate Limiting**: Login attempts are limited to 5 per minute per IP
- **Secure Cookies**: Session cookies are HttpOnly, Secure, and SameSite=Strict
- **Server-side Only**: All data fetching happens server-side with service role permissions
- **Input Validation**: All query parameters are validated and sanitized

### Admin Panel Features:

- View all database tables
- Search and filter records
- Sort by any column
- Paginated results
- Responsive design matching site theme
- Secure logout functionality

The admin panel is completely separate from the public site and requires no client-side secrets.

## Deployment

The site is configured for Netlify deployment with:

- Automatic builds from the `main` branch
- Netlify Functions for serverless backend
- Environment variables for configuration
- Custom redirects for API routes

## Database Schema

The site uses Supabase with the following main table:

- `inspections`: Stores contact form submissions with customer details and inspection requests

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Netlify Functions, Supabase
- **Authentication**: JWT with secure cookies
- **Deployment**: Netlify
- **Icons**: Lucide React