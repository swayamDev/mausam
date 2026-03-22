import { SearchDialog } from "@/components/dialogs/SearchDialog";
import { ThemeToggle } from "@/components/dropdowns/theme-toggle";
import { UnitToggle } from "../dropdowns/UnitToggle";

export const AppHeader = () => {
  return (
    <div className="h-16 lg:my-4">
      <header className="bg-background/50 fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between gap-5 border-b px-4 backdrop-blur-lg lg:top-4 lg:right-4 lg:left-4 lg:mx-auto lg:w-auto lg:max-w-384 lg:rounded-2xl lg:border">
        {/* Logo */}
        <div className="flex items-center">
          {/* Light Mode */}
          <img
            src="/logo-light.webp"
            alt="Mausam Logo"
            className="block h-8 w-auto dark:hidden"
          />

          {/* Dark Mode */}
          <img
            src="/logo-dark.webp"
            alt="Mausam Logo"
            className="hidden h-8 w-auto dark:block"
          />
        </div>

        <div className="flex gap-2">
          <SearchDialog />
          <ThemeToggle />
          <UnitToggle />
        </div>
      </header>
    </div>
  );
};
