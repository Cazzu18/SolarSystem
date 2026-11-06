# Solar System Simulation

This project is a 3D animated simulation of our inner solar system, built using Three.js and Vite. It visually represents the Sun, Mercury, Venus, Earth (with its Moon), and Mars (with its moons, Phobos and Deimos), all orbiting in a beautifully rendered space environment.

## Features

-   **3D Visualization:** Renders the Sun and the first four planets of our solar system in a 3D space.
-   **Orbital Animation:** Planets orbit the Sun, and moons orbit their respective planets at different speeds.
-   **High-Quality Textures:** Utilizes detailed textures for the Sun, planets, and moons to create a realistic appearance.
-   **Immersive Background:** A cube map provides a stunning 360-degree space background.
-   **Interactive Controls:** Use your mouse to pan, zoom, and rotate the camera to view the solar system from any angle, thanks to `OrbitControls`.
-   **Responsive Canvas:** The simulation dynamically resizes to fit your browser window.

## Technologies Used

-   [Three.js](https://threejs.org/): A cross-browser JavaScript library/API used to create and display animated 3D computer graphics in a web browser.
-   [Vite](https://vitejs.dev/): A modern frontend build tool that provides an extremely fast development environment.
-   [Tweakpane](https://cocopon.github.io/tweakpane/): A compact and portable GUI for fine-tuning parameters.

## Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20.x or higher)
-   npm (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cazzu18/SolarSystem.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd SolarSystem
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open your web browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Project Structure

The project is organized as follows:

```
SolarSystem/
├── src/
│   ├── index.html       # Main HTML entry point
│   ├── script.js        # Core Three.js logic and animation loop
│   └── style.css        # Basic styling for the canvas
├── static/
│   └── textures/        # Contains all image textures for planets, moons, and the cube map
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration file
```

## How It Works

The core of the simulation is in `src/script.js`.

-   A Three.js `Scene` is initialized.
-   Textures for the celestial bodies and the space background cube map are loaded using `TextureLoader` and `CubeTextureLoader`.
-   A `SphereGeometry` is used as the base shape for all planets and moons.
-   An array of `planets` objects holds the data for each planet, including its size, distance from the sun, orbital speed, and any associated moons.
-   The `createPlanet` and `createMoon` functions dynamically generate `Mesh` objects for each celestial body. Moons are added as children of their parent planet's mesh, allowing them to orbit relative to the planet.
-   The scene is lit by an `AmbientLight` for general illumination and a `PointLight` positioned at the center to simulate the Sun's light.
-   The `renderLoop` function is called on every frame. It updates the rotation and orbital position of each planet and moon, creating the animation. The planet's position is calculated using `Math.sin()` and `Math.cos()` to trace a circular path around the Sun.
