
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';

const ExperienceSection: React.FC = () => {
  const { profile } = useLiveProfile();
  if (profile.experience.length === 0) return null;
  
  return (
    <AnimatedSection id="experience" className="py-16 bg-secondary/30">
      <div className="container max-w-full mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            Experience
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="w-full max-w-full">
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
               {profile.experience.map((exp, index) => (
                 <div key={`${exp.company}-${index}`} className="relative flex items-start md:justify-center">
                  <div className="md:w-1/2 md:pr-12 md:flex md:flex-col w-full">
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full mt-1.5 border-4 border-background"></div>
                    
                    <div className="md:hidden absolute left-0 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full mt-1.5 border-4 border-background"></div>
                    
                    {/* Content that changes sides based on index */}
                    <div className={`md:hidden bg-card border border-border rounded-lg shadow p-5 ml-8 text-left`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">
                          {exp.start} - {exp.end}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h4 className="font-medium">{exp.company}</h4>
                        {exp.location && <span className="text-sm text-muted-foreground">{exp.location}</span>}
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-muted-foreground">
                            <span className="text-foreground">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Desktop left side (even index) */}
                    <div className={`hidden ${index % 2 === 0 ? 'md:block' : ''} w-full`}>
                      <div className="flex flex-col items-end mb-2 text-right w-full">
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {exp.start} - {exp.end}
                        </span>
                      </div>
                      <div className="mb-4 flex flex-col items-end text-right w-full">
                        <h4 className="font-medium">{exp.company}</h4>
                        {exp.location && <span className="text-sm text-muted-foreground">{exp.location}</span>}
                      </div>
                      <ul className="list-none space-y-2 text-sm text-left w-full max-w-lg ml-auto">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-muted-foreground">
                            <span className="text-foreground">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Desktop right side (odd index) */}
                  <div className="hidden md:block md:w-1/2 md:pl-12">
                    <div className={`hidden ${index % 2 !== 0 ? 'md:block' : ''}`}>
                      <div className="flex flex-col items-start mb-2">
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {exp.start} - {exp.end}
                        </span>
                      </div>
                      <div className="mb-3 flex flex-col items-start">
                        <h4 className="font-medium">{exp.company}</h4>
                        {exp.location && <span className="text-sm text-muted-foreground">{exp.location}</span>}
                      </div>
                      <ul className="list-none space-y-2 text-sm max-w-lg">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-muted-foreground">
                            <span className="text-foreground">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ExperienceSection;