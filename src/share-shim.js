// Offline shim for the shareable GitHub Pages build.
//
// The live app talks to a backend (/tv-packages, /tv-assistant) that blocks
// cross-origin browser calls, so a statically hosted copy can't reach it.
// This shim installs a fetch() interceptor (before the app boots) that serves
// a baked-in data snapshot and canned assistant answers, making the demo fully
// self-contained. All other requests pass through to the real network.

import snapshot from "./share-data/tv-packages.json";
import { answerFor } from "./share-data/answers.js";

const realFetch = window.fetch ? window.fetch.bind(window) : null;

function jsonResponse(data, delayMs = 0) {
  const body = JSON.stringify(data);
  const make = () =>
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  return delayMs > 0
    ? new Promise((resolve) => setTimeout(() => resolve(make()), delayMs))
    : Promise.resolve(make());
}

function urlOf(input) {
  try {
    if (typeof input === "string") return input;
    if (input && typeof input.url === "string") return input.url;
  } catch (_) {}
  return "";
}

window.fetch = function (input, init) {
  const url = urlOf(input);

  // Channel / package data → serve the snapshot.
  if (url.includes("/tv-packages")) {
    return jsonResponse(snapshot, 150);
  }

  // AI assistant → canned answer based on the question, with a small
  // delay so the "thinking" state is visible.
  if (url.includes("/tv-assistant")) {
    let question = "";
    try {
      const raw = init && init.body ? init.body : "{}";
      question = (JSON.parse(raw) || {}).question || "";
    } catch (_) {}
    return jsonResponse({ answer: answerFor(question) }, 600);
  }

  // Everything else behaves normally.
  return realFetch ? realFetch(input, init) : Promise.reject(new Error("fetch unavailable"));
};
