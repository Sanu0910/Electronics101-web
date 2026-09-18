"use client";

/**
 * Dark is the default. The stored choice is applied by the inline script in
 * layout.tsx BEFORE paint, so there is no flash of the wrong theme.
 *
 * THIS COMPONENT HOLDS NO STATE. Which icon shows is decided by CSS from the
 * `data-theme` attribute on <html>, so there is nothing to synchronise, no
 * effect, and no hydration mismatch — the server and the client render exactly
 * the same markup and the attribute does the rest.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("e101-theme", next);
    } catch {
      /* private mode or blocked storage — the toggle still works this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // generic label: the button does the same job in both directions, and
      // claiming a specific direction would need state to stay truthful
      aria-label="Switch colour theme"
      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        {/* sun — shown in dark mode, where the action is "go light" */}
        <g className="theme-icon-sun">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            strokeLinecap="round"
          />
        </g>
        {/* moon — shown in light mode */}
        <path
          className="theme-icon-moon"
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
