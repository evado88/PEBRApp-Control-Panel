import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextBox } from "devextreme-react/text-box";
import { NumberBox } from "devextreme-react/number-box";
import { LoadPanel } from "devextreme-react/load-panel";
import { useHistory } from "react-router-dom";
import Toolbar, { Item } from "devextreme-react/toolbar";

import { Validator, RequiredRule } from "devextreme-react/validator";

import AppInfo from "../app-info.js";
import Assist from "../assist.js";

import DataGrid, {
  Column,
  Pager,
  Paging,
  Lookup,
} from "devextreme-react/data-grid";

const QuizAttempt = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  const [score, setScore] = useState("");

  const [contentData, setContentData] = useState([]);

  const title = "Quiz Attempt";
  const id = props.match.params.eid === undefined ? 0 : props.match.params.eid;
  const action = id === 0 ? "Add" : "View";
  const verb = id === 0 ? "adding" : "Updating";

  useEffect(() => {
    const loadData = () => {
      setLoading(true);

      const url = AppInfo.apiUrl + "quiz-attempt/id/" + id;

      Assist.log(`Starting to load ${title} from server ${url}`);

      // invalid url will trigger an 404 error
      axios
        .get(url)
        .then((response) => {
          Assist.log(`Response for loading ${title} has completed from server`);
          setLoading(false);

          if (typeof response.data == "string") {
            Assist.showMessage("Unable to process server response from server");
          } else {
            if (response.data.succeeded) {

              setQuestion(response.data.items[0].quiz_question);
              setDescription(response.data.items[0].quiz_description);
              setScore(response.data.items[0].attempt_score);

              let questions = JSON.parse(
                response.data.items[0].attempt_answers
              );

              console.log("attempt", response.data.items[0], "list", questions);

              //add a no counter
              questions.forEach((item, index) => {
                if (item.no === undefined) {
                  item.no = index + 1;
                }
                if (item.id === undefined) {
                  item.id = index + 1;
                }
              });

              const naturalCollator = new Intl.Collator(undefined, {
                numeric: true,
                sensitivity: "base",
              });
              questions.sort((a, b) => naturalCollator.compare(a.no, b.no));

              setContentData(questions);

              console.log(questions);
            } else {
              Assist.showMessage(response.data.message);
            }
          }
        })
        .catch((error) => {
          setLoading(false);

          Assist.log(
            `An errocooured when loading ${title} from server: ${error}`
          );

          console.log(error);

          Assist.showMessage(
            `An error occured when loading ${title} from server`
          );
        });
    };

    if (id !== 0) {
      loadData();
    }

    //audit
    Assist.addAudit(window.sessionStorage.getItem("ruser"), "Quiz", id)
      .then((res) => {
        Assist.log(res.Message, "info");
      })
      .catch((x) => {
        Assist.log(x.Message, "warn");
      });
  }, [id, verb]);

  const options = [
    {
      ID: 1,
      Name: "Yes",
    },
    {
      ID: 0,
      Name: "No",
    },
  ];

  return (
    <React.Fragment>
      <h2 className={"content-block"}>
        {action} {title}
      </h2>
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
        <form action="your-action">
          <div className="dx-fieldset">
            <div className="dx-fieldset-header">Properties</div>

            <div className="dx-field">
              <div className="dx-field-label">Question</div>
              <div className="dx-field-value">
                <TextBox
                  validationMessagePosition="left"
                  onValueChanged={(e) => setQuestion(e.value)}
                  inputAttr={{ "aria-label": "Question" }}
                  value={question}
                  readOnly={true}
                >
                  <Validator>
                    <RequiredRule message="Question is required" />
                  </Validator>
                </TextBox>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Description</div>
              <div className="dx-field-value">
                <TextBox
                  readOnly={true}
                  onValueChanged={(e) => setDescription(e.value)}
                  value={description}
                  inputAttr={{ "aria-label": "Description" }}
                ></TextBox>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Score (%)</div>
              <div className="dx-field-value">
                <NumberBox
                  value={score}
                  onValueChanged={(e) => setScore(e.value)}
                  showSpinButtons={true}
                  showClearButton={true}
                  readOnly={true}
                />
              </div>
            </div>

            <div className="dx-fieldset">
              <div className="dx-fieldset-header">Options</div>
              <div className="dx-field">
                <DataGrid
                  className={"dx-card wide-card"}
                  dataSource={contentData}
                  keyExpr={"id"}
                  noDataText={"No options added"}
                  showBorders={false}
                  focusedRowEnabled={true}
                  defaultFocusedRowIndex={0}
                  columnAutoWidth={true}
                  columnHidingEnabled={true}
                  onCellPrepared={(e) => {
                    if (e.rowType === "data") {
                      if (e.column.dataField === "selected") {
                        if (e.data.selected === e.data.correct) {
                          e.cellElement.style.cssText = `color: white; background-color:green`;
                        } else {
                          e.cellElement.style.cssText = `color: white; background-color:red`;
                        }
                      }
                    }
                  }}
                >
                  <Paging defaultPageSize={10} />
                  <Pager showPageSizeSelector={true} showInfo={true} />
                  <LoadPanel enabled={loading} />
                  <Column
                    dataField={"id"}
                    caption={"ID"}
                    hidingPriority={8}
                    allowEditing={false}
                    visible={false}
                  />
                  <Column
                    dataField={"no"}
                    caption={"No"}
                    hidingPriority={8}
                    dataType="number"
                  />
                  <Column
                    dataField={"answer"}
                    caption={"Option"}
                    hidingPriority={8}
                    dataType="string"
                  />
                  <Column
                    dataField={"selected"}
                    caption={"Selected"}
                    hidingPriority={6}
                    dataType="numeric"
                    width={150}
                  >
                    <Lookup
                      dataSource={options}
                      displayExpr="Name"
                      valueExpr="ID"
                    />
                  </Column>

                  <Column
                    dataField={"correct"}
                    caption={"Correct"}
                    hidingPriority={6}
                    dataType="numeric"
                    width={150}
                  >
                    <Lookup
                      dataSource={options}
                      displayExpr="Name"
                      valueExpr="ID"
                    />
                  </Column>
                </DataGrid>
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default QuizAttempt;
