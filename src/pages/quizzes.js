import React, { useState, useEffect } from "react";
import "devextreme/data/odata/store";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useHistory } from "react-router-dom";

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel,
  ColumnChooser,
  Editing,
} from "devextreme-react/data-grid";
import Assist from "../assist.js";

const Quizzes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading data...");

  const history = useHistory();

  const pageConfig = {
    currentUrl: "quiz/list",
    deleteUrl: "quiz/delete",
    single: "Quiz",
    title: "Quizzes",
  };

  useEffect(() => {
    async function fetchData() {
      Assist.loadData(pageConfig.title, pageConfig.currentUrl)
        .then((res) => {
          setData(res.Result);
          setLoading(false);

          if (res.Result.length === 0) {
            setLoadingText("No Data");
          } else {
            setLoadingText("");
          }
        })
        .catch((ex) => {
          Assist.showMessage(ex.Message, "error");
          setLoadingText("Could not show information");
        });
    }

    fetchData();

    //audit
    Assist.addAudit(
      window.sessionStorage.getItem("ruser"),
      "Resources",
      "View",
      ""
    )
      .then((res) => {
        Assist.log(res.Message, "info");
      })
      .catch((x) => {
        Assist.log(x.Message, "warn");
      });
  }, [pageConfig.title, pageConfig.currentUrl]);

  const deleteItem = (e) => {
    Assist.deleteItem(pageConfig.title, pageConfig.deleteUrl, e.key)
      .then((res) => {
        e.cancel = false;
        Assist.showMessage(
          `The ${pageConfig.single} has been successfully deleted!`
        );
      })
      .catch((ex) => {
        Assist.showMessage(ex.Message, "error");
        e.cancel = true;
      });
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{pageConfig.title}</h2>
      <Toolbar>
        <Item
          location="before"
          locateInMenu="auto"
          widget="dxButton"
          options={{
            icon: "plus",
            onClick: () => {
              history.push("/quiz/add");
            },
          }}
        />
        <Item
          location="before"
          locateInMenu="auto"
          widget="dxButton"
          options={{
            icon: "save",
            onClick: () =>
              Assist.downloadJson(pageConfig.title, JSON.stringify(data)),
          }}
        />
      </Toolbar>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={data}
        keyExpr={"quiz_id"}
        noDataText={loadingText}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onRowRemoving={deleteItem}
        onCellPrepared={(e) => {
          if (e.rowType === "data") {
            if (e.column.dataField === "color_code") {
              e.cellElement.style.cssText = `color: white; background-color: ${e.data.color_code}`;
            }
          }
        }}
      >
        <Paging defaultPageSize={10} />
        <Editing
          mode="row"
          allowUpdating={false}
          allowDeleting={true}
          allowAdding={false}
        />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <ColumnChooser enabled={true} mode="select"></ColumnChooser>
        <Column dataField={"quiz_id"} caption={"ID"} hidingPriority={8} />
        <Column
          dataField={"quiz_question"}
          caption={"Question"}
          hidingPriority={8}
          cellRender={(e) => {
            return (
              <a href={`#/quiz/edit/${e.data.quiz_id}`}>
                {e.data.quiz_question}
              </a>
            );
          }}
        />
        <Column
          dataField={"quiz_description"}
          caption={"Description"}
          hidingPriority={8}
        />
        <Column dataField={"a_no"} caption={"No Attempts"} hidingPriority={8} />
        <Column
          dataField={"a_max"}
          caption={"Highest Score"}
          hidingPriority={8}
        />
        <Column
          dataField={"a_min"}
          caption={"Lowest Score"}
          hidingPriority={8}
        />
        <Column dataField={"c_status"} caption={"Status"} hidingPriority={8} />
        <Column
          dataField={"quiz_createuser"}
          caption={"User"}
          hidingPriority={6}
        />
        <Column
          dataField={"quiz_createdate"}
          caption={"Date"}
          dataType={"date"}
          format={"dd MMMM yyy"}
          hidingPriority={5}
        />
      </DataGrid>
    </React.Fragment>
  );
};

export default Quizzes;
