import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel
} from 'devextreme-react/data-grid';
import appInfo from '../../app-info';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');

  useEffect(() => {
    console.log("Useeffect. starting response: " + new Date().toISOString());
    // invalid url will trigger an 404 error
    axios.get(appInfo.apiUrl + 'list-users-web').then((response) => {

      console.log("Response completed: " + new Date().toISOString());
      setUsers(response.data.value);
      setLLoading(false);

      if (response.data.value.length === 0) {
        setLoadingText('No Data')
      } else {
        setLoadingText('')
      }
    }).catch(error => {
      console.log("Response failed: " + new Date().toISOString());
      console.log(error)
      setLoadingText('Unable to load data')
    });
  }, []);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Users</h2>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={users}
        keyExpr={'username'}
        noDataText={loadingText}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onContentReady={(e) => {
          console.log("Content ready: " + new Date().toISOString());
        }}
        onCellPrepared={(e) => {

          if (e.rowType === "data") {
            if (e.column.dataField === "datafile") {
              e.cellElement.innerHTML = `<a href='${appInfo.apiUrl}download/data/${e.data.username}/${e.data.datafile}'>Download</a>`;
            }
          }

        }}
        onCellDblClick={(e) => {
          console.log("DBl", e);

          if (e.data != null) {

            const url = `${appInfo.apiUrl}download/data/${e.data.username}/${e.data.datafile}`;
            console.log('url-file', url);

            window.location = url;
          }

        }}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <Column dataField={'username'} width={90} hidingPriority={2} />
        <Column
          dataField={'firstname'}
          caption={'First Name'}
          hidingPriority={8}
        />
        <Column
          dataField={'lastname'}
          caption={'Last Name'}
          hidingPriority={6}
        />
        <Column
          dataField={'last_upload'}
          caption={'Last Upload'}
          dataType={'date'}
          hidingPriority={5}
        />
        <Column
          dataField={'datafile'}
          caption={'Download Data File'}
          hidingPriority={6}
        />
      </DataGrid>
    </React.Fragment>
  )
};

export default Users;