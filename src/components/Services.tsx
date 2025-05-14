
import { Check } from "lucide-react";

const services = [
  {
    title: "Digital Marketing",
    description: "Result-driven campaigns to boost your online presence and drive growth.",
    features: ["SEO Optimization", "Social Media Management", "Content Strategy", "PPC Advertising"],
    icon: "🚀"
  },
  {
    title: "Web Development",
    description: "Custom websites and applications built with the latest technologies.",
    features: ["Responsive Design", "E-commerce Solutions", "Web Applications", "UI/UX Design"],
    icon: "💻"
  },
  {
    title: "Brand Strategy",
    description: "Develop a compelling brand identity that resonates with your audience.",
    features: ["Brand Positioning", "Visual Identity", "Brand Guidelines", "Market Research"],
    icon: "✨"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="mt-auto">
                <h4 className="font-medium text-gray-900 mb-2">Key features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
