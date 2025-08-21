import { useRef } from "react";
import { Link} from "react-router-dom";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
} from "devextreme-react/form";

import "./download-form.scss";

export default function DowloadForm(props) {
  const formData = useRef({});


  return (
      <Form formData={formData.current}>
        <Item>
          <div className="policy-info">
            You can download the TwySHE Messenger app and Main app below. The
            main app is ONLY for peer-navigators
          </div>
        </Item>

         <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={false}
             onClick={() => {
              window.location = "https://twyshe.app/app-mess.apk";
            }}
          >
            <span className="dx-button-text">Download Messenger App</span>
          </ButtonOptions>
        </ButtonItem>
        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={false}
            onClick={() => {
              window.location = "https://twyshe.app/app-main.apk";
            }}
          >
            <span className="dx-button-text">Download Main App</span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"login-link"}>
            Have an account? <Link to={"/login"}>Sign In</Link>
          </div>
        </Item>
      </Form>
  );
}

