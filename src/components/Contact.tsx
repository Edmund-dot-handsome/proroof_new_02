import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent double submissions
    if (loading) return;
    
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: String(formData.get('name') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        address: String(formData.get('address') || '').trim(),
        preferred_time: String(formData.get('preferred_time') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        source_page: window.location.pathname,
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      };

      if (!data.name || !data.phone) {
        setMessage('Please fill in Name and Phone.');
        setIsSuccess(false);
        return;
      }

      // Basic phone validation
      const phonePattern = /^[0-9+\-\s]{7,}$/;
      if (!phonePattern.test(data.phone)) {
        setMessage('Please enter a valid phone number.');
        setIsSuccess(false);
        return;
      }

      const response = await fetch('/.netlify/functions/inspections-insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Get response text and try to parse as JSON
      const responseText = await response.text();
      let responseData: any = null;
      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        // Response is not JSON, that's okay
      }

      if (response.ok) {
        // Success (2xx status codes)
        setMessage('Submitted! We\'ll contact you soon.');
        setIsSuccess(true);
        
        // Reset form only on success and guard against null
        const form = e.currentTarget;
        if (form) {
          form.reset();
        }
      } else {
        // Error response
        const errorMessage = responseData?.message || responseData?.error || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

    } catch (err: any) {
      console.error('Form submission error:', err);
      const errorMessage = err?.message ? `Submit failed: ${err.message}` : 'Network error. Please check your connection and try again.';
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inspection" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Your Free Roof Inspection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact us today for a free on-site inspection and quotation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* Left Column: Form Card */}
          <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-200 p-5 md:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Request Free Inspection
            </h3>
            
            {/* Message Display */}
            <div aria-live="polite">
              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center ${
                  isSuccess 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {isSuccess ? (
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  )}
                  {message}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="^[0-9+\-\s]{7,}$"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address/Area
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  id="preferred_time"
                  name="preferred_time"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                >
                  <option value="">Select preferred time</option>
                  <option value="Morning (9–12)">Morning (9–12)</option>
                  <option value="Afternoon (12–3)">Afternoon (12–3)</option>
                  <option value="Evening (3–6)">Evening (3–6)</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Describe your issue: dripping during rain, stains on ceiling, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none outline-none transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {loading ? 'Submitting…' : 'Request Free Inspection'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                We'll WhatsApp/call you within 1 working day.
              </p>
            </form>
          </div>

          {/* Right Column: Alternative Contact Options */}
          <div className="space-y-8">
            {/* OR Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-2xl font-bold text-gray-400">OR</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Contact Title */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact us now for free inspection:
              </h3>
            </div>
            
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/60178897151?text=I%20am%20interested%20in%20Free%20Inspection%20/%20Roof%20Leaking%20Repair.%0Ahttps%3A%2F%2Fproroof.my%2F%0A%0AName%3A%0AProblem%3A%0ABest%20Time%20for%20Inspection%20%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 w-full shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              WhatsApp Us
            </a>
          

            {/* Address Card */}
            <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-red-600 mr-2" />
                Visit Our Office
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Lot 10348, Jalan Bendahara 38, Off,<br />
                  Jalan Sungai Jati, 41200 Klang, Selangor
                </p>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-red-600 mr-2" />
                  <span>Sales/Service: 017-889 7151</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-red-600 mr-2" />
                  <span>Hours: Mon–Sat 9:00–18:00</span>
                </div>
              </div>
              
              {/* Google Map Embed - Hidden on mobile */}
              <div className="hidden lg:block mt-4">
                <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Map placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;