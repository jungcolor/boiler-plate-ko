import React, { useState } from 'react';
import { Table } from "antd";

interface ITableProps {
    useCheckbox?: boolean;
    headerData?: object[];
    bodyData?: object[];
    useBordered?: boolean;
    tableLayout?: string;
    usePagination?: any; // 음..
    size?: any; // 음..
}

function ControlTable(props: ITableProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onChangeHandler = (selectedRowKeys: []) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onChangeHandler,
    };

    return (
        <Table
            rowSelection={(props.useCheckbox) ? rowSelection : {}}
            columns={props.headerData}
            dataSource={props.bodyData}
            bordered={props.useBordered}
            pagination={props.usePagination}
            size={props.size}
            tableLayout={"fixed"}
        />
    );
}

export default ControlTable;