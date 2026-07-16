"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function send(payload: { type: string; path: string; referrer?: string; source?: string }) {
  const body = JSON.stringify(payload);
  // sendBeacon survives page unload; fall back to keepalive fetch.
  if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
    return;
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // usePathname() strips the query string, so read ?src= off the location
    // directly; sessionStorage keeps attribution across in-site navigation.
    const src = new URLSearchParams(window.location.search).get("src");
    if (src) sessionStorage.setItem("caret_src", src);
    send({
      type: "pageview",
      path: pathname,
      referrer: document.referrer || undefined,
      source: src ?? sessionStorage.getItem("caret_src") ?? undefined,
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      const name = el?.getAttribute("data-track");
      if (name) send({ type: "cta_click", path: name });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
