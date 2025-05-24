/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    screens: {
      xs: "400px", 
      sm: '600px', 
      md: '860px', 
      lg: '1024px', 
      xl: '1280px', 
      "2xl": '1560px', 
      "3xl": '1920px', 
    },
  },
  plugins: [],
};

export default config;

