
const PrimaryButton = ({ children, className, onClick }) => {
    const mobileClasses = `text-xs leading-none text-center uppercase rounded-full block no-underline px-5 pt-3 pb-2.5 border`
    const desktopClasses = ``
    const lightMode = `bg-white text-black border-black`

    return (
        <button className={`${mobileClasses} ${desktopClasses} ${lightMode} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton