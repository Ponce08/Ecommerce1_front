import './Footer.css';
import go from '../../../public/go-svgrepo-com.svg';

export const Footer = () => {
  return (
    <>
      <div className="content_footer_main">
        <div className="content_footer_span-line">
          <div className="content_footer_span">
            <span>TECNOLOGY</span>
            <span>FASHION</span>
            <span>REGISTER</span>
            <span>SIGN IN</span>
            <span>CONTACT</span>
            <span>POLICIES</span>
          </div>
        </div>
        <div className="content_footer_label_input">
          <span>Newsletter</span>
          <div className="button_footer">
            <input type="text" placeholder="Your email..." />
            <button>
              <img src={go} alt="go" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
