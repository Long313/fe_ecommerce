'use client'
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useCitySearch, useDistrictSearch, useWardSearch } from '@/hooks/useProvincesSearch';
import { useStore } from '@/store/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import map_pin from '../../../../../images/map_pin.svg';

export default function AddressBook() {
    const [open, setOpen] = useState<boolean>(false);
    const userInfor = useStore(state => state.userInfor);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const handleAddNewAddress = () => setOpen(true);
    const [cityId, setCityId] = useState<string | undefined>("");
    const [districtId, setDistrictId] = useState<string | undefined>("");
    const { data: cityData } = useCitySearch({ page: 0, size: 63 });
    const { data: districtData } = useDistrictSearch(cityId ?? "", { page: 0, size: 63 });
    const { data: wardData } = useWardSearch(districtId ?? "", { page: 0, size: 63 });

    const [city, setCity] = useState<{ label: string, value: string, id: string }[]>([{ label: "Select", value: "", id: "" }]);
    const [district, setDistrict] = useState<{ label: string, value: string }[]>([]);
    const [ward, setWard] = useState<{ label: string, value: string }[]>([]);



    const formatData = (data: any) => {
        return data.map((item: any) => ({
            label: item.name,
            value: item.name,
            id: item.id,
        }));
    };

    // Load cities
    useEffect(() => {
        if (cityData && cityData?.data?.length > 0) {
            setCity(formatData(cityData.data));
        }
    }, [cityData]);

    // Load districts
    useEffect(() => {
        if (districtData && districtData?.data?.length > 0) {
            setDistrict(formatData(districtData.data));
        } else {
            setDistrict([]);
        }
    }, [districtData]);

    // Load wards
    useEffect(() => {
        if (wardData && wardData?.data?.length > 0) {
            setWard(formatData(wardData.data));
        } else {
            setWard([]);
        }
    }, [wardData]);

    const handleGetData = (name: string, value: string, id?: string) => {
        switch (name) {
            case "name":
                setName(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "city":
                setCityId(id);
                break;
            case "district":
                setDistrictId(id);
                break;
            default:
                break;
        }
    };

    const handleSave = () => {
        console.log({ name, phone, address, cityId, districtId });
        // Add logic to save the address
    };

    const handleDiscard = () => {
        setName("");
        setPhone("");
        setAddress("");
        setCityId("");
        setDistrictId("");
        setOpen(false);
    };

    return (
        <div className="mb-[100px] h-fit p-[2px] rounded-[4px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4]">
            <div className="h-full rounded-[4px] bg-white dark:bg-black">
                <div className="p-[20px]">
                    <h1 className="text-[30px] font-bold bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                        Address Book
                    </h1>
                    {!open ? (<><div className='flex flex-col relative py-[20px]'>
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                        <div className="flex flex-row">
                            <div className='flex flex-col justify-center items-center min-w-[50px]'>
                                <Image src={map_pin} alt="map_pin" width={20} height={20} />
                                <p className='text-[#FF00B5]'>Default</p>
                            </div>
                            <div className='ml-[20px] flex-1'>
                                <p><span>Ross Geller</span><span className="mx-[10px]">|</span><span>(+84) 912345678</span></p>
                                <p>Sky Building , 12 Tran Hung Dao Street, District 1, HCM City</p>
                            </div>
                        </div>
                    </div>
                        <div className='flex flex-col relative py-[20px]'>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                            <div className="flex flex-row">
                                <div className='flex flex-col justify-center items-center min-w-[50px]'>
                                    <Image src={map_pin} alt="map_pin" width={20} height={20} />
                                    {/* <p className='text-[#FF00B5]'>Default</p> */}
                                </div>
                                <div className='ml-[20px] flex-1'>
                                    <p><span>Ross Geller</span><span className="mx-[10px]">|</span><span>(+84) 912345678</span></p>
                                    <p>Sky Building , 12 Tran Hung Dao Street, District 1, HCM City</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col relative py-[20px]'>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#822FFF] to-[#FF35C4] opacity-20" />
                            <div className="flex flex-row">
                                <div className='flex flex-col justify-center items-center min-w-[50px]'>
                                    <Image src={map_pin} alt="map_pin" width={20} height={20} />
                                    {/* <p className='text-[#FF00B5]'>Default</p> */}
                                </div>
                                <div className='ml-[20px] flex-1'>
                                    <p><span>Ross Geller</span><span className="mx-[10px]">|</span><span>(+84) 912345678</span></p>
                                    <p>Sky Building , 12 Tran Hung Dao Street, District 1, HCM City</p>
                                </div>
                            </div>
                        </div>
                        <Button width="w-[200px]" margin="mt-[40px] mx-auto" title="Add new address" onSubmit={handleAddNewAddress} /></>) : (
                        <div>
                            <p className="ml-[20px] text-[16px] font-bold bg-gradient-to-r from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent">
                                Address new address
                            </p>
                            <p className="ml-[20px]">Please enter details for the new address:</p>
                            <div className="mt-[20px] w-[80%] mx-auto">
                                <Input defaultValue={name} title="Name" name="name" type="string" onGetData={handleGetData} />
                                <Input defaultValue={phone} title="Phone" name="phone" type="string" onGetData={handleGetData} />
                                <Input defaultValue={address} title="Address" name="address" type="string" onGetData={handleGetData} />
                                <Input dataSelect={city} title="City" name="city" type="string" onGetData={handleGetData} />
                                <Input dataSelect={district} title="District" name="district" type="string" onGetData={handleGetData} />
                                <Input dataSelect={ward} title="Ward" name="ward" type="string" onGetData={handleGetData} />
                            </div>
                            <div className="flex justify-end w-[80%] mx-auto my-[40px]">
                                <button onClick={handleDiscard} className="cursor-pointer mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] w-[100px] h-[36px] flex justify-center items-center rounded-[12px] hover:scale-101">
                                    Discard
                                </button>
                                <Button title="Save" onSubmit={handleSave} width="w-[100px]" height="h-[36px]" boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}