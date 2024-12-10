import TertiaryHero from "@/components/Heroes/TertiaryHero";
import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import {
  Heading,
  Body,
  Image,
  Section,
} from "@/micros/TertiaryPageMicors/TertiaryPageMicors";
import Head from "next/head";
import ListItem from "@/components/List/ListItem";

import meta from "@/components/Meta/Meta";
import seo from "@/data/tos/seo";

export const metadata = meta(seo);

export default async function Technology() {
  const sidebarData = {
    sections: [
      {
        title: "1. Updating this privacy policy",
        id: "updating-this-privacy-policy",
      },
      {
        title: "2. Your legal rights",
        id: "your-legal-rights",
      },
      {
        title: "3. Company’s collection and use of information",
        id: "company-collection-and-use-of-information",
      },
      {
        title: "4. Legal basis for processing information under the GDPR",
        id: "legal-basis-for-processing-information-under-the-gdpr",
      },
      {
        title: "5. How the company shares your information",
        id: "how-the-company-shares-your-information",
      },
      {
        title: "6. Cookies and other tracking technologies",
        id: "cookies-and-other-tracking-technologies",
      },
      {
        title: "7. User generated content",
        id: "user-generated-content",
      },
      {
        title: "8. Social features",
        id: "social-features",
      },
      {
        title: "9. Third party websites and links",
        id: "third-party-websites-and-links",
      },
      {
        title: "10. Children’s privacy",
        id: "childrens-privacy",
      },
      {
        title: "11. Data security",
        id: "data-security",
      },
      {
        title: "12. Data transfers",
        id: "data-transfers",
      },
      {
        title: "13. Data transfer to non-eu countries",
        id: "data-transfer-to-non-eu-countries",
      },
      {
        title: "14. How long we store your personal information",
        id: "how-long-we-store-your-personal-information",
      },
      {
        title: "15. How to contact us",
        id: "contact-us",
      },
    ],
  };

  return (
    <>
      <TertiaryHero
        title={"Privacy Policy"}
        blurbTitle={"Last Revised on January 16, 2023"}
        blurbCopy={
          <>
            This Privacy Policy for Strange Loop Labs AG (“
            <strong>Company</strong>”, “<strong>we</strong>”, “
            <strong>us</strong>”, or “<strong>our</strong>”) describes how we
            collect, use, and disclose information about users of the Company’s
            website (celestia.org) and any other applications, services, tools
            and features we operate (collectively, the “
            <strong>Services</strong>”). For the purposes of this Privacy
            Policy, “<strong>you</strong>” and “<strong>your</strong>” means you
            as the user of the Services and for the purpose of applicable data
            protection laws, we are the data controller.
          </>
        }
      />

      <TertiaryPageContainer>
        <TertiaryPageContainer.Sidebar>
          <SidebarNavigation anchors={sidebarData} />
        </TertiaryPageContainer.Sidebar>
        <TertiaryPageContainer.Body>
          <Section>
            <Body>
              As we are committed to protect and respect your privacy, the
              following information will provide you an overview of what happens
              to your information that we collect, use, and share in connection
              with the Services and the purposes for which we use it. We are
              aware of the importance of how your data is handled and we assure
              you that we observe all applicable data protection laws, including
              the General Data Protection Regulation (EU) 2016/679 (the “GDPR”)
              and the Liechtenstein Data Protection Act (DPA). If you have any
              questions or concerns regarding data protection in connection with
              your use of Services, you can reach us as the responsible party in
              accordance with the GDPR. Unless otherwise indicated, terms used
              in this Regulation shall have the same meaning as under GDPR.
            </Body>
            <Body>
              Please read this Privacy Policy carefully. By using, accessing, or
              downloading any of the Services, you agree to the collection, use,
              and disclosure of your information as described in this Privacy
              Policy. If you do not agree to this Privacy Policy, please do not
              use, access, or download any of the Services.
            </Body>
          </Section>
          <Section id={"updating-this-privacy-policy"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              1. Updating this privacy policy
            </Heading>
            <Body>
              We may modify this Privacy Policy from time to time in which case
              we will update the “Last Revised” date at the top of this Privacy
              Policy. If we make material changes to the way in which we use
              information we collect, we will use reasonable efforts to notify
              you (such as by emailing you at the last email address you
              provided us, by posting notice of such changes on the Services, or
              by other means consistent with applicable law) and will take
              additional steps as required by applicable law. If you do not
              agree to any updates to this Privacy Policy, please do not access
              or continue to use the Services.
            </Body>
            <Body>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </Body>
          </Section>
          <Section id={"your-legal-rights"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              2. Your legal rights
            </Heading>
            <ListItem lightMode type="number" index={"a"}>
              <Body>Right of access and information</Body>
              <Body>
                You have the right to request from us free confirmation of the
                processing of the data or information in question and to be
                informed of such data and to receive further information and a
                copy of the data in accordance with the provisions of the law.
                The subject of the information is the stored personal data
                themselves, the origin of the data, their recipients, and the
                purpose of the data processing (cf. Art. 15 GDPR).
              </Body>
            </ListItem>
            <ListItem lightMode type="number" index={"b"}>
              <Body>Right of rectification</Body>
              <Body>
                You have the right to correct your data when it is inaccurate or
                incomplete (for example, change your address).
              </Body>
            </ListItem>
            <ListItem lightMode type="number" index={"c"}>
              <Body>Right to cancellation or blocking</Body>
              <Body>
                You have the right to demand from us as the responsible party
                the immediate deletion of the data concerned or, alternatively,
                to demand that the processing of the data be restricted in
                accordance with the statutory provisions (cf. Art. 17, 18 GDPR).
              </Body>
            </ListItem>
            <ListItem lightMode type="number" index={"d"}>
              <Body>Right to data transfer</Body>
              <Body>
                You have the right to demand from us that we hand over to you or
                pass on to third parties the data concerning you which you have
                made available to us in accordance with the statutory provisions
                (cf. Art. 20 GDPR). Direct transfer to another responsible party
                is subject to technical feasibility.
              </Body>
            </ListItem>
            <ListItem lightMode type="number" index={"e"}>
              <Body>Right to object and withdraw your consent</Body>
              <Body>
                You may withdraw consent at any time where we are relying on
                consent to process your data. However, we note that this will
                not affect the lawfulness of any processing carried out before
                you withdraw your consent. If you withdraw your consent, we may
                not be able to provide certain services to you. We will of
                course advise you if this is the case at the time you withdraw
                your consent. At any time, you may withdraw your consent or
                object to the receipt of newsletters and advertising emails, the
                personalization of advertisements or the sharing of your data
                with our partners (except for technical service providers) by
                email request to privacy@celestia.org.
              </Body>
            </ListItem>
            <Body>
              We will not refuse any requests submitted by you to exercise your
              rights without a legal reason.
            </Body>
            <Body>
              We will consider all requests to exercise your rights and provide
              our response without undue delay (and in any event within one
              month of your request unless we tell you we are entitled to a
              longer period allowed by applicable law).
            </Body>
            <Body>
              Certain personal information may be exempt from such requests in
              certain circumstances, for example if we need to keep using the
              information to comply with our own legal obligations or to
              establish, exercise or defend legal claims. If an exception
              applies, we will tell you this when responding to your request.
            </Body>
            <Body>
              We may request you provide us with information necessary to
              confirm your identity before responding to any request you make.
            </Body>
          </Section>
          <Section id={"company-collection-and-use-of-information"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              3. Company’s collection and use of information
            </Heading>
            <Body>
              When you access or use the Services, we may collect, use, store,
              and transfer certain categories of information about you from a
              variety of sources.
            </Body>
            <Body>
              Some features of the Services may require you to directly enter
              certain personal information about yourself. You may elect not to
              provide this personal information but doing so may prevent you
              from using or accessing these features. Personal information that
              you directly submit through our Services may include:
            </Body>
            <ListItem lightMode type="star">
              <Body>Basic contact details.</Body>
              <Body>
                Name and email. We collect basic contact details to communicate
                with you about the Services and send you newsletters with your
                consent.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Account information.</Body>
              <Body>
                Username, password, security questions. We collect account
                information to maintain and secure your account with us in order
                to provide you with certain Services. If you choose to use the
                Services and register an account, you are responsible for
                keeping your account credentials safe. We highly recommend that
                you do not share your username, password, or other access
                details with anyone else. If you believe your account has been
                compromised, please contact us immediately.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Information about your use of the Services.</Body>
              <Body>
                We collect this information to facilitate your engagement with
                the Services, monitor and analyze trends in connection with the
                Services and conduct internal research and development as a
                matter of our legitimate interests.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Any other information you choose to provide.</Body>
              <Body>
                This includes any other information that you choose to include
                in communications with us, for example, when sending us an email
                or completing web forms. We use this information to assess
                and/or facilitate your engagement with the Services, including
                to communicate with you about our Services, personalize your
                experience, monitor, and analyze trends in connection with the
                Services and conduct internal research and development.
              </Body>
            </ListItem>
            <Body>
              Additionally, we may use any of the above information to
              investigate and address conduct that may violate any applicable
              terms of service, comply with legal obligations, cooperate with
              investigations by law enforcement or other authorities of
              suspected violations of law, or to pursue or defend against legal
              claims.
            </Body>
            <Body>
              We also automatically collect certain information about your
              interaction with the Services (“Usage Data”). To do this, we may
              use cookies, web beacons/clear gifs, and tracking technologies
              (“Tracking Technologies”). Usage Data may include:
            </Body>
            <ListItem lightMode type="star">
              Unique device identifier
            </ListItem>
            <ListItem lightMode type="star">
              Device type, such as your phone, computer, or tablet
            </ListItem>
            <ListItem lightMode type="star">
              IP address
            </ListItem>
            <ListItem lightMode type="star">
              Browser type
            </ListItem>
            <ListItem lightMode type="star">
              Date and time stamps, such as the date and time you first accessed
              the Services
            </ListItem>
            <ListItem lightMode type="star">
              Operating system
            </ListItem>
            <ListItem lightMode type="star">
              Log data
            </ListItem>
            <ListItem lightMode type="star">
              Geolocation
            </ListItem>
            <Body>
              We use the information we collect automatically to provide the
              Services and better understand user interaction with the Services.
            </Body>
            <Body>
              We may obtain information about you from third-party sources, and
              may combine information we receive from you with information we
              obtain from third-party sources.
            </Body>
            <Body>
              Any information we receive from third-party sources will be
              treated in accordance with this Privacy Policy. We are not
              responsible or liable for the accuracy of the information provided
              to us by third parties and are not responsible for any third
              party’s policies or practices. See Section 9 below for more
              information.
            </Body>
            <Body>
              In addition to the foregoing, we may use any of the above
              information to comply with any applicable legal obligations,
              improve and develop the Services and our product offerings,
              including as we describe in our Terms of Service
              (https://celestia.org/tos), to enforce any applicable terms of
              service, to protect or defend the Services, our rights, and the
              rights of our users or others, and for the purpose of combatting
              fraud, or to otherwise operate our business.
            </Body>
          </Section>
          <Section id={"legal-basis-for-processing-information-under-the-gdpr"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              4. Legal basis for processing information under the GDPR
            </Heading>
            <Body>
              We may process information and any other data collected by us
              under the following conditions:
            </Body>
            <ListItem lightMode type="star">
              <Body>Performance of a contract:</Body>
              <Body>
                If necessary for the performance of an agreement with you or for
                any pre-contractual obligations thereof.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Legal obligations:</Body>
              <Body>
                If necessary for compliance with a legal obligation to which the
                Company is subject.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Vital interests:</Body>
              <Body>
                If necessary in order to protect your vital interests or those
                of another natural person.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Legitimate interests:</Body>
              <Body>
                If necessary for legitimate interests pursued by the Company.
              </Body>
            </ListItem>
            <ListItem lightMode type="star">
              <Body>Consent:</Body>
              <Body>
                If you have given your consent for us to process information and
                any other data collected by us for one or more specific
                purposes.
              </Body>
            </ListItem>
            <Body>
              In any case, the Company will gladly help to clarify the specific
              legal basis that applies to the processing, and in particular
              whether the provision of data is a statutory requirement or a
              contractual or pre-contractual requirement.
            </Body>
          </Section>
          <Section id={"how-the-company-shares-your-information"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              5. How the company shares your information
            </Heading>
            <Body>
              In certain circumstances, the Company may share your information
              with third parties for legitimate purposes subject to this Privacy
              Policy. Such circumstances may include:
            </Body>
            <ListItem lightMode type="star">
              With vendors or other service providers, such as cloud storage
              providers, security vendors and data analytics vendors in our
              legitimate interests or to perform a contract with you.
            </ListItem>
            <ListItem lightMode type="star">
              With our affiliates or otherwise within our corporate group in our
              legitimate interests or to perform a contract with you. This
              includes in particular our parent company and any other
              subsidiaries, joint venture partners or other companies that we
              control or that are under common control with us.
            </ListItem>
            <ListItem lightMode type="star">
              When you request us to share certain information with third
              parties, such as through your use of social media widgets or login
              integrations.
            </ListItem>
            <ListItem lightMode type="star">
              To comply with applicable law or any obligations thereunder,
              including cooperation with law enforcement, judicial orders, and
              regulatory inquiries.
            </ListItem>
            <ListItem lightMode type="star">
              In connection with an asset sale, merger, bankruptcy, or other
              business transaction in our legitimate interests or as required by
              law.
            </ListItem>
            <ListItem lightMode type="star">
              To enforce any applicable terms of service.
            </ListItem>
            <ListItem lightMode type="star">
              To ensure the safety and security of the Company and/or its users
              in our legitimate interests.
            </ListItem>
            <ListItem lightMode type="star">
              With professional advisors, such as auditors, law firms, or
              accounting firms in our legitimate interests or as required by
              law.
            </ListItem>
          </Section>
          <Section id={"cookies-and-other-tracking-technologies"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              6. Cookies and other tracking technologies
            </Heading>
            <Body>Do Not Track Signals</Body>
            <Body>
              Your browser settings may allow you to transmit a “Do Not Track”
              signal when you visit various websites. Like many websites, our
              website is not designed to respond to “Do Not Track” signals
              received from browsers. To learn more about “Do Not Track”
              signals, you can visit http://www.allaboutdnt.com/.
            </Body>
            <Body>Cookies and Other Tracking Technologies</Body>
            <Body>
              Most browsers accept cookies automatically, but you may be able to
              control the way in which your devices permit the use of Tracking
              Technologies. If you so choose, you may block or delete our
              cookies from your browser; however, blocking or deleting cookies
              may cause some of the Services, including any portal features and
              general functionality, to work incorrectly.
            </Body>
            <Body>
              If you have questions regarding the specific information about you
              that we process or retain, as well as your choices regarding our
              collection and use practices, please contact us using the
              information listed below.
            </Body>
          </Section>
          <Section id={"user-generated-content"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              7. User generated content
            </Heading>
            <Body>
              The Services also include a forum (https://forum.celestia.org/),
              which users may elect to join and/or participate in. The purpose
              of these features is to engage in discussions with other users and
              use the forum as a shared community resource. Through your
              participation, you may submit information (e.g., messages, photos,
              webpages, and other information) (“User-Generated Content” or
              “UGC”). We or others may store, display, reproduce, publish, or
              otherwise use UGC. Others may also have access to UGC and may have
              the ability to share it with third parties. If you choose to
              submit UGC to any public area of the Services, your UGC will be
              considered “public” and will be accessible by anyone, including
              the Company.
            </Body>
            <Body>
              Please note that we do not control who will have access to the
              information that you choose to make available to others and cannot
              ensure that parties who have access to such information will
              respect your privacy or keep it secure. We are not responsible for
              the privacy or security of any information that you make publicly
              available on the features permitting creation of UGC or what
              others do with information you share with them on such platforms.
              We are not responsible for the accuracy, use or misuse of any UGC
              that you disclose or receive from third parties through the forums
              or email lists.
            </Body>
          </Section>
          <Section id={"social-features"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              8. Social features
            </Heading>
            <Body>
              Certain features of the Services permit you to initiate
              interactions between the Services and third-party services or
              platforms, such as social networks (“Social Features”). Social
              Features include features that allow you to click and access the
              Company’s pages on certain third-party platforms, such as Discord
              and Twitter, and from there to “like” or “share” our content on
              those platforms. Use of Social Features may entail a third party’s
              collection and/or use of your data. If you use Social Features or
              similar third-party services, information you post or otherwise
              make accessible may be publicly displayed by the third-party
              service you are using. Both the Company and the third party may
              have access to information about you and your use of both the
              Services and the third-party service. The information that they
              collect about you can be found in the privacy statements of the
              respective third-party providers.
            </Body>
          </Section>
          <Section id={"third-party-websites-and-links"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              9. Third party websites and links
            </Heading>
            <Body>
              We may provide links to websites or other online platforms
              operated by third parties. When you click on a link to any other
              website or location, you will leave our Service and go to another
              website, and another entity may collect data from you. We have no
              control over, do not review, and cannot be responsible for these
              third-party websites or their content. If you follow links to
              sites not affiliated or controlled by us, you should review their
              privacy and security policies and other terms and conditions. We
              do not guarantee and are not responsible for the privacy or
              security of these sites, including the accuracy, completeness, or
              reliability of information found on these sites. Information you
              provide on public or semi-public venues, including information you
              share on third-party social networking platforms (such as Discord
              or Twitter) may also be viewable by other users of the Services
              and/or users of those third-party online platforms without
              limitation as to its use by us or by a third party. Our inclusion
              of such links does not, by itself, imply any endorsement of the
              content on such platforms or of their owners or operators, except
              as disclosed on the Services.
            </Body>
          </Section>
          <Section id={"childrens-privacy"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              10. Children’s privacy
            </Heading>

            <Body>
              Children under the age of 13 are not permitted to use the
              Services, and we do not seek or knowingly collect any personal
              information about children under 13 years of age. If we become
              aware that we have unknowingly collected information about a child
              under 13 years of age, we will make commercially reasonable
              efforts to delete such information from our database.
            </Body>
            <Body>
              If you are the parent or guardian of a child under 13 years of age
              who has provided us with their personal information, you may
              contact us using the below information to request that it be
              deleted.
            </Body>
          </Section>
          <Section id={"data-security"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              11. Data security
            </Heading>
            <Body>
              Please be aware that, despite our reasonable efforts to protect
              your information, no security measures are perfect or
              impenetrable, and we cannot guarantee “perfect security.” Please
              further note that any information you send to us electronically,
              while using the Services or otherwise interacting with us, may not
              be secure while in transit. We recommend that you do not use
              insecure channels to communicate sensitive or confidential
              information to us.
            </Body>
          </Section>
          <Section id={"data-transfers"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              12. Data transfers
            </Heading>
            <Body>
              Personal information may be exported outside of the jurisdiction
              in which you reside. Under those circumstances, the governments,
              courts, law enforcement or regulatory agencies of that country or
              those countries may be able to obtain access to your personal
              information through foreign laws. You need to be aware that the
              privacy standards of those countries may be lower than those of
              the jurisdiction in which you reside. You should note that you are
              not obliged to give your personal information to us, but if you
              choose not to do so, we may not be able to provide our Services,
              or your access to our Services may be limited.
            </Body>
          </Section>
          <Section id={"data-transfer-to-non-eu-countries"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              13. Data transfer to non-eu countries
            </Heading>
            <Body>
              We use tools and services of companies domiciled outside the EU.
              If such tools are active and your personal data is being
              transferred outside the EU, we make sure that the transfer is made
              only to countries that have been declared as offering an adequate
              level of protection through a European Commission decision (an
              “Adequacy Decision”). In absence of an Adequacy Decision,
              appropriate safeguards are in place and asserted by each
              contractual party.
            </Body>
          </Section>
          <Section id={"how-long-we-store-your-personal-information"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              14. How long we store your personal information
            </Heading>
            <Body>
              Unless a more specific storage period has been specified in this
              Privacy Policy, your information and data will remain with us
              until the purpose for which it was collected no longer applies. If
              you assert a justified request for deletion or revoke your consent
              to data processing, your data will be deleted, unless we have
              other legally permissible obligations for storing your personal
              data; in the latter case, the deletion will take place after these
              obligations cease to apply.
            </Body>
          </Section>
          <Section id={"contact-us"}>
            <Heading tag={"h2"} className={"uppercase mb-6"}>
              15. How to contact us
            </Heading>
            <Body>
              If you have any questions about this Privacy Policy, including any
              requests, please use the contact details set out below.
            </Body>
            <Body>
              Full name of legal entity: Strange Loop Labs AG
              <br />
              Registration number: FL-0002.638.646-0
              <br />
              Email address:{" "}
              <a href={"mailto:privacy@celestia.org"}>privacy@celestia.org</a>
              <br />
              Postal address: Pradafant 11, 9490 Vaduz, Liechtenstein
            </Body>
            <Body>
              When you contact us by email, the data you provide (your email
              address, name, and telephone number, if applicable) will be stored
              by us in order to answer your questions. We delete the data
              accruing in this context, if the inquiry is assigned to a
              contract, after the time limits for the term of the contract,
              otherwise after the storage is no longer necessary, or restrict
              the processing if there are legal obligations to retain data. The
              processing of such data is based on Art. 6(1)(b) of the GDPR if
              your request is related to the execution of a contract or if it is
              necessary to carry out pre-contractual measures, and in all other
              cases based on our legitimate interest in the effective processing
              of requests addressed to us (Art. 6(1)(f)) or on your agreement
              (Art. 6(1)(a)).
            </Body>
            <Body>
              You have the right to make a complaint at any time to the
              Liechtenstein’s Data Protection Office (Datenschutzstelle
              Liechtenstein: Städtle 38, Postfach 684, FL-9490 Vaduz, T +423 236
              60 90, <a href={"mailto:info.dss@llv.li"}>info.dss@llv.li</a>,{" "}
              <a href={"https://www.datenschutzstelle.li/"} target="_blank">
                https://www.datenschutzstelle.li/
              </a>
              ). We would, however, appreciate the chance to deal with your
              concerns before you approach the Data Protection Office, so please
              contact us in the first instance.
            </Body>
          </Section>
        </TertiaryPageContainer.Body>
      </TertiaryPageContainer>
    </>
  );
}
