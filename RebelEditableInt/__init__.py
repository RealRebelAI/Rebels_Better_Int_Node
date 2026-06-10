import os

THEMES = [
    "Cyber Cyan", "Matrix Green", "Neon Pink", "Blood Red",
    "Ombre Sunrise", "Ombre Twilight", "Ombre Forest", "Ombre Ocean",
    "Half Fire/Ice", "Half Light/Dark", "Half Cyberpunk", "Lava Radial",
    "Deep Space", "Holographic", "Gold", "Toxic", "Ghost", "Blood Moon",
    "Amethyst", "Pure Void"
]

class RebelsBetterIntNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": 0, "max": 10000000}),
                "node_name": ("STRING", {"default": "Rebels Better Int"}),
                "theme": (THEMES, {"default": "Cyber Cyan"}),
            },
            "hidden": {
                "fixed_seed": ("INT", {"default": 42}),
            }
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("output",)
    FUNCTION = "get_value"
    CATEGORY = "Rebels/Nodes"

    def get_value(self, value, node_name, theme, fixed_seed=42):
        return (value,)

NODE_CLASS_MAPPINGS = {
    "RebelsBetterIntNode": RebelsBetterIntNode
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "RebelsBetterIntNode": "Rebels Better Int"
}

WEB_DIRECTORY = "./js"