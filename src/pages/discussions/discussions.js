import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'devextreme/data/odata/store';
import { Toast } from 'devextreme-react/toast';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel
} from 'devextreme-react/data-grid';
import appInfo from '../../app-info';


const Discussions = () => {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCbH2wyJmcqTQU3gIl_raQwr0AmVuG_bhA",
    authDomain: "myzambia-5c62c.firebaseapp.com",
    databaseURL: "https://myzambia-5c62c.firebaseio.com",
    projectId: "myzambia-5c62c",
    storageBucket: "myzambia-5c62c.appspot.com",
    messagingSenderId: "878075714362",
    appId: "1:878075714362:web:55575ac3647ff7d3cd0e03"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const [data, setData] = useState([]);
  const [loading, setLLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();

  const currentUrl = 'color/list';
  const title = 'Discussions';

  function showMessage(msg) {

    setError(true);
    setMessage(msg);

    setTimeout(() => {

      setError(false);
      setMessage('')

    }, 4000);

  }

  async function laodData() {

 console.log(new Date().toISOString(), "Starting to load data from server",
      appInfo.apiUrl + currentUrl);

    // invalid url will trigger an 404 error

    const db = getFirestore(app);
    console.log('getting discussions');
    const citiesCol = collection(db, 'twyshe-discussions');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);

    setData(cityList);

  }

  useEffect(() =>  {

    laodData();

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
        keyExpr={'title'}
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
          dataField={'title'}
          caption={'Title'}
          hidingPriority={8}
        />
        <Column
          dataField={'description'}
          caption={'Description'}
          hidingPriority={8}
        />
        <Column
          dataField={'posts'}
          caption={'Posts'}
          hidingPriority={6}
        />
        <Column
          dataField={'nickname'}
          caption={'Nickname'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
        />

      </DataGrid>
    </React.Fragment>
  )
};

export default Discussions;