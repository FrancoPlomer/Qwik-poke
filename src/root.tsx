import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/shared/router-head/router-head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useVisibleTask$(() => {
    (globalThis as any).qwikOpenInEditor = function (path: string) {
      const resolvedURL = new URL(path, "http://local.local");
      const params = new URLSearchParams();
      const srcDir = (globalThis as any).qwikdevtools.srcDir;
      params.set("file", srcDir + resolvedURL.pathname);
      fetch("/__open-in-editor?" + params.toString());
    };
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
