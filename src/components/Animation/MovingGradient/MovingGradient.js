const MovingGradients = () => {
  const colors = [
    "#d4b2ab",
    "#00b4ff",
    "rgba(158, 86, 241, 0.91)",
    "rgba(174, 63, 215, 0.6)",
  ];

  const generateAnimationStyles = (index) => {
    return {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `translate(-50%, -50%)`,
      animation: `moveAround-${index} ${
        Math.random() * 12 + 6
      }s linear infinite`,
    };
  };

  return (
    <div
      className="absolute top-0 left-0 h-full w-full block animate-spin z-0"
      style={{ animationDuration: "30s" }}
    >
      <div
        className="bg-purple-weak h-[200%] w-[200%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          boxShadow: `0 0 50px 50px #995df9`,
        }}
      ></div>
      {colors.map((color, index) => (
        <div
          key={index}
          className="gradient opacity-80"
          style={{
            boxShadow: `0 0 50px 50px ${color}`,
            background: color,
            ...generateAnimationStyles(index),
          }}
        ></div>
      ))}
      <style jsx>{`
        .gradient {
          position: absolute;
          width: 100%;
          height: 80%;
          border-radius: 50%;
        }

        @keyframes moveAround-0 {
          0% {
            top: 0%;
            left: 0%;
          }
          25% {
            top: 25%;
            left: 75%;
          }
          50% {
            top: 50%;
            left: 50%;
          }
          75% {
            top: 75%;
            left: 25%;
          }
          100% {
            top: 100%;
            left: 100%;
          }
        }

        @keyframes moveAround-1 {
          0% {
            top: 0%;
            left: 0%;
          }
          35% {
            top: 25%;
            left: 75%;
          }
          50% {
            top: 50%;
            left: 50%;
          }
          65% {
            top: 75%;
            left: 25%;
          }
          100% {
            top: 0%;
            left: 0%;
          }
        }

        @keyframes moveAround-2 {
          0% {
            top: 50%;
            left: 50%;
          }
          20% {
            top: 75%;
            left: 25%;
          }
          40% {
            top: 100%;
            left: 50%;
          }
          70% {
            top: 25%;
            left: 75%;
          }
          100% {
            top: 50%;
            left: 50%;
          }
        }

        @keyframes moveAround-3 {
          0% {
            top: 100%;
            left: 100%;
          }
          25% {
            top: 50%;
            left: 80%;
          }
          60% {
            top: 25%;
            left: 75%;
          }
          85% {
            top: 0%;
            left: 100%;
          }
          100% {
            top: 100%;
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MovingGradients;
