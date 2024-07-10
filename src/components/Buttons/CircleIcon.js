const CircleIcon = ({
    icon = "arrow-long",
    direction = "up",
    hoverIcon = "arrow-long",
    hoverDirection = "up",
    className,
}) => {
    return (
        <div className={`group h-12 w-12 rounded-full border border-white ${className} relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 h-full w-full transition-transform ${rotateClass(direction)}`}>
                <div className="absolute top-0 left-0 h-full w-full group-hover:-top-full transition-all duration-300">
                    <div className={`top-0 left-0 absolute h-full w-full flex justify-center items-center`}>
                        <img src={`/images/${icon}.svg`} className={`h-6 w-6`} />
                    </div>
                    <div className={`top-full left-0 absolute h-full w-full flex justify-center items-center transition-transform ${rotateClass(hoverDirection)}`}>
                        <img src={`/images/${hoverIcon}.svg`} className={`h-6 w-6`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// return rotate class based on direction
const rotateClass = (direction) => {
    if (direction === "up") {
        return "rotate-0"
    } else if (direction === "up-right" || direction === "right-up") {
        return "rotate-45"
    } else if (direction === "right") {
        return "rotate-90"
    } else if (direction === "down-right" || direction === "right-down") {
        return "rotate-[135deg]"
    } else if (direction === "down") {
        return "rotate-180"
    } else if (direction === "down-left" || direction === "left-down") {
        return "-rotate-[135deg]"
    } else if (direction === "left") {
        return "-rotate-90"
    } else if (direction === "up-left" || direction === "left-up") {
        return "-rotate-45"
    }
}

export default CircleIcon