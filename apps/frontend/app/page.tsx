"use client";

import { AnimatedTooltipPreview } from "./components/AnimatedTooltipPreview";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import {
  IconBulb,
  IconCarambola,
  IconHearts,
  IconPlayerPlay,
  IconStarFilled,
  IconUsers,
  IconShield,
  IconClock24,
  IconVideo,
  IconPhone,
  IconMessage,
  IconStar,
  IconArrowRight,
  IconCheck,
  IconMenu2,
  IconX,
  IconBrandGoogle,
  IconBrandFacebook,
  IconMail,
  IconHeart,
  IconCalendarEvent
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const [email, setEmail] = useState('');

  const additionalFeatures = [
    {
      icon: <IconUsers className="w-8 h-8" />,
      title: "Community Connection",
      description: "Join a supportive community where you can share experiences and find people who truly understand."
    },
    {
      icon: <IconShield className="w-8 h-8" />,
      title: "Safe & Private",
      description: "Your conversations are completely private and secure. We prioritize your safety and confidentiality."
    },
    {
      icon: <IconClock24 className="w-8 h-8" />,
      title: "24/7 Available",
      description: "Find support whenever you need it. Our community is active around the clock."
    },
    {
      icon: <IconVideo className="w-8 h-8" />,
      title: "Multiple Ways to Connect",
      description: "Choose how you want to communicate - video calls, voice calls, or text messaging."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "FriendliSpace helped me through my toughest times. The support I received was genuine and life-changing.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100"
    },
    {
      name: "Michael Chen",
      role: "Student",
      content: "I was skeptical at first, but the friends I met here became my support system. Truly grateful for this platform.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      content: "The 24/7 availability saved me during my anxiety attacks. Having someone to talk to anytime is invaluable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your free account and tell us about yourself and what kind of support you're looking for."
    },
    {
      step: "02",
      title: "Get Matched",
      description: "Our algorithm connects you with compatible friends who understand your situation and can provide support."
    },
    {
      step: "03",
      title: "Start Connecting",
      description: "Begin meaningful conversations through video, voice, or text. Build lasting supportive relationships."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "Support Sessions" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "Availability" }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      period: "forever",
      features: [
        "Up to 3 conversations per month",
        "Text messaging support",
        "Community access",
        "Basic matching"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited conversations",
        "Video & voice calls",
        "Priority matching",
        "Advanced privacy features",
        "24/7 crisis support",
        "Personal wellness dashboard"
      ],
      popular: true
    },
    {
      name: "Supporter",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Premium",
        "Become a verified friend",
        "Earn by helping others",
        "Advanced training resources",
        "Special supporter badge"
      ],
      popular: false
    }
  ];

  return (
    <div>
      {/* Your existing beautiful design */}
      <section className="mx-auto container">
        <div className=" xl:w-[52%] md:w-4/6 w-full mx-auto text-center">
          <p className="text-xl font-semibold text-gray-600/90 ">
            Begin your healing!!
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl/tight font-semibold  ">
            A safe space for healing & personal growth
          </h1>
        </div>

        <div className="flex items-center justify-center gap-x-4 md:w-1/2 mx-auto pt-5">
          <Link href="/auth/signup">
            <Button className="cursor-pointer bg-[#3B7385] text-md p-5 hover:bg-[#305763] rounded-xl">
              Get Started
            </Button>
          </Link>
          <div className="flex gap-x-2 text-gray-600 font-semibold items-center">
            <div className="rounded-full p-2 shadow-lg cursor-pointer">
              <IconPlayerPlay stroke={2} />
            </div>
            <p>Watch Video</p>
          </div>
        </div>

        <div className="pt-12 flex gap-x-6 md:w-1/2  justify-center align-middle mx-auto ">
          <div className="my-auto">
            <AnimatedTooltipPreview />
          </div>
          <div className="">
            <p className="font-semibold text-gray-400 text-sm pb-1 ">
              Our Happy Guests
            </p>
            <p className="flex gap-x-2 font-semibold">
              {" "}
              <span>
                <IconStarFilled stroke={2} />
              </span>{" "}
              <span> 4.8 </span> <span>(2,382 reviews)</span>
            </p>
          </div>
        </div>

        <section className="w-[95%] mx-auto overflow-hidden rounded-2xl">
          <Image
            alt=""
            src="/images/hero.avif"
            width={1920}
            height={300}
            className="w-full object-contain h-auto"
          />
        </section>

        {/* introduction */}
        <div className="pt-12 md:pt-22 mx-auto text-center">
          <p className="text-lg font-semibold text-gray-400/90 pb-4 " >
            Introduction
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl/tight lg:text-6xl/tight font-semibold  xl:w-[63%] md:9/12 lg:w-5/6 w-full mx-auto">
            Welcome to a space dedicated to your well-being.
          </h1>
          <div className="flex justify-between gap-x-4 w-full sm:w-11/12  lg:w-4/5 mx-auto pt-18">
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-center w-12 h-12 bg-[#3B7385] rounded-3xl  mx-auto">
                <IconHearts className="text-white" strokeWidth={2} size={24} />
              </div>
              <p className="text-xl font-medium text-gray-600/90">
                Training programs and coaching sessions tailored to your workforce
                & ideas.
              </p>
            </div>
            <div  className="space-y-4 p-2">
              <div className="flex items-center justify-center w-12 h-12 bg-[#3B7385] rounded-3xl mx-auto">
                <IconCarambola className="text-white" stroke={2} />
              </div>
              <p className="text-xl font-medium text-gray-600/90">
                Comprehensive and engaging sessions designed to meet the unique
                needs of team.
              </p>
            </div>
            <div  className="space-y-4 p-2">
              <div className="flex items-center justify-center w-12 h-12 bg-[#3B7385] rounded-3xl  mx-auto">
                <IconBulb className="text-white" stroke={2} />
              </div>
              <p className="text-xl font-medium text-gray-600/90">
                Innovative strategies and ideas crafted to individuals and
                organizational success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections below your existing design */}

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-[#3B7385] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">More Ways We Support You</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover additional features that make FriendliSpace the perfect platform for your mental health journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow text-center">
                <div className="text-[#3B7385] mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Follow these three easy steps to begin your support journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#3B7385] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from people who found the support they needed through our platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <IconStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start for free or upgrade for premium features. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full relative ${plan.popular ? 'border-[#3B7385] border-2' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#3B7385] text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-[#3B7385] mb-1">{plan.price}</div>
                    <p className="text-gray-600">{plan.period}</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <IconCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup">
                    <Button 
                      className={`w-full ${plan.popular 
                        ? 'bg-[#3B7385] hover:bg-[#305763]' 
                        : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#3B7385] rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get the latest updates, mental health tips, and community stories delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-gray-900"
            />
            <Button className="bg-white text-[#3B7385] hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-[#3B7385] rounded-lg flex items-center justify-center">
                  <IconHeart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FriendliSpace</span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting hearts, supporting minds, building friendships that heal.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <IconBrandFacebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <IconBrandGoogle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                  <IconMail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/friends" className="hover:text-white transition-colors">Find Friends</Link></li>
                <li><Link href="/sessions" className="hover:text-white transition-colors">Sessions</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/crisis" className="hover:text-white transition-colors">Crisis Support</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FriendliSpace. All rights reserved. Made with ❤️ for mental health support.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
