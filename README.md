# B Beyond Hair & Beauty Saloon

A modern, responsive, and elegant website for B Beyond Hair & Beauty Saloon located in Kudal, Sindhudurg. Built with vanilla HTML, CSS, and JavaScript, leveraging Vite for a fast and optimized development and build experience.

## Features

*   **Responsive Design:** Fully responsive layout that looks great on all devices (mobile, tablet, desktop).
*   **Modern Aesthetics:** Clean, elegant design with smooth animations and transitions.
*   **Service & Pricing Grid:** Clear and organized display of services and their prices.
*   **Booking System:** Integrated WhatsApp-based booking system for quick and easy appointments.
*   **Client Reviews:** Dynamic review section to showcase client satisfaction.
*   **Admin Panel:** Secure admin dashboard for Managing Bookings (Requires Firebase Auth configuration).
*   **Performance Optimized:** Built with Vite for lightning-fast HMR and optimized production builds.

## Technology Stack

*   **HTML5**
*   **CSS3** (Custom Properties, Flexbox, Grid)
*   **JavaScript** (ES6 Modules)
*   **Vite** (Build Tool)

## Project Structure

```
├── public/                 # Static assets (images, icons)
├── src/                    # Source code
│   ├── styles/             # CSS stylesheets
│   │   ├── variables.css   # CSS variables (colors, fonts, etc.)
│   │   ├── base.css        # Base styles and resets
│   │   ├── components.css  # Reusable UI component styles
│   │   ├── sections.css    # Styles for specific page sections
│   │   ├── admin.css       # Admin panel styles
│   │   └── responsive.css  # Media queries
│   ├── pages/              # JavaScript entry points
│   │   └── main.js         # Main JavaScript logic
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration file
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shreyasvengurlekar/bbeyond-saloon.git
    cd b-beyond-salon
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Development

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized assets ready for deployment.

### Preview Production Build

To preview the generated production build locally:

```bash
npm run preview
```

## Deployment

This project is configured and ready to be deployed to awesome hosting platforms like Vercel, Netlify, or similar services.

**Deploying to Vercel (Example):**

1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com/) and create a new project.
3.  Import your GitHub repository.
4.  Vercel will automatically detect Vite and set the correct build commands (`npm run build`) and output directory (`dist`).
5.  Click "Deploy".

## Author

**Shreyas Vengurlekar**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
