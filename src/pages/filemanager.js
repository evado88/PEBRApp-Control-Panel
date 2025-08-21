import React, { useRef , useEffect} from "react";
const FileManagerPage = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div>
      <iframe
        width="100%"
        height="900"
        src="https://twyshe.app/gallery.php?p="
        title="GeeksforGeeks"
      ></iframe>
    </div>
  );
};

export default FileManagerPage;
