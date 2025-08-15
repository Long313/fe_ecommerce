'use client'

import { DataType, EditableCellProps, EditableRowProps, ProductDetailProps } from '@/common/type';
import { CATEGORIES_LIST, GENDERS_LIST } from '@/constants';
import { useCreateProduct, useProductSearch, useUpdateProduct } from '@/hooks/useProductSearch';
import useTranslation from '@/hooks/useTranslation';
import amax from '@/images/amax.svg';
import logo from '@/images/logo.svg';
import { deleteProduct } from '@/service/product';
import { useMutation } from '@tanstack/react-query';
import type { GetProp, GetRef, InputRef, TableProps } from 'antd';
import { Form, Input, Popconfirm, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './index.css';

const ButtonWhite = dynamic(() => import('@/components/ButtonWhite'), { ssr: false });
const Button = dynamic(() => import('@/components/Button'), { ssr: false });
const PriceInput = dynamic(() => import('@/components/PriceInput'), { ssr: false });
const InputComponent = dynamic(() => import("@/components/Input"), { ssr: false });
const ProductPopup = dynamic(() => import("@/components/ProductPopup"), { ssr: false });
const ImageWithFallback = dynamic(() => import("@/components/ImageWithFallback"), { ssr: false });

type FormInstance<T> = GetRef<typeof Form<T>>;
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<ProductDetailProps>['field'];
    sortOrder?: SorterResult<ProductDetailProps>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
const EditableContext = React.createContext<FormInstance<ProductDetailProps> | null>(null);

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


type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const Admin: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [gender, setGender] = useState<string>();
    const [category, setCategory] = useState<string>();
    const [type, setType] = useState<string>("");
    const [startPrice, setStartPrice] = useState<string>("");
    const [endPrice, setEndPrice] = useState<string>("");
    const [products, setProducts] = useState<ProductDetailProps[]>([]);
    // const [count, setCount] = useState(2);

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
    const { data, refetch } = useProductSearch(filteredParams);
    useEffect(() => {
        if (data && data?.data.length > 0) {
            const newData = data.data.map(item => (
                {
                    ...item,
                    image_url: item.image_url
                }
            ))
            setProducts(newData);

            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: data?.pagination.total
                }
            })
        } else if (data && data?.data.length === 0) {
            setProducts([]);
        }
    }, [data]);

    const { mutate } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (res, idDeleted) => {
            console.log(res);
            setProducts((prev) => prev.filter((item) => item.id !== idDeleted));
            refetch();
            toast.success('Xóa sản phẩm thành công!');

        },
        onError: (error) => {
            console.log(error)
            toast.error('Xóa sản phẩm thất bại!');
        },
    });
    const handleDelete = (id: string) => {
        mutate(id);
    };
    const [open, setOpen] = useState<boolean>(false);
    const [idSelect, setIdSelect] = useState<string>("");
    const [typePopup, setTypePopup] = useState<string>("");
    const handleEdit = (id: string) => {
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
            render: (image_url: string) => (
                <div className="flex justify-center items-center">
                    <ImageWithFallback src={image_url} alt="product" />
                </div>),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
            render: (text: string) => (
                <span title={text} className="truncate-description">{text}</span>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: '10%',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: '10%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '10%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '10%',
        },
        {
            title: 'Last Update',
            dataIndex: 'updated_at',
            width: '12%',
            render: (updated_at: string) => dayjs(updated_at).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) =>
                products.length >= 1 ? (
                    <div className='flex justify-between items-center'>
                        <Popconfirm title="Sure to edit?" onConfirm={() => handleEdit(String(record.id))}>
                            <a className="font-[600]">Edit</a>
                        </Popconfirm>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(String(record.id))}>
                            <a className="font-[600] !text-[red] opacity-100 hover:opacity-50">Delete</a>
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];

    const handleAdd = () => {
        setOpen(true);
        setTypePopup("create")
    };

    const handleSave = useCallback((row: DataType) => {
        const newData = [...products];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setProducts(newData);
    }, []);

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
                setGender(value);
                break;
            case "category":
                setCategory(value);
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

    const { mutate: createProduct } = useCreateProduct();
    const { mutate: updateProduct } = useUpdateProduct();

    const handleGetFormData = async (typePopup: string, data: ProductDetailProps) => {
        const formData = new FormData();
        console.log("Data", data);
        if (data.name) formData.append("name", data.name);
        if (data.gender) formData.append("gender", data.gender);
        if (data.category) formData.append("category", data.category);
        if (data.type) formData.append("type", data.type);
        if (data.price) formData.append("price", String(Number(data.price)));
        if (data.description) formData.append("description", data.description);
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }
        formData.append("discountRate", String(Number(5)));
        formData.append("taxRate", String(Number(5)));
        formData.append("inventoryCount", String(Number(5)));
        formData.append("star", String(Number(5)));
        if (typePopup !== "edit") {
            createProduct(formData, {
                onSuccess: () => {
                    refetch();
                    toast.success('Tạo sản phẩm thành công!');
                },
                onError: () => {
                    toast.error('Tạo sản phẩm thất bại!');
                }
            });
        } else {
            if (data.id) formData.append("id", data.id);
            formData.append("isActive", "1");
            updateProduct(formData, {
                onSuccess: () => {
                    refetch();
                    toast.success('Cập nhật sản phẩm thành công!');
                },
                onError: () => {
                    toast.error('Cập nhật sản phẩm thất bại!');
                }
            });
        }
    }

    const handleClear = () => {
        setSearch("");
        setGender("");
        setCategory("");
        setType("");
        setStartPrice("");
        setEndPrice("");
    }

    return (
        <div className="mt-[10px] mx-[10px]">
            {/* {isPending && <Loader />} */}
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
                    <InputComponent width="w-[30%]" minWidth='min-w-[100px]' star={false} defaultValue={gender} dataSelect={GENDERS_LIST} title="Gender" name="gender" type="string" onGetData={handleGetData} />
                    <InputComponent width="w-[30%]" minWidth='min-w-[100px]' star={false} defaultValue={category} dataSelect={CATEGORIES_LIST} title="Category" name="category" type="string" onGetData={handleGetData} />
                    <InputComponent width="w-[30%]" minWidth='min-w-[100px]' star={false} defaultValue={type} title="Type" name="type" type="string" onGetData={handleGetData} />
                    <PriceInput maxWidth="max-w-none" minWidth='min-w-[115px]' margin="mt-[30px]" value={startPrice} width="w-[30%]" title="Price From" name="start_price" onGetValue={(name, value) => handleGetData(name, value)} />
                    <PriceInput maxWidth="max-w-none" minWidth='min-w-[115px]' margin="mt-[30px]" value={endPrice} width="w-[30%]" title="Price To" name="end_price" onGetValue={(name, value) => handleGetData(name, value)} />
                </div>

                <div className='flex items-center'>
                    <Button title="ADD A PRODUCT" onSubmit={handleAdd} margin="my-[16px]" width='w-[140px]' boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                    <ButtonWhite title="CLEAR" onSubmit={handleClear} />
                </div>
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
            <ProductPopup id={idSelect} open={open} typePopup={typePopup} onClose={handleClosePopup} onGetData={handleGetFormData} />
            <Toaster position="bottom-right" />
        </div>
    );
};

export default Admin;