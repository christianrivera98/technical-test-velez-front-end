import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: "class",
  content: [
    "./{pages,components,app,src,lib,hooks,data,types}/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom E-commerce Colors
        "light-gray": {
          DEFAULT: "rgb(var(--light-gray))",
          50: "rgb(var(--light-gray) / 0.05)",
          100: "rgb(var(--light-gray) / 0.1)",
          200: "rgb(var(--light-gray) / 0.2)",
          300: "rgb(var(--light-gray) / 0.3)",
          400: "rgb(var(--light-gray) / 0.4)",
          500: "rgb(var(--light-gray) / 0.5)",
          600: "rgb(var(--light-gray) / 0.6)",
          700: "rgb(var(--light-gray) / 0.7)",
          800: "rgb(var(--light-gray) / 0.8)",
          900: "rgb(var(--light-gray) / 0.9)",
        },
        "pure-white": {
          DEFAULT: "rgb(var(--pure-white))",
          50: "rgb(var(--pure-white) / 0.05)",
          100: "rgb(var(--pure-white) / 0.1)",
          200: "rgb(var(--pure-white) / 0.2)",
          300: "rgb(var(--pure-white) / 0.3)",
          400: "rgb(var(--pure-white) / 0.4)",
          500: "rgb(var(--pure-white) / 0.5)",
          600: "rgb(var(--pure-white) / 0.6)",
          700: "rgb(var(--pure-white) / 0.7)",
          800: "rgb(var(--pure-white) / 0.8)",
          900: "rgb(var(--pure-white) / 0.9)",
        },
        cream: {
          DEFAULT: "rgb(var(--cream))",
          50: "rgb(var(--cream) / 0.05)",
          100: "rgb(var(--cream) / 0.1)",
          200: "rgb(var(--cream) / 0.2)",
          300: "rgb(var(--cream) / 0.3)",
          400: "rgb(var(--cream) / 0.4)",
          500: "rgb(var(--cream) / 0.5)",
          600: "rgb(var(--cream) / 0.6)",
          700: "rgb(var(--cream) / 0.7)",
          800: "rgb(var(--cream) / 0.8)",
          900: "rgb(var(--cream) / 0.9)",
        },
        "dark-green": {
          DEFAULT: "rgb(var(--dark-green))",
          50: "rgb(var(--dark-green) / 0.05)",
          100: "rgb(var(--dark-green) / 0.1)",
          200: "rgb(var(--dark-green) / 0.2)",
          300: "rgb(var(--dark-green) / 0.3)",
          400: "rgb(var(--dark-green) / 0.4)",
          500: "rgb(var(--dark-green) / 0.5)",
          600: "rgb(var(--dark-green) / 0.6)",
          700: "rgb(var(--dark-green) / 0.7)",
          800: "rgb(var(--dark-green) / 0.8)",
          900: "rgb(var(--dark-green) / 0.9)",
        },
        "olive-green": {
          DEFAULT: "rgb(var(--olive-green))",
          50: "rgb(var(--olive-green) / 0.05)",
          100: "rgb(var(--olive-green) / 0.1)",
          200: "rgb(var(--olive-green) / 0.2)",
          300: "rgb(var(--olive-green) / 0.3)",
          400: "rgb(var(--olive-green) / 0.4)",
          500: "rgb(var(--olive-green) / 0.5)",
          600: "rgb(var(--olive-green) / 0.6)",
          700: "rgb(var(--olive-green) / 0.7)",
          800: "rgb(var(--olive-green) / 0.8)",
          900: "rgb(var(--olive-green) / 0.9)",
        },
        "burnt-orange": {
          DEFAULT: "rgb(var(--burnt-orange))",
          50: "rgb(var(--burnt-orange) / 0.05)",
          100: "rgb(var(--burnt-orange) / 0.1)",
          200: "rgb(var(--burnt-orange) / 0.2)",
          300: "rgb(var(--burnt-orange) / 0.3)",
          400: "rgb(var(--burnt-orange) / 0.4)",
          500: "rgb(var(--burnt-orange) / 0.5)",
          600: "rgb(var(--burnt-orange) / 0.6)",
          700: "rgb(var(--burnt-orange) / 0.7)",
          800: "rgb(var(--burnt-orange) / 0.8)",
          900: "rgb(var(--burnt-orange) / 0.9)",
        },
        golden: {
          DEFAULT: "rgb(var(--golden))",
          50: "rgb(var(--golden) / 0.05)",
          100: "rgb(var(--golden) / 0.1)",
          200: "rgb(var(--golden) / 0.2)",
          300: "rgb(var(--golden) / 0.3)",
          400: "rgb(var(--golden) / 0.4)",
          500: "rgb(var(--golden) / 0.5)",
          600: "rgb(var(--golden) / 0.6)",
          700: "rgb(var(--golden) / 0.7)",
          800: "rgb(var(--golden) / 0.8)",
          900: "rgb(var(--golden) / 0.9)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
        "50": "12.5rem",
        "54": "13.5rem",
        "58": "14.5rem",
        "62": "15.5rem",
        "66": "16.5rem",
        "70": "17.5rem",
        "74": "18.5rem",
        "78": "19.5rem",
        "82": "20.5rem",
        "86": "21.5rem",
        "90": "22.5rem",
        "94": "23.5rem",
        "98": "24.5rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "3xs": ["0.5rem", { lineHeight: "0.625rem" }],
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "zoom-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(96, 108, 56, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(96, 108, 56, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "fade-in-slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-10px) translateX(-50%)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) translateX(-50%)",
          },
        },
        "slide-up-fade": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-down-fade": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float-delayed 3s ease-in-out infinite 1.5s",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "scale-pulse": "scale-pulse 2s ease-in-out infinite",
        "fade-in-slide-down": "fade-in-slide-down 0.3s ease-out forwards",
        "slide-up-fade": "slide-up-fade 0.3s ease-out",
        "slide-down-fade": "slide-down-fade 0.3s ease-out",
      },
      boxShadow: {
        glow: "0 0 20px rgba(96, 108, 56, 0.3)",
        "glow-warm": "0 0 20px rgba(188, 108, 37, 0.3)",
        "glow-strong": "0 0 30px rgba(96, 108, 56, 0.5)",
        "glow-warm-strong": "0 0 30px rgba(188, 108, 37, 0.5)",
        "inner-glow": "inset 0 0 20px rgba(96, 108, 56, 0.1)",
        "inner-glow-warm": "inset 0 0 20px rgba(188, 108, 37, 0.1)",
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.05)",
        strong: "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -10px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
        "5xl": "96px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(135deg, var(--tw-gradient-stops))",
        noise:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiLz4KICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')",
      },
      screens: {
        xs: "475px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
      lineHeight: {
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
      },
      letterSpacing: {
        widest: "0.3em",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      minHeight: {
        "screen-75": "75vh",
        "screen-50": "50vh",
        "screen-25": "25vh",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "bounce-out": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth-in": "cubic-bezier(0.4, 0, 1, 1)",
        "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    // Plugin personalizado para utilidades adicionales
    ({ addUtilities, theme }: any) => {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0,0,0,0.10)",
        },
        ".text-shadow-md": {
          textShadow: "0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
        },
        ".text-shadow-lg": {
          textShadow: "0 15px 35px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.07)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".transform-gpu": {
          transform: "translate3d(0, 0, 0)",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme("colors.light-gray.100"),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.olive-green.600"),
            borderRadius: "9999px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme("colors.olive-green.DEFAULT"),
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config
