import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        sparkleBackground:
          "url('https://cdn.registerdisney.go.com/v4/asset/bundler/DISNEY/v4/images/v1/disney-background-web.webp')",
        navbarBackground:
          "url('https://cdn1.parksmedia.wdprapps.disney.com/media/layout/assets/themes/d100/svg/nav_footer_background.svg')",
      },
      colors: {
        primary: "#0077DA",
        primaryButtonHover: "#005FAE",
        primaryText: "#0000",
        secondaryText: "#737373",
        borderColor: "#4F4F4F",
        inputBackground: "#E9EBF0",
        lightBlue: "#EDF6FB",
        primaryBlue: "#3273DC",
        secondary: "#929292",
        darkBlue: "#102E61",
        lightGrey: "#F9F9F9",
      },
      screens: {
        md: "754px",
      },
      boxShadow:{
        TicketCardSmall: "0px 3px 10px 0px rgba(50, 115, 220, 0.40)",
        TicketCardBIg: "0px 5px 16px 0px rgba(50, 115, 220, 0.70)",
      }
    },
  },

  plugins: [],
};
export default config;
