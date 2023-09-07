import React, { useState, useEffect } from 'react';
import 'devextreme/data/odata/store';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore/lite';

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel,
  Editing,
} from 'devextreme-react/data-grid';

import Assist from '../assist';


const Forum = (props) => {

  // Your web app's Firebase configuration
  // Initialize Firebase
  const app = initializeApp(Assist.firebaseConfig);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');


  const pageConfig = {
    currentUrl: 'discussion/list',
    deleteUrl: 'discussion/delete',
    single: 'discussion',
    title: 'Discussion Chat',
  }

  const id = props.match.params.eid === undefined ? 0 : props.match.params.eid;

  useEffect(() => {



    async function loadData() {

      Assist.log("Starting to discussion chat from firestore");

      // invalid url will trigger an 404 error

      const db = getFirestore(app);

      const discussionsCol = collection(db, 'twyshe-discussion-posts');

      const q = query(discussionsCol, where("discussion", "==", id), orderBy("createdAt", "desc"), limit(3));
      const discussionsSnapshot = await getDocs(q);

      if (discussionsSnapshot) {

        const discussionsList = discussionsSnapshot.docs.map((doc) => ({
          docId: doc.id,
          date: new Date(doc.data().createdAt.seconds * 1000),
          statusName: doc.data().state === 1 ? 'Active' : 'Disabled',
          ...doc.data()
        }));



        setData(discussionsList);
        setLoading(false);

      } else {
        // docSnap.data() will be undefined in this case
        setLoading(false);
        setLoadingText('Dicussions could not be loaded')
      }
    }


    loadData();

  }, [app, id]);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{pageConfig.title}</h2>
      <DataGrid
        className={'dx-card wide-card'}
        dataSource={data}
        keyExpr={'docId'}
        noDataText={loadingText}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onCellPrepared={(e) => {

          if (e.rowType === "data") {
            if (e.column.dataField === "author.firstName") {
              e.cellElement.style.cssText = `color: white; background-color: ${e.data.author.color}`;
            }
          }
        }}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={false} />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <LoadPanel enabled={loading} />
        <Column
          dataField={'docId'}
          caption={'ID'}
          hidingPriority={8}
          allowEditing={false}
          cellRender={(e) => {
            return <a href={`#/discussion/post/edit/${e.data.docId}`}>{e.data.docId}</a>;
          }}
        />
        <Column
          dataField={'discussion'}
          caption={'Discussion'}
          hidingPriority={8}
          allowEditing={false}
        />
        <Column
          dataField={'text'}
          caption={'Text'}
          hidingPriority={8}
        />
        <Column
          dataField={'state'}
          caption={'State'}
          hidingPriority={8}
          allowEditing={false}
        />
        <Column
          dataField={'status'}
          caption={'Status'}
          hidingPriority={8}
          allowEditing={false}
        />
        <Column
          dataField={'author.firstName'}
          caption={'Nickname'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
          allowEditing={false}
        />
        <Column
          dataField={'date'}
          caption={'Sent'}
          format={'dd MMM yyy HH:mm'}
          hidingPriority={5}
          allowEditing={false}
        />
      </DataGrid>
    </React.Fragment>
  )
};

export default Forum;