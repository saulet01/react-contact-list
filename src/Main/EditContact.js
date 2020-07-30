/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Space, Input, message } from "antd";
import { ContactContext } from "../Context/ContactContext";

const EditContact = props => {
    const [contacts, setContacts] = useContext(ContactContext);

    const handleSubmit = values => {
        const copyContacts = [...contacts];
        const indexContact = copyContacts.findIndex(item => item.name === props.record.name && item.phone && props.record.phone);

        copyContacts[indexContact] = values;
        localStorage.setItem("contacts", JSON.stringify(copyContacts));
        setContacts(copyContacts);
        message.success("Updated Successfully!");
        handleCancel();
    };

    const handleCancel = () => {
        props.closeModal();
    };

    // useEffect(() => {}, [props.modal]);

    const { name, phone } = props.record;

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

                    {/* <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
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
            >
                <DatePicker />
            </Form.Item>

            <div style={{ marginBottom: "20px" }}>
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
