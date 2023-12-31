const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  
  theme: {
    extend: {},
    // screens: {
    //   'sm': {'min': '240px', 'max': '767px'},
    //   // => @media (min-width: 640px and max-width: 767px) { ... }

    //   'md': {'min': '768px', 'max': '1023px'},
    //   // => @media (min-width: 768px and max-width: 1023px) { ... }

    //   'lg': {'min': '1024px', 'max': '1279px'},
    //   // => @media (min-width: 1024px and max-width: 1279px) { ... }

    //   'xl': {'min': '1280px', 'max': '1535px'},
    //   // => @media (min-width: 1280px and max-width: 1535px) { ... }

    //   '2xl': {'min': '1536px','max':'2500px' },
    //   // => @media (min-width: 1536px) { ... }
    // },
  },
  plugins: [
    // require('@tailwindcss/forms'),
],
});
