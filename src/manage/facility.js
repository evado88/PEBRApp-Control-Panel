import React, { useState, useEffect } from 'react';
import axios from "axios";
import SelectBox from 'devextreme-react/select-box';
import { TextBox } from 'devextreme-react/text-box';
import { NumberBox } from 'devextreme-react/number-box';
import Button from 'devextreme-react/button';
import ValidationSummary from 'devextreme-react/validation-summary';
import { LoadPanel } from 'devextreme-react/load-panel';
import { useHistory } from "react-router-dom";
import Toolbar, { Item } from 'devextreme-react/toolbar';

import {
    Validator,
    RequiredRule,
} from 'devextreme-react/validator';

import AppInfo from '../app-info.js';
import Assist from '../assist.js';

const Facility = (props) => {

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [tollfree, setTollfree] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');

    const [contraception, setContraception] = useState(1);
    const [prep, setPrep] = useState(1);
    const [abortion, setAbortion] = useState(1);
    const [menstrual, setMenstrual] = useState(1);
    const [sti, setSTI] = useState(1);
    const [art, setArt] = useState(1);

    const [lat, setLat] = useState(1);
    const [lon, setLon] = useState(1);

    const [thumbnail, setThumbnail] = useState('');

    const [status, setStatus] = useState('');

    const title = 'Facility';
    const id = props.match.params.eid === undefined ? 0 : props.match.params.eid;
    const action = id === 0 ? 'Add' : 'Update';
    const verb = id === 0 ? 'adding' : 'Updating';

    useEffect(() => {


        const loadData = () => {

            setLoading(true);

            const url = AppInfo.apiUrl + '/facility/id/' + id;

            Assist.log(`Starting to load ${title} from server ${url}`);

            // invalid url will trigger an 404 error
            axios.get(url).then((response) => {

                Assist.log(`Response for loading ${title} has completed from server`);
                setLoading(false);

                if (typeof response.data == 'string') {

                    Assist.showMessage("Unable to process server response from server");
                    setError(true);

                } else {

                    if (response.data.succeeded) {
                        setError(false);

                        setName(response.data.items[0].facility_name);
                        setAddress(response.data.items[0].facility_address);
                        setTollfree(response.data.items[0].facility_tollfree);
                        setWhatsapp(response.data.items[0].facility_whatsapp);
                        setEmail(response.data.items[0].facility_email);
                        setWebsite(response.data.items[0].facility_website);
                        setPhone(response.data.items[0].facility_phone);

                        setContraception(response.data.items[0].facility_contraception === 1 ? 'Yes': 'No');
                        setPrep(response.data.items[0].facility_prep === 1 ? 'Yes': 'No');
                        setAbortion(response.data.items[0].facility_abortion === 1 ? 'Yes': 'No');
                        setMenstrual(response.data.items[0].facility_menstrual === 1 ? 'Yes': 'No');
                        setSTI(response.data.items[0].facility_sti === 1 ? 'Yes': 'No');
                        setArt(response.data.items[0].facility_art === 1 ? 'Yes': 'No');

                        setLat(response.data.items[0].facility_lat);
                        setLon(response.data.items[0].facility_lon);

                        setThumbnail(response.data.items[0].facility_thumbnailUrl);

                        setStatus(response.data.items[0].f_status);

                    } else {

                        Assist.showMessage(response.data.message);
                        setError(true);
                    }
                }
            }).catch(error => {

                setLoading(false);
                setError(true);

                Assist.log(`An errocooured when loading ${title} from server: ${error}`);
                Assist.showMessage(`An error occured when loading ${title} from server`);


            });
        }

        if (id !== 0) {

            loadData();
        }

    }, [id]);


    const onFormSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const url = AppInfo.apiUrl + 'color/update';

        const fields = {
            uid: id,
            uname: name,
            ucode: address,
            ustatus: status === 'Active' ? 1 : 2,
            user: window.sessionStorage.getItem('ruser')
        }

        Assist.log(`Starting to ${verb} ${title} on server ${url}`);

        axios({
            method: 'post',
            url: url,
            data: fields,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {

            Assist.log(`Response for ${verb} ${title} has completed on server`);

            setLoading(false);

            if (typeof response.data == 'string') {

                Assist.showMessage(`Unable to process server response for ${verb} ${title} from server`);

            } else {

                if (response.data.succeeded) {

                    setName(response.data.items[0].facility_name);
                    setAddress(response.data.items[0].facility_code);
                    setStatus(response.data.items[0].c_status);

                    //check if user was adding and redirect
                    if (id === 0) {
                        history.push(`/color/edit/${response.data.items[0].facility_id}`);
                    }

                    Assist.showMessage(`The ${title.toLowerCase()} has been successfully saved!`, 'success');

                } else {

                    Assist.showMessage(response.data.message, 'danger');
                    setError(true);
                }
            }

        }).catch(error => {

            setLoading(false);

            Assist.log(`An error occoured when ${verb} ${title.toLowerCase()} on server: ${error}`);
            Assist.showMessage(`An error occured when ${verb} ${title.toLowerCase()}. Please try again`);

        });
    }


    return (
        <React.Fragment>
            <h2 className={'content-block'}>{action} {title}</h2>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                position={{ of: '#currentForm' }}
                visible={loading}
                showIndicator={true}
                shading={true}
                showPane={true}
                hideOnOutsideClick={false}
            />
            <div className={'content-block dx-card responsive-paddings'} id="currentForm">
                <Toolbar>
                    <Item location="before"
                        locateInMenu="auto"
                        widget="dxButton"
                        options={{
                            icon: 'revert',
                            onClick: () => {
                                history.goBack();
                            },
                        }} />
                </Toolbar>
                <form action="your-action" onSubmit={onFormSubmit}>

                    <div className="dx-fieldset">
                        <div className="dx-fieldset-header">Properties</div>

                        <div className="dx-field">
                            <div className="dx-field-label">Name</div>
                            <div className="dx-field-value">
                                <TextBox validationMessagePosition="left" onValueChanged={(e) => setName(e.value)}
                                    inputAttr={{ 'aria-label': 'Name' }} value={name} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="Name is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Address</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setAddress(e.value)}
                                    value={address}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Tollfee</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setTollfree(e.value)}
                                    value={tollfree}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Whatsapp</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setWhatsapp(e.value)}
                                    value={whatsapp}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Email</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setEmail(e.value)}
                                    value={email}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Website</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setWebsite(e.value)}
                                    value={website}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Phone</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setPhone(e.value)}
                                    value={phone}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Contraception</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.yesNoList} onValueChanged={(e) => setContraception(e.value)}
                                    validationMessagePosition="left" value={contraception} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="Status is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">PrEP</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.yesNoList} onValueChanged={(e) => setPrep(e.value)}
                                    validationMessagePosition="left" value={prep} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="PrEP is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Abortion</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.yesNoList} onValueChanged={(e) => setAbortion(e.value)}
                                    validationMessagePosition="left" value={abortion} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="Abortion is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Menstrual</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.yesNoList} onValueChanged={(e) => setMenstrual(e.value)}
                                    validationMessagePosition="left" value={menstrual} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="Menstrual is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">STI</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.yesNoList} onValueChanged={(e) => setSTI(e.value)}
                                    validationMessagePosition="left" value={sti} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="STI is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">ART</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.yesNoList} onValueChanged={(e) => setArt(e.value)}
                                    validationMessagePosition="left" value={art} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="ART is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Longitude</div>
                            <div className="dx-field-value">
                                <NumberBox disabled={error} onValueChanged={(e) => setLon(e.value)}
                                    value={lon}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </NumberBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Latitude</div>
                            <div className="dx-field-value">
                                <NumberBox disabled={error} onValueChanged={(e) => setLat(e.value)}
                                    value={lat}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </NumberBox>
                            </div>
                        </div>


                        <div className="dx-field">
                            <div className="dx-field-label">Thumbnail</div>
                            <div className="dx-field-value">
                                <TextBox disabled={error} onValueChanged={(e) => setThumbnail(e.value)}
                                    value={thumbnail}
                                    inputAttr={{ 'aria-label': 'Color' }}
                                >
                                    <Validator>
                                        <RequiredRule message="Color is required" />
                                    </Validator>
                                </TextBox>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Status</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={AppInfo.statusList} onValueChanged={(e) => setStatus(e.value)}
                                    validationMessagePosition="left" value={status} disabled={error}>
                                    <Validator>
                                        <RequiredRule message="Status is required" />
                                    </Validator>
                                </SelectBox>
                            </div>
                        </div>
                    </div>

                    <div className="dx-fieldset">
                        <ValidationSummary id="summary" />
                        <br></br>
                        <Button
                            width="100%"
                            id="button"
                            text="Save"
                            type="danger"
                            disabled={error}
                            useSubmitBehavior={true} />
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Facility;
