import {
  BusFront,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="bg-primary p-2 rounded-xl">
                <BusFront className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">DevBus</span>
            </Link>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Taiwan's most trusted online bus ticket booking platform. Fast,
              secure, and reliable travel at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Search Buses
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="hover:text-primary transition-colors"
                >
                  Manage Bookings
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+886 2 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@devbus.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>101 Taipei Tower, Xinyi District</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">
              Connect With Us
            </h4>
            <div className="flex items-center gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Subscribe to our newsletter for exclusive travel discounts!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <p>© {currentYear} DevBus Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
