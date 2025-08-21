import React, { useState, useEffect } from "react";
import "devextreme/data/odata/store";
import Toolbar, { Item } from "devextreme-react/toolbar";

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

const StudyFollowup = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading data...");

  const pageConfig = {
    currentUrl: "study-followup/list",
    deleteUrl: "study-followup/delete",
    single: "followup",
    title: "Study Followup",
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
      "Colors",
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
            icon: "save",
            onClick: () =>
              Assist.downloadJson(pageConfig.title, JSON.stringify(data)),
          }}
        />
      </Toolbar>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={data}
        keyExpr={"sfollow_id"}
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
          allowDeleting={false}
          allowAdding={false}
        />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <ColumnChooser enabled={true} mode="select"></ColumnChooser>
        <Column dataField={"sfollow_id"} caption={"ID"} hidingPriority={8} />
        <Column
          dataField={"sfollow_name"}
          caption={"Name"}
        />
        <Column
          dataField={"sfollow_whatsapp"}
          caption={"WhatsApp"}
        />
        <Column
          dataField={"sfollow_sent_date"}
          caption={"Sent Date"}
          dataType={"date"}
          format={"dd MMMM yyy HH:mm"}
        />
        <Column
          dataField={"sfollow_enrollment_date"}
          caption={"Enrollment Date"}
          dataType={"date"}
          format={"dd MMMM yyy"}
        />
        <Column
          dataField={"sfollow_intervention"}
          caption={"Intervention"}
          visible={true}
        />
        <Column
          dataField={"sfollow_link"}
          caption={"Link"}
        />
        <Column
          dataField={"dsfollow_email"}
        />
      </DataGrid>
    </React.Fragment>
  );
};

export default StudyFollowup;
