"use client";

import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Logo Section */}
      <div className="mb-8">
        <img
          alt="easy collab"
          src="/easycollab.png"
          className="mx-auto h-16 w-auto"
        />
      </div>

      {/* Title Section */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        What would you like to do?
      </h1>

      {/* Button Section */}
      <div className="flex flex-col space-y-6 w-full max-w-md">
        {/* Submit Idea Button */}
        <button
          onClick={() => handleNavigation("/submit-idea")}
<<<<<<< HEAD
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-black-300 focus:ring-offset-2"
=======
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>>>>>>> 175107c7d10dc5b3a87064d09dd9aa5d391c37db
        >
          Submit an Idea
        </button>

        {/* View Ideas Button */}
        <button
          onClick={() => handleNavigation("/view-ideas")}
<<<<<<< HEAD
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
=======
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>>>>>>> 175107c7d10dc5b3a87064d09dd9aa5d391c37db
        >
          View Ideas
        </button>
      </div>
    </div>
  );
}

// "use client";

// import { useRouter } from "next/navigation";

// export default function Nav() {
//   const router = useRouter();

//   const handleNavigation = (path) => {
//     router.push(path);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
//       {/* Logo Section */}
//       <div className="mb-8">
//         <img
//           alt="easy collab"
//           src="/easycollab.png"
//           className="mx-auto h-16 w-auto"
//         />
//       </div>

//       {/* Title Section */}
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
//         What would you like to do?
//       </h1>

//       {/* Button Section */}
//       <div className="flex flex-col space-y-6 w-full max-w-sm">
//         {/* Submit Idea Button */}
//         <button
//           onClick={() => handleNavigation("/submit-idea")}
//           className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
//         >
//           Submit an Idea
//         </button>

//         {/* View Ideas Button */}
//         <button
//           onClick={() => handleNavigation("/submit-ideas")}
//           className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
//         >
//           View Ideas
//         </button>
//       </div>
//     </div>
//   );
// }
