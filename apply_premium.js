const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f === 'shared.js');

const globalCss = `
/* Premium Dark Mode Overrides */
body {
    background-color: #0f172a !important;
    color: #f8fafc !important;
}

/* Glassmorphism for panels */
.glass-panel, .glass-card {
    background: rgba(30, 41, 59, 0.75) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5) !important;
}

/* Smooth scrollbar */
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #475569 !important;
    border-radius: 10px;
}

/* Overriding hardcoded light theme colors */
.bg-white {
    background-color: #1e293b !important;
}
.text-gray-700, .text-gray-800, .text-gray-900 {
    color: #f1f5f9 !important;
}
.bg-gray-50, .bg-gray-100, .bg-gray-200 {
    background-color: #334155 !important;
}
.border-gray-300 {
    border-color: #475569 !important;
}
.bg-gray-800 {
    background-color: #fbbf24 !important;
    color: #452003 !important;
}
input, select {
    background-color: #334155 !important;
    color: #f8fafc !important;
    border: 1px solid #475569 !important;
}
input::placeholder {
    color: #9ca3af !important;
}
`;
fs.writeFileSync('premium.css', globalCss);

const tailwindConfig = `tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#0f172a",
        "surface": "#1e293b",
        "surface-container-lowest": "#0f172a",
        "surface-container-low": "#1e293b",
        "surface-container": "#334155",
        "surface-container-high": "#475569",
        "surface-container-highest": "#64748b",
        "surface-variant": "#334155",
        "surface-bright": "#475569",
        "surface-dim": "#0f172a",
        
        "primary": "#fbbf24", 
        "on-primary": "#452003", 
        "primary-container": "#78350f",
        "on-primary-container": "#fef3c7",
        "primary-fixed": "#fde68a",
        "on-primary-fixed": "#452003",
        
        "on-background": "#f8fafc",
        "on-surface": "#f1f5f9",
        "on-surface-variant": "#cbd5e1",
        
        "outline": "#64748b",
        "outline-variant": "#475569",
        
        "error": "#ef4444",
        "error-container": "#7f1d1d",
        "on-error-container": "#fca5a5",
        "success-bg": "#064e3b",
        "success-green": "#34d399",
      }
    }
  }
};`;

fs.writeFileSync('tailwind-config.js', tailwindConfig);

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (file.endsWith('.html')) {
        // Replace <script id="tailwind-config">...</script>
        content = content.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, '<script src="tailwind-config.js"></script>');
        
        // Generic replace for configs without the id
        content = content.replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>/, '<script src="tailwind-config.js"></script>');
        
        // Add premium.css link
        if (!content.includes('premium.css')) {
            content = content.replace('</head>', '    <link rel="stylesheet" href="premium.css">\n</head>');
        }
        
        if (file === 'login.html') {
            content = content.replace(/radial-gradient.*?transparent 0\)/g, 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)');
            // Fix text that might be dark explicitly
            content = content.replace(/text-on-surface-variant\/60/g, 'text-on-surface-variant');
        }

        if (file === 'index.html') {
            content = content.replace(/'#584235'/g, "'#cbd5e1'");
            content = content.replace(/'rgba\(140, 114, 99, 0.1\)'/g, "'rgba(255, 255, 255, 0.1)'");
            content = content.replace(/'rgba\(153, 71, 0, 0.2\)'/g, "'rgba(251, 191, 36, 0.2)'");
            content = content.replace(/'#994700'/g, "'#fbbf24'");
        }

        // Replace basic bg-white in HTML
        content = content.replace(/bg-white/g, 'bg-surface-container-low');
    }
    
    if (file === 'shared.js') {
        content = content.replace(/bg-white/g, 'bg-surface-container-low');
    }

    fs.writeFileSync(file, content);
}

console.log('Applied premium dark theme.');
