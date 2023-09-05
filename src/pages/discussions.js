import React, { useState, useEffect } from 'react';
import 'devextreme/data/odata/store';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel
} from 'devextreme-react/data-grid';

import Assist from '../assist';


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
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');

  const title = 'Discussions';

  useEffect(() => {

    async function laodData() {

      Assist.log("Starting to discussions from firestore");

      // invalid url will trigger an 404 error

      const db = getFirestore(app);

      const citiesCol = collection(db, 'twyshe-discussions');
      const citySnapshot = await getDocs(citiesCol);

      if (citySnapshot) {

        const cityList = citySnapshot.docs.map(doc => doc.data());

        setData(cityList);
        setLoading(false);

      } else {
        // docSnap.data() will be undefined in this case
        setLoading(false);
        setLoadingText('Dicussions could not be loaded')
      }
    }


    laodData();

  }, [app]);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{title}</h2>
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