import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'devextreme/data/odata/store';
import { Toast } from 'devextreme-react/toast';

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel
} from 'devextreme-react/data-grid';
import appInfo from '../../app-info';

const Facilities = () => {

  const [data, setData] = useState([]);
  const [loading, setLLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();

  const currentUrl = 'facility/list';
  const title = 'Facilities';

  function showMessage(msg) {

    setError(true);
    setMessage(msg);

    setTimeout(() => {

      setError(false);
      setMessage('')

    }, 4000);

  }


  useEffect(() => {

    console.log(new Date().toISOString(), "Starting to load data from server",
      appInfo.apiUrl + currentUrl);

    // invalid url will trigger an 404 error
    axios.get(appInfo.apiUrl + currentUrl).then((response) => {

      console.log(new Date().toISOString(), "Response has completed from server",
        appInfo.apiUrl + currentUrl, response);

      if (typeof response.data == 'string') {

        showMessage("Unable to process server response from server");
        setLoadingText('There was a problem')
      } else {

        if (response.data.succeeded) {

          setData(response.data.items);
          setLLoading(false);

          if (response.data.items.length === 0) {
            setLoadingText('No Data')
          } else {
            setLoadingText('')
          }
        } else {

          showMessage(response.data.message);
          setLoadingText('Unable to show information')

        }
      }
    }).catch(error => {

      console.log(new Date().toISOString(), "An errocooured from server", error, appInfo.apiUrl + currentUrl);

      showMessage("An error occured. Please try again");
      setLoadingText('Could not show information')

    });
  }, []);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{title}</h2>
      <Toast
        visible={error}
        message={message}
        type={'error'}
        displayTime={6000}
      />
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={data}
        keyExpr={'facility_id'}
        noDataText={loadingText}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <Column
          dataField={'facility_id'}
          caption={'ID'}
          hidingPriority={8}
        />
        <Column
          dataField={'facility_name'}
          caption={'Name'}
          hidingPriority={8}
        />
        <Column
          dataField={'facility_address'}
          caption={'Address'}
          hidingPriority={8}
        />
        <Column
          dataField={'facility_phone'}
          caption={'Phone'}
          hidingPriority={6}
        />

        <Column
          dataField={'facility_website'}
          caption={'Website'}
          hidingPriority={6}
        />
        <Column
          dataField={'facility_email'}
          caption={'Email'}
          hidingPriority={6}
        />
        <Column
          dataField={'facility_createdate'}
          caption={'Date'}
          dataType={'date'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
        />

      </DataGrid>
    </React.Fragment>
  )
};

export default Facilities;