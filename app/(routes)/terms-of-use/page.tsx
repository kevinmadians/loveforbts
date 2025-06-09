import React from "react"

export default function TermsOfUsePage() {
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black text-center black-han-sans">
        Terms of Use
      </h1>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Introduction</h2>
            <p className="mb-3">
              Welcome to Love for BTS. These Terms of Use govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
            </p>
            <p>
              Please read these terms carefully before using our website. If you do not agree to these terms, please do not use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Website Use</h2>
            <p className="mb-3">By using this website, you agree to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will not use our website for any illegal or unauthorized purpose</li>
              <li>You will not violate any laws in your jurisdiction</li>
              <li>You will not post or transmit any content that is offensive, harmful, or infringes on the rights of others</li>
              <li>You will not attempt to gain unauthorized access to our systems or user accounts</li>
              <li>You will not collect or harvest any personal information from users of the site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">User-Generated Content</h2>
            <p className="mb-3">
              Our website allows users to submit messages, create ARMY cards, and interact with other features. By submitting content to our site, you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content</li>
              <li>Represent that you own or have the necessary rights to the content you submit</li>
              <li>Understand that we may moderate content and remove anything deemed inappropriate</li>
              <li>Accept responsibility for any content you submit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Intellectual Property</h2>
            <p className="mb-3">
              This website contains trademarks, logos, and other intellectual property that are protected by copyright and other laws. The content, design, and layout of the website are owned by us or our licensors and may not be copied, reproduced, or distributed without permission.
            </p>
            <p>
              We acknowledge that "BTS" and related trademarks are owned by HYBE Corporation. This is a fan site and is not affiliated with or endorsed by BTS or HYBE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Disclaimer of Warranties</h2>
            <p className="mb-3">
              Our website is provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We do not guarantee that our website will be uninterrupted, error-free, or that defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in connection with your use of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Changes to These Terms</h2>
            <p>
              We may update these Terms of Use from time to time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us via our Contact page.
            </p>
          </section>

          <p className="text-sm text-gray-600 italic mt-8">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
} 
