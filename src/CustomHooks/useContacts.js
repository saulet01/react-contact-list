import React, { useContext, useState } from "react";
import { ContactContext } from "../Context/ContactContext";

export const useContacts = () => {
    const [contacts, setContacts] = useContext(ContactContext);

    const createContact = values => {
        values.birthDay = values.birthDay.format("DD/MM/YYYY");
        setContacts(prevContacts => {
            localStorage.setItem("contacts", JSON.stringify([...prevContacts, values]));
            return [...prevContacts, values];
        });
    };

    const deleteContact = record => {
        let copyContacts = [...contacts];
        const findIndex = copyContacts.findIndex(item => item.name === record.name && item.phone && record.phone);
        copyContacts.splice(findIndex, 1);
        localStorage.setItem("contacts", JSON.stringify(copyContacts));
        setContacts(copyContacts);
    };

    const updateContact = (values, record) => {
        const copyContacts = [...contacts];
        const indexContact = copyContacts.findIndex(item => item.name === record.name && item.phone && record.phone);
        values.birthDay = values.birthDay.format("DD/MM/YYYY");
        copyContacts[indexContact] = values;
        localStorage.setItem("contacts", JSON.stringify(copyContacts));
        setContacts(copyContacts);
    };

    return { createContact, deleteContact, updateContact };
};
