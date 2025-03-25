"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const TermsAndConditions: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Ernyg Logo"
                width={120}
                height={40}
                className="w-auto h-8"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Terms and Conditions
        </h1>

        <section className="mb-8">
          <p className="mb-4">
            {
              " Welcome to Ernyg. These terms and conditions outline the rules and regulations for the use of Ernyg's website."
            }
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Acceptance of Terms
          </h2>
          <p>
            By accessing this website, we assume you accept these terms and
            conditions. If you do not agree to these terms, feel free to stay
            away.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Use of the Website
          </h2>
          <h3 className="text-xl font-medium mb-3 text-gray-300">License:</h3>
          <p className="mb-4">
            Unless otherwise stated, Ernyg and/or its licensors own the
            intellectual property rights for all material on Ernyg. All
            intellectual property rights are reserved.
          </p>
          <p className="mb-4">
            You may access this from Ernyg for your own personal use subjected
            to restrictions set in these terms and conditions.
          </p>

          <p className="mb-4">
            Ernyg allows you to access and use the Website for referrals,
            informational and non-commercial purposes.
          </p>

          <p className="font-medium mb-2">You must not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Copy or republish material from Ernyg</li>
            <li>Sell, rent, or sub-license material from Ernyg</li>
            <li>Reproduce, duplicate or copy material from Ernyg</li>
            <li>Redistribute content from Ernyg</li>
          </ul>
          <p>This Agreement shall begin on the date hereof.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Prohibited Activities
          </h2>
          <p className="mb-2">
            You agree not to engage in any of the following activities:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Attempting to gain unauthorised access to the Website or its
              servers
            </li>
            <li>Using the Website for any illegal or unethical purposes</li>
            <li>Transmitting harmful code or malware</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Links to Third-Party Websites
          </h2>
          <p className="mb-4">
            The Website may contain links to third-party websites of clients or
            other service providers. Ernyg is not responsible for the content or
            practices of these websites. You are responsible for any incurring
            risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Cookies</h2>
          <p className="mb-4">
            The website uses cookies to help personalize your online experience.
            By accessing Ernyg, you agreed to use the required cookies.
          </p>
          <p className="mb-4">
            A cookie is a text file that is placed on your hard disk by a web
            page server. Cookies cannot be used to run programs or deliver
            viruses to your computer. Cookies are uniquely assigned to you and
            can only be read by a web server in the domain that issued the
            cookie to you.
          </p>
          <p className="mb-4">
            We may use cookies to collect, store, and track information for
            statistical or marketing purposes to operate our website. You have
            the ability to accept or decline optional Cookies. There are some
            required Cookies that are necessary for the operation of our
            website. These cookies do not require your consent as they always
            work. Please keep in mind that by accepting required Cookies, you
            also accept third-party Cookies, which might be used via third-party
            provided services if you use such services on our website, for
            example, a video display window provided by third parties and
            integrated into our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Hyperlinking to our Content
          </h2>
          <p className="mb-4">
            The following organizations may link to our Website without prior
            written approval:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>Online directory distributors</li>
            <li>System-wide Accredited Businesses</li>
          </ul>

          <p className="mb-4">
            These organizations may link to our home page, to publications, or
            to other Website information so long as the link:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>is not in any way deceptive</li>
            <li>
              does not falsely imply sponsorship, endorsement, or approval of
              the linking party and its products and/or services
            </li>
            <li>fits within the context of the linking party's site</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Content Liability
          </h2>
          <p className="mb-4">
            We shall not be held responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that are raised on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene, or criminal,
            or which infringes, otherwise violates, or advocates the
            infringement or other violation of, any third party rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Disclaimer</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Limit or exclude our or your liability for death or personal
              injury
            </li>
            <li>
              Limit or exclude our or your liability for fraud or fraudulent
              misrepresentation
            </li>
            <li>
              Limit any of our or your liabilities in any way that is not
              permitted under applicable law
            </li>
            <li>
              Exclude any of our or your liabilities that may not be excluded
              under applicable law
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at:
          </p>
          <ul className="list-none pl-6">
            <li>Email: contact@ernyg.com</li>
            <li>Phone: +91 6305159274</li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ernyg. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
