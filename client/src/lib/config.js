const dev = process.env.NODE_ENV !== `production`
export const server = dev ? "http://localhost:8000" : "https://easynotes-gorega-preview.onrender.com";