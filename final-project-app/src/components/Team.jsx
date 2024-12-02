import React from "react";

const Team = () => {
   return (
      <>
         <div className="mt-12 px-4 py-5 mx-auto max-w-7xl lg:px-10">
            <div className="max-w-3xl mx-auto text-center">
               <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                  People who made it{" "}
                  <span className="font-serif text-yellow">successful</span>
               </h2>
               <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
                  Behind the success of our website is a dynamic team of
                  dedicated individuals. It's the passion, expertise, and
                  collaborative spirit of every person in our group that has
                  shaped this success story.
               </p>
            </div>
            <br />

            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3 ">
               <div className="flex flex-col items-center shadow-2xl text-start rounded-2xl">
                  <div
                     className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                     style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                     }}>
                     <img
                        src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="z-0 h-full w-full rounded-[10px] object-cover"
                     />
                     <div className="absolute bottom-4 left-4">
                        <h1 className="text-xl font-semibold text-white">
                           John Doe
                        </h1>
                        <h6 className="text-base text-white">Master Chef</h6>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col items-center shadow-2xl text-start rounded-2xl">
                  <div
                     className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                     style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                     }}>
                     <img
                        src="https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="z-0 h-full w-full rounded-[10px] object-cover"
                     />
                     <div className="absolute bottom-4 left-4">
                        <h1 className="text-xl font-semibold text-white">
                           Mark Cook
                        </h1>
                        <h6 className="text-base text-white">Assistant cock</h6>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col items-center shadow-2xl text-start rounded-2xl">
                  <div
                     className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                     style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                     }}>
                     <img
                        src="https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="z-0 h-full w-full rounded-[10px] object-cover"
                     />
                     <div className="absolute bottom-4 left-4">
                        <h1 className="text-xl font-semibold text-white">
                           Kitty
                        </h1>
                        <h6 className="text-base text-white">Cook</h6>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Team;
