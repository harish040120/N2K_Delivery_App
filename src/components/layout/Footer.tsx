import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo className="text-white" />
          <p className="text-sm">
            Moving the World, One Route at a Time
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/track" className="hover:text-purple-400 transition-colors">
                Track Package
              </Link>
            </li>
            <li>
              <Link to="/customer-login" className="hover:text-purple-400 transition-colors">
                Customer Portal
              </Link>
            </li>
            <li>
              <Link to="/staff-login" className="hover:text-purple-400 transition-colors">
                Staff Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 1234567890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@n2klogistics.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Nambiyur, Tamil Nadu</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
          <ul className="space-y-2">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 9:00 AM - 1:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} N2K Logistics. All rights reserved.</p>
      </div>
    </div>
  </footer>
);