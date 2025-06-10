"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter, Music, Heart, MessageSquare, Info, Users, FileText, Phone, HeartHandshake } from "lucide-react"
import { useTheme } from "@/app/lib/themes/theme-context"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { currentTheme } = useTheme()

  return (
    <div className="px-4 py-2 mt-12">
      <footer 
        className="border-2 border-black rounded-2xl shadow-lg max-w-7xl mx-auto"
        style={{ backgroundColor: `${currentTheme.colors.navbarBg}CC` }}
      >
        <div className="px-6 py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Logo and About */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center mb-4">
                <Image 
                  src="/images/bts-logo.png" 
                  alt="Love for BTS Logo" 
                  width={32} 
                  height={32} 
                  className="h-8 w-8"
                />
                <span className="ml-2 text-xl font-bold black-han-sans" style={{ color: 'var(--navbar-text)' }}>Love for BTS</span>
              </Link>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--navbar-text)' }}>
                A fan-made platform dedicated to BTS and ARMY, celebrating the incredible journey and impact of our favorite seven members.
              </p>
              <div className="flex space-x-3">
                <SocialLink href="https://www.instagram.com/bts.bighitofficial/" icon={<Instagram size={18} />} label="Instagram" />
                <SocialLink href="https://x.com/BTS_twt" icon={<Twitter size={18} />} label="X (Twitter)" />
                <SocialLink href="https://www.youtube.com/@BTS" icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
                  </svg>
                } label="YouTube" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 black-han-sans" style={{ color: 'var(--navbar-text)' }}>Quick Links</h3>
              <ul className="space-y-2">
                <FooterLink href="/members" icon={<Users size={16} />} label="Members" />
                <FooterLink href="/messages" icon={<MessageSquare size={16} />} label="ARMY Messages" />
                <FooterLink href="/army-story" icon={<Heart size={16} />} label="ARMY Story" />
                <FooterLink href="/about" icon={<Info size={16} />} label="About Us" />
              </ul>
            </div>

            {/* Legal Pages */}
            <div>
              <h3 className="text-lg font-bold mb-4 black-han-sans" style={{ color: 'var(--navbar-text)' }}>Info & Legal</h3>
              <ul className="space-y-2">
                <FooterLink href="/contact" icon={<Phone size={16} />} label="Contact Us" />
                <FooterLink href="/support" icon={<HeartHandshake size={16} />} label="Support Us" />
                <FooterLink href="/privacy-policy" icon={<FileText size={16} />} label="Privacy Policy" />
                <FooterLink href="/terms-of-use" icon={<FileText size={16} />} label="Terms of Use" />
                <FooterLink href="/cookie-policy" icon={<FileText size={16} />} label="Cookie Policy" />
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-black/20 text-center space-y-1">
            <p className="text-sm" style={{ color: 'var(--navbar-text)' }}>
              © {currentYear} Love for BTS. This is a fan-made site and is not affiliated with HYBE or BTS.
            </p>
            <p className="text-sm" style={{ color: 'var(--navbar-text)' }}>
              Made with 💜 by ARMY for ARMY.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black p-2 rounded-full hover:bg-purple-900 transition-colors"
      style={{ color: 'var(--bts-accent)' }}
      aria-label={label}
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="flex items-center transition-all duration-200 text-sm group"
        style={{ color: 'var(--navbar-text)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--bts-accent)'
          e.currentTarget.style.transform = 'translateX(4px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--navbar-text)'
          e.currentTarget.style.transform = 'translateX(0px)'
        }}
      >
        <span className="mr-2 transition-transform duration-200 group-hover:scale-110">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  )
} 
