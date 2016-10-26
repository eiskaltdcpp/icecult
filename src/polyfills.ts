import 'es6-shim';
import 'reflect-metadata';
require('zone.js/dist/zone');

import 'ts-helpers';

// if (process.env.NODE_ENV === 'prod') {
//   // Production
// } else {
//   // Development

  Error['stackTraceLimit'] = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
// }

import '@angular/material/core/theming/prebuilt/pink-bluegrey.css';
import './public/scss/global.scss';
