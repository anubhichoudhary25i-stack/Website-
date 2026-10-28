
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';

const ExtracurricularSection: React.FC = () => {
  const { profile } = useLiveProfile();
  if (profile.extracurricular.length === 0) return null;
  
  return (
    <AnimatedSection id="extracurricular" className="py-16 bg-secondary/30">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            Extracurricular Activities
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="w-full max-w-3xl space-y-6">
            {profile.extracurricular.map((activity, index) => (
              <div 
                key={`${activity.organization}-${index}`}
                className="bg-card border border-border rounded-lg p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="font-semibold text-lg">{activity.organization}</h3>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">
                    {activity.start} - {activity.end}
                  </span>
                </div>
                
                <h4 className="font-medium mb-3">{activity.role}</h4>
                
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ExtracurricularSection;