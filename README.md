# Ankur Gupta - Interactive Developer Portfolio

This is a dynamic and visually-rich personal portfolio website for Ankur Gupta, a Mobile Application Developer. It's built from the ground up using modern web technologies to create an engaging and memorable user experience. The project is designed to be easily customizable.

![Live Demo Screenshot](https://user-images.githubusercontent.com/8909120/190882035-3a054245-c54d-4e92-958a-3a78921e5e01.png)

**Note:** A live demo link and updated screenshot would be great additions here!

---

## ✨ Features

This portfolio is packed with interactive elements and modern design patterns:

-   **Interactive CLI:** An embedded terminal in the "About Me" section where users can type commands (`whoami`, `projects`, `socials`, `neofetch`) to learn more.
-   **Light & Dark Mode:** A sleek theme toggle that respects user's preference and saves it in local storage.
-   **Dynamic Visuals:**
    -   **Cursor Glow:** A radial gradient follows the cursor, illuminating the content underneath.
    -   **Animated Background:** A subtle, panning grid creates a sense of depth.
    -   **Scroll Progress Bar:** A thin bar at the top of the page shows the user's reading progress.
-   **Micro-interactions:**
    -   **3D Card Tilt:** Project and achievement cards tilt in 3D space based on mouse position, creating a tactile feel.
    -   **Glitch & Typing Effects:** The main hero text features a cool glitch effect and a typewriter animation for the tagline.
    -   **Hover Animations:** Smooth, responsive hover effects on skills, social icons, and buttons.
-   **Responsive Design:** Fully responsive layout with a dedicated mobile navigation menu ensures a great experience on all devices.
-   **Content-Driven:** All personal data (experience, projects, skills) is centralized in a `constants.ts` file, making it incredibly easy to update.
-   **Zero Build Step:** Runs directly in the browser using modern ES Modules via CDN, making it simple to set up and deploy.

## 🚀 Tech Stack

-   **Frontend:** [React](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling, with custom CSS variables for theming and animations.
-   **Dependencies:** Served directly from [esm.sh](https://esm.sh/), requiring no `node_modules` or package manager.

## 🔧 Getting Started

Because this project uses ES modules, you cannot simply open the `index.html` file from your local file system (i.e., via `file:///...`). You need to serve it from a local web server. Here are a couple of ways to do that.

### Option 1: Using a Simple Local Server (Recommended)

This is the fastest way to get started. All you need is a web browser and a simple local server.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ankurg132/your-portfolio-repo.git
    cd your-portfolio-repo
    ```

2.  **Serve the directory:**
    -   **Using VS Code**: The easiest method is with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. Right-click on `index.html` and select "Open with Live Server".
    -   **Using Python**: If you have Python installed, run one of the following commands in your terminal:
        ```bash
        # For Python 3
        python -m http.server
        ```
    Then, open your browser and navigate to `http://localhost:8000`.

### Option 2: Running with npm

If you have [Node.js](https://nodejs.org/) installed and prefer to use `npm` commands, you can use `npx` to run a temporary local server.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ankurg132/your-portfolio-repo.git
    cd your-portfolio-repo
    ```

2.  **Serve the directory using `npx`:**
    The `serve` package is a simple, zero-configuration static server. The `npx` command lets you run it without installing it globally.
    ```bash
    npx serve .
    ```
    This will start a server and provide a local URL (usually `http://localhost:3000`) that you can open in your browser.

## ✏️ Customization

This portfolio was built to be easily personalized. All the content is located in `constants.ts`.

1.  **Personal Information:** Open `constants.ts` and edit the `NAME`, `TAGLINE`, `SUMMARY`, and `SOCIAL_LINKS` variables.
2.  **Experience & Education:** Update the `EXPERIENCE_DATA` and `EDUCATION_DATA` objects with your own history.
3.  **Projects:** Modify the `PROJECTS_DATA` array. You can add, remove, or edit any project. To use project icons, place them in your project folder and reference them like `/cheerup-icon.png`.
4.  **Skills:** Edit the `SKILLS_DATA` array to reflect your skill set.
5.  **Achievements & Events:** Update the `ACHIEVEMENTS_DATA` and `EVENTS_DATA` arrays.

## 📂 File Structure

Here's a brief overview of the key files in this project:

```
.
├── index.html        # Main HTML entry point, global styles, and CSS variables.
├── README.md         # You are here!
├── App.tsx           # The main React component that assembles the entire page.
├── constants.ts      # Centralized data hub for all portfolio content.
├── types.ts          # TypeScript type definitions for the data structures.
└── components/
    └── Icons.tsx     # A collection of SVG icon components used throughout the site.
```

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
