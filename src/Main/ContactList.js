import React, { useContext, useState, useEffect } from "react";
import { Table, Space, Button, Divider } from "antd";
import { ContactContext } from "../Context/ContactContext";
import EditContact from "./EditContact";

const ContactList = ({ onAddNewClick }) => {
    const [contacts, setContacts] = useContext(ContactContext);
    const [modalValue, setModal] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [mount, setMounted] = useState(false);

    useEffect(() => {
        let storageContacts = JSON.parse(localStorage.getItem("contacts"));
        if (storageContacts) {
            setContacts(storageContacts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateHandler = record => {
        setCurrentRecord(record);
        setModal(true);
    };

    const closeContactModal = () => {
        setModal(false);
    };

    const deleteHandler = record => {
        let copyContacts = [...contacts];
        const findIndex = copyContacts.findIndex(item => item.name === record.name && item.phone && record.phone);
        copyContacts.splice(findIndex, 1);
        localStorage.setItem("contacts", JSON.stringify(copyContacts));
        setContacts(copyContacts);
    };

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
        // {
        //     title: "Birth Day",
        //     dataIndex: "birthDay",
        //     key: "birthDay"
        // },
        // {
        //     title: "Gender",
        //     dataIndex: "gender",
        //     key: "gender"
        // },
        // {
        //     title: "Emergency Contacts (optional)",
        //     dataIndex: "emergency",
        //     key: "emergency"
        // },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => updateHandler(record)}>
                        Update
                    </Button>
                    <Button type="danger" onClick={() => deleteHandler(record)}>
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <>
            <EditContact record={currentRecord} closeModal={closeContactModal} modal={modalValue} />
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
