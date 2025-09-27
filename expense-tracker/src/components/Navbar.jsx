import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, UserButton, useClerk } from '@clerk/clerk-react';
import { LayoutDashboard, Home, Menu, X } from 'lucide-react';

export default function Navbar({ variant = 'landing' }) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navStyles = {
    landing: "bg-white/80 backdrop-blur-md border-b border-black/5",
    dashboard: "bg-white/80 backdrop-blur-md border-b border-black/5"
  };

  const PrimaryNavButton = ({ onClick }) => {
    if (location.pathname === '/dashboard') {
      return (
        <Link 
          to="/" 
          onClick={onClick}
          className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
        >
          <Home className="w-4 h-4" /> Home
        </Link>
      );
    }
    return (
      <Link 
        to="/dashboard" 
        onClick={onClick}
        className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
      >
        <LayoutDashboard className="w-4 h-4" /> Dashboard
      </Link>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 ${navStyles[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-primary">
            ExpenseTracker
          </Link>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <PrimaryNavButton />
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 shadow-sm transition"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-primary">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- UPDATED Mobile Menu Dropdown --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-black/5">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {isSignedIn ? (
              <>
                {/* Pass an onClick handler to close the menu on navigation */}
                <PrimaryNavButton onClick={() => setMenuOpen(false)} />
                
                <div className="flex items-center justify-between px-2 pt-2 border-t border-black/10">
                    <p className="text-sm font-medium text-primary">Profile</p>
                    <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 shadow-sm"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}