module.exports = {
    testEnvironment: 'node', 
    verbose: true,
    testTimeout: 10000,
    reporters: [
      'default',
      [
        'jest-html-reporter',
        {
          pageTitle: 'Reporte de Pruebas',
          outputPath: './test/Reports/report.html',
          includeFailureMsg: true,
          includeConsoleLog: true,

        },
      ],
    ],
  };
  