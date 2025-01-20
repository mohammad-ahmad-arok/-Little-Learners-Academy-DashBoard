import { useEffect, useState } from "react";
import { Room } from "../../components/Rooms/Room";
import { RoomTitles } from "../../components/Rooms/RoomsTitles";
import styles from "../../components/dashboardNav/header.module.css";
import AddRoomModal from "../../components/roomsModal/AddRoomModal";
import Lottie from "lottie-react";
import notfound from "../../components/common/GridList/not found.json";

export type RoomType = {
  name: string;
  description: string;
  images: any[];
  _id: string;
};

const Rooms = () => {
  const [roomSelected, setroomSelected] = useState<string>("All");
  const [rooms, setrooms] = useState<RoomType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // fetch api to get all rooms
    fetch(
      "https://little-learners-academy-back-end-j3iu.onrender.com/api/rooms"
    )
      .then((response) => response.json())
      .then((data) => {
        setrooms(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    // get data by room's id
    if (roomSelected != "All") {
      fetch(
        `https://little-learners-academy-back-end-j3iu.onrender.com/api/rooms/${roomSelected}`
      )
        .then((response) => response.json())
        .then((data) => {
          setrooms([data.data]);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(
        `https://little-learners-academy-back-end-j3iu.onrender.com/api/rooms`
      )
        .then((response) => response.json())
        .then((data) => {
          setrooms(data.data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [roomSelected]);
  if (rooms.length <= 0) {
    return (
      <>
        <button
          className={`${styles.btn} mt-4 w-fit`}
          onClick={() => {
            setOpen((pre) => !pre);
          }}
        >
          New Room
        </button>
        <AddRoomModal
          isOpen={open}
          setIsopen={setOpen}
          rooms={rooms}
          setRooms={setrooms}
        />
        <Lottie
          animationData={notfound}
          style={{ width: "400px" }}
          className="m-auto mt-10"
        />
      </>
    );
  }
  return (
    <div
      className=" mx-[auto] w-[81.79vw] xl:w-[78.89vw] 2xl:[94.79] pe-0 md:pe-24 
          flex flex-col mb-[80%] md:mb-[20%] xl:mb-[15%]"
    >
      <AddRoomModal
        isOpen={open}
        setIsopen={setOpen}
        rooms={rooms}
        setRooms={setrooms}
      />

      <button
        className={`${styles.btn} mt-4 w-fit`}
        onClick={() => {
          setOpen((pre) => !pre);
        }}
      >
        New Room
      </button>
      <div className="allRooms w-[100%] py-10 sm:py-[6.3rem]">
        <RoomTitles
          roomSelected={roomSelected}
          setroomSelected={setroomSelected}
        />
        <div className="flex flex-col gap-[400px]">
          {rooms.map((item, index) => {
            return (
              <>
                <Room
                  key={index}
                  index={index}
                  rooms={rooms}
                  room={item}
                  setRooms={setrooms}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
