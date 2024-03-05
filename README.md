# High-End Ecommerce Front-End | NextJS Website

## Table of Contents

1. [About the Project](#about-the-project)
2. [Live Demo](#live-demo)
3. [Technologies](#technologies)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
6. [Future Plans](#future-plans)

## About the Project

This project is a high-end e-commerce front-end, built with NextJS 13, designed to offer a premium shopping experience with a sleek design and intuitive user interface. The front-end is now integrated with a Django backend, enhancing the app with complete e-commerce functionality. This integration facilitates features such as dynamic product listings, user authentication, order processing, and real-time data updates, moving beyond the initially mocked data to a fully functional e-commerce platform.

## Live Demo

Experience the app in action by visiting [Fusion Design Ecommerce](https://fusion-design.netlify.app/).

## Technologies

This project utilizes key technologies to ensure a responsive, efficient, and visually appealing user experience:

- **Next.js 13**: The latest version of the React framework, enabling advanced features like file-system-based routing and server-side rendering for faster page loads and improved SEO.
- **Framer Motion**: A library that brings powerful animation capabilities to React, enhancing the app's interactivity and visual feedback.
- **Tailwind CSS with DaisyUI**: A utility-first CSS framework paired with DaisyUI for rapid UI development, offering extensive customization and a wide range of pre-designed components.
- **@mui/material**: A comprehensive suite of React components that implement Google's Material Design for a polished and cohesive look.

## Folder Structure

The project is organized into the following main directories:

- `app/`: The core of the application, containing:
  - `_components/`: Reusable UI components like buttons, input fields, and cards.
  - `_mocks/`: Mock data for simulating backend responses and testing.
  - `_scenes/`: The pages and routes of the application, structured according to NextJS conventions.
  - `api/`: Services and hooks for handling API calls and data management.
  - `providers/`: Context providers for app-wide state management.
  - `styles/`: Global styles and theme configurations.
- `public/`: Static assets such as images, icons, and manifest files.
- `types/`: TypeScript type definitions and interfaces for strong typing throughout the app.
- `hooks/`: Custom React hooks for shared logic and functionality across components.


## Getting Started

To set up and run the project locally:

1. **Clone the front-end repository:**
   `git clone https://github.com/Jaron-S/next-ecommerce`

2. **Clone the Django backend repository:**
   `git clone https://github.com/Jaron-S/fusion_design_server`
   Follow the setup instructions provided on the Django repository's GitHub page to configure the backend.

3. **Install dependencies:**
   - Navigate to the Next.js project directory and run:
     npm install
   - Navigate to the Django project directory and follow the installation instructions provided in its README.

4. **Configure environment variables:**
   - In the Next.js project, create a `.env.local` file and add the Django server's address as an environment variable. Example:
     `DJANGO_SERVER_URL=https://your-django-server-address.com`
   - Update the `next.config.js` file to include the server URL in the environment variables section:
     ```
     module.exports = {
       env: {
         DJANGO_SERVER_URL: process.env.DJANGO_SERVER_URL,
       },
     };
     ```

5. **Start the development servers:**
   - Start the Next.js development server:
     `npm run dev`
   - Start the Django development server by following the instructions provided in the Django repository.

6. **Verify the setup:**
   Open http://localhost:3000 in your browser to view the Next.js app and ensure it is correctly fetching data from the Django backend.

## Future Plans

The roadmap for this project includes the development of a robust backend to support core e-commerce functionalities such as user authentication, product management, order processing, and payment gateway integration. Enhanced user personalization features like wish lists and personalized recommendations are also planned to enrich the shopping experience.
