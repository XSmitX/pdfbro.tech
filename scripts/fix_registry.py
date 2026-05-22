"""Fix toolRegistry.ts: add ]; before export function getToolBySlug"""
import re

path = "lib/toolRegistry.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Check if already fixed
if "];\n\n// ---- Helper" in content or "];\r\n\r\n// ---- Helper" in content:
    print("Already fixed!")
else:
    # Insert ]; before export function getToolBySlug
    # Handle both \n and \r\n
    fixed = re.sub(
        r'(\s*\},)\s*(\nexport function getToolBySlug)',
        r'\1\n];\n\n// ---- Helper functions ----\n\nexport function getToolBySlug',
        content
    )
    if fixed == content:
        # Try with \r\n
        fixed = re.sub(
            r'(\s*\},)\s*(\r?\nexport function getToolBySlug)',
            r'\1\n];\n\n// ---- Helper functions ----\n\nexport function getToolBySlug',
            content
        )
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(fixed)
    
    if "];" in fixed and "export function getToolBySlug" in fixed:
        print("Fixed successfully!")
        # Count tools
        tools = re.findall(r'slug: "([^"]+)"', fixed)
        print(f"Total tools: {len(tools)}")
        print("Slugs:", ", ".join(tools))
    else:
        print("Fix may have failed, check manually")
