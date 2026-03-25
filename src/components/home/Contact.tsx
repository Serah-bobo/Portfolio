import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import Container from '../shared/Container';
import SectionTitle from '../shared/SectionTitle';
import Button from '../shared/Button';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    message: '',
  });

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );
        
        if (result.status === 200) {
          setSubmitStatus('success');
          setFormData({ from_name: '', from_email: '', message: '' });
          setTimeout(() => setSubmitStatus('idle'), 5000);
        }
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="section-padding bg-[rgb(var(--bg-primary))]">
      <Container>
        <SectionTitle
          title="Let's Connect"
          subtitle="Get in touch"
          align="center"
          size="lg"
          decorative={true}
        >
          <p className="text-body-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just a chat.
          </p>
        </SectionTitle>

        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Main Contact Card */}
          <motion.div
            variants={itemVariants}
            className="bg-[rgb(var(--bg-card))] rounded-2xl border border-[rgb(var(--border-light))] overflow-hidden shadow-custom-lg"
          >
            <div className="grid md:grid-cols-2">
              {/* Left Side - Contact Info */}
              <div className="p-8 md:p-10 bg-[rgb(var(--bg-secondary))]">
                <h3 className="text-display-sm font-bold text-[rgb(var(--text-primary))] mb-6">
                  Contact Info
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent-primary))]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(var(--accent-primary))]/20 transition-colors">
                      <svg className="w-6 h-6 text-[rgb(var(--accent-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm text-[rgb(var(--text-secondary))] mb-1">Email</p>
                      <a 
                        href="mailto:serah.ndungu@example.com"
                        className="text-body-lg text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent-primary))] transition-colors"
                      >
                        serah.ndungu@example.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent-primary))]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(var(--accent-primary))]/20 transition-colors">
                      <svg className="w-6 h-6 text-[rgb(var(--accent-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm text-[rgb(var(--text-secondary))] mb-1">Phone</p>
                      <a 
                        href="tel:+254700000000"
                        className="text-body-lg text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent-primary))] transition-colors"
                      >
                        +254 700 000 000
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent-primary))]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(var(--accent-primary))]/20 transition-colors">
                      <svg className="w-6 h-6 text-[rgb(var(--accent-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm text-[rgb(var(--text-secondary))] mb-1">Location</p>
                      <p className="text-body-lg text-[rgb(var(--text-primary))]">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>

                {/* Availability Status */}
                <div className="mt-8 pt-6 border-t border-[rgb(var(--border-light))]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-body-md text-[rgb(var(--text-primary))]">Open for opportunities</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Full-time', 'Freelance', 'Contract', 'Remote'].map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-light))] rounded-full text-body-sm text-[rgb(var(--text-primary))]"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="p-8 md:p-10">
                <h3 className="text-display-sm font-bold text-[rgb(var(--text-primary))] mb-6">
                  Send a Message
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="from_name" className="block text-body-sm text-[rgb(var(--text-secondary))] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-light))] rounded-lg text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-primary))] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="from_email" className="block text-body-sm text-[rgb(var(--text-secondary))] mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-light))] rounded-lg text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-primary))] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-body-sm text-[rgb(var(--text-secondary))] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-light))] rounded-lg text-[rgb(var(--text-primary))] focus:outline-none focus:border-[rgb(var(--accent-primary))] transition-colors resize-none"
                      placeholder="Hi Serah, I'd love to discuss..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-body-sm text-center">
                      ✓ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-body-sm text-center">
                      ✗ Failed to send message. Please try again or email me directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <h3 className="text-body-lg font-semibold text-[rgb(var(--text-primary))] mb-6">
              Find me on
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  name: 'GitHub',
                  url: 'https://github.com/yourusername',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  name: 'LinkedIn',
                  url: 'https://linkedin.com/in/yourusername',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  name: 'Twitter',
                  url: 'https://twitter.com/yourusername',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-5.801 14.025 14.025 0 002.41-7.927c0-.178 0-.355-.012-.53A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-light))] flex items-center justify-center text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--accent-primary))] hover:border-[rgb(var(--accent-primary))] transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Response Time Note */}
          <motion.p
            variants={itemVariants}
            className="text-center text-body-sm text-[rgb(var(--text-tertiary))] mt-8"
          >
            📧 I typically respond within 24 hours
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;