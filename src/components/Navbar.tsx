import { useState, useEffect, useMemo } from 'react';
import { Menu } from 'lucide-react';
import NavLinks from './NavLinks';
import { useLiveProfile } from '@/hooks/useLiveProfile';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useBlogs } from '@/hooks/useBlogs';

import { NavLink } from './NavLinks';

const generateNavLinks = (
  profileData: typeof profile,
  hasPortfolio: boolean,
  hasBlogs: boolean
): NavLink[] => {
  const links: NavLink[] = [
    { id: 'hero', label: 'Home' },
  ];

  const aboutChildren: NavLink[] = [];
  
  if (profileData.skills.length > 0) aboutChildren.push({ id: 'skills', label: 'Skills' });
  if (profileData.experience.length > 0) aboutChildren.push({ id: 'experience', label: 'Experience' });
  if (profileData.education.length > 0) aboutChildren.push({ id: 'education', label: 'Education' });
  if (profileData.achievements.length > 0) aboutChildren.push({ id: 'achievements', label: 'Achievements' });
  if (profileData.extracurricular.length > 0) aboutChildren.push({ id: 'extracurricular', label: 'Activities' });

  links.push({ 
    id: 'about', 
    label: 'About',
    children: aboutChildren.length > 0 ? aboutChildren : undefined
  });

  if (hasPortfolio) links.push({ id: 'portfolio', label: 'Portfolio' });
  if (hasBlogs) links.push({ id: 'blogs', label: 'Blogs' });
  
  links.push({ id: 'contact', label: 'Contact' });

  return links;
};

const Navbar: React.FC = () => {
  const { profile } = useLiveProfile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: portfolioItems } = usePortfolio();
  const { data: blogItems } = useBlogs();

  const navLinks = useMemo(
    () =>
      generateNavLinks(
        profile,
        true, // Always show portfolio
        (blogItems?.length ?? 0) > 0
      ),
    [portfolioItems, blogItems]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 no-print
        ${isScrolled
          ? 'py-3 bg-background/90 backdrop-blur-sm shadow-sm'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="container max-w-content mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">{profile.basics.name}</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks links={navLinks} />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-b border-border">
          <div className="container max-w-content mx-auto px-4 py-4">
            <NavLinks
              links={navLinks}
              className="flex-col items-start gap-4"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;