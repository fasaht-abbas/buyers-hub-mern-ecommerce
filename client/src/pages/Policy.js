import React from "react";
import Wrapper from "../components/Layout/Wrapper";

const Policy = () => {
  return (
    <Wrapper title="Policy-Buyers Hub">
      <div className="p-5 text-norm mb-3 p-2">
        <div className="display-5 text-center mb-4">
          Privacy Policy for Buyers Hub
        </div>
        <p>
          At Buyers Hub, we are committed to protecting the privacy and security
          of our customers. This Privacy Policy explains how we collect, use,
          and protect your personal information when you use our website,
          www.buyershub.com.
        </p>
        <p className="lead text-center font-weight-bold">
          Information We Collect
        </p>
        <ul className="mb-3">
          We collect the following types of personal information from you when
          you use our website:
          <li>
            <p className="lead">Contact Information:</p> This includes your
            name, email address, phone number, and shipping address.
          </li>
          <li>
            <p className="lead">Payment Information:</p> This includes your
            credit card or other payment information that you provide when you
            make a purchase on our website.
          </li>
          <li>
            <p className="lead">Usage Information:</p> This includes information
            about how you use our website, such as the pages you visit, the
            products you view, and the searches you conduct.
          </li>
          <li>
            <p className="lead">Communication Information:</p> This includes any
            communications you have with us, such as emails, chat messages, or
            phone calls.
          </li>
        </ul>
        <p className="lead text-center font-weight-bold">Use of Information</p>
        <ul>
          <li>
            We use the personal information we collect for the following
            purposes:
          </li>
          <li>To process and fulfill your orders and requests.</li>

          <li>
            To communicate with you about your orders, products, and promotions.
          </li>

          <li>To improve our website and the services we offer.</li>

          <li>To prevent and detect fraud and unauthorized activity.</li>
          <li>To comply with legal and regulatory requirements.</li>
        </ul>
        <p className="lead text-center font-weight-bold">
          Sharing of Information
        </p>
        <ul>
          <li>
            We do not share your personal information with third parties except
            as described below:
          </li>
          <li>
            <p className="lead"> Service Providers:</p> We may share your
            personal information with service providers that help us operate our
            website and fulfill your orders, such as payment processors,
            shipping carriers, and customer service providers.
          </li>
          <li>
            <p className="lead">Legal Requirements:</p> Legal Requirements: We
            may disclose your personal information to comply with applicable
            laws, regulations, legal processes, or governmental requests.
          </li>

          <li>
            <p className="lead"> Business Transactions:</p>Business
            Transactions: If we are involved in a merger, acquisition, or sale
            of all or a portion of our assets, your personal information may be
            transferred as part of that transaction.
          </li>
        </ul>
        Security of Information We take appropriate measures to protect your
        personal information from unauthorized access, disclosure, alteration,
        and destruction. We use industry-standard encryption to protect your
        payment information and restrict access to your personal information to
        only those employees who need to know that information to provide our
        services. Your Choices You may choose to opt-out of receiving
        promotional emails from us by following the unsubscribe instructions in
        those emails. You may also contact us at privacy@buyershub.com to
        request that we delete your personal information or to update your
        contact information. Changes to Privacy Policy We may update this
        Privacy Policy from time to time to reflect changes in our practices and
        services. We will notify you of any material changes to this Privacy
        Policy by posting a notice on our website or by contacting you directly.
        Contact Us If you have any questions or concerns about this Privacy
        Policy or our privacy practices, please contact us at
        <p className="font-weight-bold">privacy@buyershub.com.</p>
      </div>
    </Wrapper>
  );
};

export default Policy;
