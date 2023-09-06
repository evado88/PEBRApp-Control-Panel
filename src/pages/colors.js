import React, { useState, useEffect } from 'react';
import 'devextreme/data/odata/store';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { useHistory } from "react-router-dom";

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel,
  ColumnChooser,
  Editing,
} from 'devextreme-react/data-grid';
import Assist from '../assist.js';
const Colors = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');

  const history = useHistory();

  const pageConfig = {
    currentUrl: 'color/list',
    deleteUrl: 'color/delete',
    single: 'color',
    title: 'Colors',
  }


  useEffect(() => {

    async function fetchData() {

      Assist.loadData(pageConfig.title, pageConfig.currentUrl).then((res) => {

        setData(res.Result);
        setLoading(false);

        if (res.Result.length === 0) {
          setLoadingText('No Data')
        } else {
          setLoadingText('')
        }

      }).catch((ex) => {

        Assist.showMessage(ex.Message, "warning");
        setLoadingText('Could not show information')

      });
    }

    fetchData();

  }, [pageConfig.title, pageConfig.currentUrl]);


  const deleteItem = (e) => {

    Assist.deleteItem(pageConfig.title, pageConfig.deleteUrl, e.key).then((res) => {

      e.cancel = false;
      Assist.showMessage(`The ${pageConfig.single} has been successfully deleted!`);

    }).catch((ex) => {

      Assist.showMessage(ex.Message, "warning");
      e.cancel = true;
    });

  }

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{pageConfig.title}</h2>
      <Toolbar>
        <Item location="before"
          locateInMenu="auto"
          widget="dxButton"
          options={{
            icon: 'plus',
            onClick: () => {
              history.push('/color/add');
            },
          }} />
      </Toolbar>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={data}
        keyExpr={'color_id'}
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
        }}>
        <Paging defaultPageSize={10} />
        <Editing
          mode="row"
          allowUpdating={false}
          allowDeleting={true}
          allowAdding={false} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <ColumnChooser
          enabled={true}
          mode='select'
        >
        </ColumnChooser>
        <Column
          dataField={'color_id'}
          caption={'ID'}
          hidingPriority={8}
        />
        <Column
          dataField={'color_name'}
          caption={'Name'}
          hidingPriority={8}
          cellRender={(e) => {
            return <a href={`#/color/edit/${e.data.color_id}`}>{e.data.color_name}</a>;
          }}
        />
        <Column
          dataField={'color_code'}
          caption={'Code'}
          hidingPriority={8}
        />
        <Column
          dataField={'c_status'}
          caption={'Status'}
          visible={true}
          hidingPriority={8}
        />
        <Column
          dataField={'color_lastupdateuser'}
          caption={'User'}
          hidingPriority={6}
        />
        <Column
          dataField={'color_lastupdatedate'}
          caption={'Date'}
          dataType={'date'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
        />
      </DataGrid>
    </React.Fragment >
  )
};

export default Colors;