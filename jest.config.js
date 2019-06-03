module.exports = {
	"collectCoverageFrom": ["**/*.{js|jsx|ts|tsx}"],
	"coverageDirectory": "<rootDir>/coverage",
	"coverageReporters": [
		"json"
	],
	"coveragePathIgnorePatterns": [
		"stories.ts*",
		"index.ts$",
		"/story-examples/"
	],
	"setupFilesAfterEnv": ["<rootDir>util/test-init.ts"],
	"coverageThreshold": {
		"global": {
			"branches": 90,
			"functions": 90,
			"lines": 90,
			"statements": 90
		}
	},
	globals: {
		"ts-jest": { tsConfig: "tsconfig.test.json" }
	},
	"roots": [
		"<rootDir>/client/src/"
	],
	snapshotSerializers: ["enzyme-to-json/serializer"]
};
