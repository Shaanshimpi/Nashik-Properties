// src/pages/Contact/Contact.jsx
import React, { useState } from 'react';
import MetaTags from '../../components/common/SEO/MetaTags';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaTags
        title={`Contact Us | ${import.meta.env.VITE_SITE_NAME}`}
        description="Get in touch with our real estate experts. We're here to help you with all your property needs."
        keywords="contact, real estate agent, property consultation, get in touch"
        url={`${import.meta.env.VITE_SITE_URL}/contact`}
      />

      <div className="contact-page">
        <div className="contact-page__hero">
          <h1 className="contact-page__title">Contact Us</h1>
          <p className="contact-page__subtitle">
            Ready to start your property journey? We're here to help.
          </p>
        </div>

        <div className="contact-page__content">
          <div className="contact-page__info">
            <h2>Get in Touch</h2>
            <p>
              Have questions about our properties or need expert advice? 
              Our team is ready to assist you every step of the way.
            </p>

            <div className="contact-page__details">
              <div className="contact-page__detail">
                <div className="contact-page__detail-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 XXXX-XXXX-XX</p>
                </div>
              </div>
              <div className="contact-page__detail">
                <div className="contact-page__detail-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>info@realtywebsite.com</p>
                </div>
              </div>
              <div className="contact-page__detail">
                <div className="contact-page__detail-icon">📍</div>
                <div>
                  <h3>Office</h3>
                  <p>123 Real Estate Street<br />Nashik, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-page__form-container">
            <form onSubmit={handleSubmit} className="contact-page__form">
              <h2>Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="contact-page__success">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="contact-page__error">
                  Something went wrong. Please try again later.
                </div>
              )}

              <div className="contact-page__form-row">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="contact-page__form-row">
                <Input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <select
                  className="contact-page__select"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                >
                  <option value="general">General Inquiry</option>
                  <option value="buying">Buying Property</option>
                  <option value="selling">Selling Property</option>
                  <option value="rental">Rental Inquiry</option>
                </select>
              </div>

              <textarea
                className="contact-page__textarea"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows="5"
                required
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="contact-page__submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;