import { useEffect, useState } from "react";
import { RoomType } from "../../pages/rooms/Rooms";

interface RoomTitlesProps {
  roomSelected: string;
  setroomSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomTitles = ({
  roomSelected,
  setroomSelected,
}: RoomTitlesProps) => {
  const [Allrooms, setAllrooms] = useState<RoomType[]>([]);

  useEffect(() => {
    // fetch api to get all rooms
    fetch(
      "https://little-learners-academy-back-end-j3iu.onrender.com/api/rooms"
    )
      .then((response) => response.json())
      .then((data) => {
        setAllrooms(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div
      className="overflow-x-auto mx-auto w-[100%] xl:w-fit text-center mb-24
       xl:mb-[100px] 2xl:mb-[150px]"
      style={{
        scrollbarColor: "transparent",
      }}
    >
      <ul className="flex xl:flex-wrap mb-1 gap-[10px] xl:gap-[15px] whitespace-nowrap w-fit mx-auto">
        <li
          onClick={() => setroomSelected("All")}
          className={`${
            roomSelected == "All" ? "bg-Orange_95" : "bg-white"
          } hover:bg-Orange_95 px-[16px] py-[10px] 2xl:px-[20px] 2xl:py-[14px] border-2 border-[#333333] rounded-md  
            font-[600] text-[16px] 2xl:text-[20px] cursor-pointer`}
        >
          All
        </li>

        {Allrooms.map((room, index) => (
          <li
            key={index}
            onClick={() => setroomSelected(room._id)}
            className={`${
              roomSelected == room.name ? "bg-Orange_95" : "bg-white"
            } hover:bg-Orange_95 px-[16px] py-[10px] 2xl:px-[20px] 2xl:py-[14px] border-2 border-[#333333] rounded-md  
            font-[600] text-[16px] 2xl:text-[20px] cursor-pointer`}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
