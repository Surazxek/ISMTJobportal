export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-semibold">ISMT College Kathmandu</p>
        <p>+977-1-4112122 / 4112159</p>
        <p>Tinkune, Gairigaun, Kathmandu</p>
        <p className="mt-1">
          <a
            href="mailto:info@ismt.edu.np"
            className="underline hover:text-gray-300"
          >
            info@ismt.edu.np
          </a>
        </p>
        <p className="mt-2">
          <a
            href="https://ismt.edu.np/campuses/ismt-college-kathmandu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            Contact Us
          </a>
        </p>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} ISMT College Kathmandu. All rights reserved.</p>
      </div>
    </footer>
  );
}
