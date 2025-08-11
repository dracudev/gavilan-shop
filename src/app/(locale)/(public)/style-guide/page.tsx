import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card/card";
import { Title } from "@/components/ui/title/title";
import { titleFont, serifFont } from "@/config/fonts";

export default function StyleGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <Title
          title="El Gavilán Design System"
          subtitle="A comprehensive overview of the brand's visual identity and components"
          align="center"
          size="xl"
        />
      </div>

      {/* Color Palette */}
      <section>
        <h2
          className={`${titleFont.className} text-2xl font-semibold mb-6 text-text-primary`}
        >
          Color Palette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader title="Brand Colors" />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-md shadow-soft"></div>
                  <span className="text-sm font-mono">Primary</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-md shadow-soft"></div>
                  <span className="text-sm font-mono">Secondary</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-md shadow-soft"></div>
                  <span className="text-sm font-mono">Accent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Text Colors" />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-text-primary rounded-md"></div>
                  <span className="text-sm font-mono">Primary Text</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-text-secondary rounded-md"></div>
                  <span className="text-sm font-mono">Secondary Text</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-text-muted rounded-md"></div>
                  <span className="text-sm font-mono">Muted Text</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Status Colors" />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success rounded-md"></div>
                  <span className="text-sm font-mono">Success</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning rounded-md"></div>
                  <span className="text-sm font-mono">Warning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-error rounded-md"></div>
                  <span className="text-sm font-mono">Error</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2
          className={`${titleFont.className} text-2xl font-semibold mb-6 text-text-primary`}
        >
          Typography
        </h2>
        <Card>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3
                  className={`${titleFont.className} text-5xl font-bold text-text-primary mb-2`}
                >
                  El Gavilán Brand Font
                </h3>
                <p className="text-text-secondary">
                  Custom brand typeface for headings and titles
                </p>
              </div>

              <div>
                <h3
                  className={`${serifFont.className} text-3xl font-semibold text-text-primary mb-2`}
                >
                  Elegant Serif Headers
                </h3>
                <p className="text-text-secondary">
                  Playfair Display for sophisticated headings
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-text-primary mb-2">
                  Clean Sans-Serif Body Text
                </h3>
                <p className="text-text-secondary">
                  Inter font family ensures excellent readability across all
                  device sizes. This modern sans-serif combines clarity with
                  personality, making it perfect for body text, navigation, and
                  interface elements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Buttons */}
      <section>
        <h2
          className={`${titleFont.className} text-2xl font-semibold mb-6 text-text-primary`}
        >
          Buttons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Button Variants" />
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" loading>
                    Loading
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Button Sizes" />
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Elements */}
      <section>
        <h2
          className={`${titleFont.className} text-2xl font-semibold mb-6 text-text-primary`}
        >
          Form Elements
        </h2>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Standard Input"
                  placeholder="Enter your text"
                  helper="This is helper text"
                />
                <Input
                  label="Required Field"
                  placeholder="Required field"
                  required
                />
                <Input
                  label="Input with Error"
                  placeholder="Error state"
                  error="This field has an error"
                />
              </div>
              <div className="space-y-4">
                <Input
                  label="With Left Icon"
                  placeholder="Search..."
                  leftIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                />
                <Input
                  label="With Right Icon"
                  placeholder="Email address"
                  type="email"
                  rightIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cards */}
      <section>
        <h2
          className={`${titleFont.className} text-2xl font-semibold mb-6 text-text-primary`}
        >
          Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader
              title="Default Card"
              subtitle="Basic card with subtle shadow"
            />
            <CardContent>
              <p className="text-text-secondary">
                This is a default card with standard elevation and border.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader
              title="Elevated Card"
              subtitle="Enhanced shadow and depth"
            />
            <CardContent>
              <p className="text-text-secondary">
                This elevated card has more pronounced shadows for important
                content.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
            </CardFooter>
          </Card>

          <Card variant="outline">
            <CardHeader title="Outline Card" subtitle="Border-focused design" />
            <CardContent>
              <p className="text-text-secondary">
                This card uses borders instead of shadows for a cleaner look.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2
          className={`${titleFont.className} text-2xl font-semibold mb-6 text-text-primary`}
        >
          Shadow System
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-primary p-4 rounded-lg shadow-subtle">
            <span className="text-sm font-medium">Subtle</span>
          </div>
          <div className="bg-surface-primary p-4 rounded-lg shadow-soft">
            <span className="text-sm font-medium">Soft</span>
          </div>
          <div className="bg-surface-primary p-4 rounded-lg shadow-medium">
            <span className="text-sm font-medium">Medium</span>
          </div>
          <div className="bg-surface-primary p-4 rounded-lg shadow-strong">
            <span className="text-sm font-medium">Strong</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="text-center py-8 border-t border-border-primary">
        <p className="text-text-muted">
          El Gavilán Design System - Traditional craftsmanship meets modern
          design
        </p>
      </section>
    </div>
  );
}
