import React, { useState,useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { mainAPI } from "../../components/mainAPI";
import { showErrorMessage } from "../../components/SwalMessages";
import UserSettingList from './UserSettingList'
import UserSettingTable from './UserSettingTable'

const PersonalSetting = () => {
  const [show, setShow] = useState(false);
  const [name, setname] = useState("");
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("");
  const [loading, setLoading] = useState(true);
 const [message, setMessage] = useState([]);
 
  const apiOwners = `${mainAPI}/Api/Message/All`; 
 
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
 

  const getMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiOwners, options);
      if (res.status == 401) {
 
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setMessage(data.messages);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      showErrorMessage(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessage();
    setTableData(message);
    setname("Message");
  }, []);
  
  const ListCardDetail = [
    {
      title: "Message",
      data: message.length || 0,
       name: "Message",
    },
  ];


  const handleChange = (name) => {
    setShowSetting(true);
    setActiveCard(name);
    switch (name) {
      case "Message":
        setTableData(message);
        setname("Message");
        break;

      default:
        setTableData("");
    }
  };

  const [showSetting, setShowSetting] = useState(false);
  const showUserSettingList = () => {
    setShow(!show);
  };
  return (
    <div className="setting-cards">
         {showSetting && (
        <UserSettingTable
        name={name}
        setShowSetting={setShowSetting}
          target={tableData}
        />
      )}
      <div
        className="setting-title-container"
        onClick={() => showUserSettingList()}
      >
        UserSetting
        <MdKeyboardArrowDown size={20} />
      </div>
      {show && (
        <div className="setting-list-container" id="show-setting">
          <ul className="setting-sublist">
            {ListCardDetail.map((item, index) => (
                 <li key={index}>  <UserSettingList
                      title={item.title}
                      data={item.data}
                      key={index}
                      handleCardChange={() => handleChange(item.name)}
                      active={activeCard}
                      name={item.name}
                    /></li> 
                  ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PersonalSetting;



