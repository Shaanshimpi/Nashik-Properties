// src/pages/BusinessModel/BusinessModel.jsx
import React from 'react';
import MetaTags from '../../components/common/SEO/MetaTags';
import { useEffect } from 'react';
import './BusinessModel.css';

const BusinessModel = () => {
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <MetaTags
        title={`Business Model | ${import.meta.env.VITE_SITE_NAME}`}
        description="Discover our innovative business model, franchise opportunities, and exclusive lifetime membership benefits."
        keywords="business model, franchise opportunity, real estate, lifetime membership, property investment"
        url={`${import.meta.env.VITE_SITE_URL}/business-model`}
      />

      <div className="business-model-page">
        <div className="business-model-page__hero">
          <h1 className="business-model-page__title">Business Model</h1>
          <p className="business-model-page__subtitle">
            Innovative approaches to real estate that benefit everyone
          </p>
        </div>

        <div className="business-model-page__content">
          {/* Business Model Section */}
          <section className="business-model-page__section">
            <div className="business-model-page__section-header">
              <h2>Our Business Model</h2>
              <p>Nashik Property Club operates on a hybrid professional-community model</p>
            </div>

            <div className="business-model-page__cards">
              <div className="business-model-page__card">
                <div className="business-model-page__card-icon">🏢</div>
                <h3>Sole Selling Projects</h3>
                <p>Partner with builders and developers to become the exclusive sales & marketing agency. Revenue through commissions and marketing retainers.</p>
              </div>

              <div className="business-model-page__card">
                <div className="business-model-page__card-icon">🎓</div>
                <h3>Training & Mentorship</h3>
                <p>Paid workshops, site visits, and training sessions for students and early professionals.</p>
              </div>

              <div className="business-model-page__card">
                <div className="business-model-page__card-icon">👥</div>
                <h3>Membership Plans</h3>
                <p>Offer lifetime and annual membership with exclusive benefits and privileges.</p>
              </div>

              <div className="business-model-page__card">
                <div className="business-model-page__card-icon">🌐</div>
                <h3>Franchise Expansion</h3>
                <p>NPC can be replicated in other cities as independent franchises with shared branding and strategy.</p>
              </div>

              <div className="business-model-page__card">
                <div className="business-model-page__card-icon">🤝</div>
                <h3>Collaborations & Promotions</h3>
                <p>Partner with banks, legal advisors, Vastu consultants, and property platforms for mutual growth and referral income.</p>
              </div>
            </div>
          </section>

          {/* Franchise Opportunity Section */}
          <section className="business-model-page__section business-model-page__section--alt">
            <div className="business-model-page__section-header">
              <h2>Franchise Opportunity</h2>
              <p>Join our network and scale across cities with the NPC Franchise Model</p>
            </div>

            <div className="business-model-page__franchise-grid">
              <div className="business-model-page__franchise-item">
                <h3>Who can apply</h3>
                <ul>
                  <li>Real estate agents</li>
                  <li>Engineers</li>
                  <li>Retired professionals</li>
                  <li>Consultants</li>
                </ul>
              </div>

              <div className="business-model-page__franchise-item">
                <h3>What we offer</h3>
                <ul>
                  <li>Branding and marketing material</li>
                  <li>Comprehensive training programs</li>
                  <li>CRM support</li>
                  <li>Access to our database of leads, developers, and SOPs</li>
                </ul>
              </div>

              <div className="business-model-page__franchise-item">
                <h3>Revenue Share</h3>
                <p>Percentage-based model for all sole selling deals and local sponsorships.</p>
              </div>

              <div className="business-model-page__franchise-item">
                <h3>Support</h3>
                <p>End-to-end assistance in project acquisition, team setup, and launch.</p>
              </div>
            </div>
          </section>

          {/* Lifetime Membership Section */}
          <section className="business-model-page__section">
            <div className="business-model-page__section-header">
              <h2>Lifetime Membership Benefits</h2>
              <p>Exclusive advantages for our valued lifetime members</p>
            </div>

            <div className="business-model-page__benefits-grid">
              <div className="business-model-page__benefit-category">
                <h3>💡 Personal & Professional Benefits</h3>
                <ul>
                  <li>Guaranteed Work Opportunities in active property projects</li>
                  <li>Monthly Payouts to support EMI, utilities, bills, and more</li>
                  <li>Unlimited Earning Potential with our B.D.T. Program</li>
                  <li>Financial Freedom to own a home, car, and support your family goals</li>
                </ul>
              </div>

              <div className="business-model-page__benefit-category">
                <h3>👨‍👩‍👧‍👦 Lifestyle & Family Protection</h3>
                <ul>
                  <li>Access to Medical, Term & Accidental Insurance</li>
                  <li>Awareness programs for security, health, and education</li>
                  <li>Team bonding activities: Picnics, Training Camps, Events</li>
                </ul>
              </div>

              <div className="business-model-page__benefit-category">
                <h3>👥 Team & Culture</h3>
                <ul>
                  <li>A strong working system based on teamwork and leadership</li>
                  <li>Opportunities to build your own team and grow</li>
                  <li>Lifetime connection to a community of driven professionals</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support System Section */}
          <section className="business-model-page__section business-model-page__section--alt">
            <div className="business-model-page__section-header">
              <h2>Support System</h2>
              <p>Comprehensive networking and authority structure for success</p>
            </div>

            <div className="business-model-page__support-content">
              <div className="business-model-page__support-intro">
                <h3>Networking Support System</h3>
                <p>Our structured support system ensures seamless communication and accountability from top to bottom and bottom to top, creating a robust framework for success.</p>
              </div>

              <div className="business-model-page__support-features">
                <div className="business-model-page__support-feature">
                  <div className="business-model-page__support-icon">🔄</div>
                  <h4>Two-Way Communication</h4>
                  <p>Clear channels for feedback and guidance flowing in both directions throughout the organization.</p>
                </div>

                <div className="business-model-page__support-feature">
                  <div className="business-model-page__support-icon">📊</div>
                  <h4>Structured Hierarchy</h4>
                  <p>Well-defined roles and responsibilities with accountability at every level of the organization.</p>
                </div>

                <div className="business-model-page__support-feature">
                  <div className="business-model-page__support-icon">🤝</div>
                  <h4>Collaborative Network</h4>
                  <p>Strong connections between all stakeholders - from leadership to new members.</p>
                </div>

                <div className="business-model-page__support-feature">
                  <div className="business-model-page__support-icon">🚀</div>
                  <h4>Growth Framework</h4>
                  <p>Systems designed to support individual growth while maintaining organizational cohesion.</p>
                </div>
              </div>

              <div className="business-model-page__authority-structure">
                <h3>Authority & Responsibilities</h3>
                <p>Our support system follows a clear hierarchy that ensures:</p>
                <ul>
                  <li>Clear delegation of tasks and decision-making power</li>
                  <li>Accountability at every level of the organization</li>
                  <li>Support flowing from experienced members to newcomers</li>
                  <li>Feedback channels from grassroots to leadership</li>
                  <li>Mentorship programs for professional development</li>
                  <li>Regular training and skill enhancement sessions</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BusinessModel;