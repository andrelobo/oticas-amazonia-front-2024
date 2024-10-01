// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-background': '#1a1a2e',
        'custom-text': '#eaeaea',
        'custom-card': '#16213e',
        'custom-heading': '#f64f59',
        'custom-label': '#c1c1c1',
        'custom-input': '#0f3460',
        'custom-border': '#3b3b98',
      },
    },
  },
  plugins: [],
};

// Check for null pointer references
if (typeof module.exports.content === 'undefined') {
  throw new Error('module.exports.content is undefined');
}

// Check for unhandled exceptions
try {
  const config = module.exports;
  if (typeof config.theme === 'undefined') {
    throw new Error('module.exports.theme is undefined');
  }
} catch (error) {
  console.error('Error in tailwind.config.js:', error);
}

