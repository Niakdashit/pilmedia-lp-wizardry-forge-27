
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="relative">
              <div className="bg-blue-600 opacity-10 w-48 h-48 rounded-full absolute -top-5 -left-5"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="Our team" 
                className="rounded-lg shadow-xl relative z-10"
              />
              <div className="bg-blue-600 opacity-10 w-24 h-24 rounded-full absolute -bottom-3 right-10"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About PilMedia</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2018, PilMedia has grown from a small startup to a leading digital agency serving clients worldwide. Our mission is to help businesses leverage the power of digital to achieve extraordinary results.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              With a team of experienced professionals passionate about digital innovation, we bring creativity, technical expertise, and strategic thinking to every project we undertake.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">200+</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">50+</h3>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">15+</h3>
                <p className="text-gray-600">Team Members</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">5+</h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">Meet Our Team</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
