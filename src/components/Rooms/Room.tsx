import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore */}
import "swiper/css";
// @ts-ignore */}
import "swiper/css/pagination";
// @ts-ignore */}
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useRef, useState } from "react";

import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditRoom from "../roomsModal/EditRoom";
import DeleteRoomModal from "../roomsModal/DeleteRoomModal";

export const Room = ({ rooms, room, setRooms, index }: any) => {
  const swiperRef = useRef<null | any>(null);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  // console.log(room);

  const goToNextSlide = () => {
    swiperRef.current.swiper.slideNext();
  };

  const goToPrevSlide = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="relative ">
      <EditRoom
        index={index}
        isOpen={openEditModal}
        setIsopen={setOpenEditModal}
        rooms={rooms}
        setrooms={setRooms}
      />
      <DeleteRoomModal
        index={index}
        isOpen={openDeleteModal}
        setIsopen={setOpenDeleteModal}
        rooms={rooms}
        setrooms={setRooms}
      />
      <div className="mx-[3.125%]">
        <Swiper
          ref={swiperRef}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          // pagination={{
          //   clickable: true,
          // }}

          loop={true}
          modules={[FreeMode, Pagination]}
          className="cursor-pointer"
        >
          {room.images.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={item.url}
                  alt={room.name}
                  className=" rounded-xl border-2 border-[Grey_15] w-auto"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div
        className="lg:pt-[12%] top-[60%] pt-[40%] md:pt-[20%] w-[100%]   bg-white border-2
           rounded-xl border-Grey_15 shadow-card-shadow absolute
      "
      >
        <div
          className="flex justify-between items-center xl:flex-row flex-col-reverse mx-[3.125%]
                xl:mb-[30px] mb-[20px] 2xl:mb-[40px] gap-[20px]
      "
        >
          <h1 className="font-[700] text-[28px] xl:text-[34px] 2xl:text-[40px]">
            {room.name}
          </h1>
          <div className="w-[37.5%] xl:w-[9%] flex gap-4 justify-end">
            <button
              onClick={goToPrevSlide}
              className="w-[42.8%] border-2 hover:bg-Orange_95 border-[#333333] flex items-center justify-center
                      rounded-lg p-[14px] "
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={goToNextSlide}
              className="w-[42.8%] border-2 hover:bg-Orange_95 border-[#333333] flex items-center justify-center
          rounded-lg p-[1px] 2xl:p-[14px]
          "
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <p className="px-[3.125%] text-center lg:text-start mb-[40px] text-[18px] font-[500] xl:text-[20px] 2xl:text-[22px]">
          {room.description}
        </p>
        <div className="flex justify-center lg:justify-end  items-center  gap-3 me-8 mb-5">
          <button
            className="text-4xl  text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"
            // onClick={handleClickUpdate}
            onClick={() => {
              setOpenEditModal(true);
            }}
          >
            <MdEdit />
          </button>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
            }}
            className="text-4xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
};
