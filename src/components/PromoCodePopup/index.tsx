import DiscountCard from '../DiscountCard';

type PromoCodePopupProps = {
    open: boolean,
    onClose: () => void;
};

export default function PromoCodePopup(props: PromoCodePopupProps) {
    const { open, onClose } = props;


    const handleClose = () => {
        onClose();
    }

    return (
        <div className={`${open ? "block" : "hidden"} z-50 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgb(0,0,0,0.2)]`}>
            <div className="bg-white w-[80%] max-h-[80%] rounded-[8px] py-[20px] px-[30px] overflow-y-scroll custom-scroll custom-color">
                <div className="flex flex-wrap gap-y-[20px]">
                    <div className="w-1/2">
                        <DiscountCard name="CODE-MEMBER" value="50% OFF" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-NEXTJS" value="- $40" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-MYSQL" value="40% OFF" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-LARAVEL" value="- $30" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-MEMBER" value="50% OFF" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-NEXTJS" value="- $40" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-MYSQL" value="40% OFF" onClosePopup={handleClose} />
                    </div>
                    <div className="w-1/2">
                        <DiscountCard name="CODE-LARAVEL" value="- $30" onClosePopup={handleClose} />
                    </div>
                </div>
                <div className="flex justify-end mt-[20px]">
                    <button
                        onClick={handleClose}
                        className="cursor-pointer mr-[20px] bg-gradient-to-b from-[#822FFF] to-[#FF35C4] bg-clip-text text-transparent bg-white border border-[#C4C4C4] shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)] w-[100px] h-[36px] flex justify-center items-center rounded-[12px] hover:scale-101"
                    >
                        Discard
                    </button>
                    {/* <Button
                        title="Save"
                        onSubmit={handleSave}
                        width="w-[100px]"
                        height="h-[36px]"
                        boxShadow="shadow-[0px_7.12px_7.12px_0px_rgba(55,55,55,0.25)]"
                    /> */}
                </div>
            </div>
        </div>
    );
}
