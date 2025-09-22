import { resolve } from "node:path";
import handlebars from "vite-plugin-handlebars";
import { defineConfig } from "vite";

export default defineConfig({
	base: "./",
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "partials"),
		}),
	],
	build: {
		rollupOptions: {
			input: {
				index: "index.html",
				modalidad: "modalidad.html",
				convalidaciones: "convalidaciones.html",
				header: "partials/header.html",
				menu: "partials/menu.html",
				footer: "partials/footer.html",
				form: "partials/form-all.html",
			},
		},
	},
});
