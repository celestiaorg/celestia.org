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

const TeamCard = ({ member, index }) => (
	<motion.div
		className='flex items-stretch rounded-xl border border-white/[0.07] hover:border-white/[0.13] transition-colors overflow-hidden'
		variants={cardVariants}
		initial='hidden'
		whileInView='visible'
		viewport={{ once: true, margin: "-60px" }}
		custom={index}
	>
		<div className='w-[110px] shrink-0 flex items-center justify-center p-[18px] border-r border-white/[0.07]'>
			<div className='w-full aspect-square rounded-full bg-white/[0.08] border border-white/[0.15]' />
		</div>
		<div className='flex-1 min-w-0 flex flex-col justify-between gap-2.5 px-5 py-[18px]'>
			<div className='flex flex-col gap-1'>
				<h3 className='font-slussen font-medium text-[17px] leading-[1.2] tracking-[-0.4px] text-white m-0'>
					{member.name}
				</h3>
				<span className='font-slussenMono text-[13px] leading-[1.4] tracking-[0.1px] text-white/70'>
					{member.role}
				</span>
			</div>
			<div className='flex flex-col gap-[3px] border-t border-white/[0.07] pt-2.5'>
				<p className='font-slussenMono text-[12px] leading-[1.5] text-white/60 m-0'>
					<span className='uppercase text-[10px] tracking-[0.5px] text-white/35 mr-[3px]'>Prev.</span>
					{member.prev}
					{member.acq && <span className='text-white/40'> {member.acq}</span>}
				</p>
				{member.edu && (
					<p className='font-slussenMono text-[11px] leading-[1.5] text-white/40 m-0'>{member.edu}</p>
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
