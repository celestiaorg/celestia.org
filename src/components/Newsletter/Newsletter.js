import React, { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Row, Col } from "@/macros/Grids";
import { Body } from "@/macros/Copy";

const Newsletter = (props) => {
  const [email, setEmail] = useState("");
  const [listFields, setListFields] = useState({ "group[57543]": "1" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Thank you");
  const [msg, setMsg] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [token, setToken] = useState(null);
  const reCaptchaRef = useRef(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onReCAPTCHAChange = (token) => {
    setToken(token);
    setCaptchaError("");
  };

  const asyncScriptOnLoad = () => {
    console.log("reCAPTCHA script loaded");
  };

  const mailchimp = async (url) => {
    try {
      const response = await axios.post(url, {
        email,
        ...listFields,
      });
      const { data } = response;
      setMsg(data.msg);
      if (
        data.result === "error" &&
        data.msg.includes("is already subscribed")
      ) {
        setPopupTitle("Thank you!");
        setMsg("Thank you for subscribing!");
      } else {
        setPopupTitle(data.result === "success" ? "Thank you!" : "Error");
      }
      setIsModalOpen(true);
    } catch (error) {
      setPopupTitle("Error");
      setMsg("An error occurred. Please try again later.");
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setCaptchaError("Please complete the reCAPTCHA challenge!");
      return;
    }
    const updatedListFields = { ...listFields, "group[57543][1]": 1 };
    setListFields(updatedListFields);
    if (email) {
      mailchimp(
        "https://celestia.us6.list-manage.com/subscribe/post?u=cde2461ba84f5279fff352829&id=8d165e36d3"
      );
    }
  };

  return (
    <div className={"modal-content-inner"}>
      {/* TODO: bring success message below the form input */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className={"inner"}>
          <h3 className={"text-center"}>{popupTitle}</h3>
          <div
            className={"text-center"}
            dangerouslySetInnerHTML={{
              __html: msg,
            }}
          />
          <button className={"close-button"} onClick={handleModalClose}>
            <i className={"icon-close"} aria-label="Close"></i>
          </button>
        </div>
      </Modal>
      <form onSubmit={handleSubmit} className={"w-full"}>
        <Row className="flex gap-4 items-center">
          <div className={"w-full relative"}>
            <label
              for={"email"}
              className={`px-2 py-3 absolute   text-sm leading-[1.2857] transition-all ${
                email.length > 0
                  ? "-top-8 -left-2 text-opacity-100"
                  : "top-0 left-0 text-opacity-60"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id={"email"}
              className={`w-full px-2 py-3 text-sm leading-[1.2857] bg-transparent border-b ${
                captchaError ? "border-red-error-subtle" : "border-white"
              }`}
              onChange={handleChange}
              required
            />
          </div>

          <PrimaryButton
            lightMode
            hover
            className={"bg-white grow-0 shrink-0"}
            type={"submit"}
            onClick={handleSubmit}
          >
            Subscribe
          </PrimaryButton>
        </Row>
        {siteKey && (
          <Row className="mt-3">
            <ReCAPTCHA
              sitekey={siteKey}
              ref={reCaptchaRef}
              onChange={onReCAPTCHAChange}
              asyncScriptOnLoad={asyncScriptOnLoad}
            />
          </Row>
        )}
        {captchaError && (
          <Row className="mt-2 px-2">
            <Body size={"sm"} className={"text-red-error"}>
              {captchaError}
            </Body>
          </Row>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
