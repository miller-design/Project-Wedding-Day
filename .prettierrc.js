// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
	// Built-in prettier options.
	semi: true,
	singleQuote: false,
	useTabs: true,
	tabWidth: 2,
	trailingComma: "none",
	printWidth: 120,
	bracketSpacing: true,
	quoteProps: "consistent",

	plugins: [
		"@ianvs/prettier-plugin-sort-imports" // Import sorting plugin
	],

	// Import sorting plugin (ianvs/prettier-plugin-sort-imports)
	importOrder: [
		"^react$",
		"^react-dom$",
		"",
		"^next$",
		"^next/(.*)$",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^@/app(.*)$",
		"",
		"^@/components(.*)$",
		"",
		"^@/lib(.*)$",
		"",
		"^@/(.*)$",
		"",
		"^[./]"
	],
	importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
	importOrderTypeScriptVersion: "5.0.0"
};
