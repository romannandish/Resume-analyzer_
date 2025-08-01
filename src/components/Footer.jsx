import React from "react";

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10 px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <a
            href="/"
            aria-label="Homepage"
            className="text-2xl font-extrabold tracking-tight hover:text-cyan-300 transition-colors"
          >
            RSA
          </a>
          <p className="mt-1 text-sm text-gray-400">
            © {new Date().getFullYear()} RSA. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300"
        >
          <a
            href="/about"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            About
          </a>
          <a
            href="/services"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            Services
          </a>
          <a
            href="/blog"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            Blog
          </a>
          <a
            href="/contact"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            Contact
          </a>
        </nav>

        {/* Social Links */}
        <div className="flex space-x-6 text-gray-300">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.4a9.2 9.2 0 01-2.88 1.1 4.52 4.52 0 00-7.71 4.13 12.82 12.82 0 01-9.3-4.71 4.49 4.49 0 001.4 6.03A4.48 4.48 0 012 9.71v.06a4.53 4.53 0 003.6 4.44 4.5 4.5 0 01-2.05.08 4.52 4.52 0 004.22 3.13A9 9 0 011 19.5a12.7 12.7 0 006.92 2.03c8.3 0 12.84-6.9 12.84-12.87 0-.2 0-.42-.02-.62A9.3 9.3 0 0023 3z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.36-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.68 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.7.115 2.5.338 1.9-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.42.1 2.68.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.013 10.013 0 0022 12c0-5.52-4.48-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-11h3v11zm-1.5-12.3c-1 0-1.75-.77-1.75-1.7 0-.97.8-1.7 1.8-1.7s1.75.73 1.75 1.7c0 .93-.75 1.7-1.8 1.7zm13 12.3h-3v-5.5c0-1.32-.47-2.22-1.65-2.22-.9 0-1.44.6-1.68 1.18-.09.22-.11.53-.11.85v5.7h-3v-11h3v1.5c.4-.61 1.1-1.48 2.75-1.48 2 0 3.5 1.32 3.5 4.15v6.83z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
