import { ScrollPolicies } from '@/utils/ScrollPolicies.tsx';
import '../Styles.css';
import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';

export const PagePolicies = () => {
  ScrollPolicies();
  return (
    <>
      <Header />
      <div className="content_pagePolicies">
        <h1>Policies and Contact</h1>
        <p>
          <span>Contact and Support:</span> Email: support@your-ecommerce.com WhatsApp: +1 (555) 123-4567 Online chat available on
          our website. Hours: Monday to Friday from 9:00 AM to 6:00 PM (GMT). Response time: We respond within 24 to 48 business
          hours.
          <br />
          <br />
          <span id="shipping_policy">1. Shipping Policy Processing Time:</span> We process all orders within 1 to 3 business days.
          Shipping options: Standard shipping (5-7 business days). Express shipping (2-3 business days). Cost: Free shipping on
          orders over $100 USD. Orders under this amount have a $10 USD fee for standard shipping. Coverage: We ship nationwide.
          For international shipping, check the additional rates section. Delays: During high-demand periods, delivery times may
          slightly vary. <br />
          <br /> <span id="refund_policy">2. Return and Refund Policy:</span> We accept returns for defective products or if you
          are not satisfied with your purchase. Period: You can return any item within 30 days of receipt. Product condition:
          Fashion items must be returned with original tags and without signs of use. Tech devices must be returned in their
          original packaging and undamaged. Refunds: We will process your refund within 7 business days after receiving the
          returned product. Shipping costs: Return shipping costs are the customer’s responsibility, except for defective
          products. <br />
          <br /> <span id="privacy_policy">3. Privacy Policy:</span> We collect information such as your name, email, shipping
          address, and payment details to process your order and personalize your experience. Protection: Your information is
          encrypted using SSL protocols to ensure security. Third parties: We do not share your data with third parties, except
          for payment processors and shipping services. Cookies: We use cookies to analyze traffic and improve navigation. You can
          disable them in your browser settings. <br />
          <br /> <span>4. Terms and Conditions:</span> Customers must use the site exclusively to purchase legal products.
          Malicious use of the site is prohibited. Prices: Prices are subject to change without prior notice and may vary
          depending on promotions or discounts. Availability: Some tech products have limited stock and may sell out quickly.
          Responsibility: While we strive to provide accurate descriptions, we are not responsible for typographical errors.{' '}
          <br />
          <br /> <span>5. Payment Methods Policy:</span> Credit/debit cards (Visa, MasterCard, American Express). PayPal. Bank
          transfer. Security: Your payments are protected with SSL encryption. Currency: All prices are in USD. Conversions may
          apply if you purchase from another country. <br />
          <br /> <span>6. Warranty Policy:</span> Fashion products do not include a warranty unless they have manufacturing
          defects. Technology: Devices come with a 1-year warranty for manufacturing defects. Exclusions: The warranty does not
          cover damages due to misuse, drops, or unauthorized tampering.
        </p>
      </div>
      <Footer />
    </>
  );
};
