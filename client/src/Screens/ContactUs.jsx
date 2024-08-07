import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "",
      icon: FiMail,
      contact: "info@wdia.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "1-800-123-4567",
      icon: FiPhoneCall,
      contact: "",
    },
    {
      id: 3,
      title: "Location",
      info: "Lorem 200, Black Road, Suite 100, Toronto, ON 10006",
      icon: FiMapPin,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid md:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full text-subMain bg-main text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
