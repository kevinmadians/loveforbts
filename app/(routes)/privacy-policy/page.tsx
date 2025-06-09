import React from "react"

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black text-center black-han-sans">
        Privacy Policy
      </h1>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Introduction</h2>
            <p className="mb-3">
              Welcome to Love for BTS. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
            <p>
              Please read this policy carefully to understand our practices regarding your personal data and how we will treat it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and country when you submit messages or create an ARMY card.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including page views and features used.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience on our site. See our Cookie Policy for more details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our website and services</li>
              <li>Display user-submitted content such as messages and ARMY cards</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Data Sharing and Disclosure</h2>
            <p className="mb-3">
              We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and the safety of our users</li>
              <li>With your consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to restrict or object to processing of your personal data</li>
              <li>The right to data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us via our Contact page.
            </p>
          </section>

          <p className="text-sm text-gray-600 italic mt-8">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
} 
