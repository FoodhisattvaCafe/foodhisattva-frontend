

import { Leaf, Clock, MapPin, Phone, Search, User } from 'lucide-react';
const ContactUs: React.FC = () => {
    return (
<div className="bg-white dark:bg-gray-900 py-20 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <Clock className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Hours</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">Tuesday - Sunday</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">11:30 AM - 10:00 PM</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">Closed Mondays</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Location</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">123 Comfort Lane</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">Warmth City, ST 12345</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mb-4 mx-auto text-[#94C973]" />
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Contact</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">(123) 456-7890</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">hello@foodhisattva.com</p>
            </div>
          </div>
        </div>

    );
}

export default ContactUs;