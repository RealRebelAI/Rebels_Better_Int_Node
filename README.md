<img width="1375" height="619" alt="Screenshot (157)" src="https://github.com/user-attachments/assets/02343f3a-c9ff-47d3-8022-c2329d9e29dd" />

Rebels Better Int
A premium, highly interactive utility node for ComfyUI that provides a completely customizable, scalable integer display. Designed to look stunning on stream, in video tutorials, and across complex production workflows, Rebels Better Int replaces boring standard slider boxes with a high-fidelity digital readout that dynamically resizes with your node size.

✨ Features
📦 Dual-Purpose Header and Custom Sub-Labels: Change the top physical title bar via the standard right-click context menu, or type a custom functional name (e.g., Width, Height, Batch Size, Steps) directly into the node to display it prominently above your number.

📐 Dynamic UI Font Scaling: Grab the corner and resize the node! The custom foreground text and neon glowing readouts scale up and down flawlessly based on the node's dimensions.

🎨 20 Built-in Custom Visual Themes: Choose from an array of 20 tailored themes including sleek solid panels, vivid vertical and horizontal gradients, half-and-half color splits, radial color bursts, hazard stripes, and even a static deep-space starfield.

🔒 Hidden Fixed Seed Backend: Out of sight, out of mind. The node injects a stable fixed seed on the Python backend execution layer so ComfyUI satisfies graph generation requirements seamlessly without cluttering your UI with inputs you don't need.

🔕 Minimized State Bug Fix: Cleaned canvas rendering pipeline ensures that when the node is collapsed/minimized, all visual glow elements, background rendering steps, and text blocks strictly hide to eliminate graph bleed bugs.

🛠️ Installation & Folder Placement
To install the node manually in your local ComfyUI instance, place the files in your custom_nodes directory matching the structural layout below:

ComfyUI/
└── custom_nodes/
    └── RebelEditableInt/
        ├── __init__.py         <-- Backend Python logic
        └── js/
            └── rebels_better_int.js <-- Frontend Canvas & Theme engine


Once the files are saved in their respective directories, completely restart your ComfyUI terminal backend server and force-refresh your web browser window (Ctrl + F5) to clear the old cache.
