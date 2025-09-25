import TertiaryHero from "@/components/Heroes/TertiaryHero";
import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import { Heading, Body, Image, Section } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";
import Head from "next/head";
import ListItem from "@/components/List/ListItem";

import Meta from "@/components/Meta/Meta";
import seo from "@/data/tos/seo";

export const metadata = Meta(seo);

export default async function Technology() {
	const sidebarData = {
		sections: [
			{
				title: "1. Who may use the services",
				id: "who-may-use-the-services",
			},
			{
				title: "2. The services",
				id: "the-services",
			},
			{
				title: "3. Testnets",
				id: "testnets",
			},
			{
				title: "4. Location of our privacy policy",
				id: "location-of-our-privacy-policy",
			},
			{
				title: "5. Rights we grant you",
				id: "rights-we-grant-you",
			},
			{
				title: "6. Ownership and content",
				id: "ownership-and-content",
			},
			{
				title: "7. Third-party services and materials",
				id: "third-party-services-and-materials",
			},
			{
				title: "8. Disclaimers, limitations of liability and indemnification",
				id: "disclaimers-liability-indemnification",
			},
			{
				title: "9. Arbitration and class action waiver",
				id: "arbitration-and-class-action-waiver",
			},
			{
				title: "10. Additional provisions",
				id: "additional-provisions",
			},
		],
	};

	return (
		<>
			<TertiaryHero
				title={"Terms of Service"}
				blurbTitle={"Last Revised on January 16, 2023"}
				blurbCopy={
					"Welcome to the Terms of Service (these “Terms”) for the Celestia website and documentation accessible at https://celestia.org/ (the “Website”) as operated on behalf of Strange Loop Labs AG (“Company”, “we”, or “us”). The Website and any content, documentation, tools, features and functionality offered on or through our Website are collectively referred to as the “Services”."
				}
			/>

			<TertiaryPageContainer>
				<TertiaryPageContainer.Sidebar>
					<SidebarNavigation anchors={sidebarData} />
				</TertiaryPageContainer.Sidebar>
				<TertiaryPageContainer.Body>
					<Section>
						<Body>
							These Terms govern your access to and use of any of the Services. Please read these Terms carefully, as they include
							important information about your legal rights. These Terms contain a disclaimer of warranties, limitations of liability, a
							time-bar for claims, and indemnification obligations, among other provisions, which could affect your legal rights. By
							using the Services you agree to be bound by these terms and any other terms and policies incorporated to these Terms by
							reference. If you do not understand or agree to these Terms, please do not use the Services.
						</Body>
						<Body>
							For purposes of these Terms, “you” and “your” means you as the user of the Services. If you use the Services on behalf of
							a company or other entity then “you” includes you and that entity, and you represent and warrant that (a) you are an
							authorized representative of the entity with the authority to bind the entity to these Terms, and (b) you agree to these
							Terms on the entity’s behalf.
						</Body>
						<Body>
							The Celestia protocol is a decentralized modular blockchain protocol created to enable others to easily deploy their own
							blockchain with minimal overhead (the “Celestia Protocol”). The Celestia Protocol is not part of the Website, and is not a
							Service and does not constitute any element of the Services. We do not control the Celestia Protocol or any deployment of
							the Celestia Protocol in any testnet or mainnet environment, and accept no liability for the operation of any of the
							foregoing. The Celestia Protocol continues to evolve through its communities of users. We are a member of those
							communities and we contribute to the continuing development of the Celestia Protocol, including by making available
							documentation and other tools. Your use of the Celestia Protocol and any testnet or mainnet deployment of the Celestia
							Protocol is entirely at your own risk.
						</Body>
						<Body className={"uppercase"}>
							Section 9 contains an arbitration clause and class action waiver. By agreeing to these terms, you agree (a) to resolve all
							disputes (with limited exception) related to the company’s services and/or products through binding individual
							arbitration, which means that you waive any right to have those disputes decided by a judge or jury, and (b) to waive your
							right to participate in class actions, class arbitrations, or representative actions, as set forth below. You have the
							right to opt-out of the arbitration clause and the class action waiver as explained in section 9.
						</Body>
					</Section>
					<Section id={"who-may-use-the-services"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							1. Who may use the services
						</Heading>
						<Body>
							In order to use the Services, you must be thirteen 13 years of age or older, not be a Prohibited Person, and not have been
							previously suspended or removed from the Services. A “Prohibited Person” is any person, entity or body that is (a) listed
							on any U.S., EU (including its Member States) or UK list of prohibited or restricted parties, including the U.S. Treasury
							Department&apos;s list of Specially Designated Nationals, the U.S. Department of Commerce Denied Persons List Entity List,
							the EU Consolidated List of persons, groups and entities subject to financial sanctions or the UK Consolidated List of
							Financial Sanctions Targets, (b) located or organized in any U.S. embargoed countries or any country that has been
							designated by the U.S. Government as a “terrorist supporting” country (currently, the Crimea region of Ukraine, Cuba,
							Iran, North Korea, Syria, the so-called Donetsk People’s Republic and the so-called Luhansk People’s Republic), or (c)
							owned or controlled by such persons or entities listed in (a)-(b). By using the Services, you represent and warrant that
							you meet the foregoing requirements and will not be using the Services for any illegal activity or to engage in the
							prohibited activities in Section 5.2. The Company reserves the right to change, modify, or impose additional restrictions
							with respect to Prohibited Persons at its sole discretion without prior notice.
						</Body>
					</Section>
					<Section id={"the-services"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							2. The services
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							2.1 Updates; Monitoring
						</Heading>
						<Body>
							We may make any improvement, modifications or updates to the Services, including but not limited to changes and updates to
							the underlying software, infrastructure, security protocols, technical configurations or service features (the “Updates”)
							from time to time. Your continued access and use of the Services are subject to such Updates and you shall accept any
							patches, system upgrades, bug fixes, feature modifications, or other maintenance work that arise out of such Updates. We
							are not liable for any failure by you to accept and use such Updates in the manner specified or required by us. Although
							the Company is not obligated to monitor access to or participation in the Services, it has the right to do so for the
							purpose of operating the Services, to ensure compliance with the Terms and to comply with applicable law or other legal
							requirements.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							2.2 Wallets
						</Heading>
						<Body>
							The Services may require you to connect your own third-party self-custodial digital wallets (“Wallets”), including in
							connection with your use of Testnets (as defined below). A self-custodial Wallet means we do not own or control your
							Wallet. You are solely responsible for keeping your Wallet and any private keys necessary to decrypt your Wallet secure
							and you should never share your Wallet seed phrase or private keys with anyone else via the Services. We have no ability
							to help you access or recover your private keys for your Wallet. By using such Wallets to conduct transactions via the
							Services, you agree that you are governed by the terms of service and privacy policy for the applicable Wallets, and that
							the Company has no responsibility or liability to you in any way arising from your use of such third-party Wallets,
							including for any security failures or other errors or failures of such Wallets. We reserve the right to restrict any
							Wallet addresses from interacting with the Services for any reason, including to ensure legal compliance.
						</Body>
					</Section>
					<Section id={"testnets"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							3. Testnets
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							3.1 Purpose and Participation
						</Heading>
						<Body>
							The Website may enable you to interact with deployments of the Celestia Protocol in testnet environments (“Testnets”),
							including but not limited to the Mamaki Testnet, the Arabica Testnet, and the Mocha Testnet. Testnets are designed to
							enable the community of Celestia Protocol users to understand the protocol’s functionality and explore potential
							improvements to the operational experience, security, and design of the Celestia Protocol. The Testnets are operated and
							maintained by the community of Celestia Protocol users and the Testnets are not part of the Services.{" "}
							<span className='uppercase'>Your participation in any testnet is entirely voluntary</span>.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							3.2 Duration
						</Heading>
						<Body>
							The availability of a Testnet is solely subject to the decision and activities of the community of Celestia Protocol
							users. The Company has no ability to and bears no responsibility to commence, terminate, or modify a Testnet.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							3.3 No Monetary Value
						</Heading>
						<Body>
							In your use of a Testnet, you may accumulate “Testnet Tokens,” such as through a faucet, which are not, and shall never
							convert to or accrue to become any other tokens or virtual assets outside of the respective Testnet on which the Testnet
							Tokens were issued. Testnet Tokens are virtual items with no monetary value. Testnet Tokens do not constitute any currency
							or property of any type and are not redeemable, refundable, or eligible for any fiat or virtual currency or anything else
							of value. Testnet Tokens are not transferable between users outside of the respective Testnet on which the Testnet Tokens
							were issued, and you may not attempt to sell, trade, or transfer any Testnet Tokens outside of that respective Testnet, or
							obtain any manner of credit using any Testnet Tokens. Any attempt to sell, trade, or transfer any Testnet Tokens outside
							of the respective Testnet will be null and void. Testnet Tokens will not be converted into any future rewards offered by
							the Company.
						</Body>
					</Section>
					<Section id={"location-of-our-privacy-policy"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							4. Location of our privacy policy
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							4.1 Privacy Policy
						</Heading>
						<Body>
							Our Privacy Policy describes how we handle the information you provide to us when you use the Services. For an explanation
							of our privacy practices, please visit our Privacy Policy located at https://celestia.org/privacy. If a specific Service
							is governed by a separate set of terms, those terms may also contain privacy-related information.
						</Body>
					</Section>
					<Section id={"rights-we-grant-you"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							5. Rights we grant you
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							5.1 Right to Use Services
						</Heading>
						<Body>
							We hereby permit you to use the Services for your personal non-commercial use only, provided that you comply with these
							Terms in connection with all such use. If any software, content or other materials owned or controlled by us are
							distributed to you as part of your use of the Services, we hereby grant you, a personal, non-assignable,
							non-sublicensable, non-transferrable, and non-exclusive right and license to access and display such software, content and
							materials provided to you as part of the Services, in each case for the sole purpose of enabling you to use the Services
							as permitted by these Terms. Your access and use of the Services may be interrupted from time to time for any of several
							reasons, including, without limitation, the malfunction of equipment, periodic updating, maintenance or repair of the
							Service or other actions that the Company, in its sole discretion, may elect to take.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							5.2 Restrictions On Your Use of the Services
						</Heading>
						<Body>
							You may not do any of the following in connection with your use of the Services, unless applicable laws or regulations
							prohibit these restrictions or you have our written permission to do so (such as pursuant to one or more open source
							licenses that we may apply to any part of the Services):
						</Body>
						<ListItem lightMode type='number' index={"a"}>
							download, modify, copy, distribute, transmit, display, perform, reproduce, duplicate, publish, license, create derivative
							works from, or offer for sale any information contained on, or obtained from or through, the Services, except for
							temporary files that are automatically cached by your web browser for display purposes, or as otherwise expressly
							permitted in these Terms;
						</ListItem>
						<ListItem lightMode type='number' index={"b"}>
							duplicate, decompile, reverse engineer, disassemble or decode the Services (including any underlying idea or algorithm),
							or attempt to do any of the same;
						</ListItem>
						<ListItem lightMode type='number' index={"c"}>
							use, reproduce or remove any copyright, trademark, service mark, trade name, slogan, logo, image, or other proprietary
							notation displayed on or through the Services;
						</ListItem>
						<ListItem lightMode type='number' index={"d"}>
							use automation software (bots), hacks, modifications (mods) or any other unauthorized third-party software designed to
							modify the Services or impersonate a real-person or to exaggerate or misrepresent your engagement with the Services;
						</ListItem>
						<ListItem lightMode type='number' index={"e"}>
							exploit the Services for any commercial purpose, including without limitation communicating or facilitating any commercial
							advertisement or solicitation;
						</ListItem>
						<ListItem lightMode type='number' index={"f"}>
							access or use the Services in any manner that could disable, overburden, damage, disrupt or impair the Services or
							interfere with any other party’s access to or use of the Services or use any device, software or routine that causes the
							same;
						</ListItem>
						<ListItem lightMode type='number' index={"g"}>
							attempt to gain unauthorized access to, interfere with, damage or disrupt the Services, or the computer systems or
							networks connected to the Services;
						</ListItem>
						<ListItem lightMode type='number' index={"h"}>
							circumvent, remove, alter, deactivate, degrade or thwart any technological measure or content protections of the Services;
						</ListItem>
						<ListItem lightMode type='number' index={"i"}>
							use any device, process, or software to manipulate or disrupt anyone else’s use of the Services, including but not limited
							to posting or distributing commercial spam; attempting to artificially inflate your engagement with the Services; engaging
							in coordinated harmful activity to encourage or promote violations of these Terms; or mass-registering for accounts
							related to or provided by the Services;
						</ListItem>
						<ListItem lightMode type='number' index={"j"}>
							introduce any viruses, trojan horses, worms, logic bombs or other materials that are malicious or technologically harmful
							into our systems;
						</ListItem>
						<ListItem lightMode type='number' index={"k"}>
							use the Services for illegal, harassing, unethical, or disruptive purposes;
						</ListItem>
						<ListItem lightMode type='number' index={"l"}>
							violate any applicable law or regulation in connection with your access to or use of the Services; or
						</ListItem>
						<ListItem lightMode type='number' index={"m"}>
							access or use the Services in any way not expressly permitted by these Terms.
						</ListItem>
					</Section>
					<Section id={"ownership-and-content"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							6. Ownership and content
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							6.1 Ownership of the Services
						</Heading>
						<Body>
							The Services, including their “look and feel” (e.g., text, graphics, images, logos), proprietary content, information and
							other materials, are protected under copyright, trademark and other intellectual property laws. You agree that the Company
							and/or its licensors own all right, title and interest in and to the Services (including any and all intellectual property
							rights therein) and you agree not to take any action(s) inconsistent with such ownership interests. We and our licensors
							reserve all rights in connection with the Services and its content including, without limitation, the exclusive right to
							create derivative works.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							6.2 Ownership of Trademarks
						</Heading>
						<Body>
							The Company’s name, the Company’s logo and all related names, logos, product and service names, designs and slogans are
							trademarks of the Company or its affiliates or licensors. Other names, logos, product and service names, designs and
							slogans that appear on the Services are the property of their respective owners, who may or may not be affiliated with,
							connected to, or sponsored by us.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							6.3 Ownership of Feedback
						</Heading>
						<Body>
							We welcome feedback, comments and suggestions for improvements to the Services (“Feedback”). You acknowledge and expressly
							agree that any contribution of Feedback does not and will not give or grant you any right, title or interest in the
							Services or in any such Feedback. All Feedback becomes the sole and exclusive property of the Company, and the Company may
							use and disclose Feedback in any manner and for any purpose whatsoever without further notice or compensation to you and
							without retention by you of any proprietary or other right or claim. You hereby assign to the Company any and all right,
							title and interest (including, but not limited to, any patent, copyright, trade secret, trademark, show-how, know-how,
							moral rights and any and all other intellectual property right) that you may have in and to any and all Feedback.
						</Body>
					</Section>
					<Section id={"third-party-services-and-materials"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							7. Third-party services and materials
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							7.1 Use of Third-Party Materials in the Services
						</Heading>
						<Body>
							Certain Services may display, include or make available content, data, information, applications or materials from third
							parties (“Third-Party Materials”) or provide links to certain third-party websites. By using the Services, you acknowledge
							and agree that the Company is not responsible for examining or evaluating the content, accuracy, completeness,
							availability, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect of such
							Third-Party Materials or websites. We do not warrant or endorse and do not assume and will not have any liability or
							responsibility to you or any other person for any third-party services, Third-Party Materials or third-party websites, or
							for any other materials, products, or services of third parties. Third-Party Materials and links to other websites are
							provided solely as a convenience to you.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							7.2 Use of Third-Party Software in the Services
						</Heading>
						<Body>
							The Services may include Third-Party software components that are subject to open source and/or pass-through commercial
							licenses and/or notices (“Third-Party Software” and “Third-Party Software Terms and Notices”, respectively). You
							acknowledge that your use of the Services may be also governed by such Third-Party Software Terms and Notices, and that to
							the extent of any conflict between these Terms and any Third-Party Software Terms and Notices, the latter shall control.
							Any undertakings, representations, warranties, guarantees, conditions, indemnities or other commitments made by the
							Company in these Terms concerning the Services (if any), are made by the Company and not by any authors, licensors, or
							suppliers of, or contributors to, such Third-Party Software. Notwithstanding the foregoing sentence or anything in these
							Terms to the contrary, the Company does not make any representation, warranty, guarantee, or condition, and does not
							undertake any defense or indemnification, with respect to any Third-Party Software.
						</Body>
					</Section>
					<Section id={"disclaimers-liability-indemnification"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							8. Disclaimers, limitations of liability and indemnification
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							8.1 Disclaimers
						</Heading>
						<ListItem lightMode type='number' index={"a"}>
							Your access to and use of the Services are at your own risk. You understand and agree that the Services are provided to
							you on an “AS IS” and “AS AVAILABLE” basis. Without limiting the foregoing, to the maximum extent permitted under
							applicable law, the Company, its parents, affiliates, related companies, officers, directors, employees, agents,
							representatives, partners and licensors (the “Company Entities”){" "}
							<span className='uppercase'>
								Disclaim all representations, warranties and conditions, whether express, implied, or statutory, including without
								limitation any representations or warranties relating to title, non-infringement, merchantability, usage, quality,
								performance, suitability or fitness of the services for any particular purpose, or as to the accuracy, quality,
								sequence, reliability, workmanship or technical coding thereof, or the absence of any defects therein whether latent
								or patent
							</span>
							. The Company Entities make no warranty or representation and disclaim all responsibility and liability for: (a) the
							completeness, accuracy, availability, timeliness, security or reliability of the Services; (b) any harm to your computer
							system, corrupted Wallet files, loss of data, or other harm that results from your access to or use of the Services; (c)
							the operation or compatibility with any other application or any particular system or device; and (d) whether the Services
							will meet your requirements or be available on an uninterrupted, secure or error-free basis. No advice or information,
							whether oral or written, obtained from the Company Entities or through the Services, will create any warranty or
							representation not expressly made herein.
						</ListItem>
						<ListItem lightMode type='number' index={"b"}>
							<span className='uppercase'>
								The laws of certain jurisdictions, including new jersey, do not allow limitations on implied warranties or the
								exclusion or limitation of certain damages. If these laws apply to you, some or all of the above disclaimers,
								exclusions, or limitations may not apply to you, and you may have additional rights.
							</span>
						</ListItem>
						<ListItem lightMode type='number' index={"c"}>
							<span className='uppercase'>
								You acknowledge and agree that this section 8.1 is an essential basis of the bargain between you and the company.
							</span>
						</ListItem>
						<Heading tag={"h3"} size={"sm"}>
							8.2 Limitations of Liability
						</Heading>
						<Body>
							<span className={"uppercase"}>
								To the extent not prohibited by law, you agree that in no event will the company entities be liable (a) for damages of
								any kind, including indirect, special, exemplary, incidental, consequential or punitive damages (including, but not
								limited to, procurement of substitute goods or services, loss of use, data or profits, business interruption or any
								other damages or losses, arising out of or related to your use or inability to use the services), however caused and
								under any theory of liability, whether under these terms or otherwise arising in any way in connection with the
								services or these terms and whether in contract, strict liability or tort (including negligence or otherwise) even if
								the company entities have been advised of the possibility of such damage, or (b) for any other claim, demand or
								damages whatsoever resulting from or arising out of or in connection with these terms or the delivery, use or
								performance of the services. Some jurisdictions (such as the state of New Jersey) do not allow the exclusion or
								limitation of incidental or consequential damages, so the above exclusion or limitation may not apply to you. The
								company entities’ total liability to you for any damages finally awarded shall not exceed one hundred dollars
								($100.00). The foregoing limitations will apply even if the above stated remedy fails of its essential purpose.
							</span>{" "}
							Some jurisdictions laws do not allow the exclusion or limitation of incidental or consequential damages, or of other
							damages, and to the extent applicable to you, such exclusions and limitations may not apply but will apply to the maximum
							extent permitted by applicable law.{" "}
							<span className='uppercase'>
								You acknowledge and agree that this section 8.2 is an essential basis of the bargain between you and the company.
							</span>
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							8.3 Assumption of Risks
						</Heading>
						<ListItem lightMode type='number' index={"a"}>
							By using the Services, you represent that you have sufficient knowledge and experience in business and financial matters,
							including a sufficient understanding of blockchain or cryptographic tokens and technologies and other digital assets,
							storage mechanisms (such as Wallets), blockchain-based software systems, and blockchain technology, to be able to assess
							and evaluate the risks and benefits of the Services contemplated hereunder, and will bear the risks thereof, including
							loss of all amounts paid, and the risk that any tokens you receive as a result of your use of the Services may have little
							or no value. You acknowledge and agree that there are risks associated with interacting with cryptographic tokens and
							using blockchain technology. These include, but are not limited to, risk of losing access to cryptocurrency due to loss of
							private key(s), custodial error or purchaser error, risk of mining or blockchain attacks, risk of hacking and security
							weaknesses, risk of unfavorable regulatory intervention in one or more jurisdictions, risk related to token taxation, risk
							of personal information disclosure, risk of uninsured losses, volatility risks, and unanticipated risks.
						</ListItem>
						<ListItem lightMode type='number' index={"b"}>
							The regulatory regime governing blockchain technologies and cryptographic tokens is uncertain, and new regulations or
							policies may materially adversely affect the potential utility or value of any tokens you receive as a result of your use
							of the Services. There also exists the risks of new taxation of the purchase or sale of tokens.
						</ListItem>
						<ListItem lightMode type='number' index={"c"}>
							There are risks associated with using blockchains and cryptographic tokens, including, but not limited to, the risk of
							failures of hardware, software, and Internet connections, the risk of malicious software introduction, and the risk that
							third parties may obtain unauthorized access to information stored within your Wallet or elsewhere. The Company is not
							responsible for any such risks, however caused.
						</ListItem>
						<ListItem lightMode type='number' index={"d"}>
							We do not control the Celestia Protocol, any blockchains or other networks that deploy the Celestia Protocol, or any
							software that interacts with the Celestia Protocol. The Company is not responsible for changes, upgrades, or forks of the
							Celestia Protocol or any damage resulting from the foregoing, however caused.
						</ListItem>
						<Heading tag={"h3"} size={"sm"}>
							8.4 Indemnification
						</Heading>
						<Body>
							By entering into these Terms and accessing or using the Services, you agree that you shall defend, indemnify and hold the
							Company Entities harmless from and against any and all claims, costs, damages, losses, liabilities and expenses (including
							attorneys’ fees and costs) incurred by the Company Entities arising out of or in connection with: (a) your violation or
							breach of any term of these Terms or any applicable law or regulation, including any such violation or breach related to
							any rewards that may be available as a result of your participation in a program maintained by us or our affiliates; (b)
							your violation of any rights of any Third-Party; (c) your misuse of the Services; (d) your negligence or wilful
							misconduct. If you are obligated to indemnify any Company Entity hereunder, then you agree that Company (or, at its
							discretion, the applicable Company Entity) will have the right, in its sole discretion, to control any action or
							proceeding and to determine whether Company wishes to settle, and if so, on what terms, and you agree to fully cooperate
							with Company in the defense or settlement of such claim.
						</Body>
					</Section>
					<Section id={"arbitration-and-class-action-waiver"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							9. Arbitration and class action waiver
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							<span className='uppercase'>
								9.1 Please read this section carefully – it may significantly affect your legal rights, including your right to file a
								lawsuit in court and to have a jury hear your claims. It contains procedures for mandatory binding arbitration and a
								class action waiver.
							</span>
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							9.2 Informal Process First
						</Heading>
						<Body>
							You and the Company agree that in the event of any dispute between you and the Company Entities, either party will first
							contact the other party and make a good faith sustained effort to resolve the dispute before resorting to more formal
							means of resolution, including without limitation, any court action, after first allowing the receiving party 30 days in
							which to respond. Both you and the Company agree that this dispute resolution procedure is a condition precedent which
							must be satisfied before initiating any arbitration against the other party.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							9.3 Arbitration Agreement and Class Action Waiver
						</Heading>
						<Body>
							After the informal dispute resolution process, any remaining dispute, controversy, or claim (collectively, “Claim”)
							relating in any way to the Company’s services and/or products, including the Services, and any use or access or lack of
							access thereto, will be resolved by arbitration, including threshold questions of arbitrability of the Claim. You and the
							Company agree that any Claim will be settled by final and binding arbitration, using the English language, administered in
							accordance with the Liechtenstein Arbitration Rules (LIS) of the Liechtenstein Chamber of Commerce and Industry. The seat
							of the arbitral tribunal will be Vaduz, Liechtenstein and the arbitral proceeding will be conducted in English. The
							arbitrator will apply applicable substantive law consistent with the laws of the Principality of Liechtenstein. Judgment
							on the arbitration award may be entered in any court that has jurisdiction. Any arbitration under these Terms will take
							place on an individual basis – class arbitrations and class actions are not permitted. You understand that by agreeing to
							these Terms, you and the Company are each waiving the right to trial by jury or to participate in a class action or class
							arbitration.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							9.4 Exceptions
						</Heading>
						<Body>
							Notwithstanding the foregoing, you and the Company agree that the following types of disputes will be resolved in a court
							of proper jurisdiction:
						</Body>
						<ListItem lightMode type='number' index={"a"}>
							disputes or claims within the jurisdiction of a small claims court consistent with the jurisdictional and dollar limits
							that may apply, as long as it is brought and maintained as an individual dispute and not as a class, representative, or
							consolidated action or proceeding;
						</ListItem>
						<ListItem lightMode type='number' index={"b"}>
							disputes or claims where the sole form of relief sought is injunctive relief (including public injunctive relief); or
						</ListItem>
						<ListItem lightMode type='number' index={"c"}>
							intellectual property disputes.
						</ListItem>
						<Heading tag={"h3"} size={"sm"}>
							9.5 Costs of Arbitration
						</Heading>
						<Body>
							Payment of all filing, administration, and arbitrator costs and expenses will be governed by LIS rules, except that if you
							demonstrate that any such costs and expenses owed by you under those rules would be prohibitively more expensive than a
							court proceeding, the Company will pay the amount of any such costs and expenses that the arbitrator determines are
							necessary to prevent the arbitration from being prohibitively more expensive than a court proceeding (subject to possible
							reimbursement as set forth below).
						</Body>
						<Body>
							Fees and costs may be awarded as provided pursuant to applicable law. If the arbitrator finds that either the substance of
							your claim or the relief sought in the demand is frivolous or brought for an improper purpose, then the payment of all
							fees will be governed by the LIS rules. In that case, you agree to reimburse the Company for all monies previously
							disbursed by it that are otherwise your obligation to pay under the applicable rules. If you prevail in the arbitration
							and are awarded an amount that is less than the last written settlement amount offered by the Company before the
							arbitrator was appointed, the Company will pay you the amount it offered in settlement. The arbitrator may make rulings
							and resolve disputes as to the payment and reimbursement of fees or expenses at any time during the proceeding and upon
							request from either party made within 14 days of the arbitrator’s ruling on the merits.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							<span className='uppercase'>9.6 Waiver of right to bring class action and representative claims</span>
						</Heading>
						<Body>
							<span className='uppercase'>
								To the fullest extent permitted by applicable law, you and the company each agree that any proceeding to resolve any
								dispute, claim, or controversy will be brought and conducted only in the respective party’s individual capacity and
								not as part of any class (or purported class), consolidated, multiple-plaintiff, or representative action or
								proceeding (“class action”). You and the company agree to waive the right to participate as a plaintiff or class
								member in any class action. You and the company expressly waive any ability to maintain a class action in any forum.
								If the dispute is subject to arbitration, the arbitrator will not have the authority to combine or aggregate claims,
								conduct a class action, or make an award to any person or entity not a party to the arbitration. Further, you and the
								company agree that the arbitrator may not consolidate proceedings for more than one person’s claims, and it may not
								otherwise preside over any form of a class action. For the avoidance of doubt, however, you can seek public injunctive
								relief to the extent authorized by law and consistent with the exceptions clause above.
							</span>
						</Body>
						<Body>
							<span className='uppercase'>
								If this class action waiver is limited, voided, or found unenforceable, then, unless the parties mutually agree
								otherwise, the parties’ agreement to arbitrate shall be null and void with respect to such proceeding so long as the
								proceeding is permitted to proceed as a class action. If a court decides that the limitations of this paragraph are
								deemed invalid or unenforceable, any putative class, private attorney general, or consolidated or representative
								action must be brought in a court of proper jurisdiction and not in arbitration.
							</span>
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							9.7 Timeline for Making a Claim
						</Heading>
						<Body>
							<span className='uppercase'>
								To the fullest extent permitted by applicable law, any claim or cause of action arising out of, or related to, these
								terms must be filed within 1 year after such claim or cause of action arose, or else you agree that such claim or
								cause of action will be permanently barred.
							</span>
						</Body>
					</Section>
					<Section id={"additional-provisions"}>
						<Heading tag={"h2"} className={"uppercase mb-6"}>
							10. Additional provisions
						</Heading>
						<Heading tag={"h3"} size={"sm"}>
							10.1 Updating These Terms
						</Heading>
						<Body>
							We may modify these Terms from time to time in which case we will update the “Last Revised” date at the top of these
							Terms. If we make changes that are material, we will use reasonable efforts to attempt to notify you, such as by placing a
							prominent notice on the first page of the Website. However, it is your sole responsibility to review these Terms from time
							to time to view any such changes. The updated Terms will be effective as of the time of posting, or such later date as may
							be specified in the updated Terms. Your continued access or use of the Services after the modifications have become
							effective will be deemed your acceptance of the modified Terms. No amendment shall apply to a dispute for which an
							arbitration has been initiated prior to the change in Terms.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.2 Notices
						</Heading>
						<Body>You agree that the Company may send you notices by email, physical mail, or by posting on or through the Website.</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.3 Termination of License
						</Heading>
						<Body>
							If you breach any of the provisions of these Terms, all licenses granted to you by the Company will terminate
							automatically. All sections which by their nature should survive the termination of these Terms shall continue in full
							force and effect subsequent to and notwithstanding any termination of these Terms by the Company or you. Termination will
							not limit any of the Company’s other rights or remedies at law or in equity.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.4 Injunctive Relief
						</Heading>
						<Body>
							You agree that a breach of these Terms will cause irreparable injury to the Company for which monetary damages would not
							be an adequate remedy and the Company shall be entitled to equitable relief in addition to any remedies it may have
							hereunder or at law without a bond, other security or proof of damages.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.5 California Residents
						</Heading>
						<Body>
							If you are a California resident, in accordance with Cal. Civ. Code § 1789.3, you may report complaints to the Complaint
							Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by contacting them
							in writing at 1625 North Market Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800) 952-5210.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.6 Export Laws
						</Heading>
						<Body>
							You agree that you will not export or re-export, directly or indirectly, the Services and/or other information or
							materials provided by the Company hereunder, to any country for which the United States or any other relevant jurisdiction
							requires any export license or other governmental approval at the time of export without first obtaining such license or
							approval. In particular, but without limitation, the Services may not be exported or re-exported (a) into any U.S.
							embargoed countries or any country that has been designated by the U.S. Government as a “terrorist supporting” country, or
							(b) to anyone listed on any U.S. Government list of prohibited or restricted parties, including the U.S. Treasury
							Department’s list of Specially Designated Nationals or the U.S. Department of Commerce Denied Persons List or Entity List.
							By using the Services, you represent and warrant that you are not located in any such country or on any such list. You are
							responsible for and hereby agree to comply at your sole expense with all applicable United States export laws and
							regulations.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.7 Force Majeure
						</Heading>
						<Body>
							We will not be liable or responsible to you, nor be deemed to have defaulted under or breached these Terms, for any
							failure or delay in fulfilling or performing any of our obligations under these Terms or in providing the Services, when
							and to the extent such failure or delay is caused by or results from any events beyond our ability to control, including
							acts of God, flood, fire, earthquake, epidemics, pandemics, tsunami, explosion, war, invasion, hostilities (whether war is
							declared or not), terrorist threats or acts, riot or other civil unrest, government order, law, or action, embargoes or
							blockades, strikes, labor stoppages or slowdowns or other industrial disturbances, shortage of adequate or suitable
							Internet connectivity, telecommunication breakdown or shortage of adequate power or electricity, and other similar events
							beyond our control.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.8 Miscellaneous
						</Heading>
						<Body>
							If any provision of these Terms shall be unlawful, void or for any reason unenforceable, then that provision shall be
							deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions. These
							Terms and the licenses granted hereunder may be assigned by the Company but may not be assigned by you without the prior
							express written consent of the Company. No waiver by either party of any breach or default hereunder shall be deemed to be
							a waiver of any preceding or subsequent breach or default. The section headings used herein are for reference only and
							shall not be read to have any legal effect. The Services are operated by us in Liechtenstein. Those who choose to access
							the Services from locations outside Liechtenstein do so at their own initiative and are responsible for compliance with
							applicable local laws. These Terms are governed by the laws of the Principality of Liechtenstein District Court and any
							appellate court from any such court, and the proper venue for any disputes arising out of or relating to any of the same
							will be the arbitration venue set forth in Section 9, or if arbitration does not apply, then the aforementioned
							Liechtenstein courts.
						</Body>
						<Heading tag={"h3"} size={"sm"}>
							10.9 How to Contact Us
						</Heading>
						<Body>
							You may contact us regarding the Services or these Terms at: Pradafant 11, 9490 Vaduz, Principality of Liechtenstein, or
							by e-mail at legal@celestia.org.
						</Body>
					</Section>
				</TertiaryPageContainer.Body>
			</TertiaryPageContainer>
		</>
	);
}
