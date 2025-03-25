import Footer from "@/components/footer";
import LegalNavbar from "@/components/legal-navbar";
import React from "react";

export default function PrivacyPage() {
  return (
    <>
      <LegalNavbar />
      <div className="min-h-screen bg-black text-white">
        <div className="about-section bg-black text-white flex flex-col gap-6 justify-center items-center py-10 sm:py-20 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center font-mont">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center font-mont">
            Updated on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="prose prose-invert prose-lg w-full font-mont">
            <section className="mb-8">
              <p className="mb-4">
                Ernyg website is owned by Ernyg Tech Private Limited, which is a
                data controller of your personal data.
              </p>
              <p className="mb-4">
                We have adopted this Privacy Policy, which determines how we are
                processing the information collected by Ernyg, which also
                provides the reasons why we must collect certain personal data
                about you. Therefore, you must read this Privacy Policy before
                using Ernyg website.
              </p>
              <p className="mb-4">
                We take care of your personal data and undertake to guarantee
                its confidentiality and security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Personal information we collect
              </h2>
              <p className="mb-4">
                When you visit the Ernyg, we automatically collect certain
                information about your device, including information about your
                web browser, IP address, time zone, and some of the installed
                cookies on your device. Additionally, as you browse the Site, we
                collect information about the individual web pages or products
                you view, what websites or search terms referred you to the
                Site, and how you interact with the Site. We refer to this
                automatically-collected information as &quot;Device
                Information.&quot;
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Why do we process your data?
              </h2>
              <p className="mb-4">
                Client data security is important to us, and, as such, we may
                process only minimal user data, only as much as it is absolutely
                necessary to maintain the website. Information collected
                automatically is used only to identify potential cases of abuse
                and establish statistical information regarding website usage.
                This statistical information is not otherwise aggregated in such
                a way that it would identify any particular user of the system.
              </p>
              <p className="mb-4">
                You can visit the website without telling us who you are or
                revealing any information, by which someone could identify you
                as a specific, identifiable individual. If, however, you wish to
                use some of the website&apos;s features, or you wish to receive
                our newsletter or provide other details by filling a form, you
                may provide personal data to us, such as your email, first name,
                last name, city of residence, organization, telephone number.
                You can choose not to provide us with your personal data, but
                then you may not be able to take advantage of some of the
                website&apos;s features. For example, you won&apos;t be able to
                receive our Newsletter or contact us directly from the website.
              </p>
              <p className="mb-4">
                Users who are uncertain about what information is mandatory are
                welcome to contact us via contact@ernyg.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Your rights
              </h2>
              <p className="mb-4">
                If you are a European resident, you have the following rights
                related to your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to be informed.</li>
                <li>The right of access.</li>
                <li>The right to rectification.</li>
                <li>The right to erasure.</li>
                <li>The right to restrict processing.</li>
                <li>The right to data portability.</li>
                <li>The right to object.</li>
                <li>
                  Rights in relation to automated decision-making and profiling.
                </li>
              </ul>
              <p className="mb-4">
                If you would like to exercise this right, please contact us
                through the contact information below.
              </p>
              <p className="mb-4">
                Additionally, if you are a European resident, we note that we
                are processing your information in order to fulfill contracts we
                might have with you (for example, if you make an order through
                the Site), or otherwise to pursue our legitimate business
                interests listed above. Additionally, please note that your
                information might be transferred outside of Europe, including
                Canada and the United States.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Links to other websites
              </h2>
              <p className="mb-4">
                Our website may contain links to other websites that are not
                owned or controlled by us. Please be aware that we are not
                responsible for such other websites or third parties&apos;
                privacy practices. We encourage you to be aware when you leave
                our website and read the privacy statements of each website that
                may collect personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Information security
              </h2>
              <p className="mb-4">
                We secure information you provide on computer servers in a
                controlled, secure environment, protected from unauthorized
                access, use, or disclosure. We keep reasonable administrative,
                technical, and physical safeguards to protect against
                unauthorized access, use, modification, and personal data
                disclosure in its control and custody. However, no data
                transmission over the Internet or wireless network can be
                guaranteed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Legal disclosure
              </h2>
              <p className="mb-4">
                We will disclose any information we collect, use or receive if
                required or permitted by law, such as to comply with a subpoena
                or similar legal process, and when we believe in good faith that
                disclosure is necessary to protect our rights, protect your
                safety or the safety of others, investigate fraud, or respond to
                a government request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-mont">
                Contact information
              </h2>
              <p className="mb-4">
                If you would like to contact us to understand more about this
                Policy or wish to contact us concerning any matter relating to
                individual rights and your Personal Information, you may send an
                email to contact@ernyg.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
