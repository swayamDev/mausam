import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-10 border-t py-6">
      <div className="text-muted-foreground container flex flex-col items-center gap-3 text-sm">
        <p>© {new Date().getFullYear()} Mausam</p>

        <a
          href="https://swayam.io"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          Created by Swayam
        </a>

        <div className="flex gap-4">
          <a
            href="https://github.com/swayamDev/mausam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground transition"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/swayam-webdev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground transition"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
