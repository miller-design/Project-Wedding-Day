import type { Config } from "tailwindcss";

// tailwind generate vars setup
// eg css var for type --type-5-10
const fontUnits = ["10", "12", "14-16", "18-22", "24-30", "30-38", "42-50", "48-66", "52-90", "80-120"];
// eg css var for spacing --spacing-10-20
const spaceUnits = [
	"10", // static var example --spacing-10
	"10-20",
	"20-30",
	"30-40",
	"40-50",
	"50-60",
	"60-70",
	"70-80",
	"80-90",
	"90-100",
	"100-110",
	"110-120",
	"120-130",
	"130-140",
	"140-150",
	"150-160",
	"160-170",
	"170-180",
	"180-190",
	"190-200"
];

const genereteVars = (prefix: string, units: number[] | string[]) => {
	const vars: Record<string, string> = {};
	const staticVars: Record<string, string> = {};

	for (let i = 0; i < units.length; i++) {
		vars[units[i]] = `var(--${prefix}-${units[i]})`;
	}

	const unitVars = { ...vars, ...staticVars };

	return unitVars;
};

const TailwindConfig = {
	future: {
		hoverOnlyWhenSupported: true // so that :hover rules are not used on touch devices
	},
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		spacing: genereteVars("spacing", spaceUnits),
		fontSize: genereteVars("type", fontUnits),
		screens: {
			xs: "640px",
			sm: "768px",
			md: "960px",
			lg: "1200px",
			xl: "1600px",
			xxl: "2000px"
		},
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)"
			}
		}
	},
	plugins: []
};

export default TailwindConfig satisfies Config;
