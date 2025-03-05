import useThemeColors from "@/utils/useThemeColors";

const CommunityGithubSVG = ({ dark = false, className = "" }) => {
	const colors = useThemeColors();
	const primaryColor = dark ? colors.white.DEFAULT : colors.black.DEFAULT;
	const secondaryColor = dark ? colors.black.DEFAULT : colors.white.DEFAULT;

	return (
		<svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
			<rect x='1' y='1' width='40' height='40' rx='20' fill={secondaryColor} stroke={primaryColor} />
			<g clip-path='url(#clip0_255_351)'>
				<path
					fill-rule='evenodd'
					clip-rule='evenodd'
					d='M21.0009 12.2117C18.8305 12.2128 16.7311 12.9813 15.0784 14.3798C13.4256 15.7783 12.3271 17.7156 11.9794 19.8452C11.6317 21.9749 12.0575 24.158 13.1805 26.0043C14.3035 27.8506 16.0505 29.2396 18.1093 29.923C18.5635 30.0072 18.7345 29.7258 18.7345 29.4865C18.7345 29.2473 18.7254 28.5535 18.7224 27.795C16.179 28.3443 15.6415 26.722 15.6415 26.722C15.2267 25.6686 14.6271 25.3917 14.6271 25.3917C13.7975 24.8288 14.6892 24.8394 14.6892 24.8394C15.6082 24.9041 16.0911 25.7769 16.0911 25.7769C16.9057 27.166 18.2304 26.7642 18.7512 26.5294C18.8329 25.941 19.0706 25.5407 19.3326 25.3134C17.3008 25.0847 15.1661 24.3051 15.1661 20.8228C15.1535 19.9196 15.4907 19.0462 16.1078 18.3833C16.0139 18.1546 15.7005 17.2305 16.1971 15.9755C16.1971 15.9755 16.9647 15.7317 18.7118 16.907C20.2104 16.4996 21.7915 16.4996 23.2901 16.907C25.0357 15.7317 25.8017 15.9755 25.8017 15.9755C26.2998 17.2275 25.9864 18.1516 25.8926 18.3833C26.5117 19.0464 26.8495 19.9213 26.8358 20.8258C26.8358 24.3157 24.6965 25.0847 22.6618 25.3089C22.9888 25.5918 23.281 26.1441 23.281 26.9929C23.281 28.2089 23.2704 29.1871 23.2704 29.4865C23.2704 29.7288 23.4354 30.0117 23.8987 29.923C25.9577 29.2395 27.7049 27.8502 28.8279 26.0036C29.9509 24.157 30.3764 21.9736 30.0283 19.8437C29.6802 17.7139 28.5812 15.7766 26.9279 14.3783C25.2745 12.9801 23.1747 12.2121 21.004 12.2117H21.0009Z'
					fill={primaryColor}
				/>
				<path
					d='M17.9741 27.0455C17.9741 27.1193 17.8894 27.1825 17.7804 27.184C17.6714 27.1855 17.582 27.1253 17.582 27.0516C17.582 26.9778 17.6668 26.9146 17.7758 26.9131C17.8848 26.9116 17.9741 26.9703 17.9741 27.0455Z'
					fill={primaryColor}
				/>
				<path
					d='M18.6699 26.9297C18.6835 27.0034 18.6078 27.0802 18.4988 27.0982C18.3898 27.1163 18.2945 27.0727 18.2808 27.0004C18.2672 26.9282 18.3459 26.8499 18.4519 26.8304C18.5579 26.8108 18.6563 26.856 18.6699 26.9297Z'
					fill={primaryColor}
				/>
				<path
					d='M17.2252 26.9944C17.2025 27.0651 17.0995 27.0967 16.9966 27.0666C16.8936 27.0365 16.8255 26.9523 16.8452 26.88C16.8649 26.8078 16.9693 26.7747 17.0738 26.8078C17.1783 26.8409 17.2449 26.9207 17.2252 26.9944Z'
					fill={primaryColor}
				/>
				<path
					d='M16.5394 26.6995C16.4895 26.7551 16.388 26.7401 16.3048 26.6649C16.2215 26.5896 16.2018 26.4873 16.2518 26.4331C16.3017 26.3789 16.4032 26.394 16.4895 26.4677C16.5758 26.5414 16.5924 26.6453 16.5394 26.6995Z'
					fill={primaryColor}
				/>
				<path
					d='M16.0515 26.1937C15.9955 26.2329 15.9001 26.1937 15.8471 26.1155C15.8325 26.1014 15.8208 26.0846 15.8128 26.066C15.8049 26.0474 15.8008 26.0273 15.8008 26.0071C15.8008 25.9869 15.8049 25.9669 15.8128 25.9482C15.8208 25.9296 15.8325 25.9128 15.8471 25.8988C15.9031 25.8611 15.9985 25.8988 16.0515 25.9755C16.1045 26.0523 16.106 26.1546 16.0515 26.1937Z'
					fill={primaryColor}
				/>
				<path
					d='M15.6903 25.6715C15.6589 25.6872 15.623 25.6916 15.5888 25.6839C15.5546 25.6762 15.5241 25.657 15.5025 25.6294C15.4435 25.5662 15.4314 25.4789 15.4768 25.4398C15.5222 25.4007 15.604 25.4187 15.663 25.4819C15.7221 25.5451 15.7357 25.6324 15.6903 25.6715Z'
					fill={primaryColor}
				/>
				<path
					d='M15.3206 25.2608C15.3009 25.3059 15.2282 25.3195 15.1692 25.2879C15.1102 25.2563 15.0663 25.1976 15.0874 25.1509C15.1086 25.1043 15.1798 25.0922 15.2388 25.1238C15.2979 25.1554 15.3433 25.2156 15.3206 25.2608Z'
					fill={primaryColor}
				/>
			</g>
			<defs>
				<clipPath id='clip0_255_351'>
					<rect width='18.2857' height='18.2803' fill='white' transform='translate(11.8574 11.8308)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default CommunityGithubSVG;
