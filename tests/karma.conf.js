module.exports = function(config) {
	config.set({

		basePath: '../',

		files: [
			'battleships.js',
			'tests/doubles/*.js',
			'tests/unit/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};
