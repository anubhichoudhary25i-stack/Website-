import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { ExternalLink } from 'lucide-react';
import { useLiveProfile } from '@/hooks/useLiveProfile';
import { CMS_CONFIG } from '@/config/cms';

const PortfolioSection: React.FC = () => {
  const { portfolioFiller } = useLiveProfile();

  const defaultHighlights = [
    'Reliance Animation Academy',
    'CANEUS MNT',
    'Swiss Expo Logistics',
    'Government of Karnataka',
    'Prawaaas 5.0',
    'EEA 2026',
    '15th IEIA',
    'BTS & Nano 2026',
  ];

  const headline = portfolioFiller?.headline || 'Turning the Unnoticed into Unforgettable';
  const description = portfolioFiller?.description || 'Reimagining the obvious. Reframing the ordinary. Explore campaigns, brand identities, and high-impact event marketing across technology, AVGC, and logistics.';
  const highlights = portfolioFiller?.highlights?.length ? portfolioFiller.highlights : defaultHighlights;
  const buttonText = portfolioFiller?.buttonText || 'View Full Portfolio Showcase';
  
  const baseButtonUrl = portfolioFiller?.buttonUrl || '/portfolio-showcase.html';
  const buttonUrl = CMS_CONFIG.sheetId
    ? `${baseButtonUrl}?sheetId=${encodeURIComponent(CMS_CONFIG.sheetId)}`
    : baseButtonUrl;

  return (
    <AnimatedSection id="portfolio" className="py-20 bg-background">
      <div className="container max-w-content mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 relative pb-2">
            Portfolio
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            A curated showcase of brand building, digital marketing, commercial shoots, and experiential events.
          </p>
        </div>

        {/* Feature Filler Card directing to the main portfolio */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-all relative overflow-hidden text-center flex flex-col items-center">
            
            {/* Headline Quote */}
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#c94350] leading-tight mb-4">
              {headline}
            </h3>

            <p className="text-muted-foreground text-sm sm:text-lg font-light max-w-2xl mb-8">
              {description}
            </p>

            {/* Client & Event Chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mb-10">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-center">
              <a
                href={buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <span>{buttonText}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </AnimatedSection>
  );
};

export default PortfolioSection;
