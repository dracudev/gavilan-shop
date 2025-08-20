"use client";

import React from "react";
import { Card } from "@/components/ui/card/card";
import { Title } from "@/components/ui/title/title";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Badge } from "@/components/ui/badge/badge";
import { FaHatCowboy, FaBagShopping, FaStar, FaAward } from "react-icons/fa6";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-primary-50 text-primary-800 border border-primary-200 rounded-full">
          Since 1880
        </Badge>
        <Title
          title="El Gavilán"
          align="center"
          size="xl"
          className="mb-4 text-primary-900"
        />
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto mb-6" />
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          A distinguished heritage of craftsmanship and elegance in
          Alicante&apos;s finest accessories
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Heritage */}
        <Card className="lg:col-span-2 p-8 bg-surface-primary shadow-soft border border-border-primary">
          <div className="relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-primary-900 mb-6 flex items-center">
                <FaHatCowboy className="mr-3 text-primary-600" />
                Our Heritage
              </h3>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Founded in <strong>1880 in Alicante</strong>, El Gavilán
                  represents more than a century of unwavering dedication to
                  craftsmanship and style. What began as a traditional hat shop
                  has evolved into a distinguished purveyor of{" "}
                  <em>exclusive accessories, bags, and artisanal goods</em>.
                </p>
                <p>
                  Our legacy is built upon three foundational pillars:{" "}
                  <strong>uncompromising quality</strong>,
                  <strong>timeless elegance</strong>, and{" "}
                  <strong>authentic craftsmanship</strong>. Each piece in our
                  collection reflects the meticulous attention to detail that
                  has defined our brand for over 140 years.
                </p>
                <p>
                  Through five generations of family stewardship, we have
                  successfully bridged the gap between
                  <em>traditional artisanal techniques</em> and{" "}
                  <em>contemporary design sensibilities</em>, offering pieces
                  that honor our past while embracing the future.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission Card */}
        <Card className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 relative overflow-hidden">
          <div className="flex flex-col items-center relative z-10">
            <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center">
              <FaStar className="mr-3 text-primary-600" />
              Our Mission
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6 text-center">
              To remain the definitive source of premium accessories while
              providing
              <strong> personalized service</strong> that honors both tradition
              and innovation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-primary-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Artisanal Excellence
              </div>
              <div className="flex items-center text-sm text-primary-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Personalized Service
              </div>
              <div className="flex items-center text-sm text-primary-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Timeless Design
              </div>
            </div>
          </div>
          <Image
            src={logo}
            alt="El Gavilán logo watermark"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 w-40 md:w-48 lg:w-56  h-auto pointer-events-none select-none z-0"
          />
        </Card>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="p-6 bg-surface-primary border border-border-primary hover:shadow-medium transition-shadow duration-300">
          <div className="flex items-start">
            <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaBagShopping className="text-xl text-primary-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary-900 mb-2">
                Curated Collections
              </h4>
              <p className="text-text-secondary leading-relaxed">
                From classic hats to contemporary accessories, each piece is
                carefully selected to meet our exacting standards of quality and
                design excellence.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface-primary border border-border-primary hover:shadow-medium transition-shadow duration-300">
          <div className="flex items-start">
            <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaAward className="text-xl text-primary-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary-900 mb-2">
                Expert Craftsmanship
              </h4>
              <p className="text-text-secondary leading-relaxed">
                Our commitment to traditional techniques combined with modern
                innovation ensures every product embodies durability,
                functionality, and aesthetic appeal.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="p-8 bg-gradient-to-r from-primary-50 to-primary-100 text-center border-0">
        <h3 className="text-2xl font-bold text-primary-900 mb-4">
          Discover Our Legacy
        </h3>
        <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
          Experience the perfect fusion of heritage craftsmanship and
          contemporary style. Explore our carefully curated collection of
          premium accessories.
        </p>
        <Link href="/" passHref legacyBehavior>
          <a className="inline-block bg-surface-primary text-primary-700 px-8 py-3 text-base font-semibold rounded-full shadow-soft hover:shadow-medium hover:bg-primary-50 transition-all duration-300">
            View Collection
          </a>
        </Link>
      </Card>
    </section>
  );
}
