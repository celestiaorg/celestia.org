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
  const [status, setStatus] = useState(null);
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
        setStatus("Success");
        setMsg("Thank you for subscribing!");
      } else {
        setStatus(data.result === "success" ? "Success" : "Error");
      }
      setIsModalOpen(true);
    } catch (error) {
      setStatus("Error");
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
      <form onSubmit={handleSubmit} className={"w-full"}>
        <Row className="flex gap-4 items-center">
          <div className={"w-full relative"}>
            <label
              htmlFor={"email"}
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
              className={`w-full px-2 py-3 text-sm leading-[1.2857] bg-transparent border-b rounded-none ${
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
        {status === "Error" && (
          <Row className="mt-2 px-2">
            <Body size={"sm"} className={"text-red-error"}>
              {msg}
            </Body>
          </Row>
        )}
        {status === "Success" && (
          <Row className="mt-2 px-2">
            <Body size={"sm"} className={"text-green"}>
              {msg}
            </Body>
          </Row>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
