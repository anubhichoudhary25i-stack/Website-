
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';

const AchievementsSection: React.FC = () => {
  const { profile } = useLiveProfile();
  if (profile.achievements.length === 0) return null;
  
  return (
    <AnimatedSection id="achievements" className="py-16">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            Achievements
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {profile.achievements.map((achievement) => (
              <div 
                key={`${achievement.title}-${achievement.date}`}
                className="bg-card border border-border rounded-lg p-5 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-md whitespace-nowrap">
                      {achievement.date}
                    </span>
                  </div>
                  
                  {achievement.issuer && (
                    <span className="text-sm font-medium mb-2">{achievement.issuer}</span>
                  )}
                  
                  {achievement.description && (
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AchievementsSection;