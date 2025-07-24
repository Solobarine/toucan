import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  Clock,
  HelpCircle,
  Bug,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Twitter,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: "",
      priority: "medium",
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@toucanapp.io",
      response: "Usually responds within 24 hours",
      color: "blue",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 6 PM PST",
      response: "Instant response during business hours",
      color: "green",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-TOUCAN",
      response: "Available Monday - Friday",
      color: "purple",
    },
  ];

  const supportCategories = [
    {
      icon: HelpCircle,
      title: "General Support",
      description: "Questions about using Toucan",
      value: "general",
    },
    {
      icon: Bug,
      title: "Bug Report",
      description: "Report technical issues",
      value: "bug",
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Report harmful content or users",
      value: "safety",
    },
    {
      icon: Users,
      title: "Account Issues",
      description: "Problems with your account",
      value: "account",
    },
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer:
        'Go to the login page and click "Forgot Password". Enter your email and follow the instructions sent to your inbox.',
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        'Click the three dots menu on any post or comment and select "Report". Choose the appropriate reason and submit.',
    },
    {
      question: "Can I delete my account permanently?",
      answer:
        "Yes, go to Settings > Account > Delete Account. This action cannot be undone and all your data will be permanently removed.",
    },
    {
      question: "How do I change my privacy settings?",
      answer:
        "Navigate to Settings > Privacy to control who can see your profile, posts, and contact you.",
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter", url: "https://x.com/SolomonAkpuru" },
    { icon: Github, label: "GitHub", url: "https://github.com/solobarine" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/solomon-akpuru",
    },
    { icon: Globe, label: "Blog", url: "https://blog.toucanapp.io" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We're here to help! Reach out to us with any questions, feedback, or
            concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Get in Touch
            </h2>

            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-${method.color}-100 dark:bg-${method.color}-900/30 rounded-xl flex items-center justify-center`}
                  >
                    <method.icon
                      className={`w-6 h-6 text-${method.color}-600 dark:text-${method.color}-400`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                      {method.description}
                    </p>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      {method.contact}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                      {method.response}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Office Hours */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Support Hours
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Monday - Friday
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    9:00 AM - 6:00 PM PST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Saturday
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    10:00 AM - 4:00 PM PST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Sunday
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200"
                  >
                    <social.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {social.label}
                    </span>
                    <ExternalLink className="w-3 h-3 text-neutral-500 ml-auto" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {supportCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                Emergency or Safety Issues
              </h3>
              <p className="text-red-800 dark:text-red-200 text-sm mb-4">
                If you're experiencing harassment, threats, or other safety
                concerns, please contact us immediately.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:safety@toucanapp.io"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  safety@toucanapp.io
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Emergency Hotline
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
