module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      'raleway':['Raleway', 'sans-serif'],
      'display':['Raleway', 'sans-serif'],
      'body':['Raleway', 'sans-serif']
    },
    container:{
      center:true,
      padding:"2rem"
    },
    extend: {},
  },
  variants: {
    extend: {
      animation:["hover","focus"],
      ringWidth:["hover","active"]
    },
  },
  plugins: [],
}
