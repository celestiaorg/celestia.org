
const PrimaryButton = ({ children, className, onClick, lightMode = false }) => {
    const mobileClasses = `text-xs leading-none text-center uppercase rounded-full block no-underline px-5 pt-3 pb-2.5 border`
    const desktopClasses = ``
    const lightModeClasses = `text-black border-black hover:text-white transition-all duration-300`

    return (
        <button className={`group relative block overflow-hidden ${mobileClasses} ${desktopClasses} ${lightMode ? lightModeClasses : ''} ${className}`} onClick={onClick}>
            <div className={`z-0 absolute w-1/2 h-full top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 ${lightMode ? 'bg-black' : 'bg-white'}`}></div>
            <span className={`relative z-10`}>{children}</span>
        </button>
    )
}

export default PrimaryButton