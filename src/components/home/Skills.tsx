import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '../shared/Container';
import SectionTitle from '../shared/SectionTitle';

// Define types
interface Skill {
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'database' | 'enterprise' | 'devops' | 'learning';
}

interface Category {
  name: string;
  icon: string;
  skills: Skill[];
}

// Complete skills data with logos
const skills: Skill[] = [
  // Frontend & Web
  { name: 'HTML5', logo: 'https://cdn.worldvectorlogo.com/logos/html-1.svg', category: 'frontend' },
  { name: 'CSS3', logo: 'https://cdn.worldvectorlogo.com/logos/css-3.svg', category: 'frontend' },
  { name: 'JavaScript', logo: 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg', category: 'frontend' },
  { name: 'TypeScript', logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg', category: 'frontend' },
  { name: 'React.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png?_=20220125121207', category: 'frontend' },
  { name: 'Next.js', logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', category: 'frontend' },
  { name: 'Tailwind CSS', logo: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg', category: 'frontend' },
  
  // Backend & APIs
  { name: 'Node.js', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg', category: 'backend' },
  { name: 'Express.js',  logo: 'https://cdn.worldvectorlogo.com/logos/express-109.svg', category: 'backend' },
  { name: 'Python', logo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg', category: 'backend' },
  
  // Databases
  { name: 'MongoDB', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg', category: 'database' },
  { name: 'MySQL', logo: 'https://cdn.worldvectorlogo.com/logos/mysql-logo.svg', category: 'database' },
  { name: 'SQL', logo: 'https://www.svgrepo.com/show/374093/sql.svg', category: 'database' },
  
  // Enterprise Systems
  { name: 'Active Directory', logo: 'https://cdn.worldvectorlogo.com/logos/active-directory-1.svg', category: 'enterprise' },
  { name: 'Microsoft Office 365', logo: 'https://cdn.worldvectorlogo.com/logos/office-365-1.svg', category: 'enterprise' },
  { name: 'Microsoft Exchange', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-exchange.svg', category: 'enterprise' },
  { name: 'Windows Server', logo: 'https://cdn.worldvectorlogo.com/logos/windows.svg', category: 'enterprise' },
  
  // DevOps & Tools
  { name: 'Git', logo: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png', category: 'devops' },
  { name: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg', category: 'devops' },
  { name: 'VS Code', logo: 'https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg', category: 'devops' },
  { name: 'Postman', logo: 'https://cdn.worldvectorlogo.com/logos/postman.svg', category: 'devops' },
  { name: 'Linux', logo: 'https://cdn.worldvectorlogo.com/logos/linux-tux.svg', category: 'devops' },
];

// Group skills by category with proper typing
const categories: Record<string, Category> = {
  frontend: { name: 'Frontend & Web', icon: '🎨', skills: [] },
  backend: { name: 'Backend & APIs', icon: '⚙️', skills: [] },
  database: { name: 'Databases', icon: '🗄️', skills: [] },
  enterprise: { name: 'Enterprise Systems', icon: '🏢', skills: [] },
  devops: { name: 'DevOps & Tools', icon: '🛠️', skills: [] },
};

// Populate categories
skills.forEach((skill) => {
  categories[skill.category].skills.push(skill);
});

const Skills = () => {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="section-padding bg-[rgb(var(--bg-secondary))]">
      <Container>
        <SectionTitle
          title="Skills & Technologies"
          subtitle="My technical toolkit"
          align="center"
          size="lg"
          decorative={true}
        >
          <p className="text-body-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            A unique blend of modern web development and enterprise systems expertise.
          </p>
        </SectionTitle>

        {/* Unique Value Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(var(--accent-primary))]/10 rounded-full border border-[rgb(var(--accent-primary))]/20">
            <span className="text-lg">✨</span>
            <span className="text-body-sm font-medium text-[rgb(var(--accent-primary))]">
              Full-Stack Dev + Enterprise Systems Expertise
            </span>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.values(categories).map((category) => (
            category.skills.length > 0 && (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="bg-[rgb(var(--bg-card))] rounded-xl border border-[rgb(var(--border-light))] overflow-hidden hover:shadow-custom-lg transition-all duration-300"
              >
                {/* Category Header */}
                <div className="px-6 py-4 border-b border-[rgb(var(--border-light))] bg-[rgb(var(--bg-tertiary))]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-display-xs font-bold text-[rgb(var(--text-primary))]">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Skills Grid with Logos */}
                <div className="p-6">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative flex flex-col items-center gap-2 p-3 rounded-lg bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-light))] hover:border-[rgb(var(--accent-primary))] transition-all duration-200 hover:scale-105"
                      >
                        {/* Logo */}
                        <div className="w-10 h-10 flex items-center justify-center">
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // Fallback for broken images
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('span');
                                fallback.className = 'text-2xl';
                                fallback.textContent = category.icon;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                        {/* Skill Name */}
                        <span className="text-xs font-medium text-[rgb(var(--text-primary))] text-center">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Skills;