"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Music, MessageSquare, Menu, X, Info, Users, Heart, Disc, IdCard } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Close mobile menu when pathname changes (user navigates to a different page)
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className="bg-[#FFDE00] border-b-2 border-black sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/your-logo.png" 
                alt="Love for BTS Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold black-han-sans">Love for BTS</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink href="/members" active={pathname.startsWith("/members")} icon={<Users size={18} />}>
                Members
              </NavLink>
              <NavLink href="/discography" active={pathname.startsWith("/discography")} icon={<Disc size={18} />}>
                Discography
              </NavLink>
              <NavLink href="/messages" active={pathname === "/messages"} icon={<MessageSquare size={18} />}>
                Messages
              </NavLink>
              <NavLink href="/army-story" active={pathname.startsWith("/army-story")} icon={<Heart size={18} />}>
                Story
              </NavLink>
              <NavLink href="/army-card" active={pathname === "/army-card"} icon={<IdCard size={18} />}>
                ARMY Card
              </NavLink>
              <NavLink href="/about" active={pathname === "/about"} icon={<Info size={18} />}>
                About
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button 
            className="md:hidden flex items-center px-3 py-2 border rounded text-black border-black hover:text-purple-900 hover:border-purple-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            <div className="flex flex-col space-y-2">
              <MobileNavLink href="/members" active={pathname.startsWith("/members")} icon={<Users size={18} />}>
                Members
              </MobileNavLink>
              <MobileNavLink href="/discography" active={pathname.startsWith("/discography")} icon={<Disc size={18} />}>
                Discography
              </MobileNavLink>
              <MobileNavLink href="/messages" active={pathname === "/messages"} icon={<MessageSquare size={18} />}>
                Messages
              </MobileNavLink>
              <MobileNavLink href="/army-story" active={pathname.startsWith("/army-story")} icon={<Heart size={18} />}>
                Story
              </MobileNavLink>
              <MobileNavLink href="/army-card" active={pathname === "/army-card"} icon={<IdCard size={18} />}>
                ARMY Card
              </MobileNavLink>
              <MobileNavLink href="/about" active={pathname === "/about"} icon={<Info size={18} />}>
                About
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  children, 
  icon, 
  active 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${active 
          ? "bg-black text-[#FFDE00]" 
          : "text-black hover:bg-black hover:text-[#FFDE00]"
        }`}
    >
      <span className="mr-1.5">{icon}</span>
      <span className="black-han-sans">{children}</span>
    </Link>
  )
}

function MobileNavLink({ 
  href, 
  children, 
  icon, 
  active 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 text-sm font-medium transition-colors
        ${active 
          ? "bg-black text-[#FFDE00]" 
          : "text-black hover:bg-black hover:text-[#FFDE00]"
        }`}
    >
      <span className="mr-1.5">{icon}</span>
      <span className="black-han-sans">{children}</span>
    </Link>
  )
} 