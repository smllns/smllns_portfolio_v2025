export const portfolioItems = [
  {
    slug: 'lunera',
    text: 'Lunera',
    image: '/luneramain2.png',
    aboutPics: ['/lunabout1.png', '/lunabout2.png', '/lunabout3.png'],
    description:
      'Lunera is a sleek and minimalistic website for a creative design agency. Built with a focus on visual storytelling and smooth motion, it combines elegant typography, dynamic layouts, and seamless transitions to showcase the agency’s portfolio in an immersive way.',
    link: 'https://lunera.studio/',
    more: ['/portfolio/film-club', '/portfolio/moodflow'],
    moreImgs: ['/filmabout2.png', '/moodmain2.png'],

    features: [
      {
        title: 'Responsive Design',
        description:
          'The Lunera website is fully responsive, ensuring a seamless experience on desktop, tablet, and mobile devices.',
      },
      {
        title: 'Interactive Animations',
        description:
          'Smooth, high-quality animations enhance user engagement and make navigation feel dynamic and modern.',
      },
      {
        title: 'Custom Themes',
        description:
          'Supports multiple visual themes for a stylish, brand-aligned look and feel across the site.',
      },
      {
        title: 'Preloader & Menu',
        description:
          'Includes a sleek preloader and interactive menu for smooth transitions between pages and sections.',
      },
      {
        title: 'Portfolio & Project Cards',
        description:
          'Displays work examples in interactive, pop-up cards with hover effects and smooth entrance animations.',
      },
      {
        title: 'Contact Form',
        description:
          'A fully functional contact form allows clients to easily get in touch with Lunera for inquiries and collaborations.',
      },
      {
        title: 'Smooth UX',
        description:
          'Overall site experience is polished and fluid, with seamless scrolling, hover effects, and transitions.',
      },
      {
        title: 'Showcasing Agency Work',
        description:
          'Designed to effectively highlight Lunera’s projects and services with visually engaging layouts and interactive elements.',
      },
      {
        title: 'High Performance',
        description:
          'Optimized for speed and smoothness, ensuring quick loading and responsive interactions.',
      },
    ],
    technologies: [
      {
        title: 'Next.js',
        description:
          'A React-based framework used to build a fast, SEO-friendly, and server-side rendered front-end for the Lunera website.',
      },
      {
        title: 'TypeScript',
        description:
          'Ensures type safety, better maintainability, and reduces runtime errors during development.',
      },
      {
        title: 'Tailwind CSS',
        description:
          'A utility-first CSS framework used to create responsive, modern layouts with clean and consistent styling.',
      },
      {
        title: 'tw-animate-css',
        description:
          'A Tailwind plugin providing prebuilt CSS animations for smooth transitions and visual effects.',
      },
      {
        title: 'Framer Motion',
        description:
          'A powerful animation library used for smooth transitions, page animations, and interactive motion effects.',
      },
      {
        title: 'Lucide React',
        description:
          'A modern icon library offering customizable, scalable SVG icons integrated directly as React components.',
      },
      {
        title: 'Next Themes',
        description:
          'Used for implementing light and dark modes and managing global theme state across the site.',
      },
      {
        title: '@theme-toggles/react',
        description:
          'Provides animated, accessible theme toggle components for switching between color modes.',
      },
      {
        title: 'Sonner',
        description:
          'A toast/notification library used to display non-intrusive user feedback messages.',
      },
      {
        title: 'React Wavify',
        description:
          'Creates dynamic, animated wave shapes for decorative UI elements and smooth visual flow.',
      },
      {
        title: 'Clsx',
        description:
          'Utility for conditionally joining class names in React components.',
      },
      {
        title: 'class-variance-authority',
        description:
          'A library for managing variant-based class names, improving component reusability.',
      },
      {
        title: 'tailwind-merge',
        description:
          'Utility that intelligently merges Tailwind CSS classes, preventing conflicts and redundancy.',
      },
    ],
  },

  {
    slug: 'film-club',
    text: 'Film Club',
    image: '/filmmain.png',
    aboutPics: ['/filmabout1.png', '/filmabout2.png', '/filmabout3.png'],
    description:
      'Film Club is a personal movie collection site where users can explore curated film lists with striking visuals. Designed for film enthusiasts, it offers interactive transitions, poster galleries, and a cinematic atmosphere inspired by classic and modern cinema.',
    link: 'https://smllns-film-club.vercel.app/',
    more: ['/portfolio/lunera', '/portfolio/moodflow'],
    moreImgs: ['/luneramain2.png', '/moodmain2.png'],
    features: [
      {
        title: 'Visual Experience & Intro',
        description:
          'The site opens with a visually striking introduction, combining experimental layouts, smooth animations to create a unique cinematic browsing experience.',
      },
      {
        title: 'Full Movie Collection',
        description:
          'Access my entire rated movie collection from Letterboxd, featuring over 2000 titles.',
      },
      {
        title: 'Powerful Search',
        description:
          'Search movies quickly by title and year to find exactly what you’re looking for.',
      },
      {
        title: 'Detailed Movie Pages',
        description:
          'Explore movie details with external data integration from TMDb API.',
      },
      {
        title: 'Curated Movie Lists',
        description:
          'Four curated lists: Unhinged Women Who Self Destruct, Unusual Animation, Manic Pixie Dream Girling, and Personal Favourites.',
      },
      {
        title: 'Contact Page',
        description:
          'Find all my social media links on a dedicated contact page.',
      },
      {
        title: 'Smooth Animations',
        description:
          'High-quality animations and transitions enhance the browsing experience.',
      },
      {
        title: 'Responsive Design',
        description:
          'Fully responsive design ensures a smooth experience on both desktop and mobile.',
      },
    ],
    technologies: [
      {
        title: 'Next.js',
        description:
          'A React-based framework used for building an interactive, server-side rendered front-end with optimized routing and performance.',
      },
      {
        title: 'TypeScript',
        description:
          'Provides type safety and better code maintainability, reducing runtime errors during development.',
      },
      {
        title: 'Tailwind CSS',
        description:
          'A utility-first CSS framework enabling rapid creation of responsive and visually consistent user interfaces.',
      },
      {
        title: 'PapaParse',
        description:
          'A CSV parsing library used to efficiently import and manage large datasets, such as movie lists.',
      },
      {
        title: 'TMDb API',
        description:
          'Integrated for fetching external movie posters, ratings, and metadata to enrich the film library experience.',
      },
      {
        title: 'MongoDB',
        description:
          'Used as a caching layer to store movie metadata and poster URLs, improving performance and reducing external API calls.',
      },
      {
        title: 'Framer Motion',
        description:
          'A modern animation library for smooth transitions and microinteractions across UI components.',
      },
      {
        title: 'GSAP',
        description:
          'Used for advanced motion design, scroll-based effects, and custom animations throughout the site.',
      },
      {
        title: 'Lenis',
        description:
          'Provides a smooth scrolling experience, creating a polished and immersive user flow.',
      },
      {
        title: 'React Three Fiber',
        description:
          'A React renderer for Three.js used to create 3D backgrounds and visual effects.',
      },
      {
        title: '@react-three/drei',
        description:
          'A helper library built on top of React Three Fiber that simplifies 3D scene setup and reusable effects.',
      },
      {
        title: 'React Icons',
        description:
          'Icon library integrated as React components to ensure consistency and scalability across the UI.',
      },
      {
        title: 'Cursify',
        description:
          'A custom animated cursor library used to add personality and interactivity to the user experience.',
      },
      {
        title: 'UI Libraries Collection',
        description:
          'Includes hover.dev, Cult UI, Magic UI, Aceternity UI, SparkUI, and UI Layouts — utilized for prebuilt components and layout inspiration to speed up development.',
      },
    ],
  },
  {
    slug: 'moodflow',
    text: 'MoodFlow',
    image: '/moodmain2.png',
    aboutPics: ['/moodabout2.png', '/moodabout1.png', '/moodabout3.png'],
    more: ['/portfolio/lunera', '/portfolio/film-club'],
    moreImgs: ['/luneramain2.png', '/filmabout2.png'],

    description:
      'MoodFlow is a simple and beautiful mood tracking web app designed to help users visualize emotional patterns over time. It features a clean, soft color palette and intuitive UX that make self-reflection both calm and engaging.',
    link: 'https://moodflow-by-smllns.vercel.app/',
    features: [
      {
        title: 'Mood Tracking',
        description:
          'Log your mood for each day and track emotional patterns over time for better self-awareness and reflection.',
      },
      {
        title: 'Interactive Charts',
        description:
          'View your mood data through customizable charts and graphs powered by Recharts, helping you analyze your emotional trends.',
      },
      {
        title: 'Custom Calendar',
        description:
          'Track moods directly on a custom, interactive calendar built with React DayPicker for a clear visual timeline.',
      },
      {
        title: 'Responsive Design',
        description:
          'Optimized for mobile, tablet, and desktop views to ensure a seamless experience across all devices.',
      },
      {
        title: 'User Data Table',
        description:
          'Access a complete view of your mood data in an interactive and customizable table using TanStack Table.',
      },
      {
        title: 'Account Management',
        description:
          'Update your profile details, including name, email, username, and password. Easily delete your account or clear all mood data directly from the app.',
      },
      {
        title: 'Articles & Resources',
        description:
          'Read mood-related articles and resources to learn more about emotional well-being and mental health management.',
      },
      {
        title: 'Dark and Light Themes',
        description:
          'Switch between dark and light themes with ease, using TailwindCSS for a personalized experience.',
      },
      {
        title: 'PDF Export',
        description:
          'Export your mood data and history as a PDF using jsPDF, making it easy to share or archive your progress.',
      },
      {
        title: 'Authentication',
        description:
          'Secure user login and data storage through Firebase, ensuring your mood data is private and protected.',
      },
    ],
    technologies: [
      {
        title: 'React (Next.js)',
        description:
          'The main framework used to build the app interface, supporting server-side rendering and optimized performance.',
      },
      {
        title: 'TypeScript',
        description:
          'Adds static typing and improves code reliability, helping maintain a scalable and maintainable codebase.',
      },
      {
        title: 'Tailwind CSS',
        description:
          'Utility-first CSS framework used for responsive layouts and custom themes, ensuring design consistency.',
      },
      {
        title: 'shadcn/ui',
        description:
          'Accessible and customizable React component library, used to build polished, cohesive UI elements.',
      },
      {
        title: 'Aceternity UI',
        description:
          'Provides prebuilt UI components for visually rich sections such as the hero area, speeding up design implementation.',
      },
      {
        title: 'Recharts',
        description:
          'Used to visualize mood data through interactive and dynamic charts.',
      },
      {
        title: 'Firebase',
        description:
          'Handles user authentication and stores user data securely, enabling persistent mood tracking across sessions.',
      },
      {
        title: 'Framer Motion',
        description:
          'Animation library used to create smooth transitions and lively micro-interactions throughout the app.',
      },
      {
        title: 'React DayPicker',
        description:
          'Provides a customizable calendar component for selecting dates when tracking moods.',
      },
      {
        title: 'React Hook Form',
        description:
          'Simplifies form state management and validation with minimal re-renders and clean API.',
      },
      {
        title: 'TanStack Table',
        description:
          'Used to render detailed mood logs in a flexible, sortable, and interactive table view.',
      },
      {
        title: 'Zod',
        description:
          'Schema validation library integrated with React Hook Form to ensure data integrity and clear error handling.',
      },
      {
        title: 'Simplex Noise',
        description:
          'Generates organic animated wave backgrounds, adding a soothing and dynamic visual element.',
      },
      {
        title: 'jsPDF',
        description:
          'Enables users to export and download their mood data as a PDF file for sharing or record keeping.',
      },
    ],
  },
  {
    slug: 'crumb-bakery',
    text: 'Crumb Bakery',
    image: '/crumb.png',
    aboutPics: ['/crumbabout1.png', '/crumbabout2.png', '/crumbabout3.png'],
    more: ['/portfolio/lunera', '/portfolio/film-club'],
    moreImgs: ['/luneramain2.png', '/filmabout2.png'],

    description:
      'Crumb Bakery is a warm and inviting website for a local artisan bakery. It highlights handcrafted bread through soft textures, cozy tones, and playful animations, blending modern web aesthetics with a sense of homemade comfort.',
    link: 'https://crumb-bakery.vercel.app/',
    features: [
      {
        title: 'WebGL Hero Section',
        description:
          'A visually captivating hero section featuring an interactive WebGL 3D bread animation that sets the warm and artisanal tone of the website.',
      },
      {
        title: 'Smooth Animations',
        description:
          'Subtle GSAP-powered transitions and motion effects create a soft, handcrafted feeling while maintaining modern web fluidity.',
      },
      {
        title: 'Responsive Design',
        description:
          'Fully responsive layout optimized for all screen sizes — from mobile to desktop — ensuring a cozy browsing experience everywhere.',
      },
      {
        title: 'Multilingual Support',
        description:
          'The website supports English, Bulgarian, and Ukrainian languages with smooth locale switching and translated UI elements.',
      },
      {
        title: 'Interactive Bread Menu',
        description:
          'A horizontally scrollable bread menu that allows users to browse different bakery products in an engaging, tactile way.',
      },
      {
        title: 'Animated About Section',
        description:
          'An expanding “About” section with gentle reveal animations that tell the story behind the bakery’s craft and traditions.',
      },
      {
        title: 'Modern Tech Stack',
        description:
          'Built with Next.js, React, TailwindCSS, and GSAP — combining modern web performance with handcrafted visual storytelling.',
      },
    ],
    technologies: [
      {
        title: 'Next.js + React',
        description:
          'Framework and library used to build a performant, modern, and interactive bakery website with server-side rendering and routing.',
      },
      {
        title: 'TypeScript',
        description:
          'Adds type safety and improves code maintainability throughout the project.',
      },
      {
        title: 'Tailwind CSS',
        description:
          'Utility-first CSS framework used for building a clean, responsive, and cohesive design system.',
      },
      {
        title: 'next-intl',
        description:
          'Handles multilingual support, enabling seamless language switching across the site.',
      },
      {
        title: 'GSAP',
        description:
          'Animation library used to create engaging transitions, scroll effects, and dynamic motion throughout the UI.',
      },
      {
        title: 'Lenis',
        description:
          'Provides smooth scrolling and a refined browsing experience for users.',
      },
      {
        title: '@react-three/fiber + drei + three.js',
        description:
          'Used to implement 3D decorative and interactive elements, bringing depth and visual flair to the design.',
      },
      {
        title: 'React Wavify',
        description:
          'Creates animated wave backgrounds for soft, organic motion effects.',
      },
      {
        title: 'React Icons',
        description:
          'Provides scalable and consistent icons across the user interface.',
      },
    ],
  },
  {
    slug: 'fe-interview-hub',
    text: 'FE Interview Hub',
    image: '/femain2.png',
    aboutPics: ['/feabout1.png', '/feabout2.png', '/feabout3.png'],
    description:
      'FE Interview Hub is a resource platform for frontend developers preparing for interviews. It contains a curated collection of questions and answers, organized by topics, to help developers get ready for technical interviews.',
    link: 'https://fe-interview-hub.vercel.app/',
    more: ['/portfolio/lunera', '/portfolio/film-club'],
    moreImgs: ['/luneramain2.png', '/filmabout2.png'],

    features: [
      {
        title: 'Comprehensive Question Bank',
        description:
          'Hundreds of curated frontend interview questions organized by category — HTML, CSS, JavaScript, Tailwind, React, TypeScript, and your saved Favourites.',
      },
      {
        title: 'Flexible Filtering System',
        description:
          'Easily filter questions by topic or knowledge level — Beginner, Mid, or Senior — to focus on exactly what you need to practice.',
      },
      {
        title: 'Two Study Modes',
        description:
          'Choose between Quiz Mode, where answers are hidden until you reveal them, or Learning Mode, showing both question and answer for continuous study.',
      },
      {
        title: 'Favourites System',
        description:
          'Save your favourite questions 💚 and revisit them anytime in a dedicated tab. Requires a quick registration or login.',
      },
      {
        title: 'User Settings',
        description:
          'Manage your account with ease — change password, log out, or permanently delete your profile from within the app.',
      },
      {
        title: 'Feedback Form',
        description:
          'A built-in feedback button lets you share ideas, report issues, or suggest new topics directly to the developer.',
      },
      {
        title: 'Light and Dark Themes',
        description:
          'Switch effortlessly between light and dark modes to study comfortably in any environment.',
      },
      {
        title: 'Fully Responsive Design',
        description:
          'Optimized for all devices — whether on desktop, tablet, or mobile, your study experience stays smooth and consistent.',
      },
      {
        title: 'PWA Support',
        description:
          'Install the app as a Progressive Web App for instant offline access and native-like performance on both desktop and mobile.',
      },
    ],
    technologies: [
      {
        title: 'React (Next.js) + TypeScript',
        description:
          'Core framework and language for building a performant, type-safe front-end with server-side rendering and routing.',
      },
      {
        title: 'Tailwind CSS',
        description:
          'Utility-first CSS framework used for consistent, responsive, and easily maintainable styling.',
      },
      {
        title: 'Notion API',
        description:
          'Used as a lightweight CMS to store and manage all interview questions and answers.',
      },
      {
        title: 'Supabase',
        description:
          'Handles authentication and stores user favorites securely with a PostgreSQL backend.',
      },
      {
        title: 'React Hook Form + Zod',
        description:
          'Used for efficient and type-safe form handling and validation in registration and login flows.',
      },
      {
        title: 'Lucide React',
        description:
          'Icon library providing clean and consistent SVG icons across the UI.',
      },
      {
        title: 'React Hot Toast',
        description:
          'Displays non-intrusive toast notifications for user feedback and system messages.',
      },
      {
        title: 'React Syntax Highlighter',
        description:
          'Renders formatted code snippets within interview answers for better readability.',
      },
      {
        title: 'Radix UI',
        description:
          'Provides accessible, composable primitives for building modals, drawers, and other interactive components.',
      },
      {
        title: 'next-pwa',
        description:
          'Enables full Progressive Web App capabilities, including offline access and installability.',
      },
      {
        title: 'Nodemailer',
        description:
          'Handles sending feedback submissions via email directly from the site.',
      },
      {
        title: 'Framer Motion',
        description:
          'Used to create smooth page transitions and interactive animations throughout the app.',
      },
      {
        title: '@react-three/fiber + OGL',
        description:
          'Powerful libraries for rendering custom 3D scenes and animated background effects.',
      },
      {
        title: 'UI Inspirations',
        description:
          'Design ideas and components adapted from React Bits, Magic UI, and UI Layouts to enhance usability and aesthetics.',
      },
    ],
  },
];
