"use client";
import ScrollText from "../ScrollText";

const HomepageScrollText = () => {
  return (
    <ScrollText>
      <ScrollText.Mobile gradientText>
        <>Unstoppable</>
        <>applications</>
        <>with full-stack</>
        <>control.</>
      </ScrollText.Mobile>
      <ScrollText.Desktop gradientText>
        <>Unstoppable applications</>
        <>with full-stack control.</>
        <></>
      </ScrollText.Desktop>
    </ScrollText>
  );
};

export default HomepageScrollText;
