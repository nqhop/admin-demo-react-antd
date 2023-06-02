import MyLayout from "../../components/MyLayout"
import { Space, Table, Tag, Button, Modal, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Excel from "../../components/Excel";
import { useEffect } from "react";

const { Option } = Select;
let usersStore;
let dispatch;

let addUser = true;
const defaultSelected = ['nice']
let handleChangeSelectedTags = defaultSelected;
let userEditIndex;

export const UserProfile = () => {
    dispatch = useDispatch();
    usersStore = useSelector((state) => state.users);
    // useEffect(() => {
    //     if(userEditIndex >= 0){
    //         console.log('useEffect')
    //         Form.initialValues{{
    //             username: 'initialValues'
    //         }}
    //     }
    // })

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRow, setEdittingRow] = useState(null);
    const showModal = (isAddUser) => {
        setIsModalOpen(true);
        addUser = isAddUser;
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (user) => {
        // console.log('Success:', user);
        // console.log('handleChangeSelectedTags', handleChangeSelectedTags);
        const newDataTable = usersStore.listUser.concat([{
            key: Math.floor(Math.random() * 1000) + 1,
            name: user.username,
            age: user.userage,
            address: user.Useradress,
            tags: handleChangeSelectedTags,
        }])
        console.log('newDataTable', newDataTable);
        dispatch.users.setListUser(newDataTable);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // for leslect tag
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        handleChangeSelectedTags = value;
    };

    const editUsreName = () => {
        return 'demo'
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a
                        onClick={() => {
                            userEditIndex = usersStore.listUser.indexOf(record);
                            setEdittingRow(record);
                            console.log('userEditIndex ', userEditIndex);
                            console.log('record.key ', record.key);
                            // setEdittingRow(record.key);
                            showModal(false);
                        }}

                    >Edit</a>
                    <a onClick={() => {
                        console.log('delete row', record.key);
                        const findRowByKey = (key) => {
                            for (let i = 0; i < usersStore.listUser.length; i++) {
                                if (usersStore.listUser[i].key == key) return i;
                            }
                        }
                        console.log('findRowByKey ', findRowByKey(record.key));
                        const newData = usersStore.listUser.slice();
                        newData.splice(findRowByKey(record.key), 1);
                        console.log('newdata ', newData);

                        dispatch.users.setListUser(newData);
                    }}>Delete</a>
                </Space>
            ),
        },
    ];

    return <div>
        <Button type="primary" onClick={() => showModal(true)}>
            Add user
        </Button>

        <Excel
            fileName="export-user"
            data={[
                {
                    columns: [
                        {
                            title: "User key",
                            dataIndex: "key",
                            width: 15,
                        },
                        {
                            title: "Name",
                            dataIndex: "name",
                            width: 20,
                        },
                        {
                            title: "age",
                            dataIndex: "age",
                            width: 10,
                        },
                        {
                            title: "address",
                            dataIndex: "address",
                            width: 50,
                        },
                    ],
                    data: usersStore.listUser,
                    tabName: "info",
                },
                {
                    columns: [
                        {
                            title: "Name",
                            dataIndex: "username",
                            width: 30,
                        },
                        {
                            title: "Phone",
                            dataIndex: "phone",
                            width: 30,
                        },
                    ],
                    data: usersStore.listUser,
                    tabName: "contact",
                },
            ]}
        >
            <Button>Export users</Button>
        </Excel>


        <Modal title={addUser ? 'Add user' : 'edit user'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                // initialValues={{
                //     remember: true,
                //     username: "username"
                // }}

                // initialValues={() => {
                //     console.log('initialValues')
                //     return {
                //         username: 'aaaa',
                //     }
                // }}

                initialValues={{...setEdittingRow}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/* Username */}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Userage */}
                <Form.Item
                    label="Userage"
                    name="userage"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your userage!',
                        },
                    ]}
                >
                    <Input />
                    {/* <InputNumber /> */}
                </Form.Item>

                {/* Useradress */}
                <Form.Item
                    label="Useradress"
                    name="Useradress"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your useradress!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* SelectTags */}
                <Form.Item
                    label="SelectTags"
                    name="Select"
                >
                    <Space
                        style={{
                            width: '100%',
                        }}
                        direction="vertical"
                    >
                        <Select
                            name="SelectTags"
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            defaultValue={defaultSelected}
                            onChange={handleChange}
                        >
                            <Option value="nice" label="nice" />
                            <Option value="developer" label="developer" />
                            <Option value="teacher" label="teacher" />
                            <Option value="cool" label="cool" />
                            <Option value="loser" label="loser" />
                        </Select>

                    </Space>
                    {/* <Input /> */}
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        <Table columns={columns} dataSource={usersStore.listUser} />;
    </div>
}

export const UserDecentralization = () => {
    return <div>
        UserDecentralization
    </div>
}