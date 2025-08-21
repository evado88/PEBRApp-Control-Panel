import React, { useState, useEffect } from "react";
import SelectBox from "devextreme-react/select-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import { LoadPanel } from "devextreme-react/load-panel";
import { useHistory } from "react-router-dom";
import Toolbar, { Item } from "devextreme-react/toolbar";

import { Validator, RequiredRule } from "devextreme-react/validator";

import Assist from "../assist.js";

const SMSPhone = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  

  const [cat, setCategory] = useState("");

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    Assist.loadData("Categories", "sms-category/list")
      .then((res) => {
        const items = res.Result.map((cat) => {
          return cat.sms_cat_name;
        });

        setCategoryList(items);
        setAllCategories(res.Result);

      })
      .catch((ex) => {
        Assist.showMessage(ex.Message, "error");
      });


    //audit
    Assist.addAudit(
      window.sessionStorage.getItem("ruser"),
      "Send Messages",
      "Send",
      0
    )
      .then((res) => {
        Assist.log(res.Message, "info");
      })
      .catch((x) => {
        Assist.log(x.Message, "warn");
      });
  }, []);


  const onFormSubmit = async (e) => {
    e.preventDefault();

    Assist.showMessage("Sending messages now","success");

    setLoading(true);

    const selectedcategory = allCategories.find(
      (item) => item.sms_cat_name === cat
    );

    console.log("selected category", selectedcategory);

    setLoading(false);
  }

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Send Messages</h2>
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        position={{ of: "#currentForm" }}
        visible={loading}
        showIndicator={true}
        shading={true}
        showPane={true}
        hideOnOutsideClick={false}
      />
      <div
        className={"content-block dx-card responsive-paddings"}
        id="currentForm"
      >
        <Toolbar>
          <Item
            location="before"
            locateInMenu="auto"
            widget="dxButton"
            options={{
              icon: "revert",
              onClick: () => {
                history.goBack();
              },
            }}
          />
        </Toolbar>
        <form action="your-action" onSubmit={onFormSubmit}>
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Properties</div>

            <div className="dx-field">
              <div className="dx-field-label">Category</div>
              <div className="dx-field-value">
                <SelectBox
                  dataSource={categoryList}
                  validationMessagePosition="left"
                  onValueChanged={(e) => setCategory(e.value)}
                  inputAttr={{ "aria-label": "Category" }}
                  value={cat}
                  disabled={error}
                >
                  <Validator>
                    <RequiredRule message="Category is required" />
                  </Validator>
                </SelectBox>
              </div>
            </div>
          </div>

          <div className="dx-fieldset">
            <ValidationSummary id="summary" />
            <br></br>
            <Button
              width="100%"
              id="button"
              text="Start Sending Messages"
              type="danger"
              disabled={error}
              useSubmitBehavior={true}
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SMSPhone;
