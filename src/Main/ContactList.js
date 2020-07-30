import React, { useContext } from "react";
import { Table, Space, Button, Divider } from "antd";
import { ContactContext } from "../Context/ContactContext";

const ContactList = ({ onAddNewClick }) => {
    const [contacts] = useContext(ContactContext);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Birth Day",
            dataIndex: "birthDay",
            key: "birthDay"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender"
        },
        {
            title: "Emergency Contacts (optional)",
            dataIndex: "emergency",
            key: "emergency"
        }
    ];

    return (
        <>
            <Space>
                <Button type="primary" onClick={onAddNewClick}>
                    Add new contact
                </Button>
            </Space>
            <Divider />
            <Table size="large" dataSource={contacts} columns={columns} />
        </>
    );
};

export default ContactList;
