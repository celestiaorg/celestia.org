"use client";

import { motion } from "framer-motion";
import team from "@/data/contact/team";

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			delay: (i % 2) * 0.06,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

const XIcon = (props) => (
	<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor' {...props}>
		<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
	</svg>
);

const LinkedInIcon = (props) => (
	<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor' {...props}>
		<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
	</svg>
);

const TeamCard = ({ member, index }) => (
	<motion.div
		className='flex items-stretch rounded-xl border border-white/[0.07] hover:border-white/[0.13] transition-colors overflow-hidden'
		variants={cardVariants}
		initial='hidden'
		whileInView='visible'
		viewport={{ once: true, margin: "-60px" }}
		custom={index}
	>
		<div className='flex-1 min-w-0 flex flex-col justify-between gap-2.5 px-[22px] py-5'>
			<div className='flex flex-col gap-1'>
				<div className='flex items-center justify-between gap-2'>
					<h3 className='font-slussen font-medium text-[17px] leading-[1.2] tracking-[-0.4px] text-white m-0'>
						{member.name}
					</h3>
					{(member.x || member.linkedin) && (
						<div className='flex items-center gap-2 shrink-0'>
							{member.x && (
								<a
									href={member.x}
									target='_blank'
									rel='noopener noreferrer'
									aria-label='X'
									className='text-white/60 hover:text-white transition-colors flex items-center justify-center'
								>
									<XIcon />
								</a>
							)}
							{member.linkedin && (
								<a
									href={member.linkedin}
									target='_blank'
									rel='noopener noreferrer'
									aria-label='LinkedIn'
									className='text-white/60 hover:text-white transition-colors flex items-center justify-center'
								>
									<LinkedInIcon />
								</a>
							)}
						</div>
					)}
				</div>
				<span className='font-slussenMono text-[13px] leading-[1.4] tracking-[0.1px] text-white/70'>
					{member.role}
				</span>
			</div>
			<div className='flex flex-col gap-[3px] border-t border-white/[0.07] pt-2.5'>
				<p className='font-slussenMono text-[14px] leading-[1.5] text-white/75 m-0'>
					<span className='uppercase text-[11px] tracking-[0.5px] text-white/40 mr-[3px]'>Prev.</span>
					{member.prev}
					{member.acq && <span className='text-white/40'> {member.acq}</span>}
				</p>
				{member.edu && (
					<p className='font-slussenMono text-[13px] leading-[1.5] text-white/55 m-0'>{member.edu}</p>
				)}
			</div>
		</div>
	</motion.div>
);

const ContactTeam = () => {
	return (
		<section
			id='team'
			data-header-theme='dark'
			className='bg-[#040207] border-t border-white/[0.06] px-5 py-20 sm:px-6 md:px-[60px] md:py-[120px] xl:px-[86px]'
		>
			<div className='mb-10 md:mb-[52px]'>
				<h2 className='font-slussenExtended font-medium text-white text-[36px] leading-[1] tracking-[-1.5px] md:text-[48px] md:tracking-[-2.5px] mb-2.5'>
					Our Team
				</h2>
				<p className='font-slussenMono text-[14px] text-white/35 m-0'>
					The people building the foundation of modular blockspace.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				{team.map((member, index) => (
					<TeamCard key={member.name} member={member} index={index} />
				))}
			</div>
		</section>
	);
};

export default ContactTeam;
