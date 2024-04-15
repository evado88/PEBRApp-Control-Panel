import React, { useState, useEffect } from 'react';
import 'devextreme/data/odata/store';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  LoadPanel,
  ColumnChooser,
} from 'devextreme-react/data-grid';
import Assist from '../assist.js';

const Participants = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');

  const pageConfig = {
    currentUrl: 'participant/list/1/0/na',
    deleteUrl: 'participant/delete',
    single: 'Participant',
    title: 'Participants',
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
    Assist.addAudit(window.sessionStorage.getItem("ruser"), 'Participants', 'View', '').then((res) => {

      Assist.log(res.Message, "info");

    }).catch((x) => {

      Assist.log(x.Message, "warn");
    });

  }, [pageConfig.title, pageConfig.currentUrl]);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>{pageConfig.title}</h2>
      <Toolbar>
        <Item location="before"
          locateInMenu="auto"
          widget="dxButton"
          options={{
            icon: 'save',
            onClick: () => Assist.downloadJson(pageConfig.title, JSON.stringify(data))
          }} />
      </Toolbar>
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
          dataField={'parent'}
          caption={'Parent ID'}
          hidingPriority={8}
          visible={false}
        />
        <Column
          dataField={'status'}
          caption={'Status ID'}
          hidingPriority={8}
          visible={false}
        />
        <Column
          dataField={'upload'}
          caption={'Upload ID'}
          hidingPriority={8}
          visible={false}
        />
        <Column
          dataField={'username'}
          caption={'Peer Navigator'}
          hidingPriority={8}
        />
        <Column
          dataField={'study_number'}
          caption={'Study No'}
          hidingPriority={8}
        />
        <Column
          dataField={'enrollment_date'}
          caption={'Enroll Date'}
          dataType={'date'}
          format={'dd MMMM yyy HH:mm'}
          hidingPriority={5}
        />
        <Column
          dataField={'birthday'}
          caption={'DOB'}
          dataType={'date'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
        />
        <Column
          dataField={'downloaded_messenger'}
          caption={'Downloaded Messenger'}
          hidingPriority={6}
        />

        <Column
          dataField={'phone_number'}
          caption={'Phone Number'}
          hidingPriority={6}
        />
        <Column
          dataField={'residency'}
          caption={'Residency'}
          hidingPriority={6}
        />
        <Column
          dataField={'prefered_contact_method'}
          caption={'Contact Method'}
          hidingPriority={6}
        />
        <Column
          dataField={'upload_date'}
          caption={'Date Uploaded'}
          dataType={'date'}
          format={'dd MMM yyy HH:mm'}
          hidingPriority={5} />
      </DataGrid>
    </React.Fragment>
  )
};

export default Participants;