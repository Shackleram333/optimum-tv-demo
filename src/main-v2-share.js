// Entry for the shareable (offline) v2 build.
// Install the offline fetch shim FIRST, then boot the v2 app so all of its
// backend calls are intercepted before it runs.
import "./share-shim.js";
import "./main-v2.js";
