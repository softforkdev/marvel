import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import RowSection from "./RowSection";
import DetailSection from "./DetailSection";
import Spinner from "./Spinner";
import { PAGE_SIZE } from "../utils/constants";

function CardSection({ items }) {
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (items) setFilteredItems(items);
  }, [items]);

  const handleReset = () => {
    setFilteredItems(items);
    setPage(1);
  };
  return (
    <>
      {selectedItem ? (
        <DetailSection
          item={selectedItem}
          handleSelectedItem={setSelectedItem}
          items={items}
        />
      ) : (
        <div className="app-wrapper">
          {items && items.length > 0 ? (
            <>
              <RowSection
                page={page}
                items={filteredItems}
                handleSelectedItem={setSelectedItem}
                setFilteredItems={setFilteredItems}
                setPage={setPage}
                handleReset={handleReset}
              />
              <div className="pagination-wrapper">
                <Pagination
                  className="pagination-bar"
                  currentPage={page}
                  totalCount={filteredItems.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={(page) => setPage(page)}
                />
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      )}

      <div className="footer">
        <div>
          <a
            className="termsCo"
            target="_blank"
            href="https://www.termsandconditionsgenerator.com/live.php?token=N9DWpB3aWhFoHowgI3r9w9XJmME6iuDA"
          >
            Terms and Conditions
          </a>
          <a
            className="termsCo"
            target="_blank"
            href="https://www.privacypolicygenerator.info/live.php?token=5iZQY2ewIKi2dGo3QmZoWX7nUaHjBjRj"
          >
            Privacy Policy
          </a>
        </div>
        {items && items.length > 0 && (
          <div className="marvel">Data provided by Marvel. © 2014 Marvel</div>
        )}
      </div>
    </>
  );
}

export default CardSection;
