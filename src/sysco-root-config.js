import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

// Build route config and applications
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// ✅ Redirect '/' to '/auth' before anything loads
if (window.location.pathname === "/") {
  window.history.replaceState(null, "", "/auth");
}

applications.forEach(registerApplication);
layoutEngine.activate();
start();
