import { Navigate } from "react-router-dom";
import React from "react";
import Card from "../components/Card";
import LayoutCenter from "../components/LayoutCenter";
import Logo from "../components/Logo";
import MainPageNav from "../components/MainPageNav";
import { BsPinMapFill, BsFillTelephoneFill} from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";
import IconTextContainer from "../components/IconTextContainer";

export const ContactPage = ({user, setUser}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else  {
    return (
  <div>
    <MainPageNav setUser={setUser}/>
    <LayoutCenter>
      <Card>
        <Logo />
        <div style={{ marginTop: "50px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <IconTextContainer>
            <AiFillMail style={{ marginTop: "3px", marginRight: "5px" }} />
            <p>
              Email:
              <a href="mailto:" style={{ textDecoration: "none" }}>
                kfcteam@gmail.com
              </a>
            </p>
          </IconTextContainer>
          <IconTextContainer>
            <BsFillTelephoneFill
              style={{ marginTop: "3px", marginRight: "5px" }}
            />
            <p>Tel: +40773773861</p>
          </IconTextContainer>
          <IconTextContainer>
            <BsPinMapFill style={{ marginTop: "3px", marginRight: "5px" }} />
            <p>Address: Soseaua Sibiului 5, Șelimbăr 557260</p>
          </IconTextContainer>
        </div>
      </Card>
    </LayoutCenter>
  </div> )
        }
      };
