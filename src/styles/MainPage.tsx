import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserDataContext } from "@/context/userDataContext";
import { useEffect } from "react";
import { useLightConeContext } from "@/context/useLightConeContext";
import { useCharactersContext } from "@/context/useCharactersContext";

export const MainPage = () => {
  const router = useRouter();

  const pathname = usePathname();

  const {
    operations: { setConeForUser },
  } = useLightConeContext();
  const {
    operations: { setCharactersForUser },
  } = useCharactersContext();

  const {
    data: { firstUserUid, secondUserUid, newUserUid, userName },
    operations: {
      setUserName,
      setFirstUserUid,
      setSecondUserUid,
      setNewUserUid,
    },
  } = useUserDataContext();

  useEffect(() => {
    if (pathname === "/") {
      setConeForUser([]);
      setCharactersForUser([]);
    }
  }, [pathname]);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen text-white">
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl">Match starting</p>
        <div className="flex flex-col items-center space-y-2">
          <div className="space-x-0 space-y-2 md:space-y-0 md:space-x-2 flex md:flex-row flex-col">
            <input className="px-3 py-1 bg-gray-600 text-white rounded-md" type="number" placeholder="First Uid"
              onChange={(e)=> setFirstUserUid(e.target.value)}
            inputMode="text"
            />
            <input className="px-3 py-1 bg-gray-600 text-white rounded-md" type="number" placeholder="Second Uid"
              onChange={(e)=> setSecondUserUid(e.target.value)}
            inputMode="text"
            />
          </div>
          <button className="bg-green-700 rounded-md px-3 py-1 hover:bg-green-800 duration-300" onClick={()=>
            router.push(`/q?user1=${firstUserUid}&user2=${secondUserUid}`)}
            >
            To ban and pick
          </button>
        </div>
      </div>
      <p className="text-2xl mt-5">New user creation</p>
      <div className="space-x-0 space-y-2 md:space-y-0 md:space-x-2 flex md:flex-row flex-col mt-2">
        <input className="px-3 py-1 bg-gray-600 text-white rounded-md" type={"number"} placeholder={"New user uid"}
          onChange={(e)=> setNewUserUid(e.target.value)}
        inputMode={"text"}
        />
        <input className="px-3 py-1 bg-gray-600 text-white rounded-md" placeholder={"New user name"} onChange={(e)=>
        setUserName(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center space-y-2 mt-5">
        <button className="bg-green-700 rounded-md px-3 py-1 hover:bg-green-800 duration-300" onClick={()=>
          router.push(
          `/userOperations/q?op=addNewUser&uid=${newUserUid}&nickname=${userName}`,
          )
          }
          >
          Reg new user
        </button>
        <button className="bg-gray-700 rounded-md px-3 py-1 hover:bg-gray-800 duration-300" onClick={()=>
          router.push(`/userOperations/q?op=changeUser&uid=${newUserUid}`)
          }
          >
          Change User
        </button>
        <button className="bg-gray-700 rounded-md px-3 py-1 hover:bg-gray-800 duration-300 inline-flex" onClick={()=>
          router.push(`/changeLightCone`)}>
          Change light cones
        </button>
        <button className="bg-gray-700 rounded-md px-3 py-1 hover:bg-gray-800 duration-300 inline-flex" onClick={()=>
          router.push(`/changeCharacters`)}>
          Change characters
        </button>
      </div>
    </div> 
  );
};
