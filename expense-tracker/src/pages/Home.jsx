import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { LineChart, Shield, Smartphone, Zap, Wallet, Users } from 'lucide-react';

export default function Home() {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const features = [
    {
      icon: <LineChart className="h-8 w-8 text-indigo-500" />,
      title: 'Insightful Analytics',
      description: 'Visualize your spending with beautiful, easy-to-understand charts and reports.',
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-500" />,
      title: 'Quick Entry',
      description: 'Log transactions in seconds with our streamlined and intuitive interface.',
    },
    {
      icon: <Wallet className="h-8 w-8 text-indigo-500" />,
      title: 'Smart Budgets',
      description: 'Create custom budgets that are easy to set, track, and adjust as you go.',
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-500" />,
      title: 'Syncs Everywhere',
      description: 'Access your financial data from any device, anytime, with seamless cloud sync.',
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: 'Bank-Level Security',
      description: 'Your data is protected with 256-bit encryption. Your privacy is our priority.',
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: 'Collaborate (Soon)',
      description: 'Share your financial journey with a partner or financial advisor securely.',
    },
  ];

  const testimonials = [
    {
      quote: "This app has completely changed how I see my finances. For the first time, I feel in control. The UI is just brilliant.",
      author: "Sarah L.",
      title: "Freelance Designer",
      avatar: "SL"
    },
    {
      quote: "I've tried them all, and ExpenseTracker is hands-down the easiest and most powerful tool for managing a personal budget.",
      author: "Mike R.",
      title: "Small Business Owner",
      avatar: "MR"
    }
  ];

  return (
    <div className="bg-background text-primary antialiased" style={{
      backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
    }}>
      {/* --- Hero Section --- */}
      <main className="relative overflow-hidden pt-16 sm:pt-14 lg:pt-22" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                            <span className="block">Clarity for your</span>
                            <span className="block text-indigo-600 mt-1">Cash Flow</span>
                        </h1>
                        <p className="mt-4 text-lg text-primary/70 sm:mt-5 sm:text-xl lg:text-lg">
                            ExpenseTracker is the simplest way to manage your personal finances. Gain insights, save more, and achieve your financial goals.
                        </p>
                        <div className="mt-8">
                            {!user && (<button
                                onClick={() => openSignIn()}
                                className="px-8 py-4 text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg transition-transform hover:scale-105"
                            >
                                Get Started for Free
                            </button>)}
                        </div>
                    </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-6">
                    <div className="w-full h-auto  bg-transparent">
                        <img 
                            src={"/cashflowmoney.png"} 
                            alt="Cash Flow Money" 
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* --- Features Section --- */}
      <section id="features" className="py-20 sm:py-28 bg-surface ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary">A better way to manage money</h2>
            <p className="mt-4 text-lg text-primary/70 max-w-2xl mx-auto">
                ExpenseTracker is packed with features to help you understand your finances like never before.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 p-6 bg-background rounded-2xl border border-black/5 hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-indigo-100 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary">{feature.title}</h3>
                    <p className="mt-1 text-sm text-primary/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-primary">Loved by users worldwide</h2>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
                {testimonials.map((testimonial) => (
                    <blockquote key={testimonial.author} className="p-8 bg-surface rounded-2xl shadow-lg">
                        <p className="text-lg text-primary/80">&ldquo;{testimonial.quote}&rdquo;</p>
                        <footer className="mt-6 flex items-center gap-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                                {testimonial.avatar}
                            </div>
                            <div>
                                <p className="font-semibold text-primary">{testimonial.author}</p>
                                <p className="text-sm text-primary/70">{testimonial.title}</p>
                            </div>
                        </footer>
                    </blockquote>
                ))}
            </div>
        </div>
      </section>

      {/* --- Final CTA & Footer --- */}
      <footer className="bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to dive in?</h2>
          <p className="mt-4 text-lg text-white/70">
            Start tracking your expenses today and build a brighter financial future.
          </p>
          <button onClick={() => openSignIn()} className="mt-8 px-8 py-4 font-medium rounded-full bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg transition-transform hover:scale-105">
            Sign Up Now
          </button>
        </div>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-white/50 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

