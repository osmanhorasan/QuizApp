import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logoIMG from "../assets/start_icon.png";
import { AppBar, Button, MenuList, Toolbar } from "react95";
import Navigation from "../components/Navigation";

const Layout: React.FC = () => {


  const [open, setOpen] = useState(false);
  return (
    <div>
      <Outlet />
      <AppBar>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: "bold" }}
            >
              <img
                src={logoIMG}
                alt="react95 logo"
                style={{ height: "20px", marginRight: 4 }}
              />
              Start
            </Button>
            {open && (
              <MenuList
                style={{
                  position: "absolute",
                  left: "0",
                  top: "100%",
                }}
                onClick={() => setOpen(false)}
              >
                <Navigation />
              </MenuList>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
