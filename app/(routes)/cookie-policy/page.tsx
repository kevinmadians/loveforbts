import React from "react"

export default function CookiePolicyPage() {
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black text-center black-han-sans">
        Cookie Policy
      </h1>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">What Are Cookies</h2>
            <p className="mb-3">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <p>
              Most web browsers allow some control of most cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage or delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.allaboutcookies.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">How We Use Cookies</h2>
            <p className="mb-3">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off in our systems.</li>
              <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
              <li><strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization, such as remembering your preferences.</li>
              <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 mt-3">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Cookie Type</th>
                    <th className="px-4 py-2 border">Purpose</th>
                    <th className="px-4 py-2 border">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border font-medium">Session Cookies</td>
                    <td className="px-4 py-2 border">These cookies are temporary and are deleted when you close your browser. They help our website remember what you chose on the previous page.</td>
                    <td className="px-4 py-2 border">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 border font-medium">Persistent Cookies</td>
                    <td className="px-4 py-2 border">These cookies remain on your device after you close your browser. They help our website remember your preferences for the next time you visit.</td>
                    <td className="px-4 py-2 border">1-12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-medium">Analytics Cookies</td>
                    <td className="px-4 py-2 border">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</td>
                    <td className="px-4 py-2 border">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Managing Cookies</h2>
            <p className="mb-3">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site and some services and functionalities may not work.
            </p>
            <p className="mb-3">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.allaboutcookies.org</a>.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <p className="font-medium">To opt out of being tracked by Google Analytics across all websites, visit:</p>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">https://tools.google.com/dlpage/gaoptout</a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Changes to This Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, please contact us via our Contact page.
            </p>
          </section>

          <p className="text-sm text-gray-600 italic mt-8">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
} 