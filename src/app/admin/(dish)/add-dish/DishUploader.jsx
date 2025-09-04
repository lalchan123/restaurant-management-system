"use client";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import axios from 'axios';

import path from 'path';
import { BaseURL } from "@/ApiCallMethod/Constants";


// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

const DishUploader = async() => {
  
  const [mainImage, setMainImage] = useState([]);
  const [additionImage, setAdditionImage] = useState([]);

  console.log("21 mainImage", mainImage);
  console.log("22 additionImage additionImage.length", additionImage);
  // if (mainImage) {
  //   // const buffer = Buffer.from(await mainImage.arrayBuffer());
  //   const filePath = path.join(process.cwd(), 'public', 'uploads', mainImage.name);
  //   console.log("31 filePath", filePath);
  // }

  // const handleProcessMainImage = (error, mainImage) => {
  //   if (!error) {
  //     const MainImageUrl = JSON.parse(mainImage.serverId).url; // Adjust depending on your server response
  //     console.log('Uploaded MainImageUrl:', MainImageUrl);
  //   }
  // };

  // const handleProcessMainImage = (error, file) => {
  //   if (!error) {
  //     const MainImageUrl = JSON.parse(file.serverId).url; // Adjust depending on your server response
  //     console.log('Uploaded MainImageUrl:', MainImageUrl);
  //   }
  // };

  // const handleProcessMainImage = (fieldName, file, metadata, load, error, progress, abort) => {
  //   console.log("51");
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //   console.log("53 file", file);
  //   // fetch(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, {
  //   fetch(`https://tasteofindiamckinney.net/course/upload_image_react_file_pond_apiview/`, {
  //   // fetch(`http://38.107.232.191:8000/course/upload_image_react_file_pond_apiview/`, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("data.filePath", data.filePath);
  //       localStorage.setItem("MainImagePath", data.filePath)
  //     })
  //     .catch(err => {
  //       console.error('Upload error:', err);
  //       error('Upload failed');
  //     });

  //   // axios.post(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, formData, {
  //   //   headers: {
  //   //     'Content-Type': 'multipart/form-data',
  //   //   },
  //   // })
  //   // .then(res => {
  //   //   console.log("data.filePath", res.data.filePath);
  //   //   localStorage.setItem("MainImagePath", res.data.filePath);
  //   // })
  //   // .catch(err => {
  //   //   console.error('Upload error:', err);
  //   //   error('Upload failed');
  //   // });

  //   return {
  //     abort: () => {
  //       abort();
  //     },
  //   };
  // };

  const handleProcessMainImage = (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    axios.post(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        progress(e.lengthComputable, e.loaded, e.total);
      }
    })
    .then(res => {
      console.log("Upload success:", res.data);
      load(res.data.filePath);
    })
    .catch(err => {
      console.error("Upload error:", err.message);
      error("Upload failed. Please check your internet or server.");
    });
  };


  // const handleProcessMainImage = (fieldName, file, metadata, load, error, progress, abort) => {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);

  //   const request = new XMLHttpRequest();

  //   request.open('POST', `${BaseURL}/course/upload_image_react_file_pond_apiview/`);

  //   // Progress tracking
  //   request.upload.onprogress = (e) => {
  //     if (e.lengthComputable) {
  //       progress(e.lengthComputable, e.loaded, e.total);
  //     }
  //   };

  //   // Success
  //   request.onload = () => {
  //     if (request.status >= 200 && request.status < 300) {
  //       const data = JSON.parse(request.responseText);
  //       console.log("data.filePath", data.filePath);
  //       localStorage.setItem("MainImagePath", data.filePath);

  //       load(data.filePath); // ✅ must call load for FilePond to finish
  //     } else {
  //       error('Upload failed');
  //     }
  //   };

  //   // Error
  //   request.onerror = () => {
  //     error('Upload error');
  //   };

  //   request.send(formData);

  //   return {
  //     abort: () => {
  //       request.abort();
  //       abort();
  //     },
  //   };
  // };


  // const handleProcessMainImage = (fieldName, file, metadata, load, error, progress, abort) => {
  //   const formData = new FormData();
  //   formData.append("file", file, file.name);

  //   const source = axios.CancelToken.source();

  //   axios.post(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     cancelToken: source.token,
  //     onUploadProgress: (e) => {
  //       if (e.lengthComputable) {
  //         progress(true, e.loaded, e.total); // tells FilePond the progress
  //       }
  //     },
  //   })
  //     .then((res) => {
  //       console.log("Uploaded file path:", res.data.filePath);
  //       localStorage.setItem("MainImagePath", res.data.filePath);
  //       load(res.data.filePath); // notify FilePond upload success
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) {
  //         console.warn("Upload canceled", err.message);
  //       } else {
  //         console.error("Upload error:", err);
  //         error("Upload failed");
  //       }
  //     });

  //   return {
  //     abort: () => {
  //       source.cancel("User aborted upload");
  //       abort();
  //     },
  //   };
  // };
  
  // const handleProcessAdditionImage = (fieldName, file, metadata, load, error, progress, abort) => {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);

  //   // fetch(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, {
  //   //   method: 'POST',
  //   //   body: formData,
  //   // })
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     console.log("data.filePath", data.filePath);
  //   //     localStorage.setItem("AdditionalImagePath", data.filePath)
  //   //   })
  //   //   .catch(err => {
  //   //     console.error('Upload error:', err);
  //   //     error('Upload failed');
  //   //   });

  //   axios.post(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then(res => {
  //     console.log("data.filePath", res.data.filePath);
  //     localStorage.setItem("AdditionalImagePath", res.data.filePath);
  //   })
  //   .catch(err => {
  //     console.error("Upload error:", err);
  //     error("Upload failed");
  //   });

  //   return {
  //     abort: () => {
  //       abort();
  //     },
  //   };
  // };

  const handleProcessAdditionImage = (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData();
    // additionImage.forEach(fileItem => {
    //   formData.append('file', fileItem.file); // 'images' is the field name in your API
    // });
    formData.append('file', file, file.name);


    fetch(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log("data.filePath", data.filePath);
        localStorage.setItem("MainImagePath", data.filePath)
      })
      .catch(err => {
        console.error('Upload error:', err);
        error('Upload failed');
      });

    return {
      abort: () => {
        abort();
      },
    };
  };

  return (
    <div className="rounded-lg border border-default-200 p-6">
      <div className="mb-4 flex h-96 flex-col items-center justify-center rounded-lg border border-default-200 p-6">
        <FilePond
          className="h-28 w-28 md:h-56 md:w-56 lg:h-64 lg:w-64"
          labelIdle='<div class="lg:mt-44 md:mt-36 mt-9">Upload Image</div>'
          imagePreviewHeight={250}
          acceptedFileTypes={['image/*']}
          imageCropAspectRatio="1:1"
          styleButtonRemoveItemPosition="center bottom"
          // files={mainImage}
          // onupdatefiles={setMainImage}
          name="file"
          // onprocessfile={handleProcessMainImage}
          server={{
            process: handleProcessMainImage,
          }}
        />
      </div>
      <h4 className="mb-4 text-base font-medium text-default-800">
        Additional Images
      </h4>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-default-200 p-6">
          {/* {
            additionImage && <>
              <FilePond
                className="h-24 w-24 p-0"
                labelIdle='<div class="lg:mt-4 md:mt-5 sm:mt-6 mt-7">Upload Image</div>'
                imageCropAspectRatio="1:1"
                acceptedFileTypes={['image/*']}
                styleButtonRemoveItemPosition="center bottom"
                files={additionImage}
                onupdatefiles={setAdditionImage}
                allowMultiple={true}
                maxFiles={3}
                name="file"
                // server={{
                //   process: handleProcessAdditionImage,
                // }}
              />
            </>
          } */}
          <FilePond
            className="h-24 w-24 p-0"
            labelIdle='<div class="lg:mt-4 md:mt-5 sm:mt-6 mt-7">Upload Image</div>'
            imageCropAspectRatio="1:1"
            acceptedFileTypes={['image/*']}
            styleButtonRemoveItemPosition="center bottom"
            // files={additionImage}
            // onupdatefiles={setAdditionImage}
            // allowMultiple={true}
            // maxFiles={3}
            name="file"
            server={{
              process: handleProcessAdditionImage,
            }}
          />
        </div>
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-default-200" />
      </div>
    </div>
  );
};

export default DishUploader;
