import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import UrlHitter from "./components/urlHitter";
function App() {
const [sideBar,setSidebar]=useState(true);
  return (
    <div>
      <Navbar toggle={()=>setSidebar(!sideBar)}/>
      <Sidebar isOpen={sideBar} toggle={()=>setSidebar(!sideBar)}/>
      <UrlHitter className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    </div>

  )
  
}

export default App; 