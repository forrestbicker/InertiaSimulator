import { map, string } from "mathjs";
import { Vector } from "./Math/Vector";

export class Config {
	static readonly fps: number = 32;
	static readonly canvasWidth: number = 500; // px
	static readonly canvasHeight: number = 500; // px
	static readonly canvasOffset: Vector = new Vector(
		Config.canvasWidth / 2, Config.canvasHeight / 2
	) // determinies where 0, 0 on the coordinate plane lies. html canvas default plane has origin at top left with the positive x direction being rightwards and the positive y direction being downwards. 
	// to set 0, 0 as the center, use w = width / 2 and h = height / 2
	// to set 0, 0 as the bottom left, use w = 0 and h = height
	
	// 400
	// darkBackground: '#171923',
	// lightBackground: '#F7FAFC',
	// tooltipBackground: '#313D53',


	static readonly colors: Map<string, any> = new Map([
		["plum", {
			50: '#E9E2E7',
			100: '#D8CBD4',
			200: '#beaab9',
			300: '#a5889c',
			400: '#8b6680',
			500: '#5F3351',
			600: '#492c41',
			700: '#3E2235',
			800: '#311A28',
			900: '#261620',
		}],
		["offgray", {
			50: '#faf9fa',
			100: '#e4e0e3',
			200: '#bab0b8',
			300: '#a99ca6',
			400: '#948490',
			500: '#7a6675',
			600: '#584652',
			700: '#41343D',
			800: '#2A2227',
			900: '#1F171D',
		}],
		["red", {
			50: '#fff5f5',
			100: '#fed7d7',
			200: '#feb2b2',
			300: '#fc8181',
			400: '#f56565',
			500: '#e53e3e',
			600: '#c53030',
			700: '#9b2c2c',
			800: '#822727',
			900: '#63171b',
		}],

		["orange", {
			50: '#FFFAF0',
			100: '#FEEBC8',
			200: '#FBD38D',
			300: '#F6AD55',
			400: '#ED8936',
			500: '#DD6B20',
			600: '#C05621',
			700: '#9C4221',
			800: '#7B341E',
			900: '#652B19',
		}],

		["yellow", {
			50: '#fffff0',
			100: '#fefcbf',
			200: '#faf089',
			300: '#f6e05e',
			400: '#ecc94b',
			500: '#d69e2e',
			600: '#b7791f',
			700: '#975a16',
			800: '#744210',
			900: '#5F370E',
		}],

		["green", {
			50: '#f0fff4',
			100: '#c6f6d5',
			200: '#9ae6b4',
			300: '#68d391',
			400: '#48bb78',
			500: '#38a169',
			600: '#2f855a',
			700: '#276749',
			800: '#22543d',
			900: '#1C4532',
		}],

		["teal", {
			50: '#E6FFFA',
			100: '#B2F5EA',
			200: '#81E6D9',
			300: '#4FD1C5',
			400: '#38B2AC',
			500: '#319795',
			600: '#2C7A7B',
			700: '#285E61',
			800: '#234E52',
			900: '#1D4044',
		}],

		["blue", {
			50: '#ebf8ff',
			100: '#ceedff',
			200: '#90cdf4',
			300: '#63b3ed',
			400: '#4299e1',
			500: '#3182ce',
			600: '#2a69ac',
			700: '#1e4e8c',
			800: '#153e75',
			900: '#1a365d',
		}],

		["cyan", {
			50: '#EDFDFD',
			100: '#C4F1F9',
			200: '#9DECF9',
			300: '#76E4F7',
			400: '#0BC5EA',
			500: '#00B5D8',
			600: '#00A3C4',
			700: '#0987A0',
			800: '#086F83',
			900: '#065666',
		}],

		["purple", {
			50: '#faf5ff',
			100: '#e9d8fd',
			200: '#d6bcfa',
			300: '#b794f4',
			400: '#9f7aea',
			500: '#805ad5',
			600: '#6b46c1',
			700: '#553c9a',
			800: '#44337a',
			900: '#322659',
		}],

		["pink", {
			50: '#fff5f7',
			100: '#fed7e2',
			200: '#fbb6ce',
			300: '#f687b3',
			400: '#ed64a6',
			500: '#d53f8c',
			600: '#b83280',
			700: '#97266d',
			800: '#702459',
			900: '#521B41',
		}],
	]);

	static readonly colorNames: string[] = Array.from(Config.colors.keys());
}