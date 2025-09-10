# Trucking Dashboard

## Overview

This is a full-stack trucking management application built with React frontend and Express backend. The application provides a dashboard for managing trucking orders with CRUD operations. Users can create new orders specifying pickup location, dropoff location, and customer information, as well as view all existing orders in a table format. The application uses a modern tech stack with TypeScript, Drizzle ORM for database management, and shadcn/ui components for the user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation
- **Component Structure**: Modular component architecture with reusable UI components
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Route Structure**: Centralized route registration with proper error handling middleware
- **Storage Layer**: Abstracted storage interface supporting both in-memory storage and database implementations
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Development Setup**: Vite integration for development with hot module replacement

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Management**: Type-safe schema definitions with automatic TypeScript type generation
- **Validation**: Zod schemas for runtime validation of API requests and responses
- **Migrations**: Drizzle Kit for database migrations and schema management

### Authentication & Authorization
- Currently using a simple in-memory storage system for development
- User schema defined but not yet implemented in the main application flow
- Session management prepared with connect-pg-simple for PostgreSQL session storage

### Development & Build Process
- **Development**: Hot reloading with Vite for frontend and tsx for backend
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Build Process**: Vite for frontend bundling and esbuild for backend compilation
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/)
- **Code Quality**: ESM modules throughout the application

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, ReactDOM, React Hook Form, TanStack Query
- **Backend**: Express.js, Node.js with TypeScript support
- **Build Tools**: Vite, esbuild, tsx for development

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for Express

### UI & Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: For component variant management

### Development Tools
- **TypeScript**: Full type safety across the application
- **Zod**: Runtime type validation and schema definition
- **Drizzle Kit**: Database migration and schema management tool
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

### Additional Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class name utility
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component for UI