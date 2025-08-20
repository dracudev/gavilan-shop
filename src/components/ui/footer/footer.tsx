import { titleFont } from "@/config/fonts";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border-primary bg-surface-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span
                className={`${titleFont.className} text-2xl font-semibold text-text-primary`}
              >
                El Gavilán
              </span>
            </div>
            <p className="text-text-secondary max-w-md mb-4">
              Traditional hat shop established in 1880, bringing authentic
              Spanish craftsmanship to modern fashion in Alicante.
            </p>
            <p className="text-sm text-text-muted">
              © {new Date().getFullYear()} El Gavilán. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/men"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/category/women"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/category/kid"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="mailto:contact@gavilanshop.com"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-primary mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-text-muted text-sm">
            Made with care in Alicante, Spain
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              href="/about"
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="/locations"
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Locations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
