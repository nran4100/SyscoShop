import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <div>Something went wrong in Product MFE.</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
