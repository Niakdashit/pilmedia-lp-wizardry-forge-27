
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Your Digital Success <span className="text-blue-600">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              We help businesses grow with innovative digital solutions tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-blue-600 opacity-10 w-64 h-64 rounded-full absolute -top-10 -right-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                alt="Digital solutions" 
                className="rounded-lg shadow-xl relative z-10 w-full"
              />
              <div className="bg-blue-600 opacity-10 w-32 h-32 rounded-full absolute -bottom-5 -left-5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
