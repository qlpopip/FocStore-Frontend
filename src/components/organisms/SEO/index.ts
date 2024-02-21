import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO: React.FC = () => {
  const location = useLocation();

  const links = [
    {
      link: "/",
      title: "Main",
    },
    {
      link: "/about",
      title: "About Us",
    },
    {
      link: "/contact-us",
      title: "Contact Us",
    },
  ];

  const link = links.filter((item) => item.link === location.pathname);

  useEffect(() => {
    const prevTitle = document.title;
    // Set newTitle based on whether a matching link is found
    const newTitle =
      link.length > 0 ? `React - ${link[0].title}` : "React - 404";
    document.title = newTitle;

    // Cleanup function
    return () => {
      document.title = prevTitle;
    };
    // eslint-disable-next-line
  }, [link.length > 0 ? link[0].title : "", location]); // Safely handle undefined link[0]

  return null;
};

export default SEO;
