import CloseMenuSVG from "@/macros/SVGs/CloseMenuSVG";
import HamburgerMenuSVG from "@/macros/SVGs/HamburgerMenuSVG";

const MenuButton = ({ isOpen, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`relative flex items-center justify-center size-[40px] xs:size-[44px] rounded-full cursor-pointer ${
				isOpen ? "border border-white" : "border border-[#D1D1D1]"
			}`}
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			<span className='sr-only'>{isOpen ? "Close" : "Open"} the main menu</span>
			{isOpen ? <CloseMenuSVG dark={true} className='size-[20px] xs:size-[24px]' /> : <HamburgerMenuSVG />}
		</button>
	);
};

export default MenuButton;
