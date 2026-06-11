import { app } from "../../scripts/app.js";

const getThemeColors = (themeName) => {
    const themes = {
        "Cyber Cyan": { bg1: "#0a0a0c", bg2: "#0a0a0c", text: "#00f0ff", type: "solid", border: "#00f0ff" },
        "Matrix Green": { bg1: "#051005", bg2: "#051005", text: "#00FF41", type: "solid", border: "#00FF41" },
        "Neon Pink": { bg1: "#12050b", bg2: "#12050b", text: "#ff00aa", type: "solid", border: "#ff00aa" },
        "Blood Red": { bg1: "#140000", bg2: "#140000", text: "#ff0000", type: "solid", border: "#cc0000" },
        "Ombre Sunrise": { bg1: "#ff4e50", bg2: "#f9d423", text: "#ffffff", type: "gradient-v", border: "#f9d423" },
        "Ombre Twilight": { bg1: "#2c3e50", bg2: "#fd746c", text: "#ffffff", type: "gradient-v", border: "#fd746c" },
        "Ombre Forest": { bg1: "#134e5e", bg2: "#71b280", text: "#ffffff", type: "gradient-v", border: "#71b280" },
        "Ombre Ocean": { bg1: "#2b5876", bg2: "#4e4376", text: "#00f0ff", type: "gradient-v", border: "#00f0ff" },
        "Half Fire/Ice": { bg1: "#ff3300", bg2: "#00d4ff", text: "#ffffff", type: "half-h", border: "#ffffff" },
        "Half Light/Dark": { bg1: "#ffffff", bg2: "#111111", text: "#888888", type: "half-v", border: "#888888" },
        "Half Cyberpunk": { bg1: "#fcee0a", bg2: "#00f0ff", text: "#ff00aa", type: "half-diagonal", border: "#ff00aa" },
        "Lava Radial": { bg1: "#ff0000", bg2: "#330000", text: "#ffaa00", type: "radial", border: "#ff5500" },
        "Deep Space": { bg1: "#000000", bg2: "#0b0c10", text: "#c5c6c7", type: "stars", border: "#45a29e" },
        "Holographic": { bg1: "#ff00aa", bg2: "#00f0ff", text: "#ffffff", type: "gradient-h", border: "#ffffff" },
        "Gold": { bg1: "#bf953f", bg2: "#b38728", text: "#fbf5b7", type: "gradient-v", border: "#fbf5b7" },
        "Toxic": { bg1: "#000000", bg2: "#39ff14", text: "#39ff14", type: "stripes", border: "#39ff14" },
        "Ghost": { bg1: "rgba(255,255,255,0.05)", bg2: "rgba(255,255,255,0.0)", text: "#aaddff", type: "solid", border: "#aaddff" },
        "Blood Moon": { bg1: "#550000", bg2: "#000000", text: "#ff3333", type: "radial", border: "#ff3333" },
        "Amethyst": { bg1: "#4a00e0", bg2: "#8e2de2", text: "#ffffff", type: "gradient-v", border: "#ffffff" },
        "Pure Void": { bg1: "#000000", bg2: "#000000", text: "#777777", type: "solid", border: "#000000" }
    };
    return themes[themeName] || themes["Cyber Cyan"];
};

app.registerExtension({
    name: "Comfy.RebelsBetterInt",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "RebelsBetterIntNode") {
            
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function() {
                onNodeCreated?.apply(this, arguments);
                this.size = [300, 250];

                // Safely bind redraw to the widgets
                setTimeout(() => {
                    if (!this.widgets) return;
                    ['node_name', 'theme', 'value'].forEach(wName => {
                        const w = this.widgets.find(x => x.name === wName);
                        if (w) {
                            const orig = w.callback;
                            w.callback = (v) => {
                                if (orig) orig.apply(this, [v]);
                                this.setDirtyCanvas(true, true);
                            };
                        }
                    });
                }, 100);
            };

            const getExtraMenuOptions = nodeType.prototype.getExtraMenuOptions;
            nodeType.prototype.getExtraMenuOptions = function(canvas, options) {
                getExtraMenuOptions?.apply(this, arguments);
                options.unshift({
                    content: "✏️ Rename Title Bar...",
                    callback: () => {
                        const newTitle = prompt("Enter title bar name:", this.title);
                        if (newTitle !== null && newTitle.trim() !== "") {
                            this.title = newTitle.trim();
                            this.setDirtyCanvas(true, true);
                        }
                    }
                });
            };

            nodeType.prototype.onDrawForeground = function(ctx) {
                if (this.flags.collapsed) return;

                const valWidget = this.widgets?.find(w => w.name === "value");
                const nameWidget = this.widgets?.find(w => w.name === "node_name");
                const themeWidget = this.widgets?.find(w => w.name === "theme");

                const displayValue = valWidget ? valWidget.value : 0;
                const displayName = nameWidget && nameWidget.value ? nameWidget.value : "";
                const themeName = themeWidget ? themeWidget.value : "Cyber Cyan";
                const theme = getThemeColors(themeName);
                
                const w = this.size[0];
                const h = this.size[1];
                
                const startY = 100; 
                const availableHeight = Math.max(10, h - startY - 10);
                const dynamicFontSize = Math.min(w * 0.25, availableHeight * 0.4); 
                const dynamicNameSize = Math.max(12, dynamicFontSize * 0.35);

                ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
                ctx.fillRect(10, startY, w - 20, availableHeight);
                
                ctx.fillStyle = "#ffffff";
                ctx.font = `bold ${dynamicNameSize}px sans-serif`;
                ctx.textAlign = "center";
                ctx.shadowBlur = 0; 
                ctx.fillText(displayName, w / 2, startY + dynamicNameSize + 10);
                
                ctx.fillStyle = theme.text;
                ctx.font = `bold ${dynamicFontSize}px monospace`;
                ctx.textAlign = "center";
                ctx.shadowColor = theme.text;
                ctx.shadowBlur = dynamicFontSize * 0.3; 
                
                const numberY = startY + dynamicNameSize + 20 + (dynamicFontSize * 0.7);
                ctx.fillText(displayValue, w / 2, numberY);
            };

            nodeType.prototype.onDrawBackground = function(ctx) {
                if (this.flags.collapsed) return;
                
                const themeWidget = this.widgets?.find(w => w.name === "theme");
                const themeName = themeWidget ? themeWidget.value : "Cyber Cyan";
                const theme = getThemeColors(themeName);
                
                const w = this.size[0];
                const h = this.size[1];

                ctx.save();
                ctx.beginPath();
                if (ctx.roundRect) { ctx.roundRect(0, 0, w, h, 8); } else { ctx.rect(0, 0, w, h); }
                ctx.clip();

                if (theme.type === "gradient-v") {
                    const grad = ctx.createLinearGradient(0, 0, 0, h);
                    grad.addColorStop(0, theme.bg1);
                    grad.addColorStop(1, theme.bg2);
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, w, h);
                } else if (theme.type === "gradient-h") {
                    const grad = ctx.createLinearGradient(0, 0, w, 0);
                    grad.addColorStop(0, theme.bg1);
                    grad.addColorStop(1, theme.bg2);
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, w, h);
                } else if (theme.type === "half-h") {
                    ctx.fillStyle = theme.bg1;
                    ctx.fillRect(0, 0, w/2, h);
                    ctx.fillStyle = theme.bg2;
                    ctx.fillRect(w/2, 0, w/2, h);
                } else if (theme.type === "half-v") {
                    ctx.fillStyle = theme.bg1;
                    ctx.fillRect(0, 0, w, h/2);
                    ctx.fillStyle = theme.bg2;
                    ctx.fillRect(0, h/2, w, h/2);
                } else if (theme.type === "half-diagonal") {
                    ctx.fillStyle = theme.bg1;
                    ctx.fillRect(0, 0, w, h);
                    ctx.fillStyle = theme.bg2;
                    ctx.beginPath();
                    ctx.moveTo(0, h);
                    ctx.lineTo(w, 0);
                    ctx.lineTo(w, h);
                    ctx.fill();
                } else if (theme.type === "radial") {
                    const rad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w);
                    rad.addColorStop(0, theme.bg1);
                    rad.addColorStop(1, theme.bg2);
                    ctx.fillStyle = rad;
                    ctx.fillRect(0, 0, w, h);
                } else if (theme.type === "stripes") {
                    ctx.fillStyle = theme.bg1;
                    ctx.fillRect(0, 0, w, h);
                    ctx.fillStyle = theme.bg2;
                    for(let i = -h; i < w; i += 25) {
                        ctx.beginPath();
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i+10, 0);
                        ctx.lineTo(i+h+10, h);
                        ctx.lineTo(i+h, h);
                        ctx.fill();
                    }
                } else if (theme.type === "stars") {
                    ctx.fillStyle = theme.bg1;
                    ctx.fillRect(0, 0, w, h);
                    ctx.fillStyle = "#ffffff";
                    for(let i = 0; i < 40; i++) {
                        let sx = (Math.sin(this.id * i + i) * 10000) % w;
                        let sy = (Math.cos(this.id * i + i) * 10000) % h;
                        ctx.fillRect(Math.abs(sx), Math.abs(sy), 2, 2);
                    }
                } else {
                    ctx.fillStyle = theme.bg1;
                    ctx.fillRect(0, 0, w, h);
                }

                ctx.strokeStyle = theme.border;
                ctx.lineWidth = 3;
                ctx.strokeRect(0, 0, w, h);
                ctx.restore();
            };
        }
    }
});