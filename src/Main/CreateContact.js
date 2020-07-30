import React, { useContext, useState } from "react";
import { Form, Input, Button, Space, DatePicker, Select, Switch, message } from "antd";
import { ContactContext } from "../Context/ContactContext";
const { Option } = Select;

const CreateContact = ({ onCancelClick }) => {
    const [form] = Form.useForm();
    const [contacts, setContacts] = useContext(ContactContext);
    const [switchEmergency, setSwitchEmergency] = useState(false);

    const onFormFinish = values => {
        values.birthDay = values.birthDay.format("DD/MM/YYYY");
        setContacts(prevContacts => {
            localStorage.setItem("contacts", JSON.stringify([...prevContacts, values]));
            return [...prevContacts, values];
        });
        message.success("Contact was successfully added");
        onCancelClick();
    };

    const handleSwitch = checked => {
        setSwitchEmergency(checked);
    };

    return (
        <Form form={form} onFinish={onFormFinish}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input contact name"
                    }
                ]}
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
            >
                <Input />
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
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
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Add Contact
                    </Button>
                    <Button type="primary" danger onClick={onCancelClick}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CreateContact;
