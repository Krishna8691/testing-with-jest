module.exports = {
	roots: ["<rootDir>/src"],
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/setUpTests.js"],
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
		"<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
	],
};
