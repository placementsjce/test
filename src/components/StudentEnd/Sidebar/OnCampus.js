import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Loader from "../../Loading/Skeleton";
import { apiLink } from "../../../mainurl";

function Sidebar() {
  const [loading, setLoader] = useState(true);

  const [oncampus, setOnCampus] = useState([{}]);
  useEffect(() => {
    fetch(apiLink + "student/home/upcoming_companies", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOnCampus(data);
        setLoader(false);
      });
  }, []);

  return (
    <div>
      <div className="header_company">ON CAMPUS</div>
      <div className="upcomingcompanies">
        {loading ? (
          <Loader height={75} />
        ) : (
          oncampus?.map(function (oncamp) {
            return (
              <>
                <div className="eachupcomingcompany">
                  <div className="upcomingcompanyname">{oncamp.cname}</div>:
                  <div>{oncamp?.date?.slice(0,10)?.split('-')?.reverse()?.join('-')}</div>
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
