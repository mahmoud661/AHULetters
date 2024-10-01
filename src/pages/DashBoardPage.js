import Navbar from "../Components/NavBar/NavBar";
import "../App.css";

import Footer from "../Components/Footer/Footer";
import DashBoard from "../Components/DashBoard/DashBoard";
export default function DashBoardPage(props) {

    return (
        <div>
            <Navbar updateAdmin={props.updateAdmin} />
            <DashBoard />
          
        </div>
    );
}