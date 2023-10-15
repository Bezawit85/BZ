import { Pagination } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { FaEnvelope } from "react-icons/fa";
import MessageReset from "./MessageReset";

const PersonalSettingTable = ({ target, setShowSetting, name }) => {
  console.log(target, name, setShowSetting);

  const [page, setPage] = useState(1); 
  const [postPerPage, setpostPerPage] = useState(5);
  const lastIndexOfPage = page * postPerPage;
  const firstIndexPage = lastIndexOfPage - postPerPage;
  const currentPage = target.slice(firstIndexPage, lastIndexOfPage);
  const totalPages = target.length;
  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
    console.log(pageSize);
    setPage(1)
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemsPerPageOptions = [5, 10, 15];
  const tableContainerRef = useRef(null);
  
  const hideModal = () => {
    const modal = document.getElementById("setting-manage");
    window.onclick = (event) => {
      if (event.target == modal) {
        setShowSetting(false);
      }
    };
  };

const [showOpen, setShowOpen] = useState(false);
function toggleShow(){
  setShowOpen(!showOpen)
}

const handleResetClick = () => {
  setShowOpen(true);
};
  return (
    <div
      className="manage-modal"
      id="setting-manage"
      onClick={() => hideModal()}
    >
      <div className="manage-modal-content" style={{width: "60%", maxHeight: "500px", overflowX: "auto", overflowY: "auto"}}>
        <div className="modal-title">
          <p>Mangage User Setting</p>
        </div>
        
        <button className="btn">Add {name} Value</button>
     
        <table className="data-table" ref={tableContainerRef} >
          <thead>
            <tr>
              <th >Sender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
         
          {target.length > 0 ? (
              currentPage.map((item, index) => (
                
                <tr className="active_row" key={index}>
                  <td>{item.senderName}</td>
                  { name === "Message" ? (
                    <td>{item.status}</td>
                  ) :
                    ""
                  }

                  <td>
                    <p className="notification_actions">
                      <FaEnvelope
                        title="Message"
                        className="action_edit"
                        size="1.4rem"
                        color="black"
                        style={{marginLeft: "20px", cursor: "pointer"}}
                        onClick={handleResetClick}
                      />
                     
                    </p>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td>No Record Found</td>
                </tr>
              )}
          </tbody>
        </table>
        {showOpen && (
        <MessageReset name={name} setShowOpen={setShowOpen} toggleShow={toggleShow} />
      )}
        <Pagination
        onChange={handlePageChange}
        pageSize={postPerPage}
        current={page}
        total={totalPages}
        Pagination
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={itemsPerPageOptions.map((option) => option.toString())}
        
        showSizeChanger
        showQuickJumper
        paginationRowsPerPageOptions={[5,10]}
        responsive
        
      />
        </div>
        </div>
 
    
  );
};

export default PersonalSettingTable;
