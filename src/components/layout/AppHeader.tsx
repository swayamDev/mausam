import { SearchDialog } from "@/components/dialogs/SearchDialog";
import { ThemeToggle } from "@/components/dropdowns/theme-toggle";
import { UnitToggle } from "../dropdowns/UnitToggle";

export const AppHeader = () => {
  return (
    /* Spacer so content isn't hidden under the fixed header */
    <div className="h-16 lg:h-24">
      <header
        role="banner"
        className="bg-background/70 fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between gap-3 border-b px-4 backdrop-blur-md sm:gap-5 sm:px-6 lg:top-4 lg:right-4 lg:left-4 lg:mx-auto lg:h-14 lg:w-auto lg:max-w-6xl lg:rounded-2xl lg:border"
      >
        {/* Logo */}
        <a href="/" aria-label="Mausam — Home" className="flex shrink-0 items-center">
          <img
            src="/logo-light.webp"
            alt="Mausam"
            className="block h-7 w-auto dark:hidden sm:h-8"
          />
          <img
            src="/logo-dark.webp"
            alt="Mausam"
            className="hidden h-7 w-auto dark:block sm:h-8"
          />
        </a>

        {/* Actions */}
        <nav
          aria-label="App controls"
          className="flex items-center gap-1.5 sm:gap-2"
        >
          <SearchDialog />
          <ThemeToggle />
          <UnitToggle />
        </nav>
      </header>
    </div>
  );
};
