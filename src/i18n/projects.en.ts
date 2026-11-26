export interface ProjectI18n { cat?: string; tags?: string[]; lead?: string; paras?: string[]; role?: string[]; caps?: string[]; mobileCap?: string }

export const projectsEN: Record<string, ProjectI18n> = {
  'genshin-impact': {
    cat: `Website`,
    lead: `Personal study redesigning the official Genshin Impact website: an experience with clearer hierarchy, more coherent information architecture and a nicer feel on any screen. Independent concept, with no official affiliation.`,
    paras: [
      `The work started from a critical look at the current site: sections with the same visual weight, related content scattered around and little immersion for a fantasy world. Each point became a design decision: editorial type scale, section numerals, a cinematic hero with character switching, a four-area sitemap and a menu with a dropdown under Information.`,
      `The result is a calm, magical, editorial interface, with the "twilight" palette (ink blue, pearl gold and elemental pastels), a design system with variables, styles and components, and motion in the details, like the blinking silver star. It was designed for desktop, tablet and mobile, with 44 px touch targets and a full-screen menu.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Design System`, `Product Design`],
    caps: [`Home · Desktop`],
  },
  'coraline-movie': {
    cat: `Landing page`,
    lead: `Personal study of a landing page for the film Coraline, in one-pager format: a single page that takes visitors from the tiny door to the final choice, passing through the story's three color worlds. Independent concept, with no official link to the film or the studio.`,
    paras: [
      `The page follows the story in chapters: Pink Palace, passage, Other World, Beldam, cast, trailer, behind the scenes and verdict. The hero is interactive, with the door opening into a tunnel, and the text appears in English, Portuguese and Spanish. The palette shifts with each world (Real World, Other World and Beldam), with Almendra for headings, Lora for body text and Special Elite for details.`,
      `The design system brings together color, spacing, radius and language variables, plus a component library. Motion takes center stage with a stop-motion Coraline walking, floating ghosts, the hand grabbing the key and fireflies, and the page has Desktop, Tablet and Mobile versions. The front-end is mine too: besides the design, I built the page, which is live.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Front-end`, `Motion`],
    caps: [`Presentation · Cover, overview and colors`, `Home · Desktop`, `Responsive · Desktop, Tablet and Mobile`],
  },
  'renascimento': {
    cat: `Website`,
    lead: `Personal study of a virtual art gallery about the Renaissance: a site where visitors enter the browser as if walking into a museum, going through historical context, techniques, masters and works. Independent concept.`,
    paras: [
      `The home follows the path of a visit: a hero with the Mona Lisa in an arched frame, historical context, phases of the period, characteristics, techniques, the Vitruvian Man, masters, the gallery with seven works in golden frames, the lab of the eye, the timeline of the works and the synthesis. Clicking a painting opens the work's room with its details, and there are desktop and mobile versions.`,
      `The identity is dark, with gold and wine, in Playfair Display, Cormorant Garamond and Montserrat. Motion takes center stage in the loading, the "View work" cursor, the Vitruvian Man that assembles with scroll and the chronology. The front-end is mine too: besides the design, I built the site, which is live.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Front-end`, `Motion`],
    caps: [`Presentation · Concept, brand, color and frames`, `Home · Desktop`, `Loading, work room and mobile`],
  },
  'nyxie-dead-air': {
    cat: `Landing page`,
    lead: `Personal study of a conceptual landing page for a fictional rhythm-action game (roguelike RPG) with a gothic-kawaii aesthetic, "Nyxie: Dead Air", designed to present the world, the character and the gameplay on a single page.`,
    paras: [
      `The page brings together a Hero with a video arch, a Featured Video with the trailer in a modal, Story, Character with profile, stats, kit and turntable, Skins with a 10-color selector, Poses, Gameplay with HUD, Worlds, Hub, Editions, an accordion FAQ, final CTA and footer. It was designed for desktop (1600 px), tablet and mobile, with an open menu on the smaller breakpoints.`,
      `Interactions and motion take center stage: hover on buttons and cards, skin selector, character switching, floating hearts and animated dividers. The design system includes color variables and components in Atomic Design. The character and the videos were generated with AI and curated by me; layout, interactions and motion are original.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Motion`, `Design System`],
    caps: [`Landing Page · Desktop`],
  },
  'filmow-redesign': {
    cat: `Website`,
    lead: `Personal study redesigning the full Filmow website, the social network for movies and series: a dark interface, with the brand blue as the highlight, that organizes the most important content into light reading zones. Independent concept, with no official link to the platform.`,
    paras: [
      `The home was reorganized into numbered zones (Trending, For you, Cinema, News and lists, Community and Explore), with poster cards with hover and watched states, tabs, carousels and a trailer. The redesign goes beyond the home and covers the full site: listing pages (movies, series, TV, lists, artists, news and groups), with filters and sorting, plus the login and sign-up screens.`,
      `The design system brings together variables (primitives, dark/light colors, spacing and radius), text styles in Sora and Inter and the component library, with the blue #1BA3E6 as the highlight color on dark surfaces.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Design System`, `Product Design`],
    caps: [`Home · Desktop`, `Listing · Movies`, `Design System`],
  },
  'musgo': {
    cat: `Website`,
    lead: `Personal study of visual identity and a mini site for an original character, Musgo: a dark-green furry little monster with one big eye and pink horns, who gets a game, a store and a brand system made to make you want to hug it.`,
    paras: [
      `The presentation covers briefing, concept, character, construction doodles, logotype, palette and typography (Bagel Fat One, Fredoka and Nunito), plus applications on products such as plush, funko, mug, notebook and school kit. The mini site ties it all together: Home, Store and Product, with a sticker style (thick border and pop shadow), animations like the 360 spin and the hug, and desktop, tablet and mobile versions.`,
      `The design system has color, typography and layout variables, and a component library. The character's images and videos were generated with AI and curated by me; the identity, interface, interactions and motion are original.`,
    ],
    role: [`Branding`, `UI Design`, `Webdesigner`, `Motion`],
    caps: [`Presentation · Brand and character`, `Presentation · Color, typography and applications`, `Mini site · Home`],
  },
  'monogatari': {
    cat: `Website`,
    lead: `Personal study of UI and branding for Monogatari, a fictional digital editorial magazine about Japan's myths, legends and hauntings, with visual identity, interface and movement conceived like a magazine cover.`,
    paras: [
      `The brand has the red hanko, an imperfect stamp, as its symbol, the wordmark in Cormorant Garamond and a palette of red, ink, gold and paper. The typography adds Shippori Mincho for the kanji and Zen Kaku Gothic New for text and interface.`,
      `The home brings together a hero with a blinking photo, manifesto, route of stations, highlight, stories, candlelit kaidan and bestiary, with a component library, foundations and screens in Desktop, Tablet and Mobile versions.`,
    ],
    role: [`UI Design`, `Branding`, `Design System`],
    caps: [`Brand · visual identity`, `Interface · components and mockups`, `Home · Desktop`],
  },
  'bad-name': {
    cat: `Website`,
    lead: `Website project for the rock and pop cover band Bad Name: a dark institutional site, with purple as the highlight, that shows the shows, the themed nights, the musicians and the store, and takes visitors straight to booking.`,
    paras: [
      `The home starts with a band portrait and a typing headline, then moves through a timeline, show formats, themed nights, schedule, lead singer, musician cards, store, Instagram feed and a booking form with a mascot. The store has its own page, with the shirt in a gallery and the buttons (pins), and the footer features a moving ticker.`,
      `The design system brings together color and spacing variables, text styles and components such as Button, Nav Link, Tag and Musician Card. Interactions include hovers, carousels, ticker and the mascot, and the loader imitates a CRT TV: a little figure dances on the loading bar and the screen shuts off before the site opens.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Motion`, `Design System`],
    caps: [`Home · Desktop`, `Store`, `Loader · Dance`],
  },
  'alfama-web': {
    cat: `Website`,
    lead: `Institutional site of Alfama Web, the digital solutions agency, redesigned in Figma as a complete system of pages and components.`,
    paras: [
      `The project covers Home, About, Solutions (with pages for Websites, Real Estate Simulator, Landing Pages, Web App, Intranets and CRM Integration), Projects, Blog, article, Contact and Privacy Policy, in Desktop, Tablet and Mobile versions.`,
      `It includes a component library, color, spacing and radius variables, text styles (Geist, Inter and Geist Mono), a motion specification and a handoff document for development.`,
    ],
    role: [`UI Design`, `Design System`, `Prototyping`],
    caps: [`Home`, `Projects`],
  },
  'gerador-de-criativos': {
    cat: `Product`,
    lead: `Tool where the broker chooses the development and the categories and downloads the official artwork for Instagram Feed and Stories, already with name, phone and CRECI.`,
    paras: [
      `The broker generates pieces for a development (state, city, development and up to 3 categories, with a real-time preview) and also the image for a commercial campaign, applied over the product frame.`,
      `The admin registers developments and campaigns, categories and frames, and manages user permissions. The product has screens for Desktop, Tablet and Mobile and flow documentation.`,
    ],
    role: [`UI Design`, `Product Design`, `Design System`, `Prototyping`],
    caps: [`Generate development pieces`, `Finished pieces`, `Admin · Templates`],
  },
  'terrah': {
    cat: `Website`,
    lead: `Institutional landing page of Terrah Urbanismo, an urban planning and real estate development company from Grupo Partemp.`,
    paras: [
      `The site brings together Home, About Terrah, Partemp Group, Developments, development detail page, Insights (listing and article), Contact and Privacy Policy, in Desktop, Tablet and Mobile versions.`,
      `On the Home, highlights include development categories, a portfolio with status filters and a map of locations. The file includes color and typography foundations, variables and a component library.`,
    ],
    role: [`UI Design`, `Design System`, `Prototyping`],
    caps: [`Home`, `Developments`, `Development detail`],
  },
  'gerador-de-landing-pages': {
    cat: `Product`,
    lead: `Tool that generates landing pages for real estate launches from the developments in CV CRM and delivers the leads back to the CRM.`,
    paras: [
      `After access (sign in, password recovery and invite), company registration, the CV CRM connection and linking the developments, the start screen lists each one with the page status. The creation flow has 7 steps: data, form, SEO and campaign, structure, visual, review and publishing. There are 6 visual styles: Contemporary, Minimalist, High-end, Natural, Urban and Premium.`,
      `Once published, the page gets a dashboard with visitors, leads, conversion, submissions to CV CRM (with a log of only what failed, since the leads stay in the CRM), page score and suggestions. The file also includes the component kit for the generated pages, Desktop, Tablet and Mobile versions and the flow documentation.`,
    ],
    role: [`UI Design`, `Product Design`, `Design System`, `Prototyping`],
    caps: [`Access and registration · Sign in, connect CV CRM and link developments`, `Start and creation · Development list, SEO and campaign, visual and identity`, `Review, publishing and integration · Review, published page and CV CRM integration`],
    mobileCap: `Mobile · start, review and published page`,
  },
  'primasa-camel': {
    cat: `Website`,
    lead: `Institutional site of Primasa Camel, a construction company from Aracaju, with a showcase of developments and brand content.`,
    paras: [
      `The site covers Home, Developments, detail page (Joya Residence), About, Contact with subject options, Blog, Videos, Follow your construction, Pre-launch, Privacy Policy and a 404 page, with overlay menu and search, in Desktop, Tablet and Mobile.`,
      `The file brings together components in Atomic Design, color tokens, documentation of the current site's routes and rules for interaction, motion and responsiveness.`,
    ],
    role: [`UI Design`, `Design System`, `Prototyping`],
    caps: [`Home`, `Developments`, `Development detail · Joya Residence`],
  },
  'gsp': {
    cat: `Website`,
    tags: [`UI Design`, `Simulator`],
  },
  'stanza': {
    cat: `Website`,
  },
  'parque-arvoredo': {
    cat: `Landing page`,
    lead: `Launch landing page for Parque Arvoredo, a planned park neighborhood in Boituva/SP, focused on quality of life, well-being and connection with nature.`,
    paras: [
      `The Home presents the park neighborhood concept, urbanism and nature, leisure integrated into daily life, location, the developer GSP Loteamentos and a contact form. There is also a page dedicated to the launch form.`,
      `The project was designed for desktop, tablet and mobile, with a documented Design System (foundations and components).`,
    ],
    role: [`UI Design`, `Design System`, `Webdesigner`],
    caps: [`Home`, `Launch form`],
  },
  'entre-rios': {
    cat: `Website`,
    lead: `Redesign of the Entre Rios Mineral Water website, preserving the original copy and the current brand, with four product lines: Mineral Water, Energy Drinks, Soft Drinks and Guaraná Mais.`,
    paras: [
      `The site brings together Home, About Entre Rios, Products (with a page for each line), Sustainability, Contact and Privacy Policy, plus the overlay menu on the smaller breakpoints.`,
      `It was designed for desktop, tablet and mobile, with a documented Design System in Montserrat: colors, typography, spacing, radii, elevation and components. The prototype connects the screens with navigation links.`,
    ],
    role: [`UI Design`, `Design System`, `Prototyping`],
    caps: [`Home`, `Products`, `Product: Mineral Water`],
  },
  'iel': {
    cat: `Website`,
    lead: `Institutional portal of IEL Sergipe, with a design system, wireframes, desktop, tablet and mobile screens, sitemap and component library.`,
    paras: [
      `The portal organizes content into Institutional, For your Company, For you, student, For you, professional, Industry Observatory, News and Contact. The Home brings together solutions, latest news, observatory, job board and a help channel.`,
      `The design system documents tokens (colors, typography, spacing, radii, shadows), a responsive grid with 5 breakpoints, 166 icons and 23 component categories with 346 variants.`,
    ],
    role: [`UI Design`, `Wireframes`, `Design System`],
    caps: [`Home`, `Our Solutions`, `About IEL`],
  },
  'fies': {
    cat: `Website`,
    lead: `Institutional portal of FIES, the Federation of Industries of the State of Sergipe, with a design system, desktop, tablet and mobile screens and a content map.`,
    paras: [
      `Navigation is organized into Institutional, Solutions and Services, Associations, Activities, News and Contact. The Home presents what FIES offers, latest news and the Sergipe Industry Observatory; the news page features search, category filter and a highlight.`,
      `The file documents foundations (tokens, typography, grid, icons, dark mode), a component library in atoms, molecules and organisms and page templates.`,
    ],
    role: [`UI Design`, `Design System`, `Content map`],
    caps: [`Home`, `News listing`, `About FIES`],
  },
  'sesi': {
    cat: `Website`,
    lead: `New SESI Sergipe website, with a design system, content map, wireframes and desktop, tablet and mobile screens.`,
    paras: [
      `The site covers Home, Institutional, Our Units, News, Privacy Policy, SESI Education, SESI Health, physical and sports activities (Aracaju and Itabaiana) and the page for your company, plus the Sesinho and EJA pages.`,
      `The file is documented for people and for AI: design tokens, typography, grid, icons and a component library in atoms, molecules and organisms, with the same screens and sections across the three breakpoints.`,
    ],
    role: [`UI Design`, `Wireframes`, `Design System`],
    caps: [`Home`, `SESI Education`, `SESI Health`],
  },
  'senai': {
    cat: `Website`,
    lead: `Institutional site of SENAI Sergipe, designed with 36 pages across three breakpoints: desktop, tablet and mobile.`,
    paras: [
      `The project organizes the site's information architecture into institutional, courses, services for companies, digital platforms and programs, with pages such as Home, National Itineraries and Interiorization Project.`,
      `The file also brings together design tokens, typography, grid, icons and a component library, plus documentation of the site's routes.`,
    ],
    role: [`UI Design`, `Design System`, `Responsive Design`],
    caps: [`Home`, `National Itineraries`, `Interiorization Project`],
  },
  'yvaz': {
    cat: `Website`,
    lead: `Institutional site of YVAZ INC, a high-end developer that gives shape to rare properties in unique locations, between countryside and beach.`,
    paras: [
      `The Home presents the brand, the concept video, the singular projects and the offices. The Nalú Maraú page details the beachfront lot development on the Maraú Peninsula, Bahia, with highlights, access and a contact form.`,
      `The project includes a full-screen menu, tablet and mobile versions, a form and documentation of the design tokens (color, typography, spacing, radius, border, opacity and elevation).`,
    ],
    role: [`UI Design`, `Design System`, `Responsive Design`],
    caps: [`Home`, `Nalú Maraú`, `Menu`],
  },
  'avendre-pay': {
    cat: `Website`,
    lead: `Site for Avendre Pay, a platform for automating and controlling real estate commission payments, with pages for developers and for brokerages.`,
    paras: [
      `The Home presents the proposal (real estate commissioning with less bureaucracy), the pain points the platform removes and how it solves them, with native integration with CV CRM. The For developers and For brokerages pages detail the benefits for each audience and include a contact form.`,
      `The project also has a mobile version and a component library (cards, buttons and sections).`,
    ],
    role: [`UI Design`, `Responsive Design`, `Components`],
    caps: [`Home`, `For developers`, `For brokerages`],
  },
  'gerador-de-conteudo': {
    cat: `Product`,
    tags: [`Product Design`, `AI`],
    lead: `Alfama Web's Content Agent: a tool for the end client that generates the site's texts, with simple language and one step per screen.`,
    paras: [
      `The Figma Generator reads the layout frame and writes the texts at the exact size of each space: the client pastes the link, checks the sections, enters the page goal, reviews the texts and approves. The URL Generator audits the current site and rewrites it with a focus on SEO and conversion.`,
      `The flow includes sign-up and onboarding, error states, settings and company data, with contextual help, a 5-step stepper and review before use. The file also includes a product map, brand, components and tokens.`,
    ],
    role: [`Product Design`, `UI Design`, `Prototyping`, `Design System`],
    caps: [`Start`, `Upload layout`, `Finished texts`],
  },
  'cv-banco-de-talentos': {
    cat: `Product`,
    lead: `CV's job portal: the Talent Bank connects talent to opportunities in the Brazilian real estate market.`,
    paras: [
      `The job listing offers search by keywords, category, job type and location, with filters. The job page has the application form (name, e-mail, phone/WhatsApp, résumé and how long they have known CV CRM) and ends on a confirmation screen.`,
      `The screens were designed for desktop, tablet and mobile, and the file includes a components page.`,
    ],
    role: [`UI Design`, `Responsive Design`, `Components`],
    caps: [`Job listing`, `Job detail`, `Application confirmed`],
  },
  'indica-cv': {
    cat: `Product`,
    lead: `Landing page for Indica CV, CV CRM's official referral program that pays R$ 500 for each completed referral of developers, land developers and builders.`,
    paras: [
      `The page explains how it works in three steps (refer a company, the CV CRM team gets in touch and the referrer receives the reward), and includes a referral form, an earnings simulator and the Why refer CV CRM section with the platform's differentiators.`,
      `It also features client numbers, social proof, segment selection (builders, land developers and developers), a comparison between Indica CV and Finder and frequently asked questions.`,
    ],
    role: [`UI Design`, `Webdesigner`, `Design System`],
    caps: [`Home`],
  },
  'lp-comercial-agente-de-ia': {
    cat: `Product`,
    tags: [`Product Design`, `AI`],
    lead: `Commercial landing page for AlfamaWeb's AI Agent, which analyzes the client's site and delivers a diagnosis with technical, content and accessibility issues.`,
    paras: [
      `The page invites the visitor to try the agent by entering the site URL, with a dashboard preview (SEO, performance, accessibility and content), and includes a form to request the analysis.`,
      `It also includes the comparison between manual audit and AI Agent, the benefits by area (SEO, performance and conversion), the mission and the frequently asked questions. The project has a design system guide (Inter typography, palette and button effects).`,
    ],
    role: [`UI Design`, `Webdesigner`, `Design System`],
    caps: [`Home`],
  },
  'aipim': {
    cat: `Website`,
    lead: `Institutional site of aipim.tech, an artificial intelligence company for the real estate market, with AI agents integrated with the CRM.`,
    paras: [
      `The home presents the proposal (error-free AI integrated with the CRM), partners and clients, the benefits and the products: Digital SDR, Sales Assistant and After-sales, with the AI agent's conversation illustrated on screen.`,
      `The project also includes the internal product page (Digital SDR, with frequently asked questions), About us, Work with us and Privacy Policy, all with mobile versions and a sitemap.`,
    ],
    role: [`UI Design`, `Webdesigner`],
    caps: [`Home`, `Product – Digital SDR`, `About us`],
  },
  'lp-comercial-construtoras': {
    cat: `Landing page`,
    lead: `AlfamaWeb's commercial landing page aimed at builders and developers, presenting websites, landing pages and digital solutions for the real estate market.`,
    paras: [
      `The home highlights the agency's proposal, client numbers, solutions and services (such as Institutional Websites), with calls to request a quote.`,
      `The project includes the internal service page, the contact page with a form and frequently asked questions, plus privacy policy and a 404 page, with mobile versions and design system documentation (Foundations and Components).`,
    ],
    role: [`UI Design`, `Webdesigner`, `Design System`],
    caps: [`Home`, `Service – Institutional Websites`, `Contact`],
  },
  'la-lena-fhv': {
    cat: `Product`,
    tags: [`Product Design`, `Portal`],
    lead: `Digital portal for La Lena Residencial, a development by FHV Urbanismo, for the sales team to check lot availability and follow construction progress.`,
    paras: [
      `The client area brings together login and sign-up, a home with an availability map (blocks and lots with status, area and list price, mirrored from CV Vendas), construction updates with reports, important notices with notifications and profile.`,
      `The project also plans for the admin area and versions for kiosk, tablet and mobile, organized in a design system with components and variables.`,
    ],
    role: [`UI Design`, `Product Design`, `Design System`],
    caps: [`Home`, `Availability`, `Lot details`],
  },
  'ad-haus': {
    cat: `Website`,
  },
  'carrilho-infraestrutura': {
    cat: `Website`,
    lead: `Institutional site of Carrilho Infraestrutura, an infrastructure and industrial engineering group, with projects, blog and contact.`,
    paras: [
      `The layout covers Home, About Us, Projects (with filters All, In progress, Completed and Delivered), project detail, Blog, blog post and Contact Us, in desktop and mobile versions.`,
      `A documented Design System organizes colors, typography, grid and components such as Navbar, Footer and CTA, with accessibility guidelines.`,
    ],
    role: [`UI Design`, `Design System`, `Webdesigner`],
    caps: [`Home`, `Projects`, `Project detail`],
  },
  'alfama-personalizacao': {
    cat: `Product`,
    lead: `Customization panel for AlfamaWeb's app: the client uploads a logo, background image and brand color and follows the preview in real time.`,
    paras: [
      `The panel brings together a welcome, an explanation of how it works and tips, plus the screens for customizing the opening (Splash Screen) and the login, with restore default and save changes.`,
      `Change password and Icon library are also part of the layout, in desktop, tablet and mobile versions, with documentation of colors, typography and Design Tokens.`,
    ],
    role: [`UI Design`, `Product Design`, `Design System`],
    caps: [`Panel`, `Opening customization`, `Login customization`],
  },
  'vex': {
    cat: `Website`,
  },
  'cepjss': {
    cat: `Website`,
    lead: `Institutional site of Centro Educacional Professor José Sebastião dos Santos (CEPJSS), a school for Early Childhood Education, Elementary and High School.`,
    paras: [
      `The Home presents About Us, Our Education (Early Childhood Education, Elementary School, High School and Robotics Education), Benefits, Highlights with the school calendar and the semi-full-time program, Blog and photo gallery, with access to the Academic Portal.`,
      `A Design System in progress documents logo, colors, typography, spacing and base components such as buttons and cards.`,
    ],
    role: [`UI Design`, `Design System`, `Webdesigner`],
    caps: [`Home`, `Design System`],
  },
  'skill-mapa-de-conteudo': {
    cat: `Tool`,
    lead: `Claude skill that reads a site's layout in Figma and generates the content map: a page that shows the client what they need to send, section by section.`,
    paras: [
      `Each section includes the screen crop, texts with character limits, images and icons with size and format, and links. Progress is saved in the browser and, at the end, the client downloads a package with CSV, JSON and images.`,
      `The screen shown is the IEL map, used as a template.`,
    ],
    role: [`Product Design`, `Front-end`],
    caps: [`Content map (IEL template)`],
  },
  'plugin-wordpress-mapa-de-conteudo': {
    cat: `Tool`,
    tags: [`WP Plugin`, `Form`],
    lead: `WordPress plugin that hosts the content map form on the client's site, with the answers saved in WordPress itself.`,
    paras: [
      `The client accesses it through a link with a code, no login. The plugin uses a REST API and its own table, and the team follows the answers and downloads the CSV.`,
      `The screens shown are the usage guide for the team.`,
    ],
    role: [`Product Design`, `Front-end`],
    caps: [`Usage guide`],
  },
  'hacasa-personalize': {
    cat: `Product`,
    lead: `HACASA unit customization platform: the client chooses the kits for each stage of the build or works on a project with an architect, and management follows everything in an admin dashboard.`,
    paras: [
      `On the client side, login leads to unit selection and to kits in two stages, Civil and Finishes, with a default option already selected, a price summary and approval with a deadline. Whoever chooses the project with an architect follows the request, plans, materials, budget, execution, conversations and documents.`,
      `The management dashboard brings together an overview, tracking by unit, a master list, quantities, deadlines and the CV CRM integration. The file has a green and terracotta design system, with tokens and a component library, in a Desktop version.`,
    ],
    role: [`UI Design`, `Product Design`, `Design System`, `Prototyping`],
    caps: [`Client · Login, unit selection and Stage 01 kits`, `Architect project · Overview, budget and conversation`, `Management · Overview, master list and CV CRM integration`],
  },
};
