
import { useLiveProfile } from '@/hooks/useLiveProfile';

const Footer: React.FC = () => {
  const { profile } = useLiveProfile();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-border no-print">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {profile.basics.name}. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-4">
            {profile.basics.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Visit ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;