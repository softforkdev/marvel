import React, { useEffect, useState, useRef } from "react";
import { FORMATS } from "../utils/constants";

const DetailSection = (props) => {
  const { item, handleSelectedItem, items } = props;

  const [inputValue, setInputValue] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [savedImage, setSavedImage] = useState(null);

  const inputFile = useRef(null);

  useEffect(() => {
    if (item && item.name) setInputValue(item.name);
    if (item && item.id) {
      const image = localStorage.getItem(item.id);
      if (image) setSavedImage(image);
    }
  }, [item]);

  const saveName = () => {
    const newItems = items.map((i) => {
      if (i.id === item.id) {
        i.name = inputValue;
      }
      return i;
    });
    localStorage.setItem("data", JSON.stringify(newItems));
    setShowConfirm(false);
  };

  const handleClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const addFile = (file) => {
    if (file.type.toUpperCase() === "IMAGE/JPEG" && file.size < 64000) {
      getBase64(file).then((data) => {
        localStorage.setItem(item.id, data);
        setSavedImage(data);
      });
    } else {
      alert("Incorrect file type or size. JPEG only and less than 64kB.");
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-wrapper-inner">
        <button
          className="icon-button"
          onClick={() => handleSelectedItem(null)}
        >
          <i className="fa fa-arrow-left icon-back"></i>
        </button>
        <div className="input-wrapper">
          <input
            id="name-input"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowConfirm(true);
            }}
          />
          {showConfirm && (
            <button className="icon-button" onClick={() => saveName()}>
              <i className="fa fa-save icon-save"></i>
            </button>
          )}
        </div>
      </div>

      <div
        className="detail-image"
        style={{
          backgroundImage: savedImage
            ? `url(${savedImage})`
            : `url(${item.thumbnail.path}/${FORMATS.DETAIL}.${item.thumbnail.extension})`,
        }}
      >
        <button className="icon-button" onClick={() => handleClick()}>
          <i
            className="fa fa-edit"
            style={{
              zIndex: "2",
              height: "40px",
              width: "40px",
              margin: "20px",
              fontSize: "30px",
            }}
          ></i>
        </button>
        <img
          className="detail-image-mobile"
          src={
            savedImage
              ? savedImage
              : `${item.thumbnail.path}/${FORMATS.DETAIL}.${item.thumbnail.extension}`
          }
        />
        <input
          id="file"
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e) => addFile(e.target.files[0])}
        />
      </div>

      <div className="detail-content-wrapper">
        <div className="detail-content">
          {item.description}
          <br />

          {item?.stories?.items && item?.stories?.items.length > 0 && (
            <>
              <br />
              <div>Stories</div>
              <br />
              <ul>
                {item?.stories?.items.map((s, i) => {
                  return (
                    <li key={i} style={{ fontSize: "0.8em" }}>
                      <div>{s.name}</div>
                      <div style={{ fontStyle: "italic" }}>{s.type}</div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {item?.events?.items && item?.events?.items.length > 0 && (
            <>
              <br />
              <div>Events</div>
              <br />
              <ul>
                {item?.events?.items.map((s, i) => {
                  return (
                    <li key={i} style={{ fontSize: "0.8em" }}>
                      <div>{s.name}</div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {item?.series?.items && item?.series?.items.length > 0 && (
            <>
              <br />
              <div>Series</div>
              <br />
              <ul>
                {item?.series?.items.map((s, i) => {
                  return (
                    <li key={i} style={{ fontSize: "0.8em" }}>
                      <div>{s.name}</div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};
export default DetailSection;
