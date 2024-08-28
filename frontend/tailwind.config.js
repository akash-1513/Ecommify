import withMT from "@material-tailwind/html/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Poppins', 'sans-serif']
      },
      colors: {
        'primary': '#3238f2',
      }
    }
  },
  plugins: [],
});