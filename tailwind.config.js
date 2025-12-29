/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'ui-sans-serif', 'system-ui'],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.8rem", { lineHeight: "1.1rem" }],
        sm: ["0.9rem", { lineHeight: "1.3rem" }],
        base: ["1.05rem", { lineHeight: "1.6rem" }],
        lg: ["1.2rem", { lineHeight: "1.8rem" }],
        xl: ["1.35rem", { lineHeight: "1.9rem" }],
        "2xl": ["1.6rem", { lineHeight: "2.1rem" }],
        "3xl": ["2rem", { lineHeight: "2.4rem" }],
      },
    },
  },
  plugins: [],
};
