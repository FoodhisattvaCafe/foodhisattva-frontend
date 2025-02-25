
import dynamic from 'next/dynamic';
// Dynamic import with correct relative path
const DynamicInteractiveMap = dynamic(
    () => import('@/components/InteractiveMap'),
    {
      ssr: false,
      loading: () => (
        <div className="w-full max-w-sm aspect-square mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      ),
    }
  );

const Footer: React.FC = () => {
    return (

<footer className="bg-white dark:bg-gray-900 py-16">
          <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="mb-4 text-2xl font-serif text-black dark:text-white">Foodhisattva</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                A cozy corner where traditional flavors meet warm hospitality.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-medium text-black dark:text-white">Quick Links</h4>
              {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="block mb-3 text-lg transition-colors text-gray-600 dark:text-gray-300 hover:text-[#94C973]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div>
              <h4 className="mb-4 text-xl font-medium text-black dark:text-white">Connect</h4>
              {['Instagram', 'Facebook', 'Twitter'].map((item) => (
                <button
                  key={item}
                  className="block mb-3 text-lg transition-colors text-gray-600 dark:text-gray-300 hover:text-[#94C973]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="mt-8 flex justify-center">
            <DynamicInteractiveMap />
          </div>

          <div className="mt-12 text-center text-base text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Foodhisattva. All rights reserved.
          </div>
        </footer>

);
}
export default Footer;