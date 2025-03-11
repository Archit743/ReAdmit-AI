import React, { useState } from "react";

const FileUploadSection = ({ fileUrls, setFileUrls }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "jd1booaw"); // Replace with Cloudinary upload preset

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/drm99u4ud/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        return data.secure_url; // Return uploaded file URL
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFileUrls([...fileUrls, ...uploadedUrls]); // Store URLs
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileRemove = (index) => {
    const newFileUrls = [...fileUrls];
    newFileUrls.splice(index, 1);
    setFileUrls(newFileUrls);
  };

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-300 mb-3">Medical Documents</h3>
      <div className="border border-gray-700 rounded-lg p-4 bg-gray-850">
        <div className="mb-3">
          <label htmlFor="fileUpload" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 text-sm">
            {uploading ? "Uploading..." : "Upload Files"}
            <input type="file" id="fileUpload" onChange={handleFileChange} multiple className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
          </label>
          <span className="ml-2 text-xs text-gray-400">Upload patient medical records, lab reports, etc.</span>
        </div>

        {fileUrls.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium mb-2 text-gray-300">Uploaded Files:</h4>
            <ul className="space-y-2">
              {fileUrls.map((url, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-lg">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm truncate text-blue-400 underline">
                    View File
                  </a>
                  <button type="button" onClick={() => handleFileRemove(index)} className="text-red-400 hover:text-red-300 text-sm">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;
