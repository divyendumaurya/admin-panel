// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCategory } from "../../store/CategorySlice";
// import { Button, Label, TextInput, Card, Spinner } from "flowbite-react";
// import bgImg from "../../assets/bg.jpg";
// import toast from "react-hot-toast";

// const IconCamera = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     className="h-8 w-8 text-white"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" />
//     <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" />
//   </svg>
// );

// const IconError = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     className="h-5 w-5 text-red-600"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <path d="M12 8L12 12" strokeLinecap="round" />
//     <path d="M12 16L12 16.5" strokeLinecap="round" />
//   </svg>
// );

// const CreateCategory = () => {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("");
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [verifying, setVerifying] = useState(false);
//   const { loading, error } = useSelector((state) => state.categories || {});

//   const verifyImageUrl = (url) => {
//     return new Promise((resolve) => {
//       if (!url.match(/^https?:\/\//)) {
//         toast.error("URL must start with http:// or https://");
//         resolve(false);
//         return;
//       }

//       setVerifying(true);
//       const img = new Image();

//       img.onload = () => {
//         setPreviewUrl(url);
//         setVerifying(false);
//         resolve(true);
//       };

//       img.onerror = () => {
//         setVerifying(false);
//         toast.error(
//           "Unable to preview image. Please check the URL and try again"
//         );
//         resolve(false);
//       };

//       // Set a timeout to handle cases where the image takes too long to load
//       setTimeout(() => {
//         if (verifying) {
//           setVerifying(false);
//           toast.error("Image verification timed out");
//           resolve(false);
//         }
//       }, 10000);

//       img.src = url;
//     });
//   };

//   const handleImageChange = (e) => {
//     const url = e.target.value;
//     setImage(url);
//     setPreviewUrl(""); // Clear preview when URL changes
//   };

//   const handleVerifyClick = async () => {
//     if (!image) {
//       toast.error("Please enter an image URL");
//       return;
//     }
//     await verifyImageUrl(image);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !image) return;

//     // Verify image one last time before submission
//     const isValid = await verifyImageUrl(image);
//     if (isValid) {
//       try {
//         await dispatch(createCategory({ name, image })).unwrap();
//         toast.success("Category created successfully!");
//         setName("");
//         setImage("");
//         setPreviewUrl("");
//       } catch (err) {
//         toast.error("Failed to create category. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="relative h-[800px] w-full overflow-hidden p-4">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url(${bgImg})`,
//           height: "800px",
//           width: "100%",
//         }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/15" />
//       </div>

//       {/* Content */}
//       <div className="relative mx-auto flex h-full max-w-4xl items-center justify-center">
//         <Card className="w-full max-w-md border-none bg-white/95 p-2 shadow-xl backdrop-blur-sm">
//           <div className="space-y-6 p-4">
//             {/* Header Section */}
//             <div className="text-center">
//               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
//                 <IconCamera />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Create New Category
//               </h2>
//               <p className="mt-2 text-sm text-gray-600">
//                 Add a new category with name and image
//               </p>
//             </div>

//             {/* Form Section */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <Label
//                     htmlFor="name"
//                     value="Category Name"
//                     className="text-gray-700"
//                   />
//                   <TextInput
//                     id="name"
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter category name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label
//                     htmlFor="image"
//                     value="Image URL"
//                     className="text-gray-700"
//                   />
//                   <div className="flex gap-2">
//                     <TextInput
//                       id="image"
//                       type="text"
//                       value={image}
//                       onChange={handleImageChange}
//                       placeholder="Enter image URL (https://...)"
//                       required
//                       className="flex-1"
//                     />
//                     <Button
//                       className="bg-green-500 text-white items-center"
//                       type="button"
//                       onClick={handleVerifyClick}
//                       disabled={verifying || !image}
//                       size="sm"
//                     >
//                       {verifying ? <Spinner size="sm" /> : "Verify"}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Image Preview */}
//                 {previewUrl && (
//                   <div className="overflow-hidden rounded-lg border border-gray-200">
//                     <img
//                       src={previewUrl}
//                       alt="Category preview"
//                       className="h-48 w-full object-cover"
//                       onError={() => {
//                         setPreviewUrl("");
//                         toast.error("Failed to load image preview");
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               {error && (
//                 <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600">
//                   <IconError />
//                   <span>{error}</span>
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 disabled={loading || !previewUrl}
//                 gradientDuoTone="purpleToBlue"
//                 className="w-full text-white bg-purple-600 transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <Spinner size="sm" />
//                     <span>Creating...</span>
//                   </div>
//                 ) : (
//                   "Create Category"
//                 )}
//               </Button>
//             </form>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CreateCategory;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../store/CategorySlice";
import { uploadFile } from "../../store/FileUploadSlice";
import { Button, Label, TextInput, Card, Spinner } from "flowbite-react";
import bgImg from "../../assets/bg.jpg";
import toast from "react-hot-toast";
import IsLoadingHOC from "../../HOC/loader/isLoadingHOC";

const IconCamera = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-8 w-8 text-white"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" />
    <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" />
  </svg>
);

const IconError = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 text-red-600"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8L12 12" strokeLinecap="round" />
    <path d="M12 16L12 16.5" strokeLinecap="round" />
  </svg>
);

const CreateCategory = ({ setLoading }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { loading, error } = useSelector((state) => state.categories || {});

  const verifyImageUrl = (url) => {
    return new Promise((resolve) => {
      if (!url.match(/^https?:\/\//)) {
        toast.error("URL must start with http:// or https://");
        resolve(false);
        return;
      }

      setVerifying(true);
      const img = new Image();

      img.onload = () => {
        setPreviewUrl(url);
        setVerifying(false);
        resolve(true);
      };

      img.onerror = () => {
        setVerifying(false);
        toast.error(
          "Unable to preview image. Please check the URL and try again"
        );
        resolve(false);
      };

      img.src = url;
    });
  };

  //   use Effect to sync loader HOC with RTK loading
  useEffect(() => {
    setLoading(loading); // Sync Redux loading state with the HOC
  }, [loading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadFile(file))
        .unwrap()
        .then((response) => {
          setPreviewUrl(response.location);
          setImage(response.location);
          setLoading(false);
          toast.success("Image uploaded successfully");
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to upload image");
        });
    }
  };

  const handleClearImage = () => {
    setPreviewUrl("");
    setImage("");
    toast("Image cleared");
  };

  const handleVerifyClick = async () => {
    if (!image) {
      toast.error("Please enter an image URL");
      return;
    }
    await verifyImageUrl(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return;

    try {
      await dispatch(createCategory({ name, image })).unwrap();
      toast.success("Category created successfully!");
      setName("");
      setImage("");
      setPreviewUrl("");
    } catch (err) {
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <div className="relative h-[800px] w-full overflow-hidden p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImg})`,
          height: "800px",
          width: "100%",
        }}
      >
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="relative mx-auto flex h-full max-w-4xl items-center justify-center">
        <Card className="w-full max-w-md border-none bg-white/95 p-2 shadow-xl backdrop-blur-sm">
          <div className="space-y-6 p-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <IconCamera />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Category
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Add a new category with name and image
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" value="Category Name" />
                  <TextInput
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="imageUpload" value="Image Upload" />
                  <div className="relative">
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    />
                    {previewUrl && (
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-gray-200 text-blue-500 hover:text-blue-700 text-xs rounded-full p-1"
                        aria-label="Clear Image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="imageUrl" value="Image URL (Optional)" />
                  <div className="flex gap-2">
                    <TextInput
                      id="imageUrl"
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Enter image URL (https://...)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      className="bg-green-500 text-white items-center"
                      onClick={handleVerifyClick}
                      disabled={verifying || !image}
                      size="sm"
                    >
                      {verifying ? <Spinner size="sm" /> : "Verify"}
                    </Button>
                  </div>
                </div>

                {previewUrl && (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={previewUrl}
                      alt="Category preview"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  <IconError />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !previewUrl}
                gradientDuoTone="purpleToBlue"
                className="w-full text-white bg-purple-600 transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IsLoadingHOC(CreateCategory);
