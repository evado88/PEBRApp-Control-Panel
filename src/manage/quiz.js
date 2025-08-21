import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectBox from "devextreme-react/select-box";
import { TextBox } from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
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
  Editing,
  Lookup,
} from "devextreme-react/data-grid";

const Quiz = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("");

  const [contentData, setContentData] = useState([]);

  const title = "Quiz";
  const id = props.match.params.eid === undefined ? 0 : props.match.params.eid;
  const action = id === 0 ? "Add" : "Update";
  const verb = id === 0 ? "adding" : "Updating";

  useEffect(() => {
    const loadData = () => {
      setLoading(true);

      const url = AppInfo.apiUrl + "quiz/id/" + id;

      Assist.log(`Starting to load ${title} from server ${url}`);

      // invalid url will trigger an 404 error
      axios
        .get(url)
        .then((response) => {
          Assist.log(`Response for loading ${title} has completed from server`);
          setLoading(false);

          if (typeof response.data == "string") {
            Assist.showMessage("Unable to process server response from server");
            setError(true);
          } else {
            if (response.data.succeeded) {
              setError(false);

              setQuestion(response.data.items[0].quiz_question);
              setDescription(response.data.items[0].quiz_description);
              setStatus(response.data.items[0].c_status);

              let questions = JSON.parse(response.data.items[0].quiz_options);

              console.log("list", questions);

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
            } else {
              Assist.showMessage(response.data.message);
              setError(true);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(true);

          Assist.log(
            `An errocooured when loading ${title} from server: ${error}`
          );
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

  const onFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const url = AppInfo.apiUrl + "quiz/update";

    const fields = {
      uid: id,
      uquestion: question,
      udescription: description,
      ustatus: status === "Active" ? 1 : 2,
      uoptions: JSON.stringify(contentData),
      user: window.sessionStorage.getItem("ruser"),
    };

    Assist.log(`Starting to ${verb} ${title} on server ${url}`);

    axios({
      method: "post",
      url: url,
      data: fields,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        Assist.log(`Response for ${verb} ${title} has completed on server`);

        setLoading(false);

        if (typeof response.data == "string") {
          Assist.showMessage(
            `Unable to process server response for ${verb} ${title} from server`
          );
        } else {
          if (response.data.succeeded) {
            setQuestion(response.data.items[0].quiz_question);
            setDescription(response.data.items[0].quiz_description);
            setStatus(response.data.items[0].c_status);

            //check if user was adding and redirect

            Assist.showMessage(
              `The ${title.toLowerCase()} has been successfully saved!`,
              "success"
            );
          } else {
            Assist.showMessage(response.data.message, "error");
            setError(true);
          }
        }
      })
      .catch((error) => {
        setLoading(false);

        Assist.log(
          `An error occoured when ${verb} ${title.toLowerCase()} on server: ${error}`
        );
        Assist.showMessage(
          `An error occured when ${verb} ${title.toLowerCase()}. Please try again`,
          "error"
        );
      });
  };

  const removeQuestion = (e) => {
    setContentData(contentData.filter((item) => item.id !== e.data.id));

    console.log("removed", contentData);
  };

  const updateQuestion = (e) => {
    contentData.map((item, index) => {
      if (item.id === e.key) {
        contentData[index] = { ...contentData[index], ...e.newData };

        setContentData(contentData);
      }

      return item;
    });

    console.log("updated", contentData);
  };


  const addQuestion = (e) => {

    setContentData(contentData);

  };

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
        <form action="your-action" onSubmit={onFormSubmit}>
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
                  disabled={error}
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
                  disabled={error}
                  onValueChanged={(e) => setDescription(e.value)}
                  value={description}
                  inputAttr={{ "aria-label": "Description" }}
                >
                </TextBox>
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Status</div>
              <div className="dx-field-value">
                <SelectBox
                  dataSource={AppInfo.statusList}
                  onValueChanged={(e) => setStatus(e.value)}
                  validationMessagePosition="left"
                  value={status}
                  disabled={error}
                >
                  <Validator>
                    <RequiredRule message="Status is required" />
                  </Validator>
                </SelectBox>
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
                  onRowInserting={addQuestion}
                  onRowUpdating={updateQuestion}
                  onRowRemoving={removeQuestion}
                  onCellPrepared={(e) => {
                    //console.log('prepared', e);
                    if (e.rowType === "data") {
                      if (e.column.dataField === "correct") {

                        if (e.data.correct === 1) {
                          e.cellElement.style.cssText = `color: white; background-color:green`;
                        } else {
                          e.cellElement.style.cssText = `color: white; background-color:red`;
                        }
                      }
                    }
                  }
                }
                >
                  <Paging defaultPageSize={10} />
                  <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                  />
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
                    caption={"Answer"}
                    hidingPriority={8}
                    dataType="string"
                  />
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

          <div className="dx-fieldset">
            <ValidationSummary id="summary" />
            <br></br>
            <Button
              width="100%"
              id="button"
              text="Save"
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

export default Quiz;
