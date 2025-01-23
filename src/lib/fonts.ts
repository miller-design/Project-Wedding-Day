import { Bodoni_Moda, Poppins } from "next/font/google";

const bodoniModa = Bodoni_Moda({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-bodoni"
});

const poppins = Poppins({
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins"
});

export { bodoniModa, poppins };
