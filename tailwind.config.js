/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontFamily: {
                primary: ["Space Grotesk", "san-serif"],
            },
            colors: {
                prim: "#3DD1FF",
                sec: "#FF26CE",
            },
            dropShadow: {
                neon: "0 0px 4px #FF26CE",
                neonPrim: "0 0px 4px #3DD1FF",
            },
        },
    },
    plugins: [],
};
