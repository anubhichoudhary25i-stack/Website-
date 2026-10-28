
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';

const SkillsSection: React.FC = () => {
  const { profile } = useLiveProfile();
  if (profile.skills.length === 0) return null;
  
  return (
    <AnimatedSection id="skills" className="py-16">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            Skills
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {profile.skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-bar-fill"
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;