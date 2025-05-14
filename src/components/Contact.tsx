
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real application, you would send this data to your backend
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    
    // Show success message (in a real app, you'd use a toast)
    alert("Your message has been sent! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind or questions about our services? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 bg-blue-100 p-3 rounded-full">
                  <PhoneCall size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-blue-100 p-3 rounded-full">
                  <Mail size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@pilmedia.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-blue-100 p-3 rounded-full">
                  <MapPin size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">123 Business Avenue, New York, NY 10001</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600"><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600"><span className="font-medium">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
