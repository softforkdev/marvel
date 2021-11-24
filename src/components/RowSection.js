import React, { useState } from "react";
import { PAGE_SIZE, FORMATS } from "../utils/constants";

const RowSection = (props) => {
  const {
    page,
    items,
    handleSelectedItem,
    setFilteredItems,
    setPage,
    handleReset,
  } = props;

  const [inputValue, setInputValue] = useState("");

  const getImage = (item) => {
    const image = localStorage.getItem(item.id);
    return image ? image : null;
  };

  const renderRow = () => {
    const showDetail = (item) => {
      handleSelectedItem(item);
    };

    const columns = [];
    for (let i = PAGE_SIZE * page - PAGE_SIZE; i < PAGE_SIZE * page; i++) {
      items[i]
        ? columns.push(
            <div
              key={i}
              className="column"
              onClick={() => showDetail(items[i])}
            >
              <div className="card">
                <div
                  className="card-cover"
                  style={{
                    backgroundImage: getImage(items[i])
                      ? `url(${getImage(items[i])})`
                      : `url(${items[i].thumbnail.path}/${FORMATS.INCREDIBLE}.${items[i].thumbnail.extension})`,
                  }}
                >
                  <div className="card-content">{items[i].name}</div>
                </div>
              </div>
            </div>
          )
        : //push stub
          columns.push(
            <div key={i} className="column" style={{ opacity: "0" }}>
              <div className="card">
                <div className="card-cover">
                  <div className="card-content"></div>
                </div>
              </div>
            </div>
          );
    }
    return columns;
  };

  const handleSearch = () => {
    if (inputValue !== "") {
      const value = inputValue.toUpperCase().trim();
      const fileteredItems_ = items.filter((i) =>
        i.name.toUpperCase().includes(value)
      );
      setFilteredItems(fileteredItems_);
      setPage(1);
    } else {
      handleReset();
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="search-container-inner">
          <input
            id="search"
            type="text"
            placeholder="Search.."
            value={inputValue}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleReset();
            }}
          />
          <button onClick={() => handleSearch()}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div className="row">{renderRow()}</div>
    </>
  );
};

export default RowSection;
