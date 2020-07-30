import React, { useContext, useState, useEffect } from "react";
import { Table, Space, Button, Divider } from "antd";
import EditContact from "./EditContact";
import { ContactContext } from "../Context/ContactContext";
import { useContacts } from "../CustomHooks/useContacts";
import moment from "moment";

const ContactList = ({ onAddNewClick }) => {
    const [contacts, setContacts] = useContext(ContactContext);
    const [modalValue, setModal] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const { deleteContact } = useContacts();

    useEffect(() => {
        let storageContacts = JSON.parse(localStorage.getItem("contacts"));
        if (storageContacts) {
            storageContacts.birthDay = moment(storageContacts.birthDay).format("DD/MM/YYYY");
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
        deleteContact(record);
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
        },
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
