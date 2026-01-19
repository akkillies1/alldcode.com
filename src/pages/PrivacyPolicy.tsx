import { SEO } from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Privacy Policy"
        description="Learn how DPL Homestar and DCODE Private Limited collect, use, and protect your personal information."
      />

      <main className="container-custom py-16 md:py-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: 19 January 2026
        </p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
          <p>
            This Privacy Policy explains how <strong className="text-foreground">DPL Homestar</strong>, a brand
            of <strong className="text-foreground">DCODE Private Limited</strong> (“we”, “us”, “our”), collects,
            uses, and protects your personal information when you interact with
            our website and services. By using our website, submitting an
            enquiry, or interacting with us, you agree to the practices
            described here.
          </p>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              1. Who we are
            </h2>
            <p>
              <strong className="text-foreground">DCODE Private Limited</strong>
              <br />
              24/1701, Door No 14/22AB4, Suite No 883,
              <br />
              2nd Floor, KC Arcade, Near TV Center,
              <br />
              Cochin Special Economic Zone,
              <br />
              Ernakulam, Kerala 682037, India
              <br />
              <br />
              Email:{" "}
              <a
                href="mailto:info@dplhomestar.com"
                className="text-accent hover:underline"
              >
                info@dplhomestar.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              2. What information we collect
            </h2>
            <p className="mb-2 font-medium text-foreground">
              Information you provide directly
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (including country code)</li>
              <li>Location (e.g., city, state, country)</li>
              <li>Project details / message</li>
            </ul>
            <p className="mt-4 mb-2 font-medium text-foreground">
              Information collected automatically
            </p>
            <p>
              When you visit our website, we may automatically receive
              technical information such as browser or device type, approximate
              location (IP-based), pages visited, and time spent on the site.
              If we use analytics tools, this may involve cookies or similar
              technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              3. How we use your information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Responding to your enquiries and scheduling consultations</li>
              <li>Planning, designing, and executing projects you are interested in</li>
              <li>Improving our services and website experience</li>
              <li>Maintaining internal records and complying with legal requirements</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-foreground">not</strong> sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              4. How we store and process data
            </h2>
            <p>We use reputable third-party providers, including:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong className="text-foreground">Supabase</strong> – for storing form
                submissions (leads) and managing our internal CMS.
              </li>
              <li>
                <strong className="text-foreground">Brevo (formerly Sendinblue)</strong> – to send
                email notifications when you submit a form.
              </li>
              <li>
                <strong className="text-foreground">Hosting &amp; deployment providers</strong>{" "}
                (for example, Vercel) – to serve our website.
              </li>
            </ul>
            <p className="mt-3">
              These providers may process data on servers located outside
              India. While we select providers that implement appropriate
              security measures, the data protection laws in those countries
              may differ from those in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              5. Email communications
            </h2>
            <p>
              When you submit an enquiry, we may send you transactional emails
              to confirm receipt and follow up. We do not add you to bulk
              marketing lists without your consent. If you ever receive a
              marketing-style email, you can unsubscribe using the link in the
              email or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              6. Social media (Instagram)
            </h2>
            <p>
              We maintain a presence on Instagram at{" "}
              <strong className="text-foreground">@dplhomestar</strong>. Your
              interactions with us there are also governed by Instagram’s own
              privacy policy. We may view and respond to your public comments,
              messages, or profile information that you choose to share.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              7. Cookies and tracking
            </h2>
            <p>We may use the following types of cookies or similar technologies:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong className="text-foreground">Essential cookies</strong> – required for core
                site functionality and security.
              </li>
              <li>
                <strong className="text-foreground">Analytics cookies</strong> – help us understand
                how visitors use the website so we can improve content and performance.
              </li>
              <li>
                <strong className="text-foreground">Marketing / retargeting cookies</strong> (if
                enabled) – used to measure and improve the effectiveness of campaigns.
              </li>
            </ul>
            <p className="mt-3">
              You can disable cookies in your browser settings at any time.
              If we enable non-essential cookies (such as analytics or
              marketing), we will present a cookie banner or preference option
              that lets you opt in or opt out. Some features of the site may
              not function correctly without essential cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              8. Children’s data
            </h2>
            <p>
              Our website and services are{" "}
              <strong className="text-foreground">not directed to children under 18</strong>, and
              we do not knowingly collect personal information from children.
              If you believe we have collected data from a child, please
              contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              9. Legal basis for processing (for GDPR-like regions)
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong className="text-foreground">Contract / legitimate interest</strong> – responding
                to your enquiries, providing requested information, operating
                and improving our website and services.
              </li>
              <li>
                <strong className="text-foreground">Consent</strong> – use of analytics or marketing
                cookies where applicable, and any optional marketing
                communications.
              </li>
              <li>
                <strong className="text-foreground">Legal obligation</strong> – record-keeping or
                compliance where required by law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              10. Data retention
            </h2>
            <p>
              We retain your information only for as long as necessary to
              respond to enquiries, manage ongoing project discussions, and
              meet legal, accounting, or regulatory obligations. If you would
              like us to delete your information sooner, you can contact us
              using the details above.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              11. How we protect your information
            </h2>
            <p>
              We take reasonable technical and organizational measures to
              protect your data, including using reputable hosting and
              database providers, restricting access to authorized team
              members, and using secure connections (HTTPS) where possible.
              However, no method of transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              12. Your rights
            </h2>
            <p>
              Depending on your local laws, you may have rights to access,
              correct, delete, or restrict the processing of your personal
              data, and to object to certain types of processing. To exercise
              these rights or ask questions about this policy, please contact:{" "}
              <a
                href="mailto:info@dplhomestar.com"
                className="text-accent hover:underline"
              >
                info@dplhomestar.com
              </a>
              . We may need to verify your identity before fulfilling your
              request.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              13. International data transfers
            </h2>
            <p>
              By using our website, you consent to the transfer of your
              information to countries outside India where our service
              providers operate, which may have different data protection
              laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              14. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will update the “Last updated” date at the top of this page.
              We encourage you to review this policy periodically to stay
              informed about how we protect your information.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

