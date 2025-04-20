"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Music, MessageSquare, Menu, X, Info, Users, Heart, Disc, IdCard, ChevronDown, Quote, Calendar, BookOpen, HelpCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname() || ""
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [btsExpanded, setBtsExpanded] = useState(false)
  const [armyExpanded, setArmyExpanded] = useState(false)
  
  // Close mobile menu when pathname changes (user navigates to a different page)
  useEffect(() => {
    setMobileMenuOpen(false)
    setBtsExpanded(false)
    setArmyExpanded(false)
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
              <span className="ml-2 text-xl font-bold black-han-sans text-[#9333EA]">Love for BTS</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {/* BTS Dropdown - Contains Members, Discography, and Quotes */}
              <NavDropdown 
                label="BTS" 
                icon={<Image src="/images/bts-logo.svg" alt="BTS Logo" width={22} height={22} />} 
                active={pathname.startsWith("/members") || pathname.startsWith("/discography") || pathname.startsWith("/quotes") || pathname.startsWith("/history")}
                items={[
                  { href: "/members", label: "Members", icon: <Users size={16} /> },
                  { href: "/discography", label: "Discography", icon: <Disc size={16} /> },
                  { href: "/quotes", label: "Quotes", icon: <Quote size={16} /> },
                  { href: "/history", label: "History", icon: <Calendar size={16} /> },
                ]}
              />
              
              {/* ARMY Dropdown - Contains Messages, Story, ARMY Card, Bias Test, Vocabulary */}
              <NavDropdown 
                label="ARMY" 
                icon={<Image src="/images/army-bomb.svg" alt="ARMY Bomb" width={22} height={22} />} 
                active={pathname === "/messages" || pathname.startsWith("/army-story") || pathname === "/army-card" || pathname === "/bias-test" || pathname === "/vocabulary" || pathname === "/quiz"}
                items={[
                  { href: "/messages", label: "Messages", icon: <MessageSquare size={16} /> },
                  { href: "/army-story", label: "Story", icon: <Heart size={16} /> },
                  { href: "/army-card", label: "ARMY Card", icon: <IdCard size={16} /> },
                  { href: "/bias-test", label: "Bias Test", icon: <Users size={16} /> },
                  { href: "/vocabulary", label: "Vocabulary", icon: <BookOpen size={16} /> },
                  { href: "/quiz", label: "Quiz", icon: <HelpCircle size={16} /> },
                ]}
              />
              
              {/* About link remains standalone */}
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

        {/* Mobile Menu - Overlay style */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 z-50 md:hidden">
            <div className="bg-[#FFDE00] border-b-2 border-x-2 border-black shadow-lg py-2 pb-4">
              <div className="flex flex-col space-y-2">
                {/* BTS Section - Contains Members, Discography, and Quotes */}
                <div className="px-4 py-2">
                  <button 
                    onClick={() => setBtsExpanded(!btsExpanded)}
                    className="w-full flex items-center justify-between text-black font-medium mb-1"
                    aria-expanded={btsExpanded}
                    aria-controls="bts-menu"
                  >
                    <div className="flex items-center">
                      <span className="mr-1.5">
                        <Image src="/images/bts-logo.svg" alt="BTS Logo" width={22} height={22} />
                      </span>
                      <span className="black-han-sans">BTS</span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform duration-300 ${btsExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {/* BTS Submenu */}
                  <div 
                    id="bts-menu"
                    className={`ml-7 flex flex-col space-y-2 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      btsExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Members */}
                    <Link href="/members" className="flex items-center text-black/90 hover:text-purple-900">
                      <Users size={16} className="mr-1.5" />
                      <span>Members</span>
                    </Link>
                    
                    {/* Discography */}
                    <Link href="/discography" className="flex items-center text-black/90 hover:text-purple-900">
                      <Disc size={16} className="mr-1.5" />
                      <span>Discography</span>
                    </Link>

                    {/* Quotes */}
                    <Link href="/quotes" className="flex items-center text-black/90 hover:text-purple-900">
                      <Quote size={16} className="mr-1.5" />
                      <span>Quotes</span>
                    </Link>

                    {/* History */}
                    <Link href="/history" className="flex items-center text-black/90 hover:text-purple-900">
                      <Calendar size={16} className="mr-1.5" />
                      <span>History</span>
                    </Link>
                  </div>
                </div>
                
                {/* ARMY Section - Contains Messages, Story, ARMY Card */}
                <div className="px-4 py-2">
                  <button 
                    onClick={() => setArmyExpanded(!armyExpanded)} 
                    className="w-full flex items-center justify-between text-black font-medium mb-1"
                    aria-expanded={armyExpanded}
                    aria-controls="army-menu"
                  >
                    <div className="flex items-center">
                      <span className="mr-1.5">
                        <Image src="/images/army-bomb.svg" alt="ARMY Bomb" width={22} height={22} />
                      </span>
                      <span className="black-han-sans">ARMY</span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform duration-300 ${armyExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {/* ARMY Submenu */}
                  <div id="army-menu" className={`mt-1 pl-4 overflow-hidden transition-all duration-300 ${armyExpanded ? 'max-h-80' : 'max-h-0'}`}>
                    <ul className="space-y-1 py-1">
                      <li>
                        <Link href="/messages" className={`block px-3 py-2 rounded text-sm ${pathname === "/messages" ? 'font-medium text-purple-600' : 'hover:bg-gray-100'}`}>
                          <span className="flex items-center">
                            <MessageSquare size={16} className="mr-2" />
                            Messages
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/army-story" className={`block px-3 py-2 rounded text-sm ${pathname.startsWith("/army-story") ? 'font-medium text-purple-600' : 'hover:bg-gray-100'}`}>
                          <span className="flex items-center">
                            <Heart size={16} className="mr-2" />
                            Story
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/army-card" className={`block px-3 py-2 rounded text-sm ${pathname === "/army-card" ? 'font-medium text-purple-600' : 'hover:bg-gray-100'}`}>
                          <span className="flex items-center">
                            <IdCard size={16} className="mr-2" />
                            ARMY Card
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/bias-test" className={`block px-3 py-2 rounded text-sm ${pathname === "/bias-test" ? 'font-medium text-purple-600' : 'hover:bg-gray-100'}`}>
                          <span className="flex items-center">
                            <Users size={16} className="mr-2" />
                            Bias Test
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/vocabulary" className={`block px-3 py-2 rounded text-sm ${pathname === "/vocabulary" ? 'font-medium text-purple-600' : 'hover:bg-gray-100'}`}>
                          <span className="flex items-center">
                            <BookOpen size={16} className="mr-2" />
                            Vocabulary
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/quiz" className={`block px-3 py-2 rounded text-sm ${pathname === "/quiz" ? 'font-medium text-purple-600' : 'hover:bg-gray-100'}`}>
                          <span className="flex items-center">
                            <HelpCircle size={16} className="mr-2" />
                            Quiz
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* About - standalone link */}
                <MobileNavLink href="/about" active={pathname === "/about"} icon={<Info size={18} />}>
                  About
                </MobileNavLink>
              </div>
            </div>
            {/* Overlay backdrop to capture clicks outside the menu */}
            <div 
              className="fixed inset-0 bg-black/20 -z-10"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
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

function NavDropdown({ 
  label, 
  icon, 
  items, 
  active 
}: { 
  label: string; 
  icon: React.ReactNode; 
  items: { href: string; label: string; icon?: React.ReactNode }[];
  active: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${active 
              ? "bg-black text-[#FFDE00]" 
              : "text-black hover:bg-black hover:text-[#FFDE00]"
            }`}
          aria-label={`${label} menu`}
        >
          <span className="mr-1.5">{icon}</span>
          <span className="black-han-sans mr-1">{label}</span>
          <ChevronDown 
            size={14} 
            className={`ml-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white border-2 border-black rounded-md shadow-lg p-1 min-w-[180px] animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-black hover:text-[#FFDE00]">
            <Link href={item.href} className="flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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