import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Something went wrong in Cart MFE.</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
