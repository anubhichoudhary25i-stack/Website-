
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';

const AboutSection: React.FC = () => {
  const { profile } = useLiveProfile();
  return (
    <AnimatedSection id="about" className="py-16 bg-secondary/30">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            About Me
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="max-w-3xl text-center">
            <p className="text-lg mb-6">
              {profile.basics.summary}
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center mt-8 text-sm">
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Location:</span>
                <span className="font-medium">{profile.basics.location}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Email:</span>
                <a href={`mailto:${profile.basics.email}`} className="font-medium hover:text-primary transition-colors">
                  {profile.basics.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                {profile.basics.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;