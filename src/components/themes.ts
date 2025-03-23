import { DefaultTheme } from "styled-components";

export type Themes = {
	[key: string]: DefaultTheme;
};

const theme: Themes = {
	dark: {
		id: "T_001",
		name: "dark",
		colors: {
			body: "#1D2A35",
			scrollHandle: "#19252E",
			scrollHandleHover: "#162028",
			primary: "#05CE91",
			secondary: "#FF9D00",
			text: {
				100: "#cbd5e1",
				200: "#B2BDCC",
				300: "#64748b",
			},
		},
	},
	light: {
		id: "T_002",
		name: "light",
		colors: {
			body: "#EFF3F3",
			scrollHandle: "#C1C1C1",
			scrollHandleHover: "#AAAAAA",
			primary: "#027474",
			secondary: "#FF9D00",
			text: {
				100: "#334155",
				200: "#475569",
				300: "#64748b",
			},
		},
	},
	"blue-matrix": {
		id: "T_003",
		name: "blue-matrix",
		colors: {
			body: "#101116",
			scrollHandle: "#424242",
			scrollHandleHover: "#616161",
			primary: "#00ff9c",
			secondary: "#60fdff",
			text: {
				100: "#ffffff",
				200: "#c7c7c7",
				300: "#76ff9f",
			},
		},
	},
	espresso: {
		id: "T_004",
		name: "espresso",
		colors: {
			body: "#323232",
			scrollHandle: "#5b5b5b",
			scrollHandleHover: "#393939",
			primary: "#E1E48B",
			secondary: "#A5C260",
			text: {
				100: "#F7F7F7",
				200: "#EEEEEE",
				300: "#5b5b5b",
			},
		},
	},
	"green-goblin": {
		id: "T_005",
		name: "green-goblin",
		colors: {
			body: "#000000",
			scrollHandle: "#2E2E2E",
			scrollHandleHover: "#414141",
			primary: "#E5E500",
			secondary: "#04A500",
			text: {
				100: "#01FF00",
				200: "#04A5B2",
				300: "#E50101",
			},
		},
	},
	ubuntu: {
		id: "T_006",
		name: "ubuntu",
		colors: {
			body: "#2D0922",
			scrollHandle: "#F47845",
			scrollHandleHover: "#E65F31",
			primary: "#80D932",
			secondary: "#80D932",
			text: {
				100: "#FFFFFF",
				200: "#E1E9CC",
				300: "#CDCDCD",
			},
		},
	},
	latte: {
		id: "T_007",
		name: "catppuccin-latte",
		colors: {
			body: "#EFF1F5",
			scrollHandle: "#DCE0E8",
			scrollHandleHover: "#CCD0DA",
			primary: "#8839EF",
			secondary: "#FE640B",
			text: {
				100: "#4C4F69",
				200: "#5C5F77",
				300: "#6C6F85",
			},
		},
	},
	macchiato: {
		id: "T_008",
		name: "catppuccin-macchiato",
		colors: {
			body: "#24273A",
			scrollHandle: "#1E2030",
			scrollHandleHover: "#181926",
			primary: "#C6A0F6",
			secondary: "#F5A97F",
			text: {
				100: "#CAD3F5",
				200: "#B8C0E0",
				300: "#A5ADCB",
			},
		},
	},
	mocha: {
		id: "T_009",
		name: "catppuccin-mocha",
		colors: {
			body: "#1E1E2E",
			scrollHandle: "#181825",
			scrollHandleHover: "#11111B",
			primary: "#CBA6F7",
			secondary: "#FAB387",
			text: {
				100: "#CDD6F4",
				200: "#BAC2DE",
				300: "#A6ADC8",
			},
		},
	},
	frappe: {
		id: "T_010",
		name: "catppuccin-frappe",
		colors: {
			body: "#303446",
			scrollHandle: "#292C3C",
			scrollHandleHover: "#232634",
			primary: "#CA9EE6",
			secondary: "#EF9F76",
			text: {
				100: "#C6D0F5",
				200: "#B5BFE2",
				300: "#A5ADCE",
			},
		},
	},
	tokyoNight: {
		id: "T_011",
		name: "tokyo-night",
		colors: {
			body: "#1A1B26",
			scrollHandle: "#16161E",
			scrollHandleHover: "#13131A",
			primary: "#7AA2F7",
			secondary: "#FF9E64",
			text: {
				100: "#C0CAF5",
				200: "#A9B1D6",
				300: "#9AA5CE",
			},
		},
	},
	tokyoNightStorm: {
		id: "T_012",
		name: "tokyo-night-storm",
		colors: {
			body: "#24283B",
			scrollHandle: "#1F2335",
			scrollHandleHover: "#1A1B26",
			primary: "#7AA2F7",
			secondary: "#FF9E64",
			text: {
				100: "#C0CAF5",
				200: "#A9B1D6",
				300: "#9AA5CE",
			},
		},
	},
	tokyoNightLight: {
		id: "T_013",
		name: "tokyo-night-light",
		colors: {
			body: "#D5D6DB",
			scrollHandle: "#CBCCD1",
			scrollHandleHover: "#C0C0C6",
			primary: "#2E7DE9",
			secondary: "#B15C00",
			text: {
				100: "#343B58",
				200: "#4E5173",
				300: "#6A6D89",
			},
		},
	},
};

export default theme;