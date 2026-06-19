const HA_MAIN = "/frontend_latest/main.aa4fcaf59a8deb3e.js";

declare global {
  interface Window {
    __nvisionHaBooted?: boolean;
  }
}

function loadModule(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function loadHaFrontend(): Promise<void> {
  if (!window.__nvisionHaBooted) {
    await import(/* @vite-ignore */ HA_MAIN);
    window.__nvisionHaBooted = true;
  }

  if (!customElements.get("hui-card") && !document.querySelector("ha-demo")) {
    const demo = document.createElement("ha-demo");
    demo.style.display = "none";
    document.body.appendChild(demo);
  }

  await waitFor(() => customElements.get("hui-card"));
}

function waitFor(test: () => unknown, timeoutMs = 90000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if (test()) {
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error("Timed out waiting for Home Assistant frontend"));
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

async function boot(): Promise<void> {
  await loadHaFrontend();
  await loadModule("/nvision.js");
  await import("./app.ts");
  document.getElementById("boot-status")?.remove();
}

boot().catch((error) => {
  const status = document.getElementById("boot-status");
  if (status) {
    status.textContent = `Gallery failed to start: ${error.message}`;
  }
  console.error(error);
});
