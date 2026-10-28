
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';

const EducationSection: React.FC = () => {
  const { profile } = useLiveProfile();
  if (profile.education.length === 0) return null;
  
  return (
    <AnimatedSection id="education" className="py-16 bg-secondary/30">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            Education
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="w-full max-w-3xl space-y-8">
            {profile.education.map((education) => (
              <div 
                key={`${education.institution}-${education.degree}`}
                className="bg-card border border-border rounded-lg p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <h3 className="font-semibold text-xl">{education.institution}</h3>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">
                    {education.start} - {education.end}
                  </span>
                </div>
                
                <div className="mb-3">
                  <h4 className="font-medium">
                    {education.degree} in {education.field}
                  </h4>
                  {education.location && (
                    <span className="text-sm text-muted-foreground block">{education.location}</span>
                  )}
                </div>
                
                {education.gpa && (
                  <p className="text-sm mb-3">
                    <span className="font-medium">GPA:</span> {education.gpa}
                  </p>
                )}
                
                {education.achievements && education.achievements.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-2">Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {education.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground">
                          <span className="text-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default EducationSection;