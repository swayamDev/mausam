export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="mt-12 border-t py-6 sm:py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          © {year} Mausam. All rights reserved.
        </p>

        <p className="text-muted-foreground">
          Built by{" "}
          <a
            href="https://swayam.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            aria-label="Visit Swayam's website (opens in new tab)"
          >
            Swayam
          </a>
          {" · "}
          Powered by{" "}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            aria-label="OpenWeatherMap (opens in new tab)"
          >
            OpenWeatherMap
          </a>
        </p>
      </div>
    </footer>
  );
};
