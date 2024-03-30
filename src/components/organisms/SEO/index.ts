import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO: React.FC = () => {
  const location = useLocation();

  const links = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/product/:id",
      title: "Product Details",
    },
    {
      link: "/cart",
      title: "Shopping Cart",
    },
    {
      link: "/checkout",
      title: "Checkout",
    },
    {
      link: "/orders",
      title: "My Orders",
    },
    {
      link: "/my-points",
      title: "My Points",
    },
    {
      link: "/swap-points",
      title: "Swap Points",
    },
    {
      link: "/daily-check-in",
      title: "Daily Check-in",
    },
    {
      link: "/wifi-point",
      title: "WiFi Point",
    },
    {
      link: "/event",
      title: "Events",
    },
    {
      link: "/event/:id",
      title: "Event Details",
    },
  ];
  const link = links.filter((item) => item.link === location.pathname);

  useEffect(() => {
    const prevTitle = document.title;
    // Set newTitle based on whether a matching link is found
    const newTitle =
      link.length > 0
        ? `FOC Online Store - ${link[0].title}`
        : "FOC Online Store - 404";
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
