"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "What is SOHABI and who is it for?",
    answer:
      "SOHABI is a friendship and coffee-time app for people who want low-pressure ways to meet nearby. It is for students, new-city movers, remote workers, cafe lovers, and anyone who wants real social moments without awkwardness.",
  },
  {
    question: "How does SOHABI help me make friends?",
    answer:
      "SOHABI uses interests, mood, location, and availability to suggest people and small plans. Instead of forcing a big meetup, it helps you start with easy invitations like coffee, study time, a walk, or a group hangout.",
  },
  {
    question: "What is Coffee Time?",
    answer:
      "Coffee Time is a lightweight invite format. Pick a vibe, choose a nearby cafe, send the invite, and let the other person accept, suggest another time, or keep chatting first.",
  },
  {
    question: "What's included in Starter?",
    answer:
      "Starter includes discovery cards, basic coffee prompts, chat, one active circle, and safety reminders. It is enough to start meeting people without paying.",
  },
  {
    question: "How does the friend map work?",
    answer:
      "Friend map sharing is opt-in and temporary. You can share live location with trusted friends for a meetup, then stop sharing anytime. It is built for arrival confidence, not tracking.",
  },
  {
    question: "How does SOHABI think about safety?",
    answer:
      "Safety is part of the product: verification, reporting, blocking, friend-only location sharing, and public-place meetup defaults. SOHABI should make meeting people warmer and safer at the same time.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-card border border-border shadow-sm overflow-hidden rounded-[10px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-medium leading-10 break-words">
            Questions before coffee?
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            Everything you need to know before turning a hello into a real-life plan
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
