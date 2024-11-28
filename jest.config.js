module.exports = {
    testEnvironment: 'node', 
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
  