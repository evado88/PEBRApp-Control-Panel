import React, { useState, useEffect } from 'react';
import 'devextreme/data/odata/store';

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

const PeerNavigators = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');

  const pageConfig = {
    currentUrl: 'peer-navigator/list',
    deleteUrl: 'peer-navigator/delete',
    single: 'peer-navigator',
    title: 'Peer Navigators',
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

        Assist.showMessage(ex.Message, "error");
        setLoadingText('Could not show information')

      });
    }

    fetchData();

     //audit
     Assist.addAudit(window.sessionStorage.getItem("ruser"), 'Peer Navigators', 'View', '').then((res) => {

      Assist.log(res.Message, "info");

    }).catch((x) => {

      Assist.log(x.Message, "warn");
    });

  }, [pageConfig.title, pageConfig.currentUrl]);


  const deleteItem = (e) => {

    Assist.deleteItem(pageConfig.title, pageConfig.deleteUrl, e.key).then((res) => {

      e.cancel = false;
      Assist.showMessage(`The ${pageConfig.single} has been successfully deleted!`);

    }).catch((ex) => {

      Assist.showMessage(ex.Message, "error");
      e.cancel = true;
    });

  }

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{pageConfig.title}</h2>
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
          dataField={'itemId'}
          caption={'ID'}
          hidingPriority={8}
        />
        <Column
          dataField={'username'}
          caption={'Username'}
          hidingPriority={8}
        />
        <Column
          dataField={'createDate'}
          caption={'Create Date'}
          dataType={'date'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
        />
        <Column
          dataField={'firstName'}
          caption={'First Name'}
          hidingPriority={8}
        />
        <Column
          dataField={'lastName'}
          caption={'Last Name'}
          hidingPriority={6}
        />

        <Column
          dataField={'phoneNumber'}
          caption={'Occured'}
          hidingPriority={6}
        />
        <Column
          dataField={'healthCenterDescription'}
          caption={'Health Center'}
          hidingPriority={6}
        />
        <Column
          dataField={'isActive'}
          caption={'Active'}
          hidingPriority={6}
        />
      </DataGrid>
    </React.Fragment>
  )
};

export default PeerNavigators;