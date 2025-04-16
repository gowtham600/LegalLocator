export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-medium mb-2">LegalLocator</h3>
            <p className="text-gray-300 text-sm">Connecting you with local legal professionals.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-2">Services</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Find Lawyers</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Legal Resources</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Law Directories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Company</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><a href="#" className="hover:text-accent transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Legal</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} LegalLocator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
