'use client'

import { ProductDetailProps } from '@/common/type';
import Button from '@/components/Button';
import InputComponent from '@/components/Input';
import PriceInput from '@/components/PriceInput';
import ProductPopup from '@/components/ProductPopup';
import { CATEGORIES_LIST, GENDERS_LIST } from '@/constants';
import { useProductSearch } from '@/hooks/useProductSearch';
import useTranslation from '@/hooks/useTranslation';
import amax from '@/images/amax.svg';
import logo from '@/images/logo.svg';
import type { GetProp, GetRef, InputRef, TableProps } from 'antd';
import { Form, Input, Popconfirm, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
}
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface EditableRowProps {
    id: string;
}

const getRandomuserParams = (params: TableParams) => {
    const { pagination, filters, sortField, sortOrder, ...restParams } = params;
    const result: Record<string, any> = {};

    // https://github.com/mockapi-io/docs/wiki/Code-examples#pagination
    result.limit = pagination?.pageSize;
    result.page = pagination?.current;

    // https://github.com/mockapi-io/docs/wiki/Code-examples#filtering
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                result[key] = value;
            }
        });
    }

    // https://github.com/mockapi-io/docs/wiki/Code-examples#sorting
    if (sortField) {
        result.orderby = sortField;
        result.order = sortOrder === 'ascend' ? 'asc' : 'desc';
    }
}

const EditableRow: React.FC<EditableRowProps> = ({ id, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} key={id} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    id: string | number,
    name: string,
    category: string,
    description: string,
    price: number | string,
    image_url: string,
    gender: string;
    type?: string;
    size?: string;
    quantity?: number,
    rate?: number | string,
    color?: string,
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const Admin: React.FC = () => {
    // const [dataSource, setDataSource] = useState<DataType[]>([
    //     {
    //         id: '0',
    //         name: 'Product 1',
    //         image_url: '',
    //         description: 'Description for produc 1',
    //         category: 'accesories',
    //         gender: 'men',
    //         type: 'sale',
    //         price: 1000
    //     },
    //     {
    //         id: '1',
    //         name: 'Product 2',
    //         image_url: '',
    //         description: 'Description for produc 1',
    //         category: 'shirts',
    //         gender: 'unisex',
    //         type: 'hot',
    //         price: 2000
    //     },
    // ]);
    const [search, setSearch] = useState<string>("");
    const [gender, setGender] = useState<string[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [type, setType] = useState<string>("");
    const [startPrice, setStartPrice] = useState<string>("");
    const [endPrice, setEndPrice] = useState<string>("");
    const [products, setProducts] = useState<ProductDetailProps[]>([]);

    const [count, setCount] = useState(2);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const filteredParams = useMemo(() => {
        const result = {
            startPrice,
            endPrice,
            gender,
            category,
            search,
            type,
            pageIndex: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize
        };

        return Object.fromEntries(
            Object.entries(result).filter(
                ([, value]) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    (!(Array.isArray(value)) || value.length > 0)
            )
        );
    }, [search, type, startPrice, endPrice, gender, category, tableParams]);
    const { data, isPending, isFetching } = useProductSearch(filteredParams);
    useEffect(() => {
        if (data && data?.data.length > 0) {
            console.log("🚀 Fetched data:", data.data); // Log bất kể data là gì
            setProducts(data.data);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: data?.pagination.total
                }
            })
        }
    }, [data]);
    const handleDelete = (id: string | number) => {
        console.log("delete", id);
        const newData = products.filter((item) => item.id !== id);
        setProducts(newData);
    };
    const [open, setOpen] = useState<boolean>(false);
    const [idSelect, setIdSelect] = useState<string | number>("");
    const [typePopup, setTypePopup] = useState<string>("");
    const handleEdit = (id: string | number) => {
        console.log("edit", id);
        setOpen(true);
        setIdSelect(id);
        setTypePopup("edit");
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '10%',
            // editable: true,
        },
        {
            title: 'Product Image',
            dataIndex: 'image_url',
            width: '10%',
            // editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '20%',
            // editable: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: '10%',
            // editable: true,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: '10%',
            // editable: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '10%',
            // editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '10%',
            // editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) =>
                products.length >= 1 ? (
                    <div className='flex justify-between items-center'>
                        <Popconfirm title="Sure to edit?" onConfirm={() => handleEdit(record.id)}>
                            <a>Edit</a>
                        </Popconfirm>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];

    const handleAdd = () => {
        // const newData: ProductDetailProps = {
        //     id: "123",
        //     name: 'Product new',
        //     image_url: '',
        //     description: 'Description for new product',
        //     category: 'shoes',
        //     gender: 'unisex',
        //     type: 'new',
        //     price: 0,
        // };
        // setProducts([...products, newData]);
        // setCount(count + 1);
        setOpen(true);
        setType("create")
    };

    const handleSave = (row: DataType) => {
        const newData = [...products];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setProducts(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });


    const handleGetData = (name: string, value: string) => {
        switch (name) {
            case "search":
                setSearch(value);
                break;
            case "gender":
                setGender(pre => [...pre, value]);
                break;
            case "category":
                setCategory(pre => [...pre, value]);
                break;
            case "type":
                setType(value);
                break;
            case "start_price":
                setStartPrice(value);
                break;
            case "end_price":
                setEndPrice(value);
                break;
            default:
                return;
        }
    }

    // const fetchData = () => {
    // setLoading(true);
    // fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users?${params.toString()}`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setData(Array.isArray(res) ? res : []);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 100,
    //         // 100 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
    // };

    // useEffect(fetchData, [
    //     tableParams.pagination?.current,
    //     tableParams.pagination?.pageSize,
    //     tableParams?.sortOrder,
    //     tableParams?.sortField,
    //     JSON.stringify(tableParams.filters),
    // ]);

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setProducts([]);
        }
    };
    const { locale } = useTranslation();
    const router = useRouter();

    const handleClosePopup = () => {
        setOpen(false);
        setType("");
    }
    return (
        <div className="mt-[10px] mx-[10px]">
            <div className="border-b border-[#E5E5E5] pb-[10px] mb-[20px]">
                <div className="flex items-center cursor-pointer" onClick={() => router.push(`/${locale}/`)}>
                    <Image src={logo} alt="logo" width={30} />
                    <Image src={amax} alt="amax_logo" width={90} height={30} />
                </div>
                <h1 className="mx-auto text-center text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                    ADMIN
                </h1>
                <div className="flex flex-wrap justify-start gap-x-[5%] items-center">
                    <InputComponent width="w-[30%]" minWidth='min-w-[100px]' star={false} defaultValue={search} title="Name product" name="search" type="string" onGetData={handleGetData} />
                    <InputComponent width="w-[30%]" minWidth='min-w-[100px]' star={false} defaultValue={gender[0]} dataSelect={GENDERS_LIST} title="Gender" name="gender" type="string" onGetData={handleGetData} />
                    <InputComponent width="w-[30%]" minWidth='min-w-[100px]' star={false} defaultValue={category[0]} dataSelect={CATEGORIES_LIST} title="Category" name="category" type="string" onGetData={handleGetData} />
                    <InputComponent width="w-[30%]" minWidth='min-w-[105px]' star={false} defaultValue={type} title="Type" name="type" type="string" onGetData={handleGetData} />
                    <PriceInput maxWidth="max-w-none" minWidth='min-w-[115px]' margin="mt-[30px]" value={startPrice} width="w-[30%]" title="Price From" name="start_price" onGetValue={(name, value) => handleGetData(name, value)} />
                    <PriceInput maxWidth="max-w-none" minWidth='min-w-[115px]' margin="mt-[30px]" value={endPrice} width="w-[30%]" title="Price To" name="end_price" onGetValue={(name, value) => handleGetData(name, value)} />
                </div>
                <Button title="Add a product" onSubmit={handleAdd} margin="my-[16px]" width='w-[140px]' />
            </div>

            <Table<DataType>
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={products}
                columns={columns as ColumnTypes}
                rowKey="id"
                pagination={tableParams.pagination}
                onChange={handleTableChange}
            />
            {open && <ProductPopup id={idSelect} open={open} typePopup={typePopup} onClose={handleClosePopup} />}
        </div>
    );
};

export default Admin;