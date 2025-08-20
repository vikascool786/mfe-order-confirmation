import React from "react";
import "../styles.css"; // Optional: place shared styling here

const SOCIAL_URL =
  "https://staging.shop.com/7052764/1981669486-p.xhtml?refpromocode=6565841-CORE3&utm_medium=Sharefeature&credituser=C6565841&utm_source=ConfirmationPage&utm_campaign=";

interface SocialShareButtonsProps {
  contentStrings?: any;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ contentStrings }) => {
  const pageUrl = encodeURIComponent(SOCIAL_URL + "Link");
  const emailBody = encodeURIComponent(
    `I love this product on SHOP.COM and thought you might too! ${SOCIAL_URL}Email`
  );

  return (
    <div className="oc-re-qa-social-share oc-re-social-pdp oc-re-social-order-confirmation oc-re-social-pdp--wrap">
      {/* Email */}
      <a
        className="oc-re-qa-email js-email-share oc-re-social-pdp__button oc-re-button-plain"
        href={`mailto:?subject=I think you’ll love this product from SHOP.COM!&body=${emailBody}`}
        title={contentStrings?.response?.shareViaEmail || "Share via Email"}
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          {/* Email SVG */}
          <svg
            style={{ fill: "#000" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
          </svg>
        </span>
      </a>

      {/* TikTok */}
      <button
        className="oc-re-qa-tiktok js-page-link-share-btn oc-re-social-pdp__button oc-re-button-plain"
        title={contentStrings?.response?.shareOnTiktok || "Share on TikTok!"}
        type="button"
        data-href={`${SOCIAL_URL}TikTok`}
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          {/* TikTok SVG */}
          <svg
            style={{ fill: "#000" }}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
          </svg>
        </span>
      </button>

      {/* Instagram */}
      <button
        className="oc-re-qa-instagram js-page-link-share-btn oc-re-social-pdp__button oc-re-button-plain"
        title={contentStrings?.response?.shareOnInstagram || "Share on Instagram!"}
        type="button"
        data-href={`${SOCIAL_URL}Instagram`}
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          {" "}
          <svg
            style={{ fill: "#000" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
          >
            <path d="M11,2c2.94,0,3.28,0,4.45.07a6,6,0,0,1,2,.38A3.52,3.52,0,0,1,19.6,4.54a6,6,0,0,1,.35,2C20,7.71,20,8.06,20,11s0,3.28-.07,4.45a6,6,0,0,1-.38,2,3.61,3.61,0,0,1-2.08,2.08,6,6,0,0,1-2,.38C14.29,20,13.94,20,11,20S7.72,20,6.55,20a5.68,5.68,0,0,1-2-.38,3.31,3.31,0,0,1-1.29-.82,3.45,3.45,0,0,1-.83-1.29,6.24,6.24,0,0,1-.34-2C2,14.29,2,13.94,2,11s0-3.28.07-4.45a5.68,5.68,0,0,1,.38-2A3.24,3.24,0,0,1,4.51,2.43a5.9,5.9,0,0,1,2-.38C7.7,2,8.05,2,11,2m0-2C8,0,7.63,0,6.49.06A8.24,8.24,0,0,0,3.8.58,5.25,5.25,0,0,0,1.87,1.87,5.25,5.25,0,0,0,.58,3.8,8.15,8.15,0,0,0,.06,6.44C0,7.61,0,8,0,10.94s0,3.36.06,4.51A8.08,8.08,0,0,0,.58,18.2a5.25,5.25,0,0,0,1.29,1.93A5.25,5.25,0,0,0,3.8,21.42a8.11,8.11,0,0,0,2.67.51C7.64,22,8,22,11,22s3.36,0,4.51-.06a8.11,8.11,0,0,0,2.67-.51,5.61,5.61,0,0,0,3.22-3.22,8.11,8.11,0,0,0,.51-2.67c.05-1.17.06-1.54.06-4.5s0-3.36-.06-4.51a8.11,8.11,0,0,0-.51-2.67,5.25,5.25,0,0,0-1.29-1.93A5.25,5.25,0,0,0,18.15.63,8.36,8.36,0,0,0,15.54.06C14.37,0,14,0,11,0Z"></path>
            <path d="M11,5.35A5.65,5.65,0,1,0,16.65,11h0A5.65,5.65,0,0,0,11,5.35Zm0,9.31A3.67,3.67,0,1,1,14.67,11h0A3.67,3.67,0,0,1,11,14.67h0Z"></path>
            <circle cx="16.87" cy="5.13" r="1.32"></circle>
          </svg>
        </span>
      </button>

      {/* Facebook */}
      <button
        className="oc-re-qa-facebook js-facebook-share oc-re-social-pdp__button oc-re-button-plain"
        title={contentStrings?.response?.shareOnFacebook || "Share via Facebook"}
        type="button"
        data-href={`${SOCIAL_URL}Facebook`}
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          {/* Facebook SVG */}
          <svg
            style={{ fill: "#000" }}
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.14,0V3.55s-2.63-.26-3.27.73c-.35.55-.14,2.15-.17,3.29h3.46c-.29,1.35-.51,2.25-.72,3.42H12.7V22H7.88V11h-2V7.58h2c.1-2.53.14-5,1.39-6.31C10.67-.16,12,0,16.14,0Z" />
          </svg>
        </span>
      </button>

      {/* Twitter */}
      <button
        className="oc-re-qa-twitter js-twitter-share oc-re-social-pdp__button oc-re-button-plain"
        title={contentStrings?.response?.shareViaTwitter || "Share via Twitter"}
        type="button"
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          {/* Twitter SVG */}
          <svg
            style={{ fill: "#000" }}
            viewBox="0 0 1200 1227"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
          </svg>
        </span>
      </button>

      {/* Pinterest */}
      <button
        className="oc-re-qa-pinterest js-pinterest-share oc-re-social-pdp__button oc-re-button-plain"
        title={contentStrings?.response?.shareViaPinterest || "Share via Pinterest"}
        type="button"
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          {/* Pinterest SVG */}
          <svg
            style={{ fill: "#000" }}
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.59,14.29c-.18.71-.36,1.46-.54,2.19a15.56,15.56,0,0,1-.61,2.12,11.13,11.13,0,0,1-1.75,3c-.5.57-.39.34-.54.31S6,21.8,6,21.63a17.07,17.07,0,0,1,0-2.86,15,15,0,0,1,.51-3c.41-1.77.81-3.5,1.23-5.29a1.23,1.23,0,0,0,.08-.38,5.33,5.33,0,0,1-.38-1.46A4.76,4.76,0,0,1,7.56,7,2.75,2.75,0,0,1,9.18,5a1.85,1.85,0,0,1,1.49.12,1.66,1.66,0,0,1,.74,1.08,3.81,3.81,0,0,1-.07,1.61c-.23,1-.54,1.83-.8,2.84a3,3,0,0,0-.16,1.55,1.84,1.84,0,0,0,.72,1.08,2.12,2.12,0,0,0,1.4.39,3,3,0,0,0,2.27-1.34,8,8,0,0,0,1.44-4,10,10,0,0,0,.06-1.73,4.79,4.79,0,0,0-1-2.69,4.48,4.48,0,0,0-2.15-1.46,7.06,7.06,0,0,0-3.23-.2,5.68,5.68,0,0,0-4.2,3.06A6.06,6.06,0,0,0,5,8.2a3.71,3.71,0,0,0,.58,2.15,6.31,6.31,0,0,1,.39.54c.16.28,0,.7-.1,1s-.1.87-.54.88a1.33,1.33,0,0,1-.54-.21A4.38,4.38,0,0,1,2.73,9.33a7.59,7.59,0,0,1,0-2.77A7.87,7.87,0,0,1,6.49,1.29,9.12,9.12,0,0,1,9.84.12C10.28.06,10.73,0,11.2,0a8.33,8.33,0,0,1,3.72.69,7.64,7.64,0,0,1,2.55,1.84,7,7,0,0,1,1.59,2.85,6.83,6.83,0,0,1,.34,2,11.63,11.63,0,0,1-.27,2,8,8,0,0,1-3.29,5.53,5.84,5.84,0,0,1-1.5.69,5.45,5.45,0,0,1-1.93.24,4,4,0,0,1-1.7-.49A2.93,2.93,0,0,1,9.59,14.29Z" />
          </svg>
        </span>
      </button>

      {/* Copy Link */}
      <button
        className="oc-re-qa-page-share js-page-link-share-btn oc-re-social-pdp__button oc-re-button-plain"
        title={contentStrings?.response?.shareThisProduct || "Share this product!"}
        type="button"
        data-href={pageUrl}
      >
        <span className="oc-re-social-pdp__icon-svg oc-re-social-pdp__icon-svg--blue-black">
          <svg
            style={{ fill: "#000" }}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 2040 2040"
            xmlSpace="preserve"
          >
            <style type="text/css">
              {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:none;}`}
            </style>
            <rect className="oc-re-st0" width="2040" height="2040"></rect>
            <g>
              {" "}
              <path d="M541.7,1938c-117.5-0.1-227.9-45.9-311-129c-83.1-83-128.8-193.5-128.8-310.9s45.8-227.9,128.8-310.9l270.6-270.6 c16.8-16.8,39.1-26,62.8-26s46,9.2,62.8,26s26,39.1,26,62.8s-9.3,46-26,62.8l-270.6,270.6c-49.5,49.5-76.8,115.3-76.8,185.3 s27.3,135.8,76.8,185.2c49.5,49.5,115.4,76.9,185.5,76.9c70.2,0,135.9-27.2,185.3-76.6l350.9-350.9 c49.6-49.6,76.8-115.4,76.5-185.2c0-70.2-27.3-136-76.8-185.6c-9.3-9.3-20.3-18.4-34.7-28.5c-19.4-13.7-32.2-34.1-36.3-57.5 c-4-23.4,1.3-46.9,15-66.3c16.6-23.5,43.8-37.5,72.6-37.5c18.4,0,36.2,5.6,51.3,16.3c22.9,16.2,41.2,31.4,57.7,48 c83.1,83.1,128.9,193.5,128.9,310.9c0.4,117.3-45.3,227.9-128.6,311.2l-350.9,350.9c-83,83-193.4,128.7-310.8,128.7L541.7,1938 L541.7,1938z"></path>{" "}
              <path d="M945.5,1268c-18.4,0-36.1-5.6-51.2-16.3c-22.9-16.2-41.2-31.4-57.7-48c0,0-3.5-3.7-4-4.4c-9.4-9.8-17.9-19-25.7-28.6 c-2-2.5-3.9-5-5.7-7.6l-2.5-3.4c-6.7-8.7-12.6-16.5-18-24.6c-1.2-1.8-2.3-3.6-3.3-5.4c-7.5-11.9-13.6-22-19.1-32.5 c-33.3-63.9-50.4-134.1-50.4-204.5c-0.4-117.3,45.3-227.9,128.6-311.2l350.9-350.9c83-83,193.4-128.7,310.8-128.7 c117.9,0.1,228.3,45.9,311.4,129c83.1,83,128.8,193.5,128.8,310.9s-45.8,227.9-128.8,310.9L1539,1123.3c-16.8,16.8-39.1,26-62.8,26 c-23.7,0-46-9.2-62.8-26s-26-39.1-26-62.8c0-23.7,9.3-46,26-62.8L1684,727.1c49.5-49.5,76.8-115.3,76.8-185.3 S1733.5,406,1684,356.6c-49.5-49.5-115.4-76.9-185.5-76.9c-69.4,0-134.6,26.7-183.9,75.2L962,707.3 c-74.1,74.1-96.8,185.1-57.9,282.8c3.2,7.9,6.2,14.3,9.5,20.7l1.6,3.4c2.8,5.5,5.7,10,8.5,14.6l5.1,8.6c2.2,3.3,4.6,6.4,7.1,9.6 l5.2,7c1.1,1.5,2.1,3,3.3,4.4c4.3,5.2,9,10.2,13.7,15.2l2.9,3.2c10.4,10.6,21.4,19.6,35.8,29.7c40,28.3,49.5,83.9,21.2,123.9 C1001.5,1253.9,974.4,1268,945.5,1268z"></path>{" "}
            </g>
          </svg>
          
        </span>
      </button>
    </div>
  );
};

export default SocialShareButtons;
