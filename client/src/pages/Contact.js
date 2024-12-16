import React, { useState } from "react";
import Wrapper from "../components/Layout/Wrapper";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { apiClient } from "../utils/AxiosInterceptor";
const Contact = () => {
  const [subject, setSubject] = useState();
  const [senderName, setSenderName] = useState();
  const [message, setMessage] = useState();
  const [seMail, setSeMail] = useState();
  const [loading, setLoading] = useState(false);

  const handleMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post("/api/v1/auth/contact-mail", {
        email: seMail,
        message,
        subject,
        name: senderName,
      });
      if (data.success) {
        setSubject("");
        setSenderName("");
        setMessage("");
        setSeMail("");
        setLoading(false);
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("could not send mail");
    }
  };

  return (
    <Wrapper tittle="Contact us- Buyers Hub">
      <h1 className="text-center text-heading m-4">Contact Us</h1>
      <div className="row justify-content-center text-norm">
        <div className="mb-3 col-md-8">
          <form className="m-3" onSubmit={handleMail}>
            <div className="mb-3">
              <p className="lead">Subject</p>
              <input
                placeholder="Subject"
                type="text"
                value={subject}
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
                className="form-control input-text "
                id="exampleInputName1"
                required
              />
            </div>
            <div className="mb-3">
              <p className="lead"> Email</p>
              <input
                placeholder="Subject"
                type="email"
                name="email"
                value={seMail}
                onChange={(e) => setSeMail(e.target.value)}
                className="form-control input-text "
                id="exampleInputName1"
                required
              />
            </div>
            <div className="mb-3">
              <p className="lead">Name</p>

              <input
                placeholder="Name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                name="name"
                className="form-control input-text "
                id="exampleInputName1"
                required
              />
            </div>
            <div className="mb-3">
              <p className="lead">Message</p>
              <textarea
                placeholder="Message"
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control input-text "
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <button type="submit" className="btn btn-norm" onClick={handleMail}>
              {!loading ? " Send Mail" : <Loading />}
            </button>
          </form>
        </div>
      </div>
      <p className="  text-norm text-center">
        you can also connect us on{" "}
        <Link className="contact-mail" to="mailto:fasahatabbas3@gmail.com">
          fasahatabbas3@gmail.com
        </Link>{" "}
      </p>
    </Wrapper>
  );
};

export default Contact;
