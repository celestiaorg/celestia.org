import CloseMenuSVG from "@/macros/SVGs/CloseMenuSVG";
import HamburgerMenuSVG from "@/macros/SVGs/HamburgerMenuSVG";

const MenuButton = ({ isOpen, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`relative flex items-center justify-center size-[40px] sm:size-[44px] rounded-full cursor-pointer ${
				isOpen ? "bg-black border border-white" : "bg-white border border-[#D1D1D1]"
			}`}
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			<span className='sr-only'>{isOpen ? "Close" : "Open"} the main menu</span>
			{isOpen ? <CloseMenuSVG dark={true} /> : <HamburgerMenuSVG />}
		</button>
	);
};

export default MenuButton;
