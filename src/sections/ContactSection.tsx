
import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { useLiveProfile } from '@/hooks/useLiveProfile';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection: React.FC = () => {
  const { profile } = useLiveProfile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Portfolio Contact Form Submission",
        }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
  
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
  
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const linkedinLink = profile.basics.links.find(
    (link) => link.label.toLowerCase() === 'linkedin'
  );

  return (
    <AnimatedSection id="contact" className="py-16">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            {profile.contact.heading || "Let's Connect"}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          
          {profile.contact.subheading && (
            <h3 className="text-xl md:text-2xl font-medium text-center mb-4 text-muted-foreground">
              {profile.contact.subheading}
            </h3>
          )}

          {profile.contact.quote && (
            <div className="max-w-xl mx-auto my-6 p-4 border-l-4 border-primary bg-secondary/20 rounded-r-lg text-center lg:text-left">
              <p className="italic text-muted-foreground">
                "{profile.contact.quote}"
              </p>
              {profile.contact.quoteAuthor && (
                <p className="text-sm font-semibold text-primary mt-2">
                  — {profile.contact.quoteAuthor}
                </p>
              )}
            </div>
          )}

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Reach Out Directly</h3>
              
              {profile.contact.message && (
                <p className="text-muted-foreground mb-6">
                  {profile.contact.message}
                </p>
              )}
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Email</h4>
                    <a 
                      href={`mailto:${profile.contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {profile.contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Phone</h4>
                    <a 
                      href={`tel:${profile.contact.phone.replace(/[\s-]/g, '')}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {profile.contact.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Location</h4>
                    <span className="text-muted-foreground">{profile.contact.location}</span>
                  </div>
                </div>

                {linkedinLink && (
                  <div className="flex items-start">
                    <Linkedin className="w-5 h-5 mr-4 text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">LinkedIn</h4>
                      <a 
                        href={linkedinLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        {linkedinLink.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-3">Availability</h4>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-medium">
                  {profile.contact.availability}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Send Me A Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    aria-describedby="name-description"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    aria-describedby="email-description"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"
                    aria-describedby="message-description"
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;