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

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{pageConfig.title}</h2>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={data}
        keyExpr={'id'}
        noDataText={loadingText}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onCellPrepared={(e) => {

          if (e.rowType === "data") {
            if (e.column.dataField === "color_code") {
              e.cellElement.style.cssText = `color: white; background-color: ${e.data.color_code}`;
            }
          }
        }}>
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <ColumnChooser
          enabled={true}
          mode='select'
        >
        </ColumnChooser>
        <Column
          dataField={'id'}
          caption={'ID'}
          hidingPriority={8}
        />
        <Column
          dataField={'username'}
          caption={'Username'}
          hidingPriority={8}
        />
        <Column
          dataField={'first_name'}
          caption={'First Name'}
          hidingPriority={8}
        />
        <Column
          dataField={'last_name'}
          caption={'Last Name'}
          hidingPriority={6}
        />

        <Column
          dataField={'phone_number'}
          caption={'Phone Number'}
          hidingPriority={6}
        />
        <Column
          dataField={'created_date'}
          caption={'Create Date'}
          dataType={'date'}
          format={'dd MMMM yyy HH:mm'}
          hidingPriority={5}
        />

      </DataGrid>
    </React.Fragment>
  )
};

export default PeerNavigators;