import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../css/Footer.css';

const Footer: React.FC = () => {
  const companyName = "Food and Cocktails";
  const openingHours = "Monday - Friday: 9am - 5pm";
  const conatct = "Email: info@grupp-arbete-6.se / Tel: +46 70 123 45 67"

  return (
    <footer className="footer">
      <div>
        <p>&copy; {companyName} {new Date().getFullYear()}</p>
        <p>Opening Hours: {openingHours}</p>
        <p>Conact us on {conatct}</p>
        <div className="social-icons">
          <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://www.linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;