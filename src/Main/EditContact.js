/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Space, Input, message, Select, Switch, DatePicker } from "antd";
import { ContactContext } from "../Context/ContactContext";
import { useContacts } from "../CustomHooks/useContacts";
import moment from "moment";
const { Option } = Select;

const EditContact = props => {
    const [contacts, setContacts] = useContext(ContactContext);
    const { updateContact } = useContacts();

    const handleSubmit = values => {
        updateContact(values, props.record);
        message.success("Updated Successfully!");
        handleCancel();
    };

    const handleCancel = () => {
        props.closeModal();
    };

    // useEffect(() => {}, [props.modal]);

    const { name, phone, birthDay, emergency, gender } = props.record;

    return (
        <>
            <Form id="myForm1" onFinish={handleSubmit}>
                <Modal
                    title="Basic Modal"
                    visible={props.modal}
                    onOk={handleSubmit}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Close
                        </Button>,
                        <Button type="primary" form="myForm1" key="submit" htmlType="submit">
                            Submit
                        </Button>
                    ]}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        value={name}
                        rules={[
                            {
                                required: true,
                                message: "Please input contact name"
                            }
                        ]}
                        initialValue={name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: "Please input phone number"
                            }
                        ]}
                        initialValue={phone}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]} initialValue={gender}>
                        <Select placeholder="Select a option and change input text above" allowClear>
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="birthDay"
                        label="Birth Day"
                        rules={[
                            {
                                required: true,
                                message: "Please pick your birth day on the calendar"
                            }
                        ]}
                        initialValue={moment(birthDay, "DD/MM/YYYY")}
                    >
                        <DatePicker />
                    </Form.Item>

                    {/* <div style={{ marginBottom: "20px" }}>
                        <span>Emergency Contacts (optional):</span>
                        <Switch onChange={handleSwitch} checked={switchEmergency} />
                    </div>

                    <Form.Item name="emergency" hidden={!switchEmergency} label="Phone Number">
                        <Input />
                    </Form.Item> */}
                </Modal>
            </Form>
        </>
    );
};

export default EditContact;
