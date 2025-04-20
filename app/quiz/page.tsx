"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "../components/ui/page-header"
import { HelpCircle, Music, Users, BookOpen, ArrowRight } from "lucide-react"

export default function QuizIndexPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <PageHeader 
        title="BTS Quiz Hub" 
        description="Test your knowledge and have fun with our BTS-themed quizzes!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Lyrics Quiz Card */}
        <QuizCard 
          title="Lyrics Quiz"
          description="Test your knowledge of BTS song lyrics with multiple choice questions, fill-in-the-blank challenges, and line completion puzzles."
          icon={<Music className="w-12 h-12 text-purple-600" />}
          image="/images/quiz/quiz-lyrics.jpg"
          href="/quiz/lyrics-quiz"
          color="bg-purple-100"
          borderColor="border-purple-300"
        />
        
        {/* Member Quiz */}
        <QuizCard 
          title="Member Quiz"
          description="How well do you know the BTS members? Test your knowledge about their profiles, preferences, talents, and trivia."
          icon={<Users className="w-12 h-12 text-blue-600" />}
          image="/images/quiz/quiz-members.jpg"
          href="/quiz/member-quiz"
          color="bg-blue-100"
          borderColor="border-blue-300"
        />
        
        {/* ARMY Knowledge Quiz - Now active */}
        <QuizCard 
          title="ARMY Knowledge Quiz"
          description="Test your knowledge about BTS history, music videos, member facts, and important milestones."
          icon={<HelpCircle className="w-12 h-12 text-pink-600" />}
          image="/images/quiz/quiz-army.jpg"
          href="/quiz/army-quiz"
          color="bg-pink-100"
          borderColor="border-pink-300"
        />
        
        {/* Coming Soon: Vocabulary Quiz */}
        <QuizCard 
          title="Vocabulary Quiz (Coming Soon)"
          description="Test your knowledge of BTS and ARMY vocabulary, fan terminology, and Korean phrases frequently used by the members."
          icon={<BookOpen className="w-12 h-12 text-green-600" />}
          image="/images/quiz/quiz-vocabulary.jpg"
          href="#"
          color="bg-green-100"
          borderColor="border-green-300"
          comingSoon
        />
      </div>

      <div className="mt-12 bg-white rounded-2xl border-2 border-black p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 black-han-sans text-center">Why Take Our Quizzes?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFDE00] flex items-center justify-center mb-3">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Learn While Playing</h3>
            <p className="text-gray-600">Discover interesting facts about BTS while having fun with our carefully crafted quizzes.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFDE00] flex items-center justify-center mb-3">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Connect With ARMY</h3>
            <p className="text-gray-600">Share your results with other ARMY members and compare your BTS knowledge.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFDE00] flex items-center justify-center mb-3">
              <Music className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Celebrate BTS</h3>
            <p className="text-gray-600">Our quizzes are a fun way to celebrate BTS and appreciate their incredible journey.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuizCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  href: string;
  color: string;
  borderColor: string;
  comingSoon?: boolean;
}

function QuizCard({ title, description, icon, image, href, color, borderColor, comingSoon = false }: QuizCardProps) {
  const CardContent = () => (
    <div className={`relative h-full rounded-2xl border-2 ${borderColor} overflow-hidden transition-transform hover:scale-[1.02] ${color}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-full bg-white/80 shadow-sm">
            {icon}
          </div>
          {comingSoon && (
            <span className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full font-medium">
              Coming Soon
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 black-han-sans">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        
        {!comingSoon && (
          <div className="flex items-center text-purple-700 font-medium">
            Start Quiz <ArrowRight className="ml-1 w-4 h-4" />
          </div>
        )}
      </div>
      
      <div className="relative h-40 w-full mt-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-b-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      {comingSoon && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="px-4 py-2 bg-black text-white rounded-md font-medium">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );

  if (comingSoon) {
    return <div className="cursor-not-allowed">{CardContent()}</div>;
  }

  return (
    <Link href={href}>
      {CardContent()}
    </Link>
  );
} 