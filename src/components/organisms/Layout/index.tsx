// import styles from "./index.scss"

import { Footer, Header } from "..";

export interface ILayoutProps {
  id: string
  children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { id = "", children } = props;

  return (
    <div className="layout">
      <div className="header-wrap">
        <Header />
        <div id={id} className="content-wrap">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
