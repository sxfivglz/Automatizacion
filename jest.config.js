module.exports = {
    testEnvironment: 'node', 
    verbose: true,
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
  