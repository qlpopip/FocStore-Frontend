import { Button } from "components/atoms";
import Layout from "components/organisms/Layout";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { connectWallet } from "share/redux/metamask/thunks";

const Connect: React.FC = () => {
    const dispatch = useAppDispatch()
    const balance = useAppSelector((state) => state.metamask.balance);
    const account = useAppSelector((state) => state.metamask.account);


    function isMobileDevice() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }
    const connectMetamask = async () => {
        try {
            if (isMobileDevice()) {
                const dappUrl = process.env.REACT_APP_PUBLIC_API_URL || ''; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
                window.location.href = "https://metamask.app.link/dapp/" + dappUrl.split('//')[1] + '/trade'
            }
            dispatch(connectWallet())
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <Layout id="connect">
                <div className="connect">
                    <img
                        src="https://www.thetreecenter.com/c/uploads/2021/08/Classic-American-Garden.jpg"
                        alt=""
                    />
                    <h1>Connect</h1>
                    <h1>{account} balance  {balance}</h1>
                    <Button className="primary" onClick={connectMetamask}>
                        Connect Wallet
                    </Button>
                </div>
            </Layout>
        </div>
    );
};

export default Connect;
