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

const Followups = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading data...');

  const pageConfig = {
    currentUrl: 'followup/list/1/0/na',
    deleteUrl: 'followup/delete',
    single: 'follow-up',
    title: 'Follow-ups',
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
    Assist.addAudit(window.sessionStorage.getItem("ruser"), 'Follow-ups', 'View', '').then((res) => {

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
        columnHidingEnabled={true}>
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
          dataField={'art_number'}
          caption={'Study No'}
          hidingPriority={8}
        />
        <Column
          dataField={'srh_contraception_started'}
          caption={'Started Contraception'}
          hidingPriority={6}
        />
        <Column
          dataField={'srh_contraception_started_problems'}
          caption={'Experiencing Problems'}
          hidingPriority={5}
        />

        <Column
          dataField={'srh_contraception_started_side_effects'}
          caption={'Side-effects'}
          hidingPriority={6}
        />
        <Column
          dataField={'srh_contraception_started_other'}
          caption={'Other Problems'}
          hidingPriority={6}
        />
        <Column
          dataField={'next_date'}
          caption={'Next Date'}
          dataType={'date'}
          format={'dd MMMM yyy'}
          hidingPriority={5}
        />
        <Column
          dataField={'created_date'}
          caption={'Date'}
          dataType={'date'}
          format={'dd MMMM yyy HH:mm'}
          hidingPriority={5}
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

export default Followups;