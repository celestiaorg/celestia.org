import JumpNav from "./JumpNav"
import PrimaryButton from "../Buttons/PrimaryButton"
import Link from "next/link"

const Nav = () => {
    return (
        <>
            <JumpNav />
            <header className={`flex justify-between items-center py-6 px-4`}>
                <Link href={`/`}>
                    <img src={`/images/celestia-logo.svg`} alt={`Celestia logo | Home`} className={`w-full h-auto max-w-32`} />
                </Link>
                <PrimaryButton>
                    <span className={`sr-only`}>Open the main</span> menu
                </PrimaryButton>
            </header>
        </>
    )
}

export default Nav